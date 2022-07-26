import useRoomMessage from '../../libs/hooks/room/useRoomMessage';
import useRoomContext from '../../libs/hooks/room/useRoomContext';
import { useSession } from 'next-auth/react';
import PaperPlane from '../svg/lobby/paper-plane';
import { UserSession } from '../../libs/types/user';
import { getItemsFromDateObject, splitByColon } from '../../libs/utils';
import { useEffect, useRef, useState } from 'react';

export default function MessageInterface() {
  const { data: user } = useSession();
  const [{ messageList, roomInfo }] = useRoomContext();
  const { message, onMessageChange, handleSubmitMessage, handleKeyup } =
    useRoomMessage(user as UserSession, roomInfo);

  const lastMessageRef = useRef<HTMLLIElement>(null);
  const ulElementRef = useRef<HTMLUListElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
  const [scrollThumbHeight, setScrollThumbHeight] = useState(0);

  const ulScrollTop = ulElementRef.current?.scrollTop;
  const ulHeight = ulElementRef.current?.offsetHeight;
  const ulScrollHeight = ulElementRef.current?.scrollHeight;
  const scrollbarHeight = scrollbarRef.current?.offsetHeight;

  const handleMouseEnterUlElement = () => {
    setIsScrollbarVisible(true);
  };

  const handleMouseLeaveUlElement = () => {
    setIsScrollbarVisible(false);
  };

  const handleScrollUlElement = () => {
    if (ulElementRef.current && scrollbarRef.current) {
      const ulScrollTop = ulElementRef.current.scrollTop;
      const ulScrollHeight = ulElementRef.current.scrollHeight;
      const scrollbarHeight = scrollbarRef.current.offsetHeight;

      const top = Math.floor(
        (ulScrollTop / ulScrollHeight) * (scrollbarHeight - 6),
      );
      scrollbarRef.current.style.paddingTop = `${top + 3}px`;
    }
  };

  useEffect(() => {
    if (ulScrollTop && ulHeight && ulScrollHeight && lastMessageRef.current) {
      const isLastMessageAtEnd =
        Math.abs(
          Math.floor(ulScrollTop + ulHeight) - Math.floor(ulScrollHeight),
        ) < ulHeight;

      const isLastMessageMine =
        messageList[messageList.length - 1].user?.id === user?.id;

      if (isLastMessageAtEnd || isLastMessageMine || ulScrollTop === 0) {
        lastMessageRef.current.scrollIntoView({
          block: 'end',
        });
      }
    }

    if (ulHeight && ulScrollHeight && scrollbarHeight) {
      const height = (ulHeight / ulScrollHeight) * (scrollbarHeight - 6);
      setScrollThumbHeight(height);
    }
  }, [messageList]);

  useEffect(() => {
    if (ulElementRef.current) {
      ulElementRef.current.addEventListener(
        'mouseenter',
        handleMouseEnterUlElement,
      );
      ulElementRef.current.addEventListener(
        'mouseleave',
        handleMouseLeaveUlElement,
      );
      ulElementRef.current.addEventListener('scroll', handleScrollUlElement);

      return () => {
        if (ulElementRef.current) {
          ulElementRef.current.removeEventListener(
            'mouseenter',
            handleMouseEnterUlElement,
          );
          ulElementRef.current.removeEventListener(
            'mouseenter',
            handleMouseLeaveUlElement,
          );
          ulElementRef.current.removeEventListener(
            'scroll',
            handleScrollUlElement,
          );
        }
      };
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col text-white">
      <div className="flex items-center px-6 border-b-2 border-black grow-[0.2]">
        <span className="font-hanson-bold text-black pt-1">Chat</span>
      </div>
      <div className="relative w-full h-1/2 flex flex-col justify-between gap-4 2xl:gap-6 bg-[#000000b2] grow">
        <div
          ref={scrollbarRef}
          className={`absolute top-0 right-0 w-[8px] pl-[2px] h-full bg-[#191919] rounded-full transition-opacity duration-300 ${
            isScrollbarVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="w-[4px] bg-animate-layout-border rounded-full"
            style={{
              height: `${scrollThumbHeight}px`,
            }}
          ></div>
        </div>

        <ul
          ref={ulElementRef}
          className={`w-full overflow-y-auto scrollbar-hide flex flex-col px-6 2xl:px-8`}
        >
          {messageList?.map((msgInfo, i) => (
            <li
              ref={i === messageList.length - 1 ? lastMessageRef : null}
              key={`message${i}`}
              className={`flex justify-between w-full`}
            >
              <div className="flex flex-col gap-2 w-full py-3 2xl:py-4">
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
      </div>
      <div className="px-6 2xl:px-8 flex grow-[0.4] items-center bg-[#000000b2]">
        <div className="flex items-center gap-2 p-2 w-full border-b-2 border-animate-layout-border">
          <input
            value={message}
            onChange={onMessageChange}
            placeholder="메시지를 입력해주세요."
            onKeyUp={handleKeyup}
            className="w-full bg-transparent focus:outline-none 2xl:text-xl"
          />
          <div onClick={handleSubmitMessage} className="hover:cursor-pointer">
            <PaperPlane className="w-5 h-5 2xl:w-6 2xl:h-6 text-animate-layout-border hover:text-white hover:translate-x-1 hover:-translate-y-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
