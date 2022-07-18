import { Dispatch } from 'react';
import { io } from 'socket.io-client';
import { ImageData, RoomStateAction, UpdateRoomResponse } from '../types/room';
import { API_DOMAIN } from './api';

type SocketEmitData = { [k: string]: unknown };

const socket = io(API_DOMAIN, {
  transports: ['websocket'],
  closeOnBeforeunload: false,
});

export const connectRoomSocket = (dispatch: Dispatch<RoomStateAction>) => {
  socket.on('update_room', ({ roomInfo, currentUser }: UpdateRoomResponse) => {
    const onlyMasterIsReady = currentUser?.map(v =>
      v.nickname === roomInfo.master ? { ...v, readyState: true } : v,
    );

    dispatch({ type: 'CURRENT_USERS', payload: onlyMasterIsReady });
    dispatch({ type: 'ROOM_INFO', payload: roomInfo });
  });

  socket.on('new_chat', ({ message }: { message: string }) => {
    dispatch({ type: 'MESSAGE_LIST_PUSH', payload: message });
  });

  socket.on('board_image', (imageInfo: ImageData) => {
    dispatch({ type: 'BOARD_IMAGE_LIST_PUSH', payload: imageInfo });
  });
};

const emit = (e: string) => (data: SocketEmitData) => {
  socket.emit(e, data);
};

export const createRoom = emit('create_room');
export const joinRoom = emit('join_room');
export const exitRoom = emit('exit_room');
export const submitMessage = emit('submit_chat');
export const updateRoom = emit('update_room');
export const gameStart = emit('game_start');
export const gameReady = emit('ready_state');
export const hintRegister = emit('hint_register');
export const hintReady = emit('hint_ready');
export const hintTimeStart = emit('hint_start');
export const hintPostOnBoard = emit('hint_board');

export const socketRemoveAllListeners = () => {
  socket.removeAllListeners();
};
