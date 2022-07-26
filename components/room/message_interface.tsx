import useRoomMessage from '../../libs/hooks/room/useRoomMessage';
import useRoomContext from '../../libs/hooks/room/useRoomContext';
import { useSession } from 'next-auth/react';
import PaperPlane from '../svg/lobby/paper-plane';
import { UserSession } from '../../libs/types/user';
import { getItemsFromDateObject, splitByColon } from '../../libs/utils';

export default function MessageInterface() {
  const { data: user } = useSession();
  const [{ messageList, roomInfo }] = useRoomContext();
  const { message, onMessageChange, handleSubmitMessage, handleKeyup } =
    useRoomMessage(user as UserSession, roomInfo);

  return (
    <div className="w-full h-full flex flex-col bg-[#000000b2] p-6 2xl:p-8 text-white">
      <ul className="h-full overflow-auto flex flex-col gap-3">
        {messageList?.map((msgInfo, i) => (
          <li key={`message${i}`} className="flex gap-3 justify-between">
            <span className="font-bold 2xl:text-xl grow-1">
              {splitByColon(msgInfo.user?.nickname, 'name') || 'system'}
            </span>
            <p className="text-sm 2xl:text-base w-full grow-0">
              {msgInfo.message}
            </p>
            <span className="text-xs 2xl:text-sm grow-1">
              {msgInfo.at
                ? getItemsFromDateObject(new Date(msgInfo.at)).ampmKor
                : ''}
            </span>
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
