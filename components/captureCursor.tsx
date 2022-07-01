import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { fromEvent, merge } from 'rxjs';
import { cls } from '../libs/client/utils';
import html2canvas from 'html2canvas';

const BOX_SIZE = 250;

const imagedataToImage = (imagedata?: ImageData) => {
  if (!imagedata) return;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imagedata.width;
  canvas.height = imagedata.height;
  ctx?.putImageData(imagedata, 0, 0);

  const image = new Image();
  image.src = canvas.toDataURL();
  return image;
};

interface Props {
  cameraState: [boolean, Dispatch<SetStateAction<boolean>>];
  imageListState: [
    HTMLImageElement[],
    Dispatch<SetStateAction<HTMLImageElement[]>>,
  ];
}

export default function CaptureCursor({
  cameraState: [isActive, setIsActive],
  imageListState: [imageList, setImageList],
}: Props) {
  const bg = useRef<HTMLDivElement>(null);
  const flash = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
    const documentMouseOn$ = fromEvent<MouseEvent>(document, 'mouseon');
    const documentMouseOut$ = fromEvent<MouseEvent>(document, 'mouseout');

    merge(documentMouseOn$, mouseMove$).subscribe(({ pageX, pageY }) => {
      if (bg.current && isActive) {
        bg.current.style.visibility = 'visible';
        bg.current.style.borderTopWidth = `${pageY - BOX_SIZE / 2}px`;
        bg.current.style.borderRightWidth = `${
          window.innerWidth - pageX - BOX_SIZE / 2
        }px`;
        bg.current.style.borderBottomWidth = `${
          window.innerHeight - pageY - BOX_SIZE / 2
        }px`;
        bg.current.style.borderLeftWidth = `${pageX - BOX_SIZE / 2}px`;
      }
    });

    documentMouseOut$.subscribe(() => {
      if (bg.current && isActive) {
        bg.current.style.visibility = 'hidden';
      }
    });

    const captureEvent = (e: MouseEvent) => {
      if (flash.current) flash.current.style.display = 'block';

      setTimeout(() => {
        if (flash.current) flash.current.style.display = 'none';
        html2canvas(document.body).then(canvas => {
          const img = imagedataToImage(
            canvas
              .getContext('2d')
              ?.getImageData(
                e.pageX - BOX_SIZE / 2,
                e.pageY - BOX_SIZE / 2,
                BOX_SIZE,
                BOX_SIZE,
              ),
          );

          if (img) setImageList([...imageList, img]);
          setIsActive(false);
        });
      }, 120);
    };

    if (bg.current) {
      bg.current.addEventListener('click', captureEvent);
    }

    return () => {
      bg.current?.removeEventListener('click', captureEvent);
    };
  }, [isActive, imageList]);

  return (
    <>
      <div
        ref={bg}
        className={cls(
          isActive ? 'block' : 'hidden',
          'text-center box-border border-solid border-[#00000090] fixed z-40 top-0 left-0 w-full h-full hover:cursor-crosshair',
        )}
      ></div>
      <div
        ref={flash}
        className="hidden fixed top-0 left-0 w-full h-screen bg-white"
      ></div>
    </>
  );
}
