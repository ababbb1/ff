import Peer from 'simple-peer';
import { returnSignal, sendSignal } from './socket.io';

export const getMedia = async (constraints?: {
  video: MediaTrackConstraints;
  audio: MediaTrackConstraints;
}) => {
  if (constraints) {
    return navigator.mediaDevices.getUserMedia(constraints);
  }
  return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
};

export const createPeer = (userId: string, stream: MediaStream) => {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream,
  });

  peer.on('signal', signal => {
    sendSignal({ userId, signal });
  });

  return peer;
};

export const addPeer = (
  incomingSignal: string | Peer.SignalData,
  callerId: string,
  userId: string,
  stream: MediaStream,
) => {
  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream,
  });

  peer.on('signal', signal => {
    returnSignal({ signal, callerId, userId });
  });

  peer.signal(incomingSignal);

  return peer;
};
