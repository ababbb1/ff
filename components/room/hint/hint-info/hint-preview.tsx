import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import useRoomContext from '../../../../libs/hooks/room/useRoomContext';
import useTimeout from '../../../../libs/hooks/useTimeout';
import useUpdateEffect from '../../../../libs/hooks/useUpdateEffect';
import {
  choiceRole,
  hintRoleChoiceTime,
  hintTimeStart,
  SocketEmitData,
  test,
} from '../../../../libs/socket.io';
import { splitByColon } from '../../../../libs/utils';
import HintCharacters from './hint-characters';
import HintInfoLayout from './hint-info-layout';
import HintOverview from './hint-overview';

type PreviewContentNameType = 'overview' | 'characters' | 'roleChoice';
export interface PreviewContentType {
  name: PreviewContentNameType;
  index: number;
}

type RoleChoiceTime = (data?: SocketEmitData | undefined) => void;

export default function HintInfoPreview() {
  const { data: userSession } = useSession();
  const [{ roomInfo, currentUsers, roles }] = useRoomContext();
  const [content, setContent] = useState<PreviewContentType>({
    name: 'overview',
    index: 0,
  });
  const [currentTimeLimit, setCurrentTimeLimit] = useState(2 * 60);

  const roleChoiceTimeFxRef = useRef<RoleChoiceTime | null>(hintRoleChoiceTime);

  const timeout = useTimeout(() => {
    if (roomInfo && roleChoiceTimeFxRef.current) {
      roleChoiceTimeFxRef.current({ roomId: roomInfo.id });
    }
  }, currentTimeLimit * 1000 + 1000);

  const handleClickRoleChoiceButton = (episodeId: number) => () => {
    if (!isSelectedRole(episodeId)) {
      choiceRole({
        roomId: roomInfo?.id,
        userId: userSession?.userId,
        episodeId,
      });
    }
  };

  const isSelectedRole = (roleId: number) =>
    currentUsers.find(cUser => cUser.episodeId === roleId);

  useUpdateEffect(() => {
    if (
      currentUsers.every(cUser => cUser.hintReady) &&
      roleChoiceTimeFxRef.current
    ) {
      console.log('all ready');
      roleChoiceTimeFxRef.current({ roomId: roomInfo?.id });
      roleChoiceTimeFxRef.current = null;
      test({ test: 'test' });
    }
  }, [currentUsers]);

  useUpdateEffect(() => {
    if (roomInfo?.roomState === 'roleChoice') {
      timeout.clear();
      setCurrentTimeLimit(20);
      setContent({ name: 'roleChoice', index: 0 });
      setTimeout(() => {
        hintTimeStart({ roomId: roomInfo.id });
      }, 20 * 1000);
    }
  }, [roomInfo]);

  return (
    <HintInfoLayout
      title={
        content.name === 'overview'
          ? '사건개요'
          : content.name === 'characters'
          ? '등장인물'
          : '용의자 리스트'
      }
      closeButon={false}
      timer
      currentTimeLimit={currentTimeLimit}
    >
      {content.name === 'overview' && (
        <HintOverview setContent={setContent} savedIndex={content.index} />
      )}
      {content.name === 'characters' && (
        <HintCharacters setContent={setContent} savedIndex={content.index} />
      )}
      {content.name === 'roleChoice' && (
        <div className="w-full h-full py-10 2xl:py-12 px-6 flex flex-col items-center gap-6 2xl:gap-8">
          <span className="font-semibold">
            플레이 하실 캐릭터를 선택해주세요.
          </span>
          <div className="w-full h-full flex gap-4 pt-2 pb-14 2x:pb-16">
            {roles &&
              roles
                .filter(role => role.id !== 6)
                .map(role => (
                  <div
                    key={role.id}
                    onClick={handleClickRoleChoiceButton(role.id)}
                    className={`grow h-full p-2 bg-[#e6e6e6] hover:bg-[#adadad] border-2 ${
                      isSelectedRole(role.id)
                        ? 'border-black bg-[#8f8f8f]'
                        : 'hover:cursor-pointer border-[#00000000]'
                    }`}
                  >
                    <div className="w-full aspect-square">
                      <img src={role.imageSrc} className="w-full h-full" />
                    </div>
                    <div className="w-full flex flex-col items-center py-4 2xl:py-6 gap-10 2xl:gap-16">
                      <div className="w-full flex flex-col items-center gap-3">
                        <span className="font-semibold text-xl 2xl:text-2xl">
                          {role.name}
                        </span>
                        <span>{role.description}</span>
                      </div>
                      {isSelectedRole(role.id) && (
                        <div
                          className={`w-fit max-w-[60%] bg-[#3c3c3c] py-1 px-2 rounded-sm whitespace-nowrap text-ellipsis overflow-hidden ${
                            isSelectedRole(role.id)?.userId ===
                            userSession?.userId
                              ? 'text-animate-layout-border'
                              : 'text-white'
                          }`}
                        >
                          {splitByColon(
                            isSelectedRole(role.id)?.nickname || '',
                            'name',
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )}
    </HintInfoLayout>
  );
}
