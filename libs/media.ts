import { Dispatch } from 'react';
import { RoomState, RoomStateAction } from './types/room';
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
  dispatch: Dispatch<RoomStateAction>,
  constraints: MediaStreamConstraints = {
    audio: true,
    video: { facingMode: 'user' },
  },
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    dispatch({ type: 'MY_STREAM', payload: stream });
    getMediaDevices(dispatch);
  } catch (e) {
    console.log(e);
  }
};

export const getMediaDevices = async (dispatch: Dispatch<RoomStateAction>) => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoInputDevices = devices.filter(v => v.kind === 'videoinput');
    const audioInputDevices = devices.filter(v => v.kind === 'audioinput');
    const audioOutputDevices = devices.filter(v => v.kind === 'audiooutput');

    dispatch({
      type: 'VIDEO_INPUT_DEVICES',
      payload: videoInputDevices,
    });
    dispatch({
      type: 'AUDIO_INPUT_DEVICES',
      payload: audioInputDevices,
    });
    dispatch({
      type: 'AUDIO_OUTPUT_DEVICES',
      payload: audioOutputDevices,
    });
  } catch (e) {
    console.log(e);
  }
};

export const mediaOnOffToggle = (
  state: RoomState,
  dispatch: Dispatch<RoomStateAction>,
  type: 'VIDEO_INPUT' | 'AUDIO_INPUT',
) => {
  const { myStream, video, audio } = state;

  if (myStream) {
    const tracks =
      type === 'VIDEO_INPUT'
        ? myStream.getVideoTracks()
        : myStream.getAudioTracks();

    tracks.forEach(track => {
      track.enabled = !track.enabled;
    });

    dispatch({ type: 'MY_STREAM', payload: myStream });

    dispatch({
      type: `${type}_STATE`,
      payload: type === 'VIDEO_INPUT' ? !video.input.state : !audio.input.state,
    });
  }
};

export const mediaDeviceChange = (
  stream: MediaStream,
  dispatch: Dispatch<RoomStateAction>,
  type: MediaKindType,
  deviceId: string,
) => {
  const prevVideoConstraints = stream.getVideoTracks()[0].getConstraints();
  const prevAudioConstraints = stream.getAudioTracks()[0].getConstraints();

  const constraints =
    type === 'VIDEO_INPUT'
      ? {
          audio: prevAudioConstraints,
          video: {
            ...prevVideoConstraints,
            deviceId: { exact: deviceId },
          },
        }
      : {
          video: prevVideoConstraints,
          audio: {
            ...prevAudioConstraints,
            deviceId: { exact: deviceId },
          },
        };

  getMedia(dispatch, constraints);
};

export const makePeerConnection = (
  initRoomId: string,
  stream: MediaStream,
  dispatch: Dispatch<RoomStateAction>,
) => {
  const peerConnection = new RTCPeerConnection();

  peerConnection.onicecandidate = returnIceHandler(initRoomId);
  peerConnection.ontrack = returnOnTrack(dispatch);

  stream?.getTracks().forEach(track => peerConnection.addTrack(track, stream));
  dispatch({ type: 'PEER_CONNECTION', payload: peerConnection });
};

const returnIceHandler =
  (roomId: string): PeerConnectionOnIceCandidate =>
  data => {
    console.log('ice emit');
    if (data.candidate) iceEmit({ ice: data.candidate, roomId });
  };

const returnOnTrack =
  (dispatch: Dispatch<RoomStateAction>): PeerConnectionOnTrack =>
  data => {
    console.log('got an event from my peer');
    console.log(data);
    dispatch({ type: 'CURRENT_USER_STREAMS', payload: data.streams });
  };
