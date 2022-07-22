import { Reducer, useReducer, createContext } from 'react';
import {
  RoomContextType,
  RoomState,
  RoomStateAction,
} from '../../libs/types/room';

export const RoomContext = createContext<RoomContextType | null>(null);

export default function RoomProvider({ children }: { children: JSX.Element }) {
  const reducer: Reducer<RoomState, RoomStateAction> = (state, action) => {
    switch (action.type) {
      case 'ROOM_INFO':
        return { ...state, roomInfo: action.payload };

      case 'CURRENT_USERS':
        return { ...state, currentUsers: action.payload };

      case 'MESSAGE_LIST_PUSH':
        return {
          ...state,
          messageList: [...state.messageList, action.payload],
        };

      case 'IMAGE_LIST':
        return { ...state, imageList: action.payload };

      case 'BOARD_IMAGE_LIST_PUSH':
        return {
          ...state,
          boardImageList: [...state.boardImageList, action.payload],
        };

      case 'MY_STREAM':
        return { ...state, myStream: action.payload };

      case 'VIDEO_INPUT_DEVICES':
        return {
          ...state,
          video: {
            ...state.video,
            input: { ...state.video.input, devices: action.payload },
          },
        };
      case 'VIDEO_INPUT_STATE':
        return {
          ...state,
          video: {
            ...state.video,
            input: { ...state.video.input, state: action.payload },
          },
        };

      case 'AUDIO_INPUT_DEVICES':
        return {
          ...state,
          audio: {
            ...state.audio,
            input: { ...state.audio.input, devices: action.payload },
          },
        };
      case 'AUDIO_OUTPUT_DEVICES':
        return {
          ...state,
          audio: {
            ...state.audio,
            output: { ...state.audio.output, devices: action.payload },
          },
        };
      case 'AUDIO_INPUT_STATE':
        return {
          ...state,
          audio: {
            ...state.audio,
            input: { ...state.audio.input, state: action.payload },
          },
        };
      case 'AUDIO_OUTPUT_STATE':
        return {
          ...state,
          audio: {
            ...state.audio,
            output: { ...state.audio.output, state: action.payload },
          },
        };

      case 'PEER_CONNECTION':
        return {
          ...state,
          peerConnection: action.payload,
        };

      case 'CURRENT_USER_STREAMS':
        return {
          ...state,
          currentUserStreams: action.payload,
        };

      default:
        return state;
    }
  };

  const roomDispatch = useReducer(reducer, {
    roomInfo: null,
    myStream: null,
    messageList: [],
    peerConnection: null,
    currentUsers: [],
    video: {
      input: { devices: [], state: true },
      output: { devices: [], state: true },
    },
    audio: {
      input: { devices: [], state: true },
      output: { devices: [], state: true },
    },
    imageList: [],
    boardImageList: [],
    currentUserStreams: [],
  });

  return (
    <RoomContext.Provider value={roomDispatch}>{children}</RoomContext.Provider>
  );
}
