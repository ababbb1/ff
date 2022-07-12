import { useEffect, useState } from 'react';
import { interval, map, take } from 'rxjs';

interface Props {
  seconds?: number;
}

export default function Timer({ seconds = 0 }: Props) {
  const [t, setT] = useState<number>(Math.floor(seconds));
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = Math.floor((t % 3600) % 60);

  useEffect(() => {
    interval(1000)
      .pipe(
        take(t),
        map(x => t - x - 1),
      )
      .subscribe(t => setT(t));
  }, []);

  return (
    <div>
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
