import { useEffect, useRef, useState } from 'react';
import { HintItemProps } from '../../../room-hint';
import HintItemLayout from '../hint-item-layout';
import ItemLibrarySafe from './item-library-safe';

export default function ItemLibraryValidate({ setCurrentItem }: HintItemProps) {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [input1, setinput1] = useState('');
  const [input2, setinput2] = useState('');
  const [input3, setinput3] = useState('');
  const [input4, setinput4] = useState('');

  const clear = () => {
    setinput1('');
    setinput2('');
    setinput3('');
    setinput4('');
    if (inputRefs.current) {
      inputRefs.current[0].focus();
    }
  };

  useEffect(() => {
    if (input1 === '1' && input2 === '5' && input3 === '8' && input4 === '8') {
      clear();
      setCurrentItem({ name: 'library-safe', component: ItemLibrarySafe });
    } else {
      setTimeout(clear, 300);
    }
  }, [input4]);

  return (
    <HintItemLayout title="비밀번호 입력" setCurrentItem={setCurrentItem}>
      <div className="flex gap-6 w-full h-full justify-center items-center">
        <input
          ref={ref => {
            if (ref) {
              inputRefs.current[0] = ref;
            }
          }}
          onChange={e => {
            setinput1(e.target.value);
            if (inputRefs.current) {
              inputRefs.current[1].focus();
            }
          }}
          type="text"
          value={input1}
          className="border-gray-700 border-2 focus:outline-gray-700 w-16 h-20 rounded-sm text-3xl text-center font-bold"
        />
        <input
          ref={ref => {
            if (ref) {
              inputRefs.current[1] = ref;
            }
          }}
          onChange={e => {
            setinput2(e.target.value);
            if (inputRefs.current) {
              inputRefs.current[2].focus();
            }
          }}
          type="text"
          value={input2}
          className="border-gray-700 border-2 focus:outline-gray-700 w-16 h-20 rounded-sm text-3xl text-center font-bold"
        />
        <input
          ref={ref => {
            if (ref) {
              inputRefs.current[2] = ref;
            }
          }}
          onChange={e => {
            setinput3(e.target.value);
            if (inputRefs.current) {
              inputRefs.current[3].focus();
            }
          }}
          type="text"
          value={input3}
          className="border-gray-700 border-2 focus:outline-gray-700 w-16 h-20 rounded-sm text-3xl text-center font-bold"
        />
        <input
          ref={ref => {
            if (ref) {
              inputRefs.current[3] = ref;
            }
          }}
          type="text"
          onChange={e => {
            setinput4(e.target.value);
          }}
          value={input4}
          className="border-gray-700 border-2 focus:outline-gray-700 w-16 h-20 rounded-sm text-3xl text-center font-bold"
        />
      </div>
    </HintItemLayout>
  );
}
