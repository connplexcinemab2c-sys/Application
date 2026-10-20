import {useState} from 'react';
import {InputControllerProps, InputProps} from './input.interface';

const inputController = ({visible}: InputProps): InputControllerProps => {
  const [isVisible, setIsVisible] = useState<boolean>(
    visible ? visible : false,
  );

  const handleShow = (): void => {
    setIsVisible(!isVisible);
  };

  return {isVisible, handleShow};
};

export default inputController;
