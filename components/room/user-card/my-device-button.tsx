import { ChevronDownIcon } from '@heroicons/react/outline';
import { useEffect, useRef } from 'react';
import useToggle from '../../../libs/hooks/useToggle';
import Mic from '../../svg/lobby/mic';
import Video from '../../svg/lobby/video';

interface Props {
  type: 'VIDEO' | 'AUDIO';
}

export default function MyDeviceButton({ type }: Props) {
  const [selecter, toggleSelecter] = useToggle();

  const selecterButtonRef = useRef<HTMLButtonElement>(null);
  const selecterRef = useRef<HTMLDivElement>(null);

  const symbolClassName = `w-4 h-4 2xl:w-6 2xl:h-6 ${
    'text-black'
    // device.input.state ? 'text-black' : 'text-red-600'
  }`;
  const symbol =
    type === 'VIDEO' ? (
      <Video className={symbolClassName} />
    ) : (
      <Mic className={symbolClassName} />
    );

  // const deviceKind = type === 'VIDEO' ? 'videoinput' : 'audioinput';

  // const handleDeviceButton = () => {
  //   if (myStream) {
  //     const tracks =
  //       type === 'VIDEO'
  //         ? myStream.getVideoTracks()
  //         : myStream.getAudioTracks();
  //     tracks.forEach(track => {
  //       track.enabled = !track.enabled;
  //     });
  //   }
  // };

  const handleSelecterButton = () => toggleSelecter();

  // const handleDeviceChange = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const deviceId = e.target.value;
  //   if (myStream) {
  //     const constraints = getConstraints(myStream, type, deviceId);
  //     const newStream = await getMedia(constraints);

  //     const track =
  //       type === 'VIDEO'
  //         ? newStream?.getVideoTracks()[0]
  //         : newStream?.getAudioTracks()[0];

  //     const sender = getSender(myPeerConnection, type);

  //     if (track && sender) {
  //       sender.replaceTrack(track);
  //     }

  //     if (newStream) {
  //       dispatch({ type: 'MY_STREAM', payload: newStream });
  //     }
  //   }
  // };

  const onDocumentClick = (e: MouseEvent) => {
    if (selecterButtonRef.current && selecterRef.current) {
      if (
        !e.composedPath().includes(selecterButtonRef.current) &&
        !e.composedPath().includes(selecterRef.current)
      ) {
        toggleSelecter(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, []);

  return (
    <div className="relative">
      <div className="flex h-8 2xl:h-10">
        <button
          // onClick={handleDeviceButton}
          className={`p-2 h-full rounded-l border ${
            'bg-gray-300 shadow-inner'
            // device.input.state ? 'bg-gray-300 shadow-inner' : 'bg-gray-200'
          }`}
        >
          {symbol}
        </button>
        <button
          ref={selecterButtonRef}
          onClick={handleSelecterButton}
          className="p-1 h-full rounded-r bg-gray-200"
        >
          <ChevronDownIcon
            className={`w-3 h-3 2xl:w-5 2xl:h-5 ${
              'text-black'
              // video.input.state ? 'text-black' : 'text-red-600'
            }`}
          />
        </button>
      </div>

      <div
        ref={selecterRef}
        className={`absolute top-0 right-0 -translate-y-[100%] translate-x-[50%] bg-gray-300 rounded transition-opacity duration-300 flex w-fit h-fit flex-col p-4 ${
          selecter ? 'opacity-100 z-10' : 'opacity-0 -z-10'
        }`}
      >
        {/* {myDevices
          .filter(device => device.kind === deviceKind)
          .map((device, index) => (
            <input
              type="radio"
              key={device.deviceId}
              id={device.deviceId}
              name={`${type}_INPUT`}
              value={device.deviceId}
              defaultChecked={index === 0}
              onChange={handleDeviceChange}
            />
          ))} */}
        {/* {type === 'AUDIO' &&
          device.output.devices.map((device, index) => (
            <input
              type="radio"
              key={device.deviceId}
              id={device.deviceId}
              name={`${device}_OUTPUT`}
              value={device.deviceId}
              defaultChecked={index === 0}
              onChange={handleDeviceChange('AUDIO_OUTPUT')}
            />
          ))} */}
      </div>
    </div>
  );
}
