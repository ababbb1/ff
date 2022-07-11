import Image from 'next/image';
import { useRef, useState } from 'react';
import CaptureCursor from '../capture-cursor';
import axios from 'axios';
import { base64ToFile } from '../../libs/client/utils';

export default function RoomHint() {
  const CAMERA_WIDTH = 180;
  const CAMERA_HEIGHT = 180;
  const IMAGE_WIDTH = 120;
  const IMAGE_HEIGHT = 120;

  const [camera, setCamera] = useState<boolean>(false);
  const [imageList, setImageList] = useState<string[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);

  const onCapture = async (imgURL: string) => {
    setCamera(false);
    setImageList([...imageList, imgURL]);

    if (imgURL) {
      const file = base64ToFile(imgURL, 'image');
      const formData = new FormData();
      formData.append('file', file);

      const getUploadURLResponse = await axios.get('/api/files');

      const res = await axios({
        method: 'post',
        url: getUploadURLResponse.data.uploadURL,
        data: formData,
      });

      console.log(res.data);

      if (!res.data.success) {
        alert('이미지 등록에 실패했습니다.');
        setImageList(imageList.slice(0, imageList.length - 1));
      }
    }
  };

  return (
    <>
      <div className="p-10">
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
        {imageList.map((imgUrl, i) => (
          <Image
            key={`hint${i}`}
            src={imgUrl}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            alt={`hint${i}`}
          />
        ))}
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
