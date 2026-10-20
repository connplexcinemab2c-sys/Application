import {SessionOutHooks} from './sessionOut.interface';
import {useNavigation} from '@react-navigation/native';
import {logoutSuccess} from '../../services/config/redux/userReducer/action';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import screenName from '../../navigation/screenName';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/config/redux/useReduxHooks';

const SessionOutController = (): SessionOutHooks => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {loginType} = useAppSelector(state => state.UserReducer);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      const data = await GoogleSignin.signOut();
    } catch (error: any) {
      // Snackbar.show({text: error});
    }
  };

  const logout = () => {
    dispatch(logoutSuccess());
    if (loginType === 'google') {
      signOut();
    }
    navigation.navigate(screenName.bottom);
  };

  return {logout};
};

export default SessionOutController;
