import { cls } from '../libs/utils';
import ClipLoader from 'react-spinners/ClipLoader';

interface Props {
  fullScreen?: boolean;
  absolute?: boolean;
  size?: number;
}

export default function LoadingScreen({
  fullScreen = false,
  absolute = false,
  size = 40,
}: Props) {
  return (
    <div
      className={cls(
        fullScreen ? 'fixed top-0 left-0 z-50 bg-white' : '',
        absolute ? 'absolute' : '',
        'w-full h-full flex justify-center items-center',
      )}
    >
      <ClipLoader size={size} color="gray" speedMultiplier={0.5} />
    </div>
  );
}
