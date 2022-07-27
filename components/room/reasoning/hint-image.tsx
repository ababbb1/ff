import { useDrag } from 'react-dnd';
import { cls } from '../../../libs/utils';

export interface Props {
  id: string;
  type: string;
  isDropped: boolean;
  previewUrl: string;
}

export default function HintImage({ id, type, isDropped, previewUrl }: Props) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { id, isDropped, previewUrl, x: 0, y: 0 },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [id, type],
  );

  return (
    <div
      ref={drag}
      className={cls(isDropped ? 'hidden' : '')}
      style={{ opacity }}
    >
      <img src={previewUrl} width={100} height={100} />
    </div>
  );
}
