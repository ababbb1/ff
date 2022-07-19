import { Dispatch, SetStateAction } from 'react';
import { UserSession } from './user';

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
  episode: string;
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
  peerId: string;
}

export interface UpdateRoomResponse {
  roomInfo: RoomData;
  currentUser: CurrentUser[];
}

export interface MediaState {
  devices: MediaDeviceInfo[];
  state: boolean;
}

export interface ImageData {
  id: string;
  x: number;
  y: number;
  isDropped: boolean;
  previewUrl: string;
}

export interface PeerState {
  peerId: string;
  stream: MediaStream;
}

export interface RoomState {
  roomInfo: RoomData | null;
  currentUsers: CurrentUser[];
  stream: MediaStream | null;
  messageList: string[];
  peerConnection: RTCPeerConnection | null;
  video: { input: MediaState; output: MediaState };
  audio: { input: MediaState; output: MediaState };
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
      type: 'STREAM';
      payload: MediaStream;
    }
  | {
      type: 'VIDEO_INPUT_DEVICES';
      payload: MediaDeviceInfo[];
    }
  | {
      type: 'VIDEO_INPUT_STATE';
      payload: boolean;
    }
  | {
      type: 'AUDIO_INPUT_DEVICES';
      payload: MediaDeviceInfo[];
    }
  | {
      type: 'AUDIO_OUTPUT_DEVICES';
      payload: MediaDeviceInfo[];
    }
  | {
      type: 'AUDIO_INPUT_STATE';
      payload: boolean;
    }
  | {
      type: 'AUDIO_OUTPUT_STATE';
      payload: boolean;
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
      type: 'PEER_CONNECTION';
      payload: RTCPeerConnection;
    };

export type RoomContextType = [RoomState, Dispatch<RoomStateAction>];
