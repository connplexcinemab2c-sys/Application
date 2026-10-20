import {useState} from 'react';
import {TermsConditionsProps} from './termsConditions.interface';

const termsConditionsController = (): TermsConditionsProps => {
  const [loading, setLoading] = useState<boolean>(true);

  return {loading, setLoading};
};

export default termsConditionsController;
