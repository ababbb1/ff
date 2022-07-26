import { Dispatch } from 'react';
import { UserSession } from './user';

export interface RoomData {
  count: number;
  hintReady: boolean;
  hintTime: string;
  id: number;
  isRandom: '0' | '1';
  master: string;
  password?: string;
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
  userId: number;
}

export interface MessageInfo {
  message: string;
  user: UserSession;
  at: string;
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

export interface IPeer {
  userId: string;
  peer: any;
}

export interface RoomState {
  roomInfo: RoomData | null;
  currentUsers: CurrentUser[];
  messageList: MessageInfo[];
  imageList: ImageData[];
  boardImageList: ImageData[];
  myStream: MediaStream | null;
  peers: IPeer[];
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
      type: 'ADD_MESSAGE';
      payload: MessageInfo;
    }
  | {
      type: 'SHIFT_MESSAGE';
    }
  | {
      type: 'IMAGE_LIST';
      payload: ImageData[];
    }
  | {
      type: 'BOARD_IMAGE_LIST_PUSH';
      payload: ImageData;
    }
  | {
      type: 'MY_STREAM';
      payload: MediaStream;
    }
  | {
      type: 'PEERS';
      payload: IPeer[];
    }
  | {
      type: 'ADD_PEER';
      payload: IPeer;
    };

export type RoomContextType = [RoomState, Dispatch<RoomStateAction>];

export interface EpisodeInfo {
  title: string;
  description: string;
}
