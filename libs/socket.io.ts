import { Dispatch } from 'react';
import { io } from 'socket.io-client';
import {
  CurrentUser,
  IPeer,
  MessageInfo,
  RoomData,
  RoomStateAction,
  UpdateRoomResponse,
} from './types/room';
import { API_DOMAIN } from './api';
import { addPeer, createPeer } from './peer';
import { RoleInfo } from './types/game';

export type SocketEmitData = { [k: string | number]: unknown };
interface ImageURlList {
  userId: number;
  imageUrlLists: string;
  roomId: number;
}

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

  socket.on('new_chat', (messageInfo: MessageInfo) => {
    dispatch({ type: 'ADD_MESSAGE', payload: messageInfo });
  });

  // socket.on('hint_board', (imageInfo: ImageData) => {
  //   // dispatch({ type: 'BOARD_IMAGE_LIST_PUSH', payload: imageInfo });
  // });

  socket.on('role_info', (roles: RoleInfo[]) => {
    dispatch({ type: 'ROLE_INFO', payload: [roles[5], ...roles.slice(0, 5)] });
  });

  socket.on('board_image', (data: { imageUrlLists: ImageURlList[] }) => {
    const tmp = data.imageUrlLists.flatMap(x =>
      x.imageUrlLists
        .split(',')
        .map((y: string) => ({ userId: x.userId, imageId: y })),
    );
    dispatch({ type: 'BOARD_IMAGE_LIST', payload: tmp });
  });
};

export const afterUpdateStream = (
  userId: string,
  myStream: MediaStream,
  peers: IPeer[],
  dispatch: Dispatch<RoomStateAction>,
) => {
  socket.on('peers', ({ currentUser }: UpdateRoomResponse) => {
    if (myStream) {
      const peers = currentUser
        .filter(cUser => `${cUser.userId}` !== userId)
        .map(cUser => ({
          userId: `${cUser.userId}`,
          peer: createPeer(`${cUser.userId}`, myStream),
        }));
      dispatch({ type: 'PEERS', payload: peers });
    }
  });

  socket.on('peer_join', ({ signal, callerId }) => {
    const peer = addPeer(signal, callerId, userId, myStream);
    dispatch({ type: 'ADD_PEER', payload: { userId: callerId, peer } });
  });

  socket.on('receive_signal', ({ signal, id }) => {
    const item = peers.find(p => p.userId === id);
    if (item) {
      item.peer.signal(signal);
    }
  });
};

const emit = (e: string) => (data?: SocketEmitData) => {
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
export const getRoles = emit('role_info');
export const hintRoleChoiceTime = emit('role_choice_time');
export const choiceRole = emit('choice_role');
export const hintTimeStart = emit('hint_start');
export const hintPostOnBoard = emit('hint_board');
export const kickUser = emit('kick_user');
export const reasoningTime = emit('reasoning_time');
export const forceQuit = emit('force_quit');
export const gameEnd = emit('game_end');
export const imageList = emit('image_list');
export const boardImage = emit('board_image');
export const vote = emit('vote');

export const streamEmit = emit('stream');
export const peerJoin = emit('peer_join');
export const sendSignal = emit('send_signal');
export const returnSignal = emit('return_signal');

export const test = emit('test');

export const socketRemoveAllListeners = () => {
  socket.removeAllListeners();
};
