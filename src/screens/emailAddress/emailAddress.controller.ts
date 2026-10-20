import {useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../navigation/stacks/authStack';
import axiosInstance from '../../services/api';
import {
  checkEmail,
  checkMobileNumber,
} from '../../utility/validation/stringValidation';
import constant from '../../services/config/constant';
import params from '../../services/config/params';
import validationMessage from '../../utility/validation/validationMessage';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';

const emailAddressController = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const {userData, token} = useAppSelector(state => state.UserReducer);
  const route: any = useRoute<RouteProp<AuthParams, 'emailAddress'>>();
  const isMobile = route?.params?.name == 'mobile';
  const [mobile, setMobile] = useState<string>(
    isMobile ? userData?.mobileNumber?.toString() : userData?.email,
  );
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleValidation = (): void => {
    let isValid = true;
    if (!mobile?.trim()) {
      isValid = false;
      setError(
        isMobile
          ? validationMessage.emptyMobileNo
          : validationMessage.emptyEmail,
      );
    } else if (isMobile ? !checkMobileNumber(mobile) : !checkEmail(mobile)) {
      isValid = false;
      setError(
        isMobile
          ? validationMessage.invalidMobileNo
          : validationMessage.invalidEmail,
      );
    } else if (isMobile && mobile == '0000000000') {
      isValid = false;
      setError(validationMessage.invalidMobileNo);
    } else {
      setError('');
    }
    if (isValid) {
      onEdit();
    }
  };

  const onEdit = async () => {
    /* API call for updating email or mobile number */
    setLoading(true);
    try {
      const formData = {
        [isMobile ? params.mobileNumber : params.email]: mobile,
      };
      const {data} = await axiosInstance.post(
        isMobile ? constant.editMobilenumber : constant.editEmail,
        formData,
        {
          headers: {
            auth: `${token}`,
          },
        },
      );
      setLoading(false);
      Snackbar.show({text: data?.message});
      setError('');
      if (data?.status == 200 || data?.status == 201) {
        setMobile('');
        navigation.navigate('signupOtp', {
          data: data,
          number: mobile,
          flag: isMobile ? 'editMobile' : 'editEmail',
        });
      }
    } catch (e: any) {
      if (e?.response?.status != 409) {
        setMobile('');
      }
      setError('');
      setLoading(false);
      Snackbar.show({text: e?.response?.data?.message ?? e?.message});
    }
  };

  return {
    loading,
    mobile,
    setMobile,
    error,
    handleValidation,
    isMobile,
    userData,
  };
};

export default emailAddressController;
