import Image from 'next/image';
import { useState } from 'react';
import CaptureCursor from './captureCursor';
import axios from 'axios';
import { base64ToFile } from '../libs/client/utils';

export default function RoomHint() {
  const [camera, setCamera] = useState<boolean>(false);
  const [imageList, setImageList] = useState<string[]>([]);

  const onCapture = async (imgURL: string) => {
    setCamera(false);
    setImageList([...imageList, imgURL]);

    if (imgURL) {
      const file = base64ToFile(imgURL, 'image');
      const formData = new FormData();
      formData.append('file', file);

      const getUploadURLResponse = await axios({
        method: 'get',
        url: '/api/files',
      });

      const res = await axios({
        method: 'post',
        url: getUploadURLResponse.data.uploadURL,
        data: formData,
      });

      if (!res.data.success) {
        alert('이미지 등록에 실패했습니다.');
        setImageList(imageList.slice(0, imageList.length - 1));
      }
    }
  };

  return (
    <>
      <div>
        <div className="bg-red-300 w-[50rem] h-[40rem]">map</div>
      </div>
      <button
        onClick={() => {
          setCamera(true);
        }}
      >
        카메라
      </button>
      <div>
        {imageList.map((imgUrl, i) => (
          <Image
            key={`hint${i}`}
            src={imgUrl}
            width={120}
            height={120}
            alt={`hint${i}`}
          />
        ))}
      </div>
      <CaptureCursor {...{ isActive: camera, onCapture }} />
    </>
  );
}
