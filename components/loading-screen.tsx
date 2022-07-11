import { cls } from '../libs/client/utils';
import ClipLoader from 'react-spinners/ClipLoader';

interface Props {
  visible: boolean;
  isFull?: boolean;
}

export default function LoadingScreen({ visible, isFull = true }: Props) {
  return (
    <div
      className={cls(
        isFull ? 'fixed' : 'absolute',
        'top-0 left-0 w-full h-full z-50 bg-white flex justify-center items-center',
        visible ? 'block' : 'hidden',
      )}
    >
      <ClipLoader size={45} color="gray" speedMultiplier={0.5} />
    </div>
  );
}
