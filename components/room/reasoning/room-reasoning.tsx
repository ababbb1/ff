import Timer from '../../timer';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import ModalLayout from '../../modal-layout';
import { useContext, useEffect, useRef, useState } from 'react';
import MessageInterface from '../message_interface';
import useToggle from '../../../libs/hooks/useToggle';
import RoundedTriangleIcon from '../../svg/reasoning/rounded-triangle';
import HintImage from './hint-image';
import HintBoard from './hint-board';
import { DndContext } from '../../dnd-provider';

export default function RoomReasoning() {
  const [{ roomInfo, imageList, boardImageList }] = useRoomContext();
  const [isVoteModal, setIsVoteModal] = useState(false);
  const [hintListVisible, toggleHintListVisible] = useToggle();
  const [camVisible, toggleCamVisible] = useToggle();
  // const [boardScrollX, setBoardScrollX] = useState(0);
  // const [boardScrollY, setBoardScrollY] = useState(0);
  // const [documentDragEndX, setDocumentDragEndX] = useState(0);
  // const [documentDragEndY, setDocumentDragEndY] = useState(0);

  const { draggable, onDropHandler, isDragging } = useContext(DndContext);

  // const boardRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (onDropHandler) {
      onDropHandler.current = (pageX: number, pageY: number) => {
        console.log(pageX, pageY);
      };
    }
  }, []);

  useEffect(() => {
    if (isDragging) {
      toggleHintListVisible(false);
    } else {
      toggleHintListVisible(true);
    }
  }, [isDragging]);

  return (
    <>
      <div className="w-full h-full flex">
        <div className="w-3/4 h-full flex flex-col disable-dragging relative pt-10 2xl:pt-12 pb-10 2xl:pb-12">
          <div className="absolute top-0 bg-crumpled-paper w-full z-30 h-10 2xl:h-12 border-b-2 border-black flex justify-between items-center">
            <span className="px-8 font-hanson-bold pt-1 text-xl">GAME</span>
            <div className="flex gap-6">
              <span className="font-semibold">추리시간</span>
              <Timer
                seconds={
                  roomInfo?.reasoningTime ? +roomInfo.reasoningTime * 60 : 0
                }
                className="text-[#a11111]"
              />
            </div>
            <button
              onClick={() => setIsVoteModal(true)}
              className="font-semibold text-[#a11111] px-8 bg-[#f5f5f5] h-full border-l-2 border-black hover:bg-black hover:text-white"
            >
              투표하기
            </button>
          </div>

          <div
            // ref={boardContainerRef}
            className="w-full h-full bg-black overflow-auto"
          >
            <HintBoard boardImageList={boardImageList} />
          </div>

          <div
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
          </div>
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

      <ModalLayout
        background="dark"
        isActive={isVoteModal}
        handleClose={() => setIsVoteModal(false)}
      >
        <div className="w-48 h-48 bg-white"></div>
      </ModalLayout>
    </>
  );
}
