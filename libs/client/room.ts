import { atom } from 'recoil';
import { CurrentUser, ImageInfo, MediaState, RoomData } from '../types/room';
import { v1 } from 'uuid';

export const roomInfoState = atom<RoomData | null>({
  key: `roomInfo${v1()}`,
  default: null,
});

export const currentUsersState = atom<CurrentUser[]>({
  key: `currentUsers${v1()}`,
  default: [],
});

export const messageListState = atom<string[]>({
  key: `messageList${v1()}`,
  default: [],
});

export const myPeerConnectionState = atom<RTCPeerConnection | null>({
  key: `myPeerConnection${v1()}`,
  default: null,
});

export const streamState = atom<MediaStream | null>({
  key: `stream${v1()}`,
  default: null,
});

export const videoState = atom<MediaState>({
  key: `video${v1()}`,
  default: { devices: [], state: false },
});

export const imageListState = atom<ImageInfo[]>({
  key: `imageList${v1()}`,
  default: [],
});

export const boardImageListState = atom<ImageInfo[]>({
  key: `boardImageList${v1()}`,
  default: [],
});
