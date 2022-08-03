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
import FlagIcon from '../../svg/hint/flag';
import HintMotivation from './hint-info/hint-motivation';
import HintCharacters from './hint-info/hint-characters';
import HintInfoLayout from './hint-info/hint-info-layout';
import HintOverview from './hint-info/hint-overview';
import PinIcon from '../../svg/hint/pin';
import ItemParkPaper2 from './map/items/park/item-park-paper-2';
import ItemParkDesk from './map/items/park/item-park-desk';

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
  setCurrentItem?: Dispatch<SetStateAction<HintItem | null>>;
}
export interface HintItemProps {
  setCurrentItem: Dispatch<SetStateAction<HintItem | null>>;
}

export interface Section {
  name: SectionNameType;
  component: ComponentType<SectionComponentProps>;
}
export interface HintItem {
  name: string;
  component: ComponentType<HintItemProps>;
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
const JangSection = dynamic(
  () => import('../../../components/room/hint/map/jang-section'),
  {
    ssr: false,
  },
);
const LibrarySection = dynamic(
  () => import('../../../components/room/hint/map/library-section'),
  {
    ssr: false,
  },
);
const LivingroomSection = dynamic(
  () => import('../../../components/room/hint/map/livingroom-section'),
  {
    ssr: false,
  },
);
const ParkSection = dynamic(
  () => import('../../../components/room/hint/map/park-section'),
  {
    ssr: false,
  },
);
const HongSection = dynamic(
  () => import('../../../components/room/hint/map/hong-section'),
  {
    ssr: false,
  },
);
const JungSection = dynamic(
  () => import('../../../components/room/hint/map/jung-section'),
  {
    ssr: false,
  },
);
const YangSection = dynamic(
  () => import('../../../components/room/hint/map/yang-section'),
  {
    ssr: false,
  },
);
const SonSection = dynamic(
  () => import('../../../components/room/hint/map/son-section'),
  {
    ssr: false,
  },
);

const ItemParkDrawer = dynamic(
  () => import('./map/items/park/item-park-drawer'),
  {
    ssr: false,
  },
);
const ItemParkPaper1 = dynamic(
  () => import('./map/items/park/item-park-paper-1'),
  {
    ssr: false,
  },
);
const ItemParkSearchResult = dynamic(
  () => import('./map/items/park/item-park-search-result'),
  {
    ssr: false,
  },
);
const ItemParkDiary = dynamic(
  () => import('./map/items/park/item-park-diary'),
  {
    ssr: false,
  },
);
const ItemParkLicense = dynamic(
  () => import('./map/items/park/item-park-license'),
  {
    ssr: false,
  },
);
const ItemParkBriefCase = dynamic(
  () => import('./map/items/park/item-park-briefcase'),
  {
    ssr: false,
  },
);
const ItemParkResume = dynamic(
  () => import('./map/items/park/item-park-resume'),
  {
    ssr: false,
  },
);
const ItemParkWithDaughter = dynamic(
  () => import('./map/items/park/item-park-with-daughter'),
  {
    ssr: false,
  },
);
const ItemParkBin = dynamic(() => import('./map/items/park/item-park-bin'), {
  ssr: false,
});
const ItemLivingRoomRC = dynamic(
  () => import('./map/items/livingroom/item-livingroom-RC'),
  {
    ssr: false,
  },
);
const ItemLivingRoomDailySchedule = dynamic(
  () => import('./map/items/livingroom/item-livingroom-daily-schedule'),
  {
    ssr: false,
  },
);
const ItemJangBriefcase = dynamic(
  () => import('./map/items/jang/item-jang-briefcase'),
  {
    ssr: false,
  },
);
const ItemJangBriefcasePaper1 = dynamic(
  () => import('./map/items/jang/item-jang-briefcase-paper1'),
  {
    ssr: false,
  },
);
const ItemJangBriefcasePaper2 = dynamic(
  () => import('./map/items/jang/item-jang-briefcase-paper2'),
  {
    ssr: false,
  },
);
const ItemBathroomCorpse = dynamic(
  () => import('./map/items/bathroom/item-bathroom-corpse'),
  {
    ssr: false,
  },
);
const ItemBathroomSpeaker = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/bathroom/item-bathroom-speaker'
    ),
  {
    ssr: false,
  },
);
const ItemBathroomWrist = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/bathroom/item-bathroom-wrist'
    ),
  {
    ssr: false,
  },
);
const ItemBathroomTowel = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/bathroom/item-bathroom-towel'
    ),
  {
    ssr: false,
  },
);

const sections: Section[] = [
  { name: 'map', component: HintMap },
  { name: 'bathroom', component: BathRoomSection },
  { name: 'jangroom', component: JangSection },
  { name: 'library', component: LibrarySection },
  { name: 'livingroom', component: LivingroomSection },
  { name: 'parkroom', component: ParkSection },
  { name: 'hongroom', component: HongSection },
  { name: 'jungroom', component: JungSection },
  { name: 'yangroom', component: YangSection },
  { name: 'sonroom', component: SonSection },
];
const items: HintItem[] = [
  { name: 'park-drawer', component: ItemParkDrawer },
  { name: 'park-paper-1', component: ItemParkPaper1 },
  { name: 'park-paper-2', component: ItemParkPaper2 },
  { name: 'park-desk', component: ItemParkDesk },
  { name: 'park-search-result', component: ItemParkSearchResult },
  { name: 'park-diary', component: ItemParkDiary },
  { name: 'park-license', component: ItemParkLicense },
  { name: 'park-briefcase', component: ItemParkBriefCase },
  { name: 'park-resume', component: ItemParkResume },
  { name: 'park-with-daughter', component: ItemParkWithDaughter },
  { name: 'park-bin', component: ItemParkBin },
  { name: 'livingroom-RC', component: ItemLivingRoomRC },
  { name: 'livingroom-daily-schedule', component: ItemLivingRoomDailySchedule },
  { name: 'jang-briefcase', component: ItemJangBriefcase },
  { name: 'jang-briefcase-paper-1', component: ItemJangBriefcasePaper1 },
  { name: 'jang-briefcase-paper-2', component: ItemJangBriefcasePaper2 },
  { name: 'bathroom-corpse', component: ItemBathroomCorpse },
  { name: 'bathroom-speaker', component: ItemBathroomSpeaker },
  { name: 'bathroom-wrist', component: ItemBathroomWrist },
  { name: 'bathroom-towel', component: ItemBathroomTowel },
];

export default function RoomHint() {
  const IMAGE_LIST_MAX_LENGTH = 10;
  const { data: userSession } = useSession();

  const [{ roomInfo, roles, currentUsers }, dispatch] = useRoomContext();

  const [camera, toggleCamera] = useToggle();
  const [isLoading, toggleIsLoading] = useToggle();
  const [isOverview, setIsOverview] = useState(true);
  const [currentInfo, setCurrentInfo] = useState<JSX.Element | null>(null);
  const [currentItem, setCurrentItem] = useState<HintItem | null>(null);
  const [currentSection, setCurrentSection] = useState<Section>({
    name: 'map',
    component: HintMap,
  });
  const myRole =
    roles[
      currentUsers.find(cUser => cUser.userId === userSession?.userId)
        ?.episodeId || 6
    ];

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

  const handleCloseHintInfo = () => {
    setCurrentInfo(null);
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

  useEffect(() => {
    console.log(currentItem);
  }, [currentItem]);

  return (
    <>
      <ModalLayout
        background="dark"
        isActive={isOverview}
        handleClose={isHintTime ? handleCloseOverviewModal : undefined}
      >
        <HintInfoPreview />
      </ModalLayout>

      <ModalLayout
        background="dark"
        isActive={!!currentInfo}
        handleClose={handleCloseHintInfo}
      >
        {currentInfo}
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
                <div
                  onClick={() =>
                    setCurrentInfo(
                      <HintInfoLayout
                        title="등장인물"
                        closeButtonHandler={handleCloseHintInfo}
                      >
                        <HintCharacters />
                      </HintInfoLayout>,
                    )
                  }
                  className="flex flex-col justify-center items-center gap-2 w-full h-full hover:cursor-pointer hover:bg-[#323232] hover:text-white"
                >
                  <ProfileIcon className="w-7 h-7 2xl:w-8 2xl:h-8" />
                  <span className="whitespace-nowrap text-xs 2xl:text-sm font-semibold">
                    등장인물
                  </span>
                </div>
              </div>
              <div className="w-full aspect-square flex justify-center items-center border-b-2 border-black p-2">
                <div
                  onClick={() =>
                    setCurrentInfo(
                      <HintInfoLayout
                        title="사건개요"
                        closeButtonHandler={handleCloseHintInfo}
                      >
                        <HintOverview />
                      </HintInfoLayout>,
                    )
                  }
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
                  onClick={() => {
                    setCurrentSection({ name: 'map', component: HintMap });
                    setCurrentItem(null);
                  }}
                  className="flex flex-col justify-center items-center gap-2 w-full h-full hover:cursor-pointer hover:bg-[#323232] hover:text-white"
                >
                  <PinIcon className="w-7 h-7 2xl:w-8 2xl:h-8" />
                  <span className="whitespace-nowrap text-xs 2xl:text-sm font-semibold">
                    지도
                  </span>
                </div>
              </div>
              <div className="w-full aspect-square flex justify-center items-center border-b-2 border-black p-2">
                <div
                  onClick={() =>
                    setCurrentInfo(
                      <HintMotivation
                        roleInfo={myRole}
                        closeButtonHandler={() => setCurrentInfo(null)}
                      />,
                    )
                  }
                  className="flex flex-col justify-center items-center gap-2 w-full h-full hover:cursor-pointer hover:bg-[#323232] hover:text-white"
                >
                  <FlagIcon className="w-7 h-7 2xl:w-8 2xl:h-8" />
                  <span className="whitespace-nowrap text-xs 2xl:text-sm font-semibold">
                    동기
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full h-10 2xl:h-12 border-t-2 border-black"></div>
          </div>
          <div className="grow h-full flex flex-col">
            <div ref={mapRef} className="w-full grow relative overflow-hidden">
              {sections.map((section, i) => (
                <div
                  key={`section${i}`}
                  className={`w-full h-full transition-all duration-1000 absolute top-0 left-0 ${
                    currentSection.name === section.name
                      ? 'opacity-100 z-10'
                      : 'opacity-50 -z-10'
                  }`}
                >
                  <Suspense>
                    <section.component
                      {...{ setCurrentSection, setCurrentItem }}
                    />
                  </Suspense>
                </div>
              ))}
              {items.map((item, i) => (
                <div
                  key={`item${i}`}
                  className={`w-full h-full transition-all duration-700 absolute top-0 left-0 ${
                    currentItem?.name === item.name
                      ? 'opacity-100 z-20'
                      : 'opacity-50 -z-10 translate-y-2'
                  }`}
                >
                  <Suspense>
                    <item.component {...{ setCurrentItem }} />
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
