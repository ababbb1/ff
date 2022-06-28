import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import io from 'socket.io-client';
import Link from 'next/link';

export default function Room() {
  const router = useRouter();
  const session = useSession();
  // const socket = io('http://localhost:3001');

  useEffect(() => {
    console.log(router.query.roomNum);
    // socket.emit('room:enter', router.query.roomNum, (msg: string) => {
    //   console.log(msg);
    // });
    // socket.on('welcome', () => console.log('someone entered'));
  }, []);

  return (
    <div>
      <div>{router.query.roomNum}</div>
      <Link href={'/room/start'} shallow><button>이동</button></Link>
    </div>
  );
}
