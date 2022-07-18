import { ChangeEvent, useState } from 'react';

export default function useInput(
  defaultValue: string = '',
  predicates?: Array<(value: string) => boolean>,
) {
  const [value, setValue] = useState(defaultValue);

  let isError = false;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    if (predicates) {
      predicates.forEach(fn => {
        isError = !fn(value);
      });
    }

    setValue(value);
  };

  const clear = () => {
    setValue('');
  };

  return { value, onChange, clear, isError };
}
