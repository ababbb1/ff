import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title: string;
}

export default function HintItemContent({ children, title }: Props) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="h-2/3 aspect-video bg-[#00000032] flex flex-col p-2">
        <div className="h-8 flex justify-center">
          <span className="font-bold">{title}</span>
        </div>
        <div className="w-full grow flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
