import Image from 'next/image';
import useToggle from '../../../../libs/hooks/useToggle';
import { SectionComponentProps } from '../room-hint';
import ItemLibraryBookshelf from './items/library/item-library-bookshelf';
import ItemLibraryDesk from './items/library/item-library-desk';
import ItemLibrarySecret from './items/library/item-library-secret';
import ItemLibraryValidate from './items/library/item-library-validate';
import SectionLayout from './section-layout';

export default function LibrarySection({
  setCurrentItem,
}: SectionComponentProps) {
  const [isSecret, toggleIsSecret] = useToggle();

  return (
    <SectionLayout>
      <div className="w-full h-full relative z-[3]">
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'library-desk',
                component: ItemLibraryDesk,
              });
            }
          }}
          className="w-[24%] h-[40%] absolute z-[4] left-[12%] top-[26%] hover:cursor-pointer"
        >
          <Image
            src="/assets/map/desk-with-computer.png"
            layout="fill"
            alt="desk"
          />
        </div>

        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'library-validate',
                component: ItemLibraryValidate,
              });
            }
          }}
          className="w-[9%] h-[16%] absolute z-[4] left-[40%] top-[48%] hover:cursor-pointer"
        >
          <Image src="/assets/map/safe.png" layout="fill" alt="safe" />
        </div>

        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'library-bookshelf',
                component: ItemLibraryBookshelf,
              });
            }
          }}
          className={`w-[30%] h-[60%] absolute right-[6%] top-[5%] hover:cursor-pointer transition-opacity duration-1000 ${
            isSecret ? 'opacity-0 -z-10' : 'z-[4] opacity-100'
          }`}
        >
          <Image
            src="/assets/map/bookshelf.png"
            layout="fill"
            alt="bookshelf"
          />
        </div>

        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'library-secret',
                component: ItemLibrarySecret,
              });
            }
          }}
          className={`w-[30%] h-[60%] absolute right-[6%] top-[5%] hover:cursor-pointer transition-opacity duration-1000 ${
            isSecret ? 'z-[4] opacity-100' : 'opacity-0 -z-10'
          }`}
        >
          <Image
            src="/assets/map/bookshelf-back.png"
            layout="fill"
            alt="bookshelf-back"
          />
        </div>

        <div
          onClick={() => toggleIsSecret()}
          className="w-[6%] h-[15%] absolute z-[4] right-[38%] top-[47%]"
        >
          <Image src="/assets/map/pot.png" layout="fill" alt="pot" />
        </div>

        <div className="absolute left-0 bottom-0 z-[1] w-full h-[40%] bg-[#00000081]"></div>
      </div>
    </SectionLayout>
  );
}
