import { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { ToggleHandler } from '../../../libs/hooks/useToggle';
import useUpdateEffect from '../../../libs/hooks/useUpdateEffect';

export interface Props {
  id: string;
  type: string;
  isDropped: boolean;
  previewUrl: string;
  toggleHintListVisible: ToggleHandler;
}

export default function HintImage({
  id,
  type,
  isDropped,
  previewUrl,
  toggleHintListVisible,
}: Props) {
  const imageRef = useRef<HTMLDivElement>(null);

  const [{ isDragging, cursor }, drag] = useDrag(
    () => ({
      type,
      item: { id, isDropped, previewUrl, x: 0, y: 0 },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        cursor: monitor.isDragging() ? 'grabbing' : 'grab',
      }),
    }),
    [id, type],
  );

  useUpdateEffect(() => {
    if (isDragging) {
      toggleHintListVisible(false);
    } else {
      toggleHintListVisible(true);
    }
  }, [isDragging]);

  const handleMouseMoveDocument = (e: MouseEvent) => {
    console.log('dragging');
    if (imageRef.current && isDragging) {
      console.log(imageRef.current);
      imageRef.current.style.left = `${
        e.pageX - imageRef.current.offsetWidth / 2
      }px`;
      imageRef.current.style.top = `${
        e.pageY - imageRef.current.offsetHeight / 2
      }px`;
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMoveDocument);
    () => document.removeEventListener('mousemove', handleMouseMoveDocument);
  }, []);

  if (isDragging)
    return (
      <div ref={imageRef}>
        <div ref={drag}></div>
      </div>
    );
  return (
    <div>
      <div ref={drag} className="hover:cursor-grab" style={{ cursor }}>
        <img src={previewUrl} className="object-contain" />
      </div>
    </div>
  );
}
