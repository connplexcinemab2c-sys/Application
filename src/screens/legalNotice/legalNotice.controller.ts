import {useState} from 'react';
import {LegalNoticeProps} from './legalNotice.interface';

const legalNoticeController = (): LegalNoticeProps => {
  const [loading, setLoading] = useState<boolean>(true);

  return {loading, setLoading};
};

export default legalNoticeController;
