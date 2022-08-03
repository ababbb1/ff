import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export default function SectionLayout({ children }: Props) {
  return (
    <div className="relative w-full h-full bg-section-background">
      <div className="absolute z-[2] h-full aspect-video bg-[#00000033] left-[50%] -translate-x-[50%]">
        {children}
      </div>
      <div className="absolute left-0 bottom-0 z-[1] w-full h-[40%] bg-[#00000081]"></div>
    </div>
  );
}
