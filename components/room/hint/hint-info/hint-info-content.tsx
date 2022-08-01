import { useState } from 'react';
import { HintInfoContentItem } from '../../../../libs/types/game';
import TriangleIcon from '../../../svg/room-form/triangle';

interface Props {
  theme?: 'black' | 'white';
  items: HintInfoContentItem[];
  savedIndex: number;
}

export default function HintInfoContent({ theme, items, savedIndex }: Props) {
  const oppositeColor = theme === 'black' ? 'white' : 'black';
  const border = `border-${oppositeColor}`;

  const [currentItem, setCurrentItem] = useState<HintInfoContentItem>(
    items[savedIndex || 0],
  );
  const isFirstItem = items[0].title === currentItem.title;
  const isLastItem = items[items.length - 1].title === currentItem.title;
  const currentIndex = items.findIndex(
    item => item.title === currentItem.title,
  );

  const makeButtonClickHandler = (index: number) => () => {
    setCurrentItem(items[index]);
  };

  const handleClickPrevIndex = () => {
    if (currentIndex > 0) {
      setCurrentItem(items[currentIndex - 1]);
    }
  };
  const handleClickNextIndex = () => {
    if (currentIndex < items.length - 1) {
      setCurrentItem(items[currentIndex + 1]);
    }
  };

  return (
    <div className="flex w-full h-full">
      <div
        className={`w-64 2xl:w-80 h-full flex flex-col border-r-2 ${border}`}
      >
        <div className={`w-full aspect-square p-4`}>
          <img src={currentItem.roleInfo.imageSrc} />
        </div>
        <div
          className={`w-full h-12 2xl:h-14 font-semibold flex justify-center items-center text-xl text-white bg-[#484848]`}
        >
          {currentItem.roleInfo.name}({currentItem.roleInfo.kind})
        </div>
        <div className={`w-full grow flex flex-col p-10 gap-3`}>
          <div className="flex gap-12 2xl:gap-16">
            <span className="font-semibold whitespace-nowrap">성별</span>
            <span className="whitespace-nowrap">
              {currentItem.roleInfo.gender}
            </span>
          </div>
          <div className="flex gap-12 2xl:gap-16">
            <span className="font-semibold whitespace-nowrap">나이</span>
            <span className="whitespace-nowrap">
              {currentItem.roleInfo.age}세
            </span>
          </div>
          <div className="flex gap-12 2xl:gap-16">
            <span className="font-semibold whitespace-nowrap">직업</span>
            <span className="whitespace-nowrap">
              {currentItem.roleInfo.job}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`grow h-full bg-cover ${
          theme === 'white' ? 'bg-hint-info-white' : 'bg-hint-info-black'
        }`}
      >
        <div className="w-full h-full">{currentItem.description}</div>
      </div>

      <div
        className={`w-36 2xl:w-44 h-full border-l-2 ${border} flex flex-col`}
      >
        <div className="w-full aspect-square flex justify-center items-center">
          <span className="font-semibold text-6xl 2xl:text-7xl">
            0{currentItem.index}
          </span>
        </div>
        <div className="w-full grow">
          <div className="flex flex-col gap-1">
            {items.map((item, index) => (
              <button
                key={`button${index}`}
                onClick={makeButtonClickHandler(index)}
                className={`font-semibold px-6 py-2 2xl:py-3 max-w-[90%] ${border} border-2 border-l-0 ${
                  item.title === currentItem.title
                    ? 'bg-black text-animate-layout-border'
                    : ''
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full aspect-square flex justify-between items-center px-4 2xl:px-6">
          {(isFirstItem && currentItem.prevButtonHandler) || !isFirstItem ? (
            <button
              onClick={currentItem.prevButtonHandler || handleClickPrevIndex}
            >
              <div
                className={`flex justify-center items-center w-12 h-12 border ${border} rounded-full pr-1 hover:bg-black hover:text-animate-layout-border`}
              >
                <TriangleIcon className="w-4 h-4 -rotate-90" />
              </div>
            </button>
          ) : (
            <div
              className={`flex justify-center items-center w-12 h-12 border border-gray-300 text-gray-300 rounded-full pr-1`}
            >
              <TriangleIcon className="w-4 h-4 -rotate-90" />
            </div>
          )}
          {(isLastItem && currentItem.nextButtonHandler) || !isLastItem ? (
            <button
              onClick={currentItem.nextButtonHandler || handleClickNextIndex}
            >
              <div
                className={`flex justify-center items-center w-12 h-12 border ${border} rounded-full pl-1 hover:bg-black hover:text-animate-layout-border`}
              >
                <TriangleIcon className="w-4 h-4 rotate-90" />
              </div>
            </button>
          ) : (
            <div
              className={`flex justify-center items-center w-12 h-12 border border-gray-300 text-gray-300 rounded-full pl-1`}
            >
              <TriangleIcon className="w-4 h-4 rotate-90" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
