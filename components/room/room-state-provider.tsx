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

      default:
        return state;
    }
  };

  const roomDispatch = useReducer(reducer, {
    roomInfo: null,
    stream: null,
    messageList: [],
    peerConnection: null,
    currentUsers: [],
    video: {
      devices: [],
      state: false,
    },
    imageList: [],
    boardImageList: [],
  });

  return (
    <RoomContext.Provider value={roomDispatch}>{children}</RoomContext.Provider>
  );
}
