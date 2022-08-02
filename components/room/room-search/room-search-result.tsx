import RoomList from '../../mainpage/room-list';
import { RoomSearchApiResponse } from './room-search';

export default function RoomSearchResult({
  searchResult,
}: {
  searchResult?: RoomSearchApiResponse;
}) {
  return (
    <div>
      {searchResult?.roomList.length ? (
        <div className="w-full h-[40vh]">
          <RoomList {...{ roomList: searchResult?.roomList, isSearch: true }} />
        </div>
      ) : (
        searchResult && <span>검색 결과가 없습니다.</span>
      )}
    </div>
  );
}
