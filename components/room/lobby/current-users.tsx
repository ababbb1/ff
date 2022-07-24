import { useSession } from 'next-auth/react';
import useRoomContext from '../../../libs/hooks/room/useRoomContext';
import CardButton from '../user-card/card-button';
import UserCard from '../user-card/user-card';

export default function CurrentUsers() {
  const { data: user } = useSession();
  const [{ currentUsers, roomInfo, currentUserTrackEvent }] = useRoomContext();
  const currentUsersExceptMe = currentUsers.filter(
    currentUser => currentUser.id !== user?.id,
  );

  return (
    <div className="w-full h-full flex flex-col gap-[2px] overflow-hidden">
      {currentUsersExceptMe.map((currentUser, i) => (
        <div
          key={`currentUser${i}`}
          className="current-users-card w-full h-1/4 bg-gray-300 first:rounded-tl-2xl peer-last:rounded-br-2xl p-3"
        >
          <UserCard
            {...{
              isMaster: currentUser.nickname === roomInfo?.master,
              user: currentUser,
              stream: currentUserTrackEvent?.streams[i] || new MediaStream(),
              buttons: [
                currentUser.nickname !== roomInfo?.master &&
                currentUser.readyState ? (
                  <CardButton key={'ready'} text={'Ready'} />
                ) : (
                  <div key={'none'}></div>
                ),
              ],
            }}
          />
        </div>
      ))}
    </div>
  );
}
