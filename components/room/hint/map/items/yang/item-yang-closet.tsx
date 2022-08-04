import Image from 'next/image';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemYangPicture from './item-yang-picture';
import ItemYangSecret from './item-yang-secret';

export default function ItemYangCloset({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout title="옷장" setCurrentItem={setCurrentItem}>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[65%] h-[55%] absolute z-[4] left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
          <Image src="/assets/map/yang-closet.png" layout="fill" alt="closet" />
        </div>
        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'yang-picture',
                component: ItemYangPicture,
              });
            }
          }}
          className="w-[2%] h-[7%] absolute z-[5] left-[51.2%] top-[57%] hover:cursor-pointer"
        >
          <Image src="/assets/map/yang-pocket.png" layout="fill" alt="closet" />
        </div>

        <div
          onClick={() => {
            if (setCurrentItem) {
              setCurrentItem({
                name: 'yang-secret',
                component: ItemYangSecret,
              });
            }
          }}
          className="w-[7%] h-[29%] absolute top-[40%] right-[25%] z-[5]"
        ></div>
      </div>
    </HintItemLayout>
  );
}
