import { cls } from '../libs/client/utils';
import ClipLoader from 'react-spinners/ClipLoader';

interface Props {
  isFull?: boolean;
  size?: number;
}

export default function LoadingScreen({ isFull = true, size = 40 }: Props) {
  return (
    <div
      className={cls(
        isFull ? 'fixed top-0 left-0 z-50 bg-white' : '',
        'w-full h-full flex justify-center items-center',
      )}
    >
      <ClipLoader size={size} color="gray" speedMultiplier={0.5} />
    </div>
  );
}
