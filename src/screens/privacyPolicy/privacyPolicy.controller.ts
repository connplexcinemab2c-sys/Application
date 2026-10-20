import {useState} from 'react';
import {PrivacyPolicyProps} from './privacyPolicy.interface';

const privacyPolicyController = (): PrivacyPolicyProps => {
  const [loading, setLoading] = useState<boolean>(true);

  return {loading, setLoading};
};

export default privacyPolicyController;
