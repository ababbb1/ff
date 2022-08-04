import Timer from '../../timer';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import ModalLayout from '../../modal-layout';
import { useEffect, useState } from 'react';
import MessageInterface from '../message_interface';
import useToggle from '../../../libs/hooks/useToggle';
import RoundedTriangleIcon from '../../svg/reasoning/rounded-triangle';
import { vote } from '../../../libs/socket.io';
import Image from 'next/image';
import { getImageUrl, splitByColon } from '../../../libs/utils';
import HintInfoLayout from '../hint/hint-info/hint-info-layout';
import { useSession } from 'next-auth/react';
import useUpdateEffect from '../../../libs/hooks/useUpdateEffect';
import { CurrentUser } from '../../../libs/types/room';
import { IMAGE_SIZE_HORIZONTAL } from '../../../libs/const';
import Ending from './ending';

export default function RoomReasoning() {
  const { data: userSession } = useSession();
  const [{ roomInfo, boardImageList, roles, currentUsers }] = useRoomContext();
  const [camVisible, toggleCamVisible] = useToggle();
  const [selectedImage, setSelectedImage] = useState('');
  const [isVoteTime, setIsVoteTime] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [votedRole, setVotedRole] = useState(0);
  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const [ending, setEnding] = useState(false);

  const getUserFromRole = (roleId: number) =>
    currentUsers.find(cUser => cUser.episodeId === roleId);

  const getRoleFromUser = (cUser: CurrentUser) =>
    roles.find(role => role.id === cUser.episodeId);

  const handleClickVote = (roleId: number) => () => {
    const user = getUserFromRole(roleId);

    if (user && roomInfo) {
      setIsVoted(true);
      setVotedRole(roleId);
      vote({ roomId: roomInfo.id, userId: user.userId });
    }
  };

  const getMostVotedUsers = () => {
    const max = Math.max(...currentUsers.map(cUser => cUser.vote));
    const mostVotedUser = currentUsers.filter(cUser => cUser.vote === max);
    return mostVotedUser;
  };

  useEffect(() => {
    if (roomInfo) {
      setTimeout(() => {
        setIsVoteTime(true);
      }, +roomInfo.reasoningTime * 60 * 1000);
    }
  }, []);

  useUpdateEffect(() => {
    if (isVoteTime) {
      setTimeout(() => {
        setIsVoteTime(false);
        setIsResult(true);
      }, 30 * 1000);
    }
  }, [isVoteTime]);

  useUpdateEffect(() => {
    const isCriminalMostVoted = getMostVotedUsers().find(
      user => user.episodeId === 4,
    );
    const isCriminal =
      currentUsers.find(cUser => cUser.userId === userSession?.userId)
        ?.episodeId === 4;

    if (isResult) {
      if (isCriminalMostVoted) {
        if (getMostVotedUsers().length > 1) {
          if (isCriminal) {
            setResult('win');
          } else {
            setResult('lose');
          }
        } else if (getMostVotedUsers().length === 1) {
          if (isCriminal) {
            setResult('lose');
          } else {
            setResult('win');
          }
        } else {
          setResult('lose');
        }
      } else {
        if (isCriminal) {
          setResult('win');
        } else {
          setResult('lose');
        }
      }
    }

    setTimeout(() => {
      setEnding(true);
    }, 2000);
  }, [isResult]);

  // useUpdateEffect(() => {
  //   if (isResult) {

  //   }
  // }, [isResult]);
  // const [hintListVisible, toggleHintListVisible] = useToggle();
  // const [boardScrollX, setBoardScrollX] = useState(0);
  // const [boardScrollY, setBoardScrollY] = useState(0);
  // const [documentDragEndX, setDocumentDragEndX] = useState(0);
  // const [documentDragEndY, setDocumentDragEndY] = useState(0);

  // const { draggable, onDropHandler, isDragging } = useContext(DndContext);
  // const imageRefs = useRef<HTMLDivElement[]>([]);

  // const handleDrop = (item: ImageData, monitor: DropTargetMonitor) => {
  //   // console.log('getClientOffset', monitor.getSourceClientOffset());
  //   const clientOffset = monitor.getClientOffset();
  //   console.log('dragEndX', documentDragEndX);
  //   console.log('dragEndY', documentDragEndY);
  //   if (clientOffset) {
  //     item.x = clientOffset.x + boardScrollX;
  //     item.y = clientOffset.y + boardScrollY;
  //     dispatch({ type: 'BOARD_IMAGE_LIST_PUSH', payload: item });
  //   }
  //   // const coords = dropCoords;
  //   // const board = boardRef.current;
  //   // if (board && coords) {
  //   //   console.log('getClientOffset:', monitor.getClientOffset());
  //   //   console.log('drop event:', dropCoords);
  //   //   const percentX =
  //   //     ((coords.x - board.offsetLeft) / board.offsetWidth) * 100;

  //   //   const percentY =
  //   //     ((coords.y - board.offsetTop) / board.offsetHeight) * 100;

  //   //   item.isDropped = true;
  //   //   item.x = percentX;
  //   //   item.y = percentY;

  //   //   console.log('coord ratio:', percentX, percentY);

  //   //   const imageListWithoutDroppedItem = imageList.map(v =>
  //   //     v.id === item.id ? item : v,
  //   //   );

  //   //   dispatch({ type: 'IMAGE_LIST', payload: imageListWithoutDroppedItem });
  //   //   hintPostOnBoard({ imageInfo: item, roomId: roomInfo?.id });
  //   // }
  // };

  // const handler = (e: MouseEvent) => {
  //   console.log('document drop:', e);
  //   setDropCoords({ x: e.clientX, y: e.clientY });
  // };

  // const handleScrollBoard = useCallback(() => {
  //   const boardContainer = boardContainerRef.current;
  //   if (boardContainer) {
  //     setBoardScrollX(boardContainer.scrollLeft);
  //     setBoardScrollY(boardContainer.scrollTop);
  //   }
  // }, []);

  // const handleDragEndDocument = useCallback((e: MouseEvent) => {
  //   setDocumentDragEndX(e.pageX);
  //   setDocumentDragEndY(e.pageY);
  // }, []);

  // useEffect(() => {
  //   const boardContainer = boardContainerRef.current;
  //   if (boardContainer) {
  //     boardContainer.addEventListener('scroll', handleScrollBoard);
  //     return () =>
  //       boardContainer.removeEventListener('scroll', handleScrollBoard);
  //   }

  //   document.addEventListener('dragend', handleDragEndDocument);
  //   return () => {
  //     const boardContainer = boardContainerRef.current;
  //     if (boardContainer) {
  //       boardContainer.removeEventListener('scroll', handleScrollBoard);
  //     }
  //     document.removeEventListener('dragend', handleDragEndDocument);
  //   };
  // }, []);

  // const isOnBoard = (pageX: number, pageY: number): boolean => {
  //   if (boardRef.current) {
  //     const targetTop = boardRef.current.offsetTop;
  //     const targetRight =
  //       boardRef.current.offsetLeft +
  //       boardRef.current.offsetWidth -
  //       window.scrollX;
  //     const targetBottom =
  //       boardRef.current.offsetTop +
  //       boardRef.current.offsetHeight -
  //       window.scrollY;
  //     const targetLeft = boardRef.current.offsetLeft;

  //     console.log('board_top', targetTop);
  //     console.log('board_right', targetRight);
  //     console.log('board_bottom', targetBottom);
  //     console.log('board_left', targetLeft);

  //     return (
  //       pageX > targetLeft &&
  //       pageX < targetRight &&
  //       pageY > targetTop &&
  //       pageY < targetBottom
  //     );
  //   } else return false;
  // };

  // useEffect(() => {
  //   if (onDropHandler) {
  //     onDropHandler.current = (pageX: number, pageY: number) => {
  //       console.log(pageX, pageY);
  //       if (boardRef.current) {
  //         console.log(pageX, pageY + boardRef.current.scrollTop);
  //         console.log(isOnBoard(pageX, pageY));
  //       }
  //     };
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isDragging) {
  //     toggleHintListVisible(false);
  //   } else {
  //     toggleHintListVisible(true);
  //   }
  // }, [isDragging]);

  // if (!imagesLoaded) return <LoadingScreen fullScreen />;

  return (
    <>
      <ModalLayout
        isActive={selectedImage !== ''}
        handleClose={() => setSelectedImage('')}
        background="dark"
      >
        <div className="">
          <Image
            key={`imagedetail${selectedImage}`}
            src={getImageUrl(selectedImage)}
            width={IMAGE_SIZE_HORIZONTAL[0]}
            height={IMAGE_SIZE_HORIZONTAL[1]}
            alt={`imagedetail${selectedImage}`}
          />
        </div>
      </ModalLayout>

      <div className="w-full h-full flex">
        <div className="w-3/4 h-full flex flex-col disable-dragging relative pt-10 2xl:pt-12 pb-10 2xl:pb-12">
          <div className="absolute top-0 bg-crumpled-paper w-full px-8 z-30 h-10 2xl:h-12 border-b-2 border-black flex justify-between items-center">
            <span className="font-hanson-bold pt-1 text-xl">GAME</span>
            <div className="flex gap-6">
              <span className="font-semibold">추리시간</span>
              <Timer
                seconds={
                  roomInfo?.reasoningTime ? +roomInfo.reasoningTime * 60 : 0
                }
                className="text-[#a11111]"
              />
            </div>
            {/* <button
              onClick={() => setIsVoteModal(true)}
              className="font-semibold text-[#a11111] px-8 bg-[#f5f5f5] h-full border-l-2 border-black hover:bg-black hover:text-white"
            >
              투표하기
            </button> */}
          </div>

          {result ? (
            <>
              <div className="w-full h-full relative overflow-hidden">
                <Image
                  src={
                    result === 'win' ? '/assets/win.png' : '/assets/lose.png'
                  }
                  layout="fill"
                  className="object-contain"
                  alt={result}
                />
                <Ending visible={ending} />
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-[#00000068] overflow-auto px-10 py-6">
              {/* <HintBoard boardImageList={boardImageList} /> */}
              <div className="flex flex-col w-full gap-8">
                {currentUsers.map((cUser, index) => (
                  <div
                    key={`${cUser.userId}${index}`}
                    className="flex flex-col w-full gap-2"
                  >
                    <div className="flex gap-3 items-center">
                      <span
                        className={`text-xl ${
                          cUser.userId === userSession?.userId
                            ? 'text-animate-layout-border'
                            : 'text-white'
                        }`}
                      >
                        {splitByColon(cUser.nickname, 'name')}
                      </span>
                      <span className="text-xl font-semibold text-gray-200">
                        {getRoleFromUser(cUser)?.name}
                      </span>
                    </div>
                    <div className="flex w-full gap-3 flex-wrap">
                      {boardImageList
                        .filter(x => x.userId === cUser.userId)
                        .map(
                          (y, i) =>
                            y.imageId && (
                              <div
                                key={`image${y.imageId}${i}`}
                                className="w-52 aspect-square relative p-2 bg-[#000000a7]"
                              >
                                <Image
                                  src={getImageUrl(y.imageId)}
                                  layout="fill"
                                  alt={y.imageId}
                                  className="object-contain hover:cursor-pointer"
                                  onClick={() => setSelectedImage(y.imageId)}
                                />
                              </div>
                            ),
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* <div
            className={`absolute bottom-0 bg-crumpled-paper w-full border-t-2 border-black z-30`}
          >
            <div
              className={`w-full h-10 2xl:h-12 flex items-center justify-between transition-all duration-500 ${
                hintListVisible ? 'border-b-2 border-black' : ''
              }`}
            >
              <span className="px-8 font-hanson-bold pt-1 text-xl">Hint</span>
              <button onClick={() => toggleHintListVisible()} className="px-8">
                <RoundedTriangleIcon
                  className={`w-5 h-5 2xl:w-6 2xl:h-6 ${
                    hintListVisible ? '' : 'rotate-180'
                  }`}
                />
              </button>
            </div>
            <div
              className={`w-full transition-all duration-500 bg-[#0000005c] ${
                hintListVisible
                  ? 'opacity-100 h-40 2xl:h-52'
                  : '-z-10 opacity-0 h-0'
              }`}
            >
              <div className="w-full h-full overflow-x-auto flex gap-2 p-3">
                {imageList.map((imageData, index) =>
                  imageData.id && !imageData.isDropped ? (
                    <div
                      key={`image${index}`}
                      className="h-full aspect-square p-1 flex items-center bg-[#00000075]"
                    >
                      <HintImage
                        {...{
                          draggable,
                          index,
                          type: 'hint_image',
                          imageData,
                          toggleHintListVisible,
                        }}
                      />
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          </div> */}
          {/* <div
              ref={boardRef}
              className="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            ></div> */}
        </div>

        <div
          className={`w-1/4 h-full border-l-2 border-black flex flex-col relative transition-all duration-500 ${
            camVisible ? 'pb-[12.5rem] 2xl:pb-64' : 'pb-10 2xl:pb-12'
          }`}
        >
          <div className="w-full h-full">
            <MessageInterface
              scrollDownControl={camVisible}
              scrollDownControlDelay={500}
            />
          </div>
          <div className={`absolute bottom-0 w-full border-t-2 border-black`}>
            <div
              className={`w-full h-10 2xl:h-12 flex items-center justify-between transition-all duration-500 ${
                camVisible ? 'border-b-2 border-black' : ''
              }`}
            >
              <span className="px-8 font-hanson-bold pt-1 text-xl">Cam</span>
              <button onClick={() => toggleCamVisible()} className="px-8">
                <RoundedTriangleIcon
                  className={`w-5 h-5 2xl:w-6 2xl:h-6 ${
                    camVisible ? '' : 'rotate-180'
                  }`}
                />
              </button>
            </div>
            <div
              className={`w-full transition-all duration-500 ${
                camVisible ? 'opacity-100 h-40 2xl:h-52' : '-z-10 opacity-0 h-0'
              }`}
            ></div>
          </div>
        </div>

        {/* <HintBoard
        accept={'hint_image'}
        onDrop={(item, monitor) => handleDrop(item, monitor)}
      />
      <div className="flex relative">
        {imageList.map(({ id, isDropped, previewUrl }, i) =>
          id ? (
            <HintImage
              id={id}
              type={`hint_image`}
              isDropped={isDropped}
              previewUrl={previewUrl}
              key={i}
            />
          ) : null,
        )}
      </div>
      {boardImageList.map((v, i) => (
        <div
          key={`boardImage${i}`}
          style={{ position: 'absolute', left: `${v.x}px`, top: `${v.y}px` }}
        >
          <img src={v.previewUrl} width={100} height={100} />
        </div>
      ))} */}
      </div>

      <ModalLayout background="dark" isActive={isVoteTime}>
        <HintInfoLayout
          title="투표"
          timer
          currentTimeLimit={isVoteTime ? 30 : 0}
        >
          <div className="w-full h-full pt-10 pb-12 2xl:pt-12 2xl:pb-14 px-6 flex flex-col items-center gap-6 2xl:gap-8">
            <span className="font-semibold">
              {isVoted
                ? `${roles[votedRole].name}를 선택하셨습니다.`
                : '범인을 선택해주세요.'}
            </span>
            <div className="w-full h-full flex gap-4 pt-2 pb-8 2x:pb-10">
              {roles &&
                roles
                  .filter(role => role.id !== 6)
                  .map(role => (
                    <div
                      key={role.id}
                      onClick={
                        isVoted ||
                        getUserFromRole(role.id)?.userId === userSession?.userId
                          ? () => {
                              return;
                            }
                          : handleClickVote(role.id)
                      }
                      className={`grow h-full p-2 hover:bg-[#adadad] flex flex-col ${
                        isVoted ||
                        getUserFromRole(role.id)?.userId === userSession?.userId
                          ? ''
                          : 'hover:cursor-pointer'
                      } ${
                        getMostVotedUsers().some(
                          user => user.episodeId === role.id,
                        ) && getUserFromRole(role.id)?.vote
                          ? 'bg-black text-white'
                          : 'bg-[#e6e6e6]'
                      }`}
                    >
                      <div className="w-full aspect-square relative">
                        <img
                          src={role.imageSrc}
                          className="w-full h-full"
                          alt={role.name}
                        />
                      </div>
                      <div className="w-full flex flex-col items-center py-4 2xl:py-6 gap-10 2xl:gap-16 grow">
                        <div className="flex flex-col h-full items-center gap-3 justify-between">
                          <span className="font-semibold text-xl 2xl:text-2xl">
                            {role.name}
                          </span>
                          <span>
                            {splitByColon(
                              getUserFromRole(role.id)?.nickname || '',
                              'name',
                            )}
                          </span>
                          <div className="flex gap-1 h-4 w-24">
                            {getUserFromRole(role.id) &&
                              Array(getUserFromRole(role.id)?.vote)
                                .fill(null)
                                .map((_, i) => (
                                  <div
                                    key={i}
                                    className={`h-full aspect-square ${
                                      getMostVotedUsers().some(
                                        user => user.episodeId === role.id,
                                      ) && getUserFromRole(role.id)?.vote
                                        ? 'bg-[#d9d9d9]'
                                        : 'bg-black'
                                    }`}
                                  />
                                ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            <span>
              최다 득표자가 여러 명일 때 범인이 포함된 경우 범인이 승리합니다.
            </span>
          </div>
        </HintInfoLayout>
      </ModalLayout>
    </>
  );
}
