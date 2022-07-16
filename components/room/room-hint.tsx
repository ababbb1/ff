import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import CaptureCursor from '../capture-cursor';
import axios from 'axios';
import { base64ToFile, getImageUrl } from '../../libs/client/utils';
import LoadingScreen from '../loading-screen';
import Timer from '../timer';
import { useRouter } from 'next/router';
import ModalLayout from '../modal-layout';
import { useRecoilState } from 'recoil';
import {
  currentUsersState,
  imageListState,
  roomInfoState,
} from '../../libs/client/room';
import { UserSession } from '../../libs/types/user';
import { socket } from './socket';
import API from '../../libs/client/api';
import Link from 'next/link';

export default function RoomHint({ user }: { user: UserSession }) {
  const CAMERA_WIDTH = 180;
  const CAMERA_HEIGHT = 180;
  const IMAGE_WIDTH = 120;
  const IMAGE_HEIGHT = 120;

  const [roomInfo] = useRecoilState(roomInfoState);
  const [currentUsers] = useRecoilState(currentUsersState);
  const [imageList, setImageList] = useRecoilState(imageListState);
  const dataToSendToServer = { roomId: roomInfo?.id, userId: user.id };

  const [camera, setCamera] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const isHintTime = roomInfo?.roomState === 'hintTime';

  const onCapture = async (imgURL: string) => {
    if (imageList.length < 10 && !isLoading) {
      setCamera(false);

      if (imgURL) {
        setIsLoading(true);
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

        if (success) {
          socket.emit('hint_register', {
            userId: user.id,
            roomId: roomInfo?.id,
            imageId: id,
          });
          setImageList(prev => [
            ...prev,
            {
              id,
              x: 0,
              y: 0,
              isDropped: false,
              previewUrl: getImageUrl(id),
            },
          ]);
        } else alert('이미지 등록에 실패했습니다.');
      }
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (roomInfo?.hintTime)
  //     setTimeout(() => {
  //       router.replace(`/room/${roomInfo.id}/reasoning`);
  //     }, +roomInfo.hintTime * 60 * 1000);
  // }, []);

  useEffect(() => {
    if (
      roomInfo?.roomState !== 'hintTime' &&
      currentUsers.filter(v => !v.hintReady).length === 0
    ) {
      socket.emit('hint_start', dataToSendToServer);
    }
  }, [currentUsers]);

  return (
    <>
      {!isHintTime && (
        <ModalLayout background="dark">
          <div className="w-[30rem] h-[20rem] bg-white flex justify-center items-center">
            <button
              onClick={() => socket.emit('hint_ready', dataToSendToServer)}
            >
              준비
            </button>
          </div>
        </ModalLayout>
      )}

      <div className="p-10">
        <Link href={`/room/${roomInfo?.id}/reasoning`}>이동</Link>
        <Timer
          seconds={roomInfo?.hintTime ? +roomInfo.hintTime * 60 : 0}
          isActive={isHintTime}
        />
        <div ref={mapRef} className="bg-red-300 w-[50rem] h-[40rem]">
          map
        </div>
      </div>
      <button
        onClick={() => {
          setCamera(!camera);
        }}
      >
        카메라
      </button>
      <div>
        <ul className="flex">
          {imageList.map((image, i) => (
            <li key={`hint${i}`}>
              <Image
                src={image.previewUrl}
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                alt={`hint${i}`}
              />
            </li>
          ))}
          {isLoading && (
            <li>
              <div style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}>
                <LoadingScreen isFull={false} size={25} />
              </div>
            </li>
          )}
        </ul>
      </div>

      <CaptureCursor
        {...{
          width: CAMERA_WIDTH,
          height: CAMERA_HEIGHT,
          target: mapRef,
          onCapture,
          isActive: camera,
        }}
      />
    </>
  );
}
