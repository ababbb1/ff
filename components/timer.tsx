import { useEffect, useState } from 'react';
import useUpdateEffect from '../libs/hooks/useUpdateEffect';

interface Props {
  seconds: number;
  className?: string;
}

export default function Timer({ seconds, className }: Props) {
  const [t, setT] = useState<number>(0);
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = Math.floor((t % 3600) % 60);

  useEffect(() => {
    setT(seconds);
  }, [seconds]);

  useUpdateEffect(() => {
    const decrease = setInterval(() => {
      setT(prev => prev - 1);
    }, 1000);

    if (t < 1) clearInterval(decrease as NodeJS.Timer);
    return () => {
      clearInterval(decrease as NodeJS.Timer);
    };
  }, [t]);

  return (
    <div className={className}>
      {Math.floor(seconds / 3600) > 0 && (
        <>
          <span>{h < 10 ? `0${h}` : h}</span>
          <span>:</span>
        </>
      )}

      <>
        <span>{m < 10 ? `0${m}` : m}</span>
        <span>:</span>
      </>
      <span>{s < 10 ? `0${s}` : s}</span>
    </div>
  );
}
