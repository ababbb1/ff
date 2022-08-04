import { XIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { UseArrayPush, UseArrayRemove } from '../../../libs/hooks/useArray';
import { ImageData } from '../../../libs/types/room';
import LoadingScreen from '../../loading-screen';
import ModalLayout from '../../modal-layout';

interface Props {
  imageData: ImageData | null;
  index: number;
  imageRemove: UseArrayRemove;
  imagePush: UseArrayPush<ImageData | null>;
  imageCount: number;
  isLoading: boolean;
}

export default function HintImageLayout({
  imageData,
  index,
  imageRemove,
  imagePush,
  imageCount,
  isLoading,
}: Props) {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const handleClickRemoveButton = () => {
    if (imageData && imageRemove) {
      imageRemove(index);
      imagePush(null);
    }
  };

  const handleClickImage = () => {
    if (imageData) {
      setIsEnlarged(true);
    }
  };

  return (
    <>
      <div className="w-full aspect-square border-b-2 border-black last:border-b-0 p-3 relative">
        {imageData && (
          <div
            onClick={handleClickRemoveButton}
            className="flex justify-center items-center absolute top-5 right-5 w-5 h-5 rounded-full bg-[#000000ab] text-white hover:cursor-pointer hover:bg-black"
          >
            <XIcon className="w-4 h-4" />
          </div>
        )}
        <div
          onClick={handleClickImage}
          className={`bg-[#0000005f] w-full h-full border-2 border-black flex items-center ${
            imageData ? 'hover:cursor-pointer' : ''
          }`}
        >
          {imageData ? (
            <img src={imageData.previewUrl} className="object-contain" />
          ) : index === imageCount && isLoading ? (
            <LoadingScreen size={20} />
          ) : null}
        </div>
      </div>
      <ModalLayout
        background="dark"
        isActive={isEnlarged}
        handleClose={() => setIsEnlarged(false)}
      >
        {imageData && (
          <img
            src={imageData.previewUrl}
            className="min-w-[50vw] min-h-[50vh] max-w-[70vw] max-h-[70vh]"
          />
        )}
      </ModalLayout>
    </>
  );
}
