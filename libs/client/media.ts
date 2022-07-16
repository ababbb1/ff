export const getMedia = async (videoDeviceId?: string) => {
  const userMediaDevices = navigator.mediaDevices;
  const streamConstraints = videoDeviceId
    ? {
        audio: false,
        video: { facingMode: 'user', deviceId: { exact: videoDeviceId } },
      }
    : { audio: false, video: { facingMode: 'user' } };

  const stream = await userMediaDevices.getUserMedia(streamConstraints);
  const devices = await userMediaDevices.enumerateDevices();
  const cameras = devices.filter(device => device.kind === 'videoinput');

  return { stream, cameras };
};

export const toggleMediaState = (
  stream: MediaStream,
  type: 'audio' | 'video',
) => {
  if (type === 'audio') {
    stream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
  } else {
    stream.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
  }
};

export const getDevice = async (type: 'audio' | 'video', deviceId: string) => {
  if (type === 'audio') return;
  else {
    if (deviceId) await getMedia(deviceId);
  }
};
