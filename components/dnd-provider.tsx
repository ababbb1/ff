import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type MouseEventHandler = (this: Element, ev: Event | MouseEvent) => any;
export type Draggable = (ref: Element | null) => void;

interface DndContext {
  draggable: Draggable;
  onDropHandler: any;
  isDragging: boolean;
}
interface Props {
  children: JSX.Element;
}

export const DndContext = React.createContext<DndContext>({
  draggable: () => {
    return;
  },
  onDropHandler: null,
  isDragging: false,
});

export default function DndProvider({ children }: Props) {
  const targetRefs = useRef<Element[]>([]);
  const onDropHandler = useRef<any>((_: number, __: number) => {
    return _ + __;
  });
  const [isDragging, setIsDragging] = useState(false);

  const draggableMaker = (): Draggable => {
    let currentIndex = 0;

    return ref => {
      if (ref) {
        targetRefs.current.push(ref);
        targetRefs.current[currentIndex].addEventListener(
          'mousedown',
          handleMouseDown,
        );
        currentIndex += 1;
      }
    };
  };

  const handleMouseDown: MouseEventHandler = useCallback(ev => {
    setIsDragging(true);
    const e = ev as MouseEvent;
    const target = e.currentTarget as HTMLElement;
    const parent = target.parentElement;
    const prev = {
      position: target.style.position,
      zIndex: target.style.zIndex,
      width: target.style.width,
      height: target.style.height,
      opacity: target.style.opacity,
    };

    target.style.position = 'absolute';
    target.style.zIndex = '40';
    target.style.width = `${target.offsetWidth / 2}px`;
    target.style.height = `${target.offsetHeight / 2}px`;
    target.style.opacity = '0.5';
    target.style.cursor = 'grabbing';

    parent?.removeChild(target);
    document.body.append(target);

    const placeUnderPointer = (pageX: number, pageY: number) => {
      target.style.left = pageX - target.offsetWidth / 2 + 'px';
      target.style.top = pageY - target.offsetHeight / 2 + 'px';
    };

    const replace = () => {
      target.style.position = prev.position;
      target.style.zIndex = prev.zIndex;
      target.style.width = prev.width;
      target.style.height = prev.height;
      target.style.opacity = prev.opacity;
      target.style.cursor = 'grab';
      parent?.append(target);
    };

    // let currentDroppable = null;

    const handleMouseMove: MouseEventHandler = ev => {
      const e = ev as MouseEvent;
      placeUnderPointer(e.pageX, e.pageY);

      // target.hidden = true;
      // let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      // target.hidden = false;

      // let droppableBelow = elemBelow?.closest('.droppable');

      // console.log(droppableBelow);
      // if (currentDroppable.current != droppableBelow) {
      //   // 들어오거나 날리거나...
      //   // 참고: 두 값 모두 null일 수 있습니다.
      //   //   currentDroppable=null 이벤트 전에 놓을 수 있는 요소 위에 있지 않다면(예: 빈 공간)
      //   //   droppableBelow=null 이벤트 동안 놓을 수 있는 요소 위에 있지 않다면

      //   if (currentDroppable.current) {
      //     // '날아가는 것'을 처리하는 로직(강조 제거)
      //     // leaveDroppable(currentDroppable);
      //     console.log('not droppable');
      //     replace();
      //   }
      //   currentDroppable.current = droppableBelow;
      //   if (currentDroppable) {
      //     // '들어오는 것'을 처리하는 로직
      //     // enterDroppable(currentDroppable);
      //     console.log('droppable');
      //     replace();
      //   }
      // }
    };

    placeUnderPointer(e.pageX, e.pageY);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', replace);
    document.addEventListener('contextmenu', replace);

    target.onmouseup = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', replace);
      document.removeEventListener('contextmenu', replace);

      const elemBelow = document.elementFromPoint(e.pageX, e.pageY);
      if (elemBelow?.closest('.droppable')) {
        console.log(elemBelow?.closest('.droppable'));
        console.log('droppable');
        replace();
      } else {
        console.log(elemBelow?.closest('.droppable'));
        console.log('not droppable');
        replace();
      }
      target.onmouseup = null;
      setIsDragging(false);
    };
  }, []);

  // const handleMouseUp: MouseEventHandler = ev => {
  //   const e = ev as MouseEvent;
  //   const elemBelow = document.elementFromPoint(e.pageX, e.pageY);
  //   console.log(elemBelow);
  //   if (elemBelow?.closest('.droppable')) {
  //     console.log('droppable');
  //     onDropHandler.current(e.pageX, e.pageY);
  //   }
  // };

  useEffect(() => {
    // document.addEventListener('mouseup', handleMouseUp);
    return () => {
      const targets = targetRefs.current;
      targets.forEach(target => {
        target.removeEventListener('mousedown', handleMouseDown);
      });
      // document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <DndContext.Provider
      value={{ draggable: draggableMaker(), onDropHandler, isDragging }}
    >
      {children}
    </DndContext.Provider>
  );
}
