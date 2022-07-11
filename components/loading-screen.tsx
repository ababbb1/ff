import { cls } from '../libs/client/utils';
import ClipLoader from 'react-spinners/ClipLoader';

export default function LoadingScreen({ visible }: { visible: boolean }) {
  return (
    <div
      className={cls(
        'fixed top-0 left-0 w-full h-screen z-50 bg-white flex justify-center items-center',
        visible ? 'block' : 'hidden',
      )}
    >
      <ClipLoader size={45} color="gray" speedMultiplier={0.5} />
    </div>
  );
}
