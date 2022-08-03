import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export default function SectionLayout({ children }: Props) {
  return (
    <div className="relative w-full h-full bg-[#00000082]">
      <div className="absolute z-[2] h-full aspect-video bg-section-background left-[50%] -translate-x-[50%]">
        {children}
      </div>
    </div>
  );
}
