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

export interface RoomState {
  roomInfo: RoomData | null;
  currentUsers: CurrentUser[];
  myStream: MediaStream | null;
  messageList: string[];
  peerConnection: RTCPeerConnection | null;
  video: { input: MediaState; output: MediaState };
  audio: { input: MediaState; output: MediaState };
  imageList: ImageData[];
  boardImageList: ImageData[];
  currentUserStreams: readonly MediaStream[];
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
      type: 'MY_STREAM';
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
    }
  | {
      type: 'CURRENT_USER_STREAMS';
      payload: readonly MediaStream[];
    };

export type RoomContextType = [RoomState, Dispatch<RoomStateAction>];

export interface EpisodeInfo {
  title: string;
}
