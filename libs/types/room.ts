import { Dispatch } from 'react';

export interface RoomData {
  count: number;
  hintReady: boolean;
  hintTime: string;
  id: number;
  isRandom: '0' | '1';
  master: string;
  password: string;
  reasoningTime: string;
  roomState: string;
  roomUniqueId: string;
  title: string;
  userId: number;
  episode: EpisodeInfo;
}

export interface CurrentUser {
  email: string;
  id: number;
  imageUrl: string;
  nickname: string;
  password: string;
  platform: string;
  social: boolean;
  readyState: boolean;
  hintReady: boolean;
  streamId: string;
}

export interface UpdateRoomResponse {
  roomInfo: RoomData;
  currentUser: CurrentUser[];
}

export interface ImageData {
  id: string;
  x: number;
  y: number;
  isDropped: boolean;
  previewUrl: string;
}

export interface RoomState {
  roomInfo: RoomData | null;
  currentUsers: CurrentUser[];
  messageList: string[];
  imageList: ImageData[];
  boardImageList: ImageData[];
}

export type RoomStateAction =
  | {
      type: 'ROOM_INFO';
      payload: RoomData;
    }
  | {
      type: 'CURRENT_USERS';
      payload: CurrentUser[];
    }
  | {
      type: 'MESSAGE_LIST_PUSH';
      payload: string;
    }
  | {
      type: 'IMAGE_LIST';
      payload: ImageData[];
    }
  | {
      type: 'BOARD_IMAGE_LIST_PUSH';
      payload: ImageData;
    };
export type RoomContextType = [RoomState, Dispatch<RoomStateAction>];

export interface EpisodeInfo {
  title: string;
}
