import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import CaptureCursor from '../capture-cursor';
import axios from 'axios';
import { base64ToFile } from '../../libs/client/utils';
import LoadingScreen from '../loading-screen';
import { RoomData } from '../../libs/types/user';
import Timer from '../timer';
import { useRouter } from 'next/router';

interface Props {
  roomInfo?: RoomData;
}

export default function RoomHint({ roomInfo }: Props) {
  const CAMERA_WIDTH = 180;
  const CAMERA_HEIGHT = 180;
  const IMAGE_WIDTH = 120;
  const IMAGE_HEIGHT = 120;

  const router = useRouter();
  const [camera, setCamera] = useState<boolean>(false);
  const [imageList, setImageList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mapRef = useRef<HTMLDivElement>(null);

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

        if (res.data.success) setImageList([...imageList, imgURL]);
        else alert('이미지 등록에 실패했습니다.');
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (roomInfo?.hintTime)
      setTimeout(() => {
        router.replace(`/room/${roomInfo.id}/reasoning`);
      }, +roomInfo.hintTime * 60 * 1000);
  }, []);

  return (
    <>
      <div className="p-10">
        <Timer seconds={roomInfo?.hintTime ? +roomInfo.hintTime * 60 : 0} />
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
          {imageList.map((imgUrl, i) => (
            <li key={`hint${i}`}>
              <Image
                src={imgUrl}
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
