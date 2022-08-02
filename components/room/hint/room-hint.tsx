import {
  ComponentType,
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import CaptureCursor from '../../capture-cursor';
import axios from 'axios';
import {
  base64ToFile,
  getImageUrl,
  getSectionTitle,
} from '../../../libs/utils';
import LoadingScreen from '../../loading-screen';
import Timer from '../../timer';
import { useRouter } from 'next/router';
import ModalLayout from '../../modal-layout';
import useToggle from '../../../libs/hooks/useToggle';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import { hintRegister, reasoningTime } from '../../../libs/socket.io';
import { useSession } from 'next-auth/react';
import CameraIcon from '../../svg/hint/camera';
import ProfileIcon from '../../svg/hint/profile';
import NoteIcon from '../../svg/hint/note';
import { XIcon } from '@heroicons/react/outline';
import useScrollbar from '../../../libs/hooks/room/useScrollbar';
import useArray from '../../../libs/hooks/useArray';
import { ImageData } from '../../../libs/types/room';
import HintImageLayout from './hint-image-layout';
import HintInfoPreview from './hint-info/hint-preview';
import dynamic from 'next/dynamic';

export type SectionNameType =
  | 'map'
  | 'jangroom'
  | 'bathroom'
  | 'library'
  | 'livingroom'
  | 'parkroom'
  | 'yangroom'
  | 'sonroom'
  | 'jungroom'
  | 'hongroom';

export interface SectionComponentProps {
  setCurrentSection?: Dispatch<SetStateAction<Section>>;
}

export interface Section {
  name: SectionNameType;
  component: ComponentType<SectionComponentProps>;
}

const HintMap = dynamic(
  () => import('../../../components/room/hint/map/hint-map'),
  {
    ssr: false,
  },
);
const BathRoomSection = dynamic(
  () => import('../../../components/room/hint/map/bathroom-section'),
  {
    ssr: false,
  },
);

const sections: Section[] = [
  { name: 'map', component: HintMap },
  { name: 'bathroom', component: BathRoomSection },
];

export default function RoomHint() {
  const IMAGE_LIST_MAX_LENGTH = 10;
  const { data: userSession } = useSession();

  const [{ roomInfo, roles }, dispatch] = useRoomContext();

  const [camera, toggleCamera] = useToggle();
  const [isLoading, toggleIsLoading] = useToggle();
  const [isOverview, setIsOverview] = useState(true);
  const [currentSection, setCurrentSection] = useState<Section>({
    name: 'map',
    component: HintMap,
  });

  const {
    array: currentImageList,
    insert: imageInsert,
    remove: imageRemove,
    push: imagePush,
    setArray: setCurrentImageList,
  } = useArray<ImageData | null>(Array(IMAGE_LIST_MAX_LENGTH).fill(null));
  const imageCount = currentImageList.filter(x => x).length;

  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const timeBarRef = useRef<HTMLDivElement>(null);
  const lastImageRef = useRef<HTMLDivElement>(null);
  const preScrollRef = useRef<HTMLDivElement>(null);

  const isHintTime = roomInfo?.roomState === 'hintTime';

  const { isScrollbarVisible, scrollTargetRef, scrollbarRef, scrollThumbRef } =
    useScrollbar(3);

  const onCapture = async (imgURL: string) => {
    toggleCamera(false);

    if (imgURL) {
      toggleIsLoading(true);

      const file = base64ToFile(imgURL, 'image');
      const formData = new FormData();
      formData.append('file', file);

      const getUploadURLResponse = await axios.get('/api/files');

      const res = await axios({
        method: 'post',
        url: getUploadURLResponse.data.uploadURL,
        data: formData,
      });

      const {
        success,
        result: { id },
      } = res.data;

      if (success && userSession) {
        hintRegister({
          userId: userSession.userId,
          roomId: roomInfo?.id,
          imageId: id,
        });

        imageInsert(imageCount, {
          id,
          userId: userSession.userId,
          x: 0,
          y: 0,
          isDropped: false,
          previewUrl: getImageUrl(id),
        });
      } else alert('이미지 등록에 실패했습니다.');

      toggleIsLoading(false);
    }
  };

  // const handleHintReadyButton = () => {
  //   hintReady({
  //     roomId: roomInfo?.id,
  //     userId: userSession?.userId,
  //   });
  // };

  const handleClickCameraButton = () => {
    if (
      currentImageList.filter(image => image).length < IMAGE_LIST_MAX_LENGTH &&
      !isLoading
    ) {
      toggleCamera();
    }
  };

  const handleCloseOverviewModal = () => {
    setIsOverview(false);
  };

  const handleGoNextPage = () => {
    const resultImageList = currentImageList.filter(x => x);
    dispatch({ type: 'IMAGE_LIST', payload: resultImageList as ImageData[] });
    dispatch({ type: 'CLEAR_MESSAGE', payload: [] });

    if (roomInfo) {
      reasoningTime({ roomId: roomInfo.id });
      router.replace(`/room/${roomInfo.id}/reasoning`);
    }
  };

  const handleClickDeleteAll = () => {
    setCurrentImageList(Array(IMAGE_LIST_MAX_LENGTH).fill(null));
  };

  useEffect(() => {
    if (roomInfo && timeBarRef.current) {
      const convertedHintTime = +roomInfo.hintTime * 60;
      timeBarRef.current.style.transition = `width linear ${convertedHintTime}s`;
    }

    // if (roomInfo) {
    //   setTimeout(() => {
    //     router.replace(`/room/${roomInfo.id}/reasoning`);
    //   }, +roomInfo.hintTime * 60 * 1000);
    // }
  }, []);

  useEffect(() => {
    if (roomInfo?.roomState === 'hintTime') {
      setIsOverview(false);

      if (timeBarRef.current) {
        timeBarRef.current.style.width = '0';
      }
    }
  }, [roomInfo, userSession?.userId]);

  useEffect(() => {
    if (preScrollRef.current && isLoading) {
      preScrollRef.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  }, [isLoading]);

  useEffect(() => {
    console.log(roles);
  }, [roles]);

  return (
    <>
      <ModalLayout
        background="dark"
        isActive={isOverview}
        handleClose={isHintTime ? handleCloseOverviewModal : undefined}
      >
        <HintInfoPreview />
      </ModalLayout>

      <div className="w-full h-full flex flex-col disable-dragging">
        <div className="w-full h-2 border-b-2 border-black">
          <div
            ref={timeBarRef}
            className="h-full w-full bg-animate-layout-border transition-all"
          ></div>
        </div>
        <div className="w-full h-10 2xl:h-12 border-b-2 border-black flex">
          <div className="w-24 2xl:w-28 border-r-2 border-black"></div>
          <div className="grow flex justify-between items-center px-4">
            <span className="font-semibold">
              {getSectionTitle(currentSection)}
            </span>
            <div className="flex gap-6">
              <span className="font-semibold">조사시간</span>
              <Timer
                seconds={isHintTime ? +roomInfo.hintTime * 60 : 0}
                className="text-[#a11111]"
              />
            </div>
            <span
              onClick={handleGoNextPage}
              className="font-semibold opacity-0"
            >
              {getSectionTitle(currentSection)}
            </span>
          </div>
          <div className="w-52 2xl:w-56 border-l-2 border-black flex">
            <div className="grow flex items-center px-3 justify-between">
              <span className="font-hanson-bold pt-1">delve</span>
              <span
                className={`font-semibold ${
                  imageCount > 9 ? 'text-[#a11111]' : ''
                }`}
              >
                {imageCount}/{IMAGE_LIST_MAX_LENGTH}
              </span>
            </div>
            <div
              onClick={handleClickDeleteAll}
              className="h-full aspect-square flex justify-center items-center border-l-2 border-black hover:cursor-pointer hover:bg-black hover:text-white"
            >
              <XIcon className="w-6 h-6" strokeWidth={2} />
            </div>
          </div>
        </div>
        <div className="w-full grow flex">
          <div className="w-24 2xl:w-28 h-full border-r-2 border-black flex flex-col justify-between">
            <div className="w-full flex flex-col">
              <div className="w-full aspect-square flex justify-center items-center border-b-2 border-black p-2">
                {isLoading ? (
                  <LoadingScreen size={20} backgroundClassName="bg-none" />
                ) : (
                  <div
                    onClick={handleClickCameraButton}
                    className={`flex flex-col justify-center items-center gap-2 w-full h-full ${
                      camera
                        ? 'bg-[#323232] text-white hover:cursor-pointer'
                        : imageCount < 10
                        ? 'hover:bg-[#323232] hover:text-white hover:cursor-pointer'
                        : 'hover:cursor-not-allowed'
                    } ${imageCount > 9 ? 'opacity-50' : ''}`}
                  >
                    <CameraIcon className="w-7 h-7 2xl:w-8 2xl:h-8" />
                    <span className="whitespace-nowrap text-xs 2xl:text-sm font-semibold">
                      {camera ? '카메라끄기' : '카메라켜기'}
                    </span>
                  </div>
                )}
              </div>
              <div className="w-full aspect-square flex justify-center items-center border-b-2 border-black p-2">
                <div className="flex flex-col justify-center items-center gap-2 w-full h-full hover:cursor-pointer hover:bg-[#323232] hover:text-white">
                  <ProfileIcon className="w-7 h-7 2xl:w-8 2xl:h-8" />
                  <span className="whitespace-nowrap text-xs 2xl:text-sm font-semibold">
                    등장인물
                  </span>
                </div>
              </div>
              <div className="w-full aspect-square flex justify-center items-center border-b-2 border-black p-2">
                <div
                  onClick={() => setIsOverview(true)}
                  className="flex flex-col justify-center items-center gap-2 w-full h-full hover:cursor-pointer hover:bg-[#323232] hover:text-white"
                >
                  <NoteIcon className="w-7 h-7 2xl:w-8 2xl:h-8" />
                  <span className="whitespace-nowrap text-xs 2xl:text-sm font-semibold">
                    사건개요
                  </span>
                </div>
              </div>
              <div className="w-full aspect-square flex justify-center items-center border-b-2 border-black p-2">
                <div
                  onClick={() =>
                    setCurrentSection({ name: 'map', component: HintMap })
                  }
                  className="flex flex-col justify-center items-center gap-2 w-full h-full hover:cursor-pointer hover:bg-[#323232] hover:text-white"
                >
                  <ProfileIcon className="w-7 h-7 2xl:w-8 2xl:h-8" />
                  <span className="whitespace-nowrap text-xs 2xl:text-sm font-semibold">
                    지도
                  </span>
                </div>
              </div>
              <div className="w-full aspect-square flex justify-center items-center border-b-2 border-black p-2">
                <div className="flex flex-col justify-center items-center gap-2 w-full h-full hover:cursor-pointer hover:bg-[#323232] hover:text-white">
                  <ProfileIcon className="w-7 h-7 2xl:w-8 2xl:h-8" />
                  <span className="whitespace-nowrap text-xs 2xl:text-sm font-semibold">
                    동기
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full h-10 2xl:h-12 border-t-2 border-black"></div>
          </div>
          <div className="grow h-full flex flex-col">
            <div ref={mapRef} className="w-full grow relative">
              {sections.map((section, i) => (
                <div
                  key={`section${i}`}
                  className={`w-full h-full transition-all duration-1000 absolute top-0 left-0 ${
                    currentSection.name === section.name
                      ? 'opacity-100'
                      : 'opacity-0 -z-10'
                  }`}
                >
                  <Suspense>
                    <section.component {...{ setCurrentSection }} />
                  </Suspense>
                </div>
              ))}
            </div>
            <div className="w-full h-10 2xl:h-12 border-t-2 border-black flex justify-center items-center">
              <span className="font-hanson-bold text-xl pt-1">GAME</span>
            </div>
          </div>
          <div className="relative w-52 2xl:w-56 h-full border-l-2 border-black">
            <div
              ref={scrollTargetRef}
              className="absolute w-full h-full overflow-y-auto scrollbar-hide"
            >
              <div className="w-full flex flex-col">
                {currentImageList.map((imageData, index) => (
                  <div
                    key={`image${index}`}
                    ref={
                      imageData
                        ? lastImageRef
                        : currentImageList[index - 1]
                        ? preScrollRef
                        : null
                    }
                  >
                    <HintImageLayout
                      {...{
                        imageData,
                        index,
                        imageRemove,
                        imagePush,
                        imageCount,
                        isLoading,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              ref={scrollbarRef}
              className={`w-2 h-full z-20 bg-black rounded-full absolute right-0 transition-opacity duration-500 ${
                isScrollbarVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                ref={scrollThumbRef}
                className="w-[3px] bg-animate-layout-border rounded-full ml-[3px] absolute"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <CaptureCursor
        {...{
          target: mapRef,
          onCapture,
          isActive: camera,
        }}
      />
    </>
  );
}
