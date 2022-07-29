import useRoomMessage from '../../libs/hooks/room/useRoomMessage';
import useRoomContext from '../../libs/hooks/room/useRoomContext';
import { useSession } from 'next-auth/react';
import PaperairplaneIcon from '../svg/lobby/paper-airplane';
import { getItemsFromDateObject, splitByColon } from '../../libs/utils';
import { useEffect, useRef } from 'react';
import useScrollbar from '../../libs/hooks/room/useScrollbar';

interface Props {
  scrollDownControl?: boolean;
  scrollDownControlDelay?: number;
}

export default function MessageInterface({
  scrollDownControl,
  scrollDownControlDelay = 0,
}: Props) {
  const { data: userSession } = useSession();
  const [{ messageList }] = useRoomContext();
  const { message, onMessageChange, handleSubmitMessage, handleKeyup } =
    useRoomMessage();

  const lastMessageRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const { isScrollbarVisible, scrollTargetRef, scrollbarRef, scrollThumbRef } =
    useScrollbar();

  const handleClickMessageArea = () => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  };

  useEffect(() => {
    if (scrollTargetRef.current && lastMessageRef.current) {
      const messageListScrollTop = scrollTargetRef.current.scrollTop;
      const messageListHeight = scrollTargetRef.current.clientHeight;
      const ulScrollHeight = scrollTargetRef.current.scrollHeight;

      const isLastMessageAtEnd =
        Math.abs(
          Math.floor(messageListScrollTop + messageListHeight) -
            Math.floor(ulScrollHeight),
        ) < messageListHeight;

      const isLastMessageMine =
        messageList[messageList.length - 1].user?.userId ===
        userSession?.userId;

      if (
        isLastMessageAtEnd ||
        isLastMessageMine ||
        messageListScrollTop === 0
      ) {
        lastMessageRef.current.scrollIntoView({
          block: 'end',
        });
      }
    }
  }, [messageList, scrollTargetRef, userSession?.userId]);

  useEffect(() => {
    setTimeout(() => {
      if (scrollDownControl && lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({
          block: 'end',
        });
      }
    }, scrollDownControlDelay);
  }, [scrollDownControl, scrollDownControlDelay]);

  return (
    <div
      onClick={handleClickMessageArea}
      className="w-full h-full flex flex-col text-white relative pb-24 2xl:pb-28 pt-10 2xl:pt-12"
    >
      <div className="absolute top-0 w-full h-10 2xl:h-12 flex items-center px-6 border-b-2 border-black">
        <span className="font-hanson-bold text-black pt-1">Chat</span>
      </div>
      <div className="relative w-full h-full flex flex-col justify-between gap-4 2xl:gap-6 bg-[#000000b2]">
        <div
          ref={scrollbarRef}
          className={`absolute top-0 right-0 w-[8px] pl-[2px] h-full bg-[#191919] rounded-full transition-opacity duration-300 ${
            isScrollbarVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            ref={scrollThumbRef}
            className="absolute w-[4px] bg-animate-layout-border rounded-full"
          ></div>
        </div>

        <div
          ref={scrollTargetRef}
          className={`w-full overflow-y-auto scrollbar-hide flex flex-col px-6 2xl:px-8`}
        >
          {messageList?.map((msgInfo, i) => (
            <div
              ref={i === messageList.length - 1 ? lastMessageRef : null}
              key={`message${i}`}
              className={`flex justify-between w-full`}
            >
              <div className="flex flex-col gap-2 w-full py-3 2xl:py-4">
                <div className="w-full flex justify-between">
                  <span
                    className={`font-bold 2xl:text-xl ${
                      msgInfo.user?.nickname === userSession?.nickname
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
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 w-full px-6 2xl:px-8 h-24 2xl:h-28 flex items-center bg-[#000000b2]">
        <div className="flex items-center gap-2 p-2 w-full border-b-2 border-animate-layout-border">
          <input
            ref={messageInputRef}
            value={message}
            onChange={onMessageChange}
            placeholder="메시지를 입력해주세요."
            onKeyUp={handleKeyup}
            className="w-full bg-transparent focus:outline-none 2xl:text-xl"
          />
          <div onClick={handleSubmitMessage} className="hover:cursor-pointer">
            <PaperairplaneIcon className="w-5 h-5 2xl:w-6 2xl:h-6 text-animate-layout-border hover:text-white hover:translate-x-1 hover:-translate-y-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
