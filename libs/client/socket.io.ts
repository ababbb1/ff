import { Dispatch } from 'react';
import { io } from 'socket.io-client';
import {
  ImageData,
  RoomState,
  RoomStateAction,
  UpdateRoomResponse,
} from '../types/room';
import { API_DOMAIN } from './api';

type SocketEmitData = { [k: string | number]: unknown };

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

export const onAfterUpdatePeerConnection = (
  peerConnection: RTCPeerConnection,
  roomId: string,
) => {
  socket.on('user_connected', async () => {
    const offer = await peerConnection.createOffer();
    peerConnection.setLocalDescription(offer);
    socket.emit('offer', { offer, roomId });
  });

  socket.on('offer', async offer => {
    peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    peerConnection.setLocalDescription(answer);
    socket.emit('answer', { answer, roomId });
  });

  socket.on('answer', answer => {
    peerConnection.setRemoteDescription(answer);
  });

  socket.on('ice', ice => {
    if (peerConnection) peerConnection.addIceCandidate(ice);
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
export const iceEmit = emit('ice');

export const socketRemoveAllListeners = () => {
  socket.removeAllListeners();
};
