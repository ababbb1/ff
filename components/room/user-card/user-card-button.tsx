import Mic from '../../svg/lobby/mic';
import { ChevronDownIcon } from '@heroicons/react/outline';
import useToggle from '../../../libs/hooks/useToggle';
import { ChangeEvent, useEffect, useRef } from 'react';
import Video from '../../svg/lobby/video';

interface Props {
  onClick: () => void;
  state: 'on' | 'off';
  video?: { input: MediaState; output: MediaState };
  audio?: { input: MediaState; output: MediaState };
  // onMediaDeviceChange: (
  //   type: <MediaKindType></MediaKindType>,
  // ) => (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function UserCardButton({
  onClick,
  state,
  video,
  audio,
  // onMediaDeviceChange,
}: Props) {
  const [deviceListSelecterState, toggleDeviceListSelecterState] = useToggle();
  const refContainer = useRef<HTMLDivElement>(null);
  const selecterRefContainer = useRef<HTMLButtonElement>(null);

  const handleDeviceSelecterButton = () => toggleDeviceListSelecterState();

  const handleTabClick = (e: MouseEvent) => {
    if (refContainer.current && selecterRefContainer.current) {
      if (
        !e.composedPath().includes(refContainer.current) &&
        !e.composedPath().includes(selecterRefContainer.current)
      ) {
        toggleDeviceListSelecterState(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleTabClick);
    return () => document.removeEventListener('click', handleTabClick);
  }, []);

  return (
    <div className="h-full flex items-center relative">
      <button
        onClick={onClick}
        className={`p-2 w-full h-full rounded-l border ${
          state === 'on' ? 'bg-gray-300 shadow-inner' : 'bg-gray-200'
        }`}
      >
        {video ? (
          <Video
            className={`w-4 h-4 2xl:w-6 2xl:h-6 ${
              state === 'on' ? 'text-black' : 'text-red-600'
            }`}
          />
        ) : (
          <Mic
            className={`w-4 h-4 2xl:w-6 2xl:h-6 ${
              state === 'on' ? 'text-black' : 'text-red-600'
            }`}
          />
        )}
      </button>
      <button
        ref={selecterRefContainer}
        onClick={handleDeviceSelecterButton}
        className="p-1 w-full h-full rounded-r bg-gray-200"
      >
        <ChevronDownIcon
          className={`w-3 h-3 2xl:w-5 2xl:h-5 ${
            state === 'on' ? 'text-black' : 'text-red-600'
          }`}
        />
      </button>

      <div
        ref={refContainer}
        className={`absolute top-0 right-0 -translate-y-[100%] translate-x-[50%] bg-gray-300 rounded transition-opacity duration-300 flex w-fit h-fit flex-col p-4 ${
          deviceListSelecterState ? 'opacity-100 z-10' : 'opacity-0 -z-10'
        }`}
      >
        {video?.input.devices.map((v, i) => (
          <input
            type="radio"
            key={v.deviceId}
            id={v.deviceId}
            name={'VIDEO_INPUT'}
            value={v.deviceId}
            defaultChecked={i === 0}
            onChange={onMediaDeviceChange('VIDEO_INPUT')}
          />
        ))}
        {audio?.input.devices.map((v, i) => (
          <input
            type="radio"
            key={v.deviceId}
            id={v.deviceId}
            name={'AUDIO_INPUT'}
            value={v.deviceId}
            defaultChecked={i === 0}
            onChange={onMediaDeviceChange('AUDIO_INPUT')}
          />
        ))}
        {audio?.output.devices.map((v, i) => (
          <input
            type="radio"
            key={v.deviceId}
            id={v.deviceId}
            name={'AUDIO_OUTPUT'}
            value={v.deviceId}
            defaultChecked={i === 0}
            onChange={onMediaDeviceChange('AUDIO_OUTPUT')}
          />
        ))}

        {video ? (
          <div>
            <span>Select Camera</span>
            <ul>
              {video.input.devices.map(v => (
                <li key={v.deviceId}>
                  <label htmlFor={v.deviceId}>{v.label}</label>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <span>Select microphone</span>
            <ul>
              {audio?.input.devices.map(v => (
                <li key={v.deviceId}>
                  <label htmlFor={v.deviceId}>{v.label}</label>
                </li>
              ))}
            </ul>
            <span>Select speaker</span>
            <ul>
              {audio?.output.devices.map(v => (
                <li key={v.deviceId}>
                  <label htmlFor={v.deviceId}>{v.label}</label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
