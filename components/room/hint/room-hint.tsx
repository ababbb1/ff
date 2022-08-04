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
import {
  imageList,
  reasoningTime,
  SocketEmitData,
} from '../../../libs/socket.io';
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
import useUpdateEffect from '../../../libs/hooks/useUpdateEffect';
import ItemJungDiary from './map/items/jung/item-jung-diary';

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
    suspense: true,
  },
);
const BathRoomSection = dynamic(
  () => import('../../../components/room/hint/map/bathroom-section'),
  {
    suspense: true,
  },
);
const JangSection = dynamic(
  () => import('../../../components/room/hint/map/jang-section'),
  {
    suspense: true,
  },
);
const LibrarySection = dynamic(
  () => import('../../../components/room/hint/map/library-section'),
  {
    suspense: true,
  },
);
const LivingroomSection = dynamic(
  () => import('../../../components/room/hint/map/livingroom-section'),
  {
    suspense: true,
  },
);
const ParkSection = dynamic(
  () => import('../../../components/room/hint/map/park-section'),
  {
    suspense: true,
  },
);
const HongSection = dynamic(
  () => import('../../../components/room/hint/map/hong-section'),
  {
    suspense: true,
  },
);
const JungSection = dynamic(
  () => import('../../../components/room/hint/map/jung-section'),
  {
    suspense: true,
  },
);
const YangSection = dynamic(
  () => import('../../../components/room/hint/map/yang-section'),
  {
    suspense: true,
  },
);
const SonSection = dynamic(
  () => import('../../../components/room/hint/map/son-section'),
  {
    suspense: true,
  },
);

const ItemParkDrawer = dynamic(
  () => import('./map/items/park/item-park-drawer'),
  {
    suspense: true,
  },
);
const ItemParkPaper1 = dynamic(
  () => import('./map/items/park/item-park-paper-1'),
  {
    suspense: true,
  },
);
const ItemParkSearchResult = dynamic(
  () => import('./map/items/park/item-park-search-result'),
  {
    suspense: true,
  },
);
const ItemParkDiary = dynamic(
  () => import('./map/items/park/item-park-diary'),
  {
    suspense: true,
  },
);
const ItemParkLicense = dynamic(
  () => import('./map/items/park/item-park-license'),
  {
    suspense: true,
  },
);
const ItemParkBriefCase = dynamic(
  () => import('./map/items/park/item-park-briefcase'),
  {
    suspense: true,
  },
);
const ItemParkResume = dynamic(
  () => import('./map/items/park/item-park-resume'),
  {
    suspense: true,
  },
);
const ItemParkWithDaughter = dynamic(
  () => import('./map/items/park/item-park-with-daughter'),
  {
    suspense: true,
  },
);
const ItemParkBin = dynamic(() => import('./map/items/park/item-park-bin'), {
  suspense: true,
});
const ItemLivingRoomRC = dynamic(
  () => import('./map/items/livingroom/item-livingroom-RC'),
  {
    suspense: true,
  },
);
const ItemLivingRoomDailySchedule = dynamic(
  () => import('./map/items/livingroom/item-livingroom-daily-schedule'),
  {
    suspense: true,
  },
);
const ItemJangBriefcase = dynamic(
  () => import('./map/items/jang/item-jang-briefcase'),
  {
    suspense: true,
  },
);
const ItemJangBriefcasePaper1 = dynamic(
  () => import('./map/items/jang/item-jang-briefcase-paper1'),
  {
    suspense: true,
  },
);
const ItemJangBriefcasePaper2 = dynamic(
  () => import('./map/items/jang/item-jang-briefcase-paper2'),
  {
    suspense: true,
  },
);
const ItemBathroomCorpse = dynamic(
  () => import('./map/items/bathroom/item-bathroom-corpse'),
  {
    suspense: true,
  },
);
const ItemBathroomSpeaker = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/bathroom/item-bathroom-speaker'
    ),
  {
    suspense: true,
  },
);
const ItemBathroomWrist = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/bathroom/item-bathroom-wrist'
    ),
  {
    suspense: true,
  },
);
const ItemBathroomTowel = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/bathroom/item-bathroom-towel'
    ),
  {
    suspense: true,
  },
);
const ItemLibraryValidate = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/library/item-library-validate'
    ),
  {
    suspense: true,
  },
);
const ItemLibrarySafe = dynamic(
  () =>
    import('../../../components/room/hint/map/items/library/item-library-safe'),
  {
    suspense: true,
  },
);
const ItemLibraryDesk = dynamic(
  () =>
    import('../../../components/room/hint/map/items/library/item-library-desk'),
  {
    suspense: true,
  },
);
const ItemLibraryDeskComputer = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/library/item-library-desk-computer'
    ),
  {
    suspense: true,
  },
);
const ItemLibraryDeskPill = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/library/item-library-desk-pill'
    ),
  {
    suspense: true,
  },
);
const ItemLibraryDeskPaper1 = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/library/item-library-desk-paper-1'
    ),
  {
    suspense: true,
  },
);
const ItemLibraryDeskHongPark = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/library/item-library-desk-hong-park'
    ),
  {
    suspense: true,
  },
);
const ItemLibraryBookshelf = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/library/item-library-bookshelf'
    ),
  {
    suspense: true,
  },
);
const ItemLibraryBookshelf1 = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/library/item-library-bookshelf-1'
    ),
  {
    suspense: true,
  },
);
const ItemLibraryBookshelf2 = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/library/item-library-bookshelf-2'
    ),
  {
    suspense: true,
  },
);
const ItemLibrarySecret = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/library/item-library-secret'
    ),
  {
    suspense: true,
  },
);
const ItemHongBriefcase = dynamic(
  () =>
    import('../../../components/room/hint/map/items/hong/item-hong-briefcase'),
  {
    suspense: true,
  },
);
const ItemHongBriefcasePaper1 = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/hong/item-hong-briefcase-paper-1'
    ),
  {
    suspense: true,
  },
);
const ItemHongBriefcasePaper2 = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/hong/item-hong-briefcase-paper-2'
    ),
  {
    suspense: true,
  },
);
const ItemHongBookshelf = dynamic(
  () =>
    import('../../../components/room/hint/map/items/hong/item-hong-bookshelf'),
  {
    suspense: true,
  },
);
const ItemHongBookshelfNewspaper = dynamic(
  () =>
    import(
      '../../../components/room/hint/map/items/hong/item-hong-bookshelf-newspaper'
    ),
  {
    suspense: true,
  },
);
const ItemHongBox = dynamic(
  () => import('../../../components/room/hint/map/items/hong/item-hong-box'),
  {
    suspense: true,
  },
);
const ItemHongGlove = dynamic(
  () => import('../../../components/room/hint/map/items/hong/item-hong-glove'),
  {
    suspense: true,
  },
);
const ItemHongDesk = dynamic(
  () => import('../../../components/room/hint/map/items/hong/item-hong-desk'),
  {
    suspense: true,
  },
);
const ItemHongRCPaper = dynamic(
  () =>
    import('../../../components/room/hint/map/items/hong/item-hong-RC-paper'),
  {
    suspense: true,
  },
);
const ItemHongVitamin = dynamic(
  () =>
    import('../../../components/room/hint/map/items/hong/item-hong-vitamin'),
  {
    suspense: true,
  },
);
const ItemJungBag = dynamic(
  () => import('../../../components/room/hint/map/items/jung/item-jung-bag'),
  {
    suspense: true,
  },
);
const ItemJungPaper1 = dynamic(
  () =>
    import('../../../components/room/hint/map/items/jung/item-jung-paper-1'),
  {
    suspense: true,
  },
);
const ItemJungCalendar1 = dynamic(
  () =>
    import('../../../components/room/hint/map/items/jung/item-jung-calendar-1'),
  {
    suspense: true,
  },
);
const ItemJungDesk = dynamic(
  () => import('../../../components/room/hint/map/items/jung/item-jung-desk'),
  {
    suspense: true,
  },
);
const ItemJungPaper2 = dynamic(
  () =>
    import('../../../components/room/hint/map/items/jung/item-jung-paper-2'),
  {
    suspense: true,
  },
);
const ItemJungCalendar2 = dynamic(
  () =>
    import('../../../components/room/hint/map/items/jung/item-jung-calendar-2'),
  {
    suspense: true,
  },
);
const ItemSonRC = dynamic(
  () => import('../../../components/room/hint/map/items/son/item-son-RC'),
  {
    suspense: true,
  },
);
const ItemSonDesk = dynamic(
  () => import('../../../components/room/hint/map/items/son/item-son-desk'),
  {
    suspense: true,
  },
);
const ItemSonPaper1 = dynamic(
  () => import('../../../components/room/hint/map/items/son/item-son-paper-1'),
  {
    suspense: true,
  },
);
const ItemSonPicture1 = dynamic(
  () =>
    import('../../../components/room/hint/map/items/son/item-son-picture-1'),
  {
    suspense: true,
  },
);
const ItemSonPicture2 = dynamic(
  () =>
    import('../../../components/room/hint/map/items/son/item-son-picture-2'),
  {
    suspense: true,
  },
);
const ItemSonDiary = dynamic(
  () => import('../../../components/room/hint/map/items/son/item-son-diary'),
  {
    suspense: true,
  },
);
const ItemYangCloset = dynamic(
  () => import('../../../components/room/hint/map/items/yang/item-yang-closet'),
  {
    suspense: true,
  },
);
const ItemYangPicture = dynamic(
  () =>
    import('../../../components/room/hint/map/items/yang/item-yang-picture'),
  {
    suspense: true,
  },
);
const ItemYangDesk = dynamic(
  () => import('../../../components/room/hint/map/items/yang/item-yang-desk'),
  {
    suspense: true,
  },
);
const ItemYangSecret = dynamic(
  () => import('../../../components/room/hint/map/items/yang/item-yang-secret'),
  {
    suspense: true,
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
  { name: 'library-validate', component: ItemLibraryValidate },
  { name: 'library-safe', component: ItemLibrarySafe },
  { name: 'library-desk', component: ItemLibraryDesk },
  { name: 'library-desk-computer', component: ItemLibraryDeskComputer },
  { name: 'library-desk-pill', component: ItemLibraryDeskPill },
  { name: 'library-desk-paper-1', component: ItemLibraryDeskPaper1 },
  { name: 'library-desk-hong-park', component: ItemLibraryDeskHongPark },
  { name: 'library-bookshelf', component: ItemLibraryBookshelf },
  { name: 'library-bookshelf-1', component: ItemLibraryBookshelf1 },
  { name: 'library-bookshelf-2', component: ItemLibraryBookshelf2 },
  { name: 'library-secret', component: ItemLibrarySecret },
  { name: 'hong-briefcase', component: ItemHongBriefcase },
  { name: 'hong-briefcase-paper-1', component: ItemHongBriefcasePaper1 },
  { name: 'hong-briefcase-paper-2', component: ItemHongBriefcasePaper2 },
  { name: 'hong-bookshelf', component: ItemHongBookshelf },
  { name: 'hong-bookshelf-newspaper', component: ItemHongBookshelfNewspaper },
  { name: 'hong-box', component: ItemHongBox },
  { name: 'hong-glove', component: ItemHongGlove },
  { name: 'hong-desk', component: ItemHongDesk },
  { name: 'hong-RC-paper', component: ItemHongRCPaper },
  { name: 'hong-vitamin', component: ItemHongVitamin },
  { name: 'jung-bag', component: ItemJungBag },
  { name: 'jung-paper-1', component: ItemJungPaper1 },
  { name: 'jung-calendar-1', component: ItemJungCalendar1 },
  { name: 'jung-desk', component: ItemJungDesk },
  { name: 'jung-paper-2', component: ItemJungPaper2 },
  { name: 'jung-diary', component: ItemJungDiary },
  { name: 'jung-calendar-2', component: ItemJungCalendar2 },
  { name: 'son-RC', component: ItemSonRC },
  { name: 'son-desk', component: ItemSonDesk },
  { name: 'son-paper-1', component: ItemSonPaper1 },
  { name: 'son-picture-1', component: ItemSonPicture1 },
  { name: 'son-picture-2', component: ItemSonPicture2 },
  { name: 'son-diary', component: ItemSonDiary },
  { name: 'yang-closet', component: ItemYangCloset },
  { name: 'yang-picture', component: ItemYangPicture },
  { name: 'yang-desk', component: ItemYangDesk },
  { name: 'yang-secret', component: ItemYangSecret },
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
  const [waiting, setWaiting] = useState(false);
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
  const reasoningTimeFxRef = useRef<((data?: SocketEmitData) => void) | null>(
    reasoningTime,
  );
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
        imageInsert(imageCount, {
          id,
          userId: userSession.userId,
          x: 0,
          y: 0,
          isDropped: false,
          previewUrl: getImageUrl(id),
        });
      }

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

  // const handleGoNextPage = () => {
  //   dispatch({ type: 'CLEAR_MESSAGE', payload: [] });
  //   const resultImageList = currentImageList.filter(x => x);
  //   // dispatch({ type: 'IMAGE_LIST', payload: resultImageList as ImageData[] });

  //   if (roomInfo) {
  //     reasoningTime({ roomId: roomInfo.id });
  //   }
  // };

  const handleClickDeleteAll = () => {
    setCurrentImageList(Array(IMAGE_LIST_MAX_LENGTH).fill(null));
  };

  const initHintTime = () => {
    setIsOverview(false);

    if (timeBarRef.current) {
      timeBarRef.current.style.width = '0';
    }

    if (roomInfo) {
      setTimeout(() => {
        setWaiting(true);
        console.log('imageList', currentImageList);
      }, +roomInfo?.hintTime * 60 * 1000);
    }
  };

  const initHintTimeFxRef = useRef<(() => void) | null>(initHintTime);

  useEffect(() => {
    if (roomInfo && timeBarRef.current) {
      const convertedHintTime = +roomInfo.hintTime * 60;
      timeBarRef.current.style.transition = `width linear ${convertedHintTime}s`;
    }
  }, []);

  useEffect(() => {
    if (roomInfo?.roomState === 'hintTime' && initHintTimeFxRef.current) {
      initHintTimeFxRef.current();
      initHintTimeFxRef.current = null;
    }
  }, [roomInfo]);

  useEffect(() => {
    if (preScrollRef.current && isLoading) {
      preScrollRef.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  }, [isLoading]);

  useUpdateEffect(() => {
    if (waiting) {
      imageList({
        roomId: roomInfo?.id,
        userId: userSession?.userId,
        imageUrlLists: currentImageList.map(imageData => imageData?.id),
      });
    }
  }, [waiting]);

  useUpdateEffect(() => {
    if (
      currentUsers.every(cUser => cUser.imageReady) &&
      reasoningTimeFxRef.current &&
      roomInfo?.master === userSession?.nickname
    ) {
      reasoningTimeFxRef.current({ roomId: roomInfo?.id });
      reasoningTimeFxRef.current = null;
    }
  }, [currentUsers]);

  useUpdateEffect(() => {
    if (roomInfo?.roomState === 'reasoningTime') {
      dispatch({ type: 'CLEAR_MESSAGE', payload: [] });
      router.replace(`/room/${roomInfo?.id}/reasoning`);
    }
  }, [roomInfo]);

  if (waiting) return <LoadingScreen fullScreen />;

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
            <span className="font-semibold opacity-0">
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
              <div
                className={`w-full aspect-square flex justify-center items-center border-b-2 border-black p-2`}
              >
                <div
                  onClick={() =>
                    setCurrentInfo(
                      <HintMotivation
                        roleInfo={myRole}
                        closeButtonHandler={() => setCurrentInfo(null)}
                      />,
                    )
                  }
                  className={`flex flex-col justify-center items-center gap-2 w-full h-full hover:cursor-pointer hover:bg-[#323232] hover:text-white`}
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
                  className={`w-full h-full absolute top-0 left-0 ${
                    currentItem?.name === item.name
                      ? 'opacity-100 z-20'
                      : 'hiddden -z-10'
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
