import { Session } from 'next-auth';
import { Dispatch } from 'react';
import { EpisodeInfo, RoleInfo } from './game';

export interface RoomData {
  count: number;
  hintReady: boolean;
  hintTime: string;
  id: number;
  isRandom: '0' | '1';
  master: string;
  password?: string;
  reasoningTime: string;
  roomState:
    | 'standby'
    | 'hintTime'
    | 'hintReady'
    | 'reasoningTime'
    | 'roleChoice';
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
  episodeId: number;
}

export interface MessageInfo {
  message: string;
  user: Session;
  at: string;
}

export interface UpdateRoomResponse {
  roomInfo: RoomData;
  currentUser: CurrentUser[];
}

export interface ImageData {
  id: string | null;
  userId: number;
  x: number;
  y: number;
  isDropped: boolean;
  previewUrl: string;
}

export interface IPeer {
  userId: string;
  peer: any;
}

export interface StreamInfo {
  stream: MediaStream | null;
  videoDeviceId: string;
  audioDeviceId: string;
  videoTrackconstraints: MediaTrackConstraints;
  audioTrackconstraints: MediaTrackConstraints;
}

export interface RoomState {
  roomInfo: RoomData | null;
  currentUsers: CurrentUser[];
  messageList: MessageInfo[];
  imageList: ImageData[];
  boardImageList: ImageData[];
  myStreamInfo: StreamInfo;
  peers: IPeer[];
  roles: RoleInfo[];
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
      type: 'CLEAR_MESSAGE';
      payload: MessageInfo[];
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
      type: 'MY_STREAM_INFO';
      payload: StreamInfo;
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
    }
  | {
      type: 'ROLE_INFO';
      payload: RoleInfo[];
    };

export type RoomContextType = [RoomState, Dispatch<RoomStateAction>];
