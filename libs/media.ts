import { Dispatch } from 'react';
import { RoomStateAction } from './types/room';
import { iceEmit } from './socket.io';

export type MediaKindType = 'VIDEO_INPUT' | 'AUDIO_INPUT' | 'AUDIO_OUTPUT';
type PeerConnectionOnIceCandidate = (
  this: RTCPeerConnection,
  ev: RTCPeerConnectionIceEvent,
) => any;
type PeerConnectionOnTrack = (
  this: RTCPeerConnection,
  ev: RTCTrackEvent,
) => any;

export const getMedia = async (
  constraints: MediaStreamConstraints = {
    audio: true,
    video: { facingMode: 'user' },
  },
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log('media_getMedia:', stream);
    return stream;
  } catch (e) {
    console.dir(e);
    if (e instanceof DOMException) {
      if (e.name === 'NotAllowedError') {
        alert('카메라와 마이크의 엑세스를 허용하고 다시 시도해주세요.');
      }
    }
  }
};

export const getMediaDevices = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log('media_getMediaDevices:', devices);
    return devices;
  } catch (e) {
    console.log(e);
  }
};

export const getConstraints = (
  stream: MediaStream,
  type: 'VIDEO' | 'AUDIO',
  deviceId: string,
) => {
  const videoConstraints = stream.getVideoTracks()[0].getConstraints();
  const audioConstraints = stream.getAudioTracks()[0].getConstraints();

  const constraints =
    type === 'VIDEO'
      ? {
          audio: audioConstraints,
          video: {
            ...audioConstraints,
            deviceId: { exact: deviceId },
          },
        }
      : {
          video: videoConstraints,
          audio: {
            ...videoConstraints,
            deviceId: { exact: deviceId },
          },
        };

  return constraints;
};

export const getSender = (
  peerConnection: RTCPeerConnection | null,
  type: 'VIDEO' | 'AUDIO',
) => {
  const senders = peerConnection?.getSenders();
  return senders?.find(
    sender => sender.track?.kind === type.toLocaleLowerCase(),
  );
};

export const makePeerConnection = (
  stream: MediaStream,
  dispatch: Dispatch<RoomStateAction>,
  roomId: number,
) => {
  const peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
  });
  peerConnection.onicecandidate = returnIceHandler(roomId);
  peerConnection.ontrack = returnTrackHandler(dispatch);
  stream?.getTracks().forEach(track => peerConnection.addTrack(track, stream));
  return peerConnection;
};

const returnIceHandler =
  (roomId: number): PeerConnectionOnIceCandidate =>
  data => {
    if (data.candidate) {
      console.log('media_sent icecandidate', data);
      iceEmit({ ice: data.candidate, roomId });
    }
  };

const returnTrackHandler =
  (dispatch: Dispatch<RoomStateAction>): PeerConnectionOnTrack =>
  data => {
    console.log('media_onTrack received data', data);
    dispatch({ type: 'CURRENT_USER_TRACK_EVENT', payload: data });
  };

export const initWebRTCConnect = async (
  roomId: number,
  dispatch: Dispatch<RoomStateAction>,
) => {
  const stream = await getMedia();
  const devices = await getMediaDevices();

  if (stream && devices) {
    const peerConnection = makePeerConnection(stream, dispatch, roomId);

    dispatch({ type: 'MY_STREAM', payload: stream });
    dispatch({ type: 'MY_DEVICES', payload: devices });
    dispatch({ type: 'MY_PEERCONNECTION', payload: peerConnection });
  }
};
