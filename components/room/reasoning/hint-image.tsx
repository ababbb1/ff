import { ToggleHandler } from '../../../libs/hooks/useToggle';
import { ImageData } from '../../../libs/types/room';
import { Draggable } from '../../dnd-provider';

export interface Props {
  draggable: Draggable;
  index: number;
  imageData: ImageData;
  type: string;
  toggleHintListVisible: ToggleHandler;
}

export default function HintImage({ draggable, imageData }: Props) {
  // const [{ isDragging, cursor }, drag] = useDrag(
  //   () => ({
  //     type,
  //     item: imageData,
  //     collect: monitor => ({
  //       isDragging: monitor.isDragging(),
  //       cursor: monitor.isDragging() ? 'grabbing' : 'grab',
  //     }),
  //   }),
  //   [imageData, type],
  // );

  // useUpdateEffect(() => {
  //   if (isDragging) {
  //     toggleHintListVisible(false);
  //   } else {
  //     toggleHintListVisible(true);
  //   }
  // }, [isDragging]);

  // if (isDragging) {
  //   return (
  //     <div ref={imageRef}>
  //       <div ref={drag}></div>
  //     </div>
  //   );
  // }
  return (
    <div>
      <img
        ref={draggable}
        src={imageData.previewUrl}
        className="object-contain"
        style={{ cursor: 'grab' }}
      />
    </div>
  );
}
