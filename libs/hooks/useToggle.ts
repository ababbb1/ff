import { useState } from 'react';

export type ToggleHandler = (value?: boolean) => void;

export default function useToggle(
  defaultValue?: boolean,
): [boolean, ToggleHandler] {
  const [value, setValue] = useState(defaultValue || false);

  const toggleValue = (value?: boolean) => {
    if (value === undefined) setValue(prev => !prev);
    else setValue(value);
  };

  return [value, toggleValue];
}
