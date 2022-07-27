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

      case 'ADD_MESSAGE':
        return {
          ...state,
          messageList: [...state.messageList, action.payload],
        };

      case 'SHIFT_MESSAGE':
        return {
          ...state,
          messageList: state.messageList.slice(1, state.messageList.length - 1),
        };

      case 'IMAGE_LIST':
        return { ...state, imageList: action.payload };

      case 'BOARD_IMAGE_LIST_PUSH':
        return {
          ...state,
          boardImageList: [...state.boardImageList, action.payload],
        };

      case 'MY_STREAM_INFO':
        return {
          ...state,
          myStreamInfo: action.payload,
        };
      case 'MY_STREAM':
        return {
          ...state,
          myStreamInfo: { ...state.myStreamInfo, stream: action.payload },
        };

      case 'PEERS':
        return {
          ...state,
          peers: action.payload,
        };

      case 'ADD_PEER':
        return {
          ...state,
          peers: [...state.peers, action.payload],
        };

      default:
        return state;
    }
  };

  const roomDispatch = useReducer(reducer, {
    roomInfo: null,
    messageList: [],
    currentUsers: [],
    imageList: [],
    boardImageList: [],
    myStreamInfo: {
      stream: null,
      videoDeviceId: '',
      audioDeviceId: '',
      videoTrackconstraints: {},
      audioTrackconstraints: {},
    },
    peers: [],
  });

  return (
    <RoomContext.Provider value={roomDispatch}>{children}</RoomContext.Provider>
  );
}
