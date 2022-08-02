import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { ROLES } from '../../../../libs/const';
import useRoomContext from '../../../../libs/hooks/room/useRoomContext';
import useTimeout from '../../../../libs/hooks/useTimeout';
import useUpdateEffect from '../../../../libs/hooks/useUpdateEffect';
import {
  choiceRole,
  getRoles,
  hintRoleChoiceTime,
  hintTimeStart,
  SocketEmitData,
  test,
} from '../../../../libs/socket.io';
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
  const [{ roomInfo, currentUsers }] = useRoomContext();
  const [content, setContent] = useState<PreviewContentType>({
    name: 'overview',
    index: 0,
  });
  const [currentTimeLimit, setCurrentTimeLimit] = useState(2 * 60);
  // const [roles, setRoles] = useState<RoleInfo[]>([]);

  const roleChoiceTimeFxRef = useRef<RoleChoiceTime | null>(hintRoleChoiceTime);

  const timeout = useTimeout(() => {
    if (roomInfo && roleChoiceTimeFxRef.current) {
      roleChoiceTimeFxRef.current({ roomId: roomInfo.id });
    }
  }, currentTimeLimit * 1000 + 1000);

  const handleClickRoleChoiceButton = (role: string) => () => {
    choiceRole({
      roomId: roomInfo?.id,
      selectedUserId: userSession?.userId,
      role,
    });
  };

  useEffect(() => {
    getRoles();
  }, []);

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
            {ROLES.filter(role => role.name !== '장세민').map(role => (
              <div
                key={role.name}
                onClick={handleClickRoleChoiceButton(role.name)}
                className="grow h-full p-2 bg-[#e9e9e9] hover:bg-[#adadad] hover:cursor-pointer"
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
                  <div className="w-fit max-w-[60%] text-white bg-[#3c3c3c] py-1 px-2 rounded-sm whitespace-nowrap text-ellipsis overflow-hidden">
                    닉네임
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </HintInfoLayout>
  );
}
