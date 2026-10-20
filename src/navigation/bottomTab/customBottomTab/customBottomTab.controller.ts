import {useNavigation} from '@react-navigation/native';
import {bottomTabControllerProps} from './customBottomTab.interface';
import {useState} from 'react';
import screenName from '../../screenName';
import {useAppSelector} from '../../../services/config/redux/useReduxHooks';

const bottomTabController = (): bottomTabControllerProps => {
  const {token} = useAppSelector(state => state.UserReducer);
  const navigation = useNavigation<any>();
  const [visible, setVisible] = useState(false);

  const onAccount = () => {
    if (!token) {
      setVisible(true);
    } else {
      navigation?.navigate(screenName.account);
    }
  };

  return {onAccount, visible, setVisible};
};

export default bottomTabController;
