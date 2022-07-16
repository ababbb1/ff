import Peer from 'peerjs';
import React from 'react';

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
}

export interface UpdateRoomResponse {
  roomInfo: RoomData;
  currentUser: CurrentUser[];
}

export interface MediaState {
  devices: MediaDeviceInfo[];
  state: boolean;
}

export interface ImageInfo {
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
