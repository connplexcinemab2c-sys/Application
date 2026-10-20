/**
 * First value is for getting value / reading value from state
 * Second value is for update value based on key in state
 * Third value is for reset state to defaultValue
 * Forth value is for set state value using `...` operator
 */

import {useState} from 'react';

export const useAppState = <T extends object>(defaultValue: T) => {
  const [state, setState] = useState<T>(defaultValue);
  const resetState = () => setState(defaultValue);
  const updateState = <K extends keyof T>(key: K, value: T[K]) => {
    setState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  return [state, updateState, resetState, setState] as const;
};

export default useAppState;
