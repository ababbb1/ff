import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';

export default function ItemSpeaker({ setCurrentItem }: HintItemProps) {
  return (
    <HintItemLayout setCurrentItem={setCurrentItem}>
      <div>스피커</div>
    </HintItemLayout>
  );
}
