import {useState} from 'react';
import {AboutUsProps} from './aboutUs.interface';

const aboutUsController = (): AboutUsProps => {
  const [loading, setLoading] = useState<boolean>(true);

  return {loading, setLoading};
};

export default aboutUsController;
