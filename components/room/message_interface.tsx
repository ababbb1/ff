import useRoomMessage from '../../libs/hooks/room/useRoomMessage';
import useRoomContext from '../../libs/hooks/room/useRoomContext';
import { useSession } from 'next-auth/react';
import PaperPlane from '../svg/lobby/paper-plane';
import { UserSession } from '../../libs/types/user';
import { getItemsFromDateObject, splitByColon } from '../../libs/utils';
import { useEffect, useRef } from 'react';

export default function MessageInterface() {
  const { data: user } = useSession();
  const [{ messageList, roomInfo }] = useRoomContext();
  const { message, onMessageChange, handleSubmitMessage, handleKeyup } =
    useRoomMessage(user as UserSession, roomInfo);

  const lastMessageRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (messageList.length > 0) {
      console.dir(lastMessageRef.current);
    }
  }, [lastMessageRef, messageList]);

  return (
    <div className="w-full h-full flex flex-col bg-[#000000b2] p-6 gap-6 2xl:gap-8 2xl:p-8 text-white">
      <ul className="w-full h-full overflow-y-auto flex flex-col gap-5 scrollbar-hide">
        {messageList?.map((msgInfo, i) => (
          <li
            ref={i === messageList.length - 1 ? lastMessageRef : null}
            key={`message${i}`}
            className="flex justify-between w-full"
          >
            <div className="flex flex-col gap-1 w-full">
              <div className="w-full flex justify-between">
                <span
                  className={`font-bold 2xl:text-xl ${
                    msgInfo.user?.nickname === user?.nickname
                      ? 'text-animate-layout-border'
                      : ''
                  }`}
                >
                  {splitByColon(msgInfo.user?.nickname, 'name') || ''}
                </span>
                <span className="text-xs 2xl:text-sm whitespace-nowrap flex items-center">
                  {msgInfo.at
                    ? getItemsFromDateObject(new Date(msgInfo.at)).ampmKor
                    : ''}
                </span>
              </div>
              <p className="text-sm 2xl:text-base w-full px-[1px] break-words">
                {msgInfo.message}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 p-2 w-full border-b-2 border-animate-layout-border">
        <input
          value={message}
          onChange={onMessageChange}
          placeholder="메시지를 입력해주세요."
          onKeyUp={handleKeyup}
          className="w-full bg-transparent focus:outline-none"
        />
        <div onClick={handleSubmitMessage} className="hover:cursor-pointer">
          <PaperPlane className="w-5 h-5 2xl:w-6 2xl:h-6 text-animate-layout-border hover:text-white hover:translate-x-1 hover:-translate-y-1 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
}
