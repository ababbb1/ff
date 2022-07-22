import { CurrentUser } from '../../../libs/types/room';
import UserCard from '../user-card/user-card';

interface Props {
  currentUsersExceptMe: CurrentUser[];
  isMaster: boolean;
  currentUserStreams: readonly MediaStream[];
}

export default function CurrentUsers({
  currentUsersExceptMe,
  isMaster,
  currentUserStreams,
}: Props) {
  return (
    <div className="w-full h-full flex flex-col gap-[2px] overflow-hidden">
      {currentUsersExceptMe.map(currentUser => (
        <div
          key={currentUser.id}
          className="current-users-card w-full h-1/4 bg-gray-300 first:rounded-tl-2xl peer-last:rounded-br-2xl p-3"
        >
          <UserCard
            {...{
              isMaster,
              user: currentUser,
              stream:
                currentUserStreams.find(
                  stream => stream.id === currentUser.streamId,
                ) || new MediaStream(),
            }}
          />
        </div>
      ))}
    </div>
  );
}
