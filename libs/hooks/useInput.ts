import { ChangeEvent, useState } from 'react';

export default function useInput(
  defaultValue = '',
  predicates?: Array<(value: string) => boolean>,
) {
  const [value, setValue] = useState(defaultValue);
  const [isError, setIsError] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    if (predicates) {
      predicates.forEach(fn => {
        if (!fn(value)) {
          setIsError(true);
        }
      });
    }

    setValue(value);
  };

  const clear = () => {
    setValue('');
  };

  return { value, onChange, clear, isError };
}
