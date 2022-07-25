import { Dispatch } from 'react';
import { io } from 'socket.io-client';
import {
  CurrentUser,
  ImageData,
  IPeer,
  RoomData,
  RoomStateAction,
  UpdateRoomResponse,
} from './types/room';
import { API_DOMAIN } from './api';
import { addPeer, createPeer } from './peer';

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
    dispatch({ type: 'ROOM_INFO', payload: roomInfo });
    dispatch({
      type: 'CURRENT_USERS',
      payload: onlyMasterIsReady(currentUser, roomInfo),
    });
  });

  socket.on('new_chat', ({ message }: { message: string }) => {
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  });

  socket.on('board_image', (imageInfo: ImageData) => {
    dispatch({ type: 'BOARD_IMAGE_LIST_PUSH', payload: imageInfo });
  });
};

export const afterUpdateStream = (
  userId: string,
  myStream: MediaStream,
  peers: IPeer[],
  dispatch: Dispatch<RoomStateAction>,
) => {
  socket.on('peers', ({ currentUser }: UpdateRoomResponse) => {
    console.log(`socket on peers: ${currentUser}`);
    if (myStream) {
      const peers = currentUser
        .filter(cUser => `${cUser.id}` !== userId)
        .map(cUser => ({
          userId: `${cUser.id}`,
          peer: createPeer(`${cUser.id}`, myStream),
        }));
      dispatch({ type: 'PEERS', payload: peers });
    }
  });

  socket.on('peer_join', ({ signal, callerId }) => {
    console.log(
      `socket on peer_join: signal: ${signal}, callerId: ${callerId}`,
    );
    const peer = addPeer(signal, callerId, userId, myStream);
    dispatch({ type: 'ADD_PEER', payload: { userId: callerId, peer } });
  });

  socket.on('receive_signal', ({ signal, id }) => {
    console.log(`socket on receive_signal: signal: ${signal}, id: ${id}`);
    const item = peers.find(p => p.userId === id);
    if (item) {
      item.peer.signal(signal);
    }
  });
};

const emit = (e: string) => (data?: SocketEmitData) => {
  console.log(`socket emit ${e}: ${data}`);
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
export const kickUser = emit('kick_user');

export const peerJoin = emit('peer_join');
export const sendSignal = emit('send_signal');
export const returnSignal = emit('return_signal');

export const socketRemoveAllListeners = () => {
  socket.removeAllListeners();
};
