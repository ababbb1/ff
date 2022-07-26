import { useEffect, useRef } from 'react';
import CaptureCursor from '../capture-cursor';
import axios from 'axios';
import { base64ToFile, getImageUrl } from '../../libs/utils';
import LoadingScreen from '../loading-screen';
import Timer from '../timer';
import { useRouter } from 'next/router';
import ModalLayout from '../modal-layout';
import { UserSession } from '../../libs/types/user';
import Link from 'next/link';
import useToggle from '../../libs/hooks/useToggle';
import useRoomContext from '../../libs/hooks/room/useRoomContext';
import { hintReady, hintRegister, hintTimeStart } from '../../libs/socket.io';
import Image from 'next/image';

interface Props {
  user: UserSession;
}

export default function RoomHint({ user }: Props) {
  const CAMERA_WIDTH = 180;
  const CAMERA_HEIGHT = 180;
  const IMAGE_WIDTH = 120;
  const IMAGE_HEIGHT = 120;

  const [{ roomInfo, imageList, currentUsers }, dispatch] = useRoomContext();

  const [camera, toggleCamera] = useToggle();
  const [isLoading, toggleIsLoading] = useToggle();

  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const isHintTime = roomInfo?.roomState === 'hintTime';

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

      if (success) {
        hintRegister({
          userId: user.id,
          roomId: roomInfo?.id,
          imageId: id,
        });

        dispatch({
          type: 'IMAGE_LIST',
          payload: [
            ...imageList,
            { id, x: 0, y: 0, isDropped: false, previewUrl: getImageUrl(id) },
          ],
        });
      } else alert('이미지 등록에 실패했습니다.');

      toggleIsLoading(false);
    }
  };

  const handleHintReadyButton = () => {
    hintReady({
      roomId: roomInfo?.id,
      userId: user.id,
    });
  };

  useEffect(() => {
    if (roomInfo) {
      setTimeout(() => {
        router.replace(`/room/${roomInfo.id}/reasoning`);
      }, +roomInfo.hintTime * 60 * 1000);
    }
  }, []);

  useEffect(() => {
    if (
      roomInfo?.roomState !== 'hintTime' &&
      currentUsers.every(v => v.hintReady)
    ) {
      hintTimeStart({ roomId: roomInfo?.id, userId: user.id });
    }
  }, [currentUsers, roomInfo?.id, roomInfo?.roomState, user.id]);

  return (
    <>
      <ModalLayout background="dark" isActive={!isHintTime}>
        <div className="w-[30rem] h-[20rem] bg-white flex justify-center items-center">
          <button onClick={handleHintReadyButton}>준비</button>
        </div>
      </ModalLayout>

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

      {imageList.length < 10 && !isLoading ? (
        <button
          onClick={() => {
            toggleCamera();
          }}
        >
          {`카메라 ${camera ? '끄기' : '켜기'} ${imageList.length}/10`}
        </button>
      ) : (
        <button className="text-red-500">{`카메라 ${imageList.length}/10`}</button>
      )}
      <div>
        <ul className="flex">
          {imageList.map((image, i) => (
            <li key={`hint${i}`}>
              <Image src={image.previewUrl} alt={`hint${i}`} />
            </li>
          ))}
          {isLoading && (
            <li>
              <div style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}>
                <LoadingScreen fullScreen size={25} />
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
