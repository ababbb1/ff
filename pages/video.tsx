import { useEffect, useRef, useState } from 'react';

interface DeviceState {
  devices: MediaDeviceInfo[];
  state: boolean;
}

export default function Video() {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream>();
  const [audioState, setAudioState] = useState<DeviceState>({
    devices: [],
    state: true,
  });
  const [videoState, setVideoState] = useState<DeviceState>({
    devices: [],
    state: true,
  });

  const getMedia = async (deviceId?: string) => {
    const userMediaDevices = navigator.mediaDevices;
    const streamConstraints = deviceId
      ? {
          audio: true,
          video: { facingMode: 'user', deviceId: { exact: deviceId } },
        }
      : { audio: true, video: { facingMode: 'user' } };

    const stream = await userMediaDevices.getUserMedia(streamConstraints);

    const devices = await userMediaDevices.enumerateDevices();
    const cameras = devices.filter(device => device.kind === 'videoinput');

    return { stream, cameras };
  };

  const toggleState = (type: 'audio' | 'video') => {
    if (stream) {
      if (type === 'audio') {
        stream
          .getAudioTracks()
          .forEach(track => (track.enabled = !track.enabled));
        setAudioState({ ...audioState, state: !audioState.state });
      } else {
        stream
          .getVideoTracks()
          .forEach(track => (track.enabled = !track.enabled));
        setVideoState({ ...videoState, state: !videoState.state });
      }
    }
  };

  const selectDeviceHandler = async (
    type: 'audio' | 'video',
    deviceId: string,
  ) => {
    if (type === 'audio') return;
    else {
      if (deviceId) await getMedia(deviceId);
    }
  };

  useEffect(() => {
    getMedia()
      .then(({ stream, cameras }) => {
        if (myVideoRef.current && stream) myVideoRef.current.srcObject = stream;
        setStream(stream);
        setVideoState({
          ...videoState,
          devices: cameras,
        });
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      <div>
        <video ref={myVideoRef} autoPlay playsInline width={400} height={400} />
        {audioState.state ? (
          <button onClick={() => toggleState('audio')}>마이크 끄기</button>
        ) : (
          <button onClick={() => toggleState('audio')}>마이크 켜기</button>
        )}
        {videoState.state ? (
          <button onClick={() => toggleState('video')}>비디오 끄기</button>
        ) : (
          <button onClick={() => toggleState('video')}>비디오 켜기</button>
        )}
      </div>

      <div>
        <span>카메라</span>
        <select onChange={e => selectDeviceHandler('video', e.target.value)}>
          {videoState.devices.map(v => (
            <option key={v.deviceId} value={v.deviceId}>
              {v.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
