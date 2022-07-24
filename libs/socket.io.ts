import { Dispatch } from 'react';
import { io } from 'socket.io-client';
import {
  CurrentUser,
  ImageData,
  RoomData,
  RoomStateAction,
  UpdateRoomResponse,
} from './types/room';
import { API_DOMAIN } from './api';

type SocketEmitData = { [k: string | number]: unknown };

const socket = io(API_DOMAIN, {
  transports: ['websocket'],
  closeOnBeforeunload: false,
});

const onlyMasterIsReady = (currentUsers: CurrentUser[], roomInfo: RoomData) =>
  currentUsers?.map(v =>
    v.nickname === roomInfo.master ? { ...v, readyState: true } : v,
  );

export const connectRoomSocket = (dispatch: Dispatch<RoomStateAction>) => {
  socket.on('update_room', ({ roomInfo, currentUser }: UpdateRoomResponse) => {
    dispatch({
      type: 'CURRENT_USERS',
      payload: onlyMasterIsReady(currentUser, roomInfo),
    });
    dispatch({ type: 'ROOM_INFO', payload: roomInfo });
  });

  socket.on('new_chat', ({ message }: { message: string }) => {
    dispatch({ type: 'MESSAGE_LIST_PUSH', payload: message });
  });

  socket.on('board_image', (imageInfo: ImageData) => {
    dispatch({ type: 'BOARD_IMAGE_LIST_PUSH', payload: imageInfo });
  });

  socket.on(
    'stream',
    ({
      roomInfo,
      currentUsers,
    }: {
      roomInfo: RoomData;
      currentUsers: CurrentUser[];
    }) => {
      dispatch({
        type: 'CURRENT_USERS',
        payload: onlyMasterIsReady(currentUsers, roomInfo),
      });

      console.log('streamId updated');
      console.log('currentUsers:', currentUsers);
    },
  );

  console.log('socket connected');
};

export const onAfterUpdatePeerConnection = (
  peerConnection: RTCPeerConnection,
  roomId: string,
) => {
  socket.on('user_connected', async () => {
    console.log('someone connected');
    const offer = await peerConnection.createOffer();
    peerConnection.setLocalDescription(offer);
    socket.emit('offer', { offer, roomId });
    console.log('sent offer:', offer);
  });

  socket.on('offer', async offer => {
    console.log('received offer:', offer);
    peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    peerConnection.setLocalDescription(answer);
    socket.emit('answer', { answer, roomId });
    console.log('sent answer:', answer);
  });

  socket.on('answer', answer => {
    console.log('received answer:', answer);
    peerConnection.setRemoteDescription(answer);
  });

  socket.on('ice', ice => {
    console.log('receive icecandidate:', ice);
    if (peerConnection && ice) peerConnection.addIceCandidate(ice);
  });
};

const emit = (e: string) => (data: SocketEmitData) => {
  console.log('socket emit:', e, ', data:', data);
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
export const streamEmit = emit('stream');

export const socketRemoveAllListeners = () => {
  socket.removeAllListeners();
};
