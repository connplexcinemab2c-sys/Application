import {useState} from 'react';

const loyaltyPointsController = () => {
  const [fill, setFill] = useState(50);

  return {fill};
};

export default loyaltyPointsController;
