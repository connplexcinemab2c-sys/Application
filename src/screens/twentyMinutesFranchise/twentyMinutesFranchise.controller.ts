import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '../../navigation/stacks/authStack';
import {axiosInstance} from '../../services/api/api';
import {
  checkEmail,
  checkNumber,
  checkNameSpace,
} from '../../utility/validation/stringValidation';
import constant from '../../services/config/constant';
import {
  ErrorProps,
  TwentyMinutesFranchiseProps,
} from './twentyMinutesFranchise.interface';
import Snackbar from 'react-native-snackbar';
import validationMessage from '../../utility/validation/validationMessage';

const twentyMinutesFranchiseController = (): TwentyMinutesFranchiseProps => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [mobileNo, setMobileNo] = useState<string>();
  const [city, setCity] = useState<string>();
  const [checked, setChecked] = useState<boolean>(false);
  const [error, setError] = useState<ErrorProps>({
    name: undefined,
    email: undefined,
    mobileNo: undefined,
    city: undefined,
  });

  const navigation = useNavigation<AuthNavigationProps>();

  const onBack = (): void => {
    navigation.goBack();
  };

  const onCheck = (): void => {
    setChecked(!checked);
  };

  const validation = () => {
    let isValid = true;
    if (!name) {
      isValid = false;
      error.name = validationMessage?.emptyName;
    } else if (!checkNameSpace(name)) {
      isValid = false;
      error.name = validationMessage?.invalidName;
    } else if (name?.length < 2) {
      isValid = false;
      error.name = validationMessage?.nameLength;
    } else {
      error.name = undefined;
    }
    if (!email) {
      isValid = false;
      error.email = validationMessage?.emptyEmail;
    } else if (!checkEmail(email)) {
      isValid = false;
      error.email = validationMessage?.invalidEmail;
    } else {
      error.email = undefined;
    }
    if (!mobileNo) {
      isValid = false;
      error.mobileNo = validationMessage?.emptyMobile;
    } else if (!checkNumber(mobileNo)) {
      isValid = false;
      error.mobileNo = validationMessage?.invalidMobile;
    } else if (mobileNo == '0000000000') {
      isValid = false;
      error.mobileNo = validationMessage?.invalidMobile;
    } else {
      error.mobileNo = undefined;
    }
    if (!city) {
      isValid = false;
      error.city = validationMessage?.emptyCurrentCity;
    } else if (!checkNameSpace(city)) {
      isValid = false;
      error.city = validationMessage?.invalidCurrentCity;
    } else if (city?.length < 2) {
      isValid = false;
      error.city = validationMessage?.currentCityLength;
    } else {
      error.city = undefined;
    }
    setError({...error});
    if (isValid) {
      applyForFranchise();
    }
  };

  const applyForFranchise = async () => {
    /* API call for 20 minutes franchise  */
    setLoading(true);
    const formData = {
      name: name,
      email: email?.toLocaleLowerCase(),
      mobileNumber: mobileNo,
      city: city,
    };
    try {
      const {data} = await axiosInstance.post(
        constant.twentyMinutesFranchise,
        formData,
      );
      setLoading(false);
      navigation.goBack();
      Snackbar.show({text: data?.message});
    } catch (error: any) {
      setLoading(false);
      Snackbar.show({text: error?.response?.data?.message});
    }
  };

  return {
    onBack,
    loading,
    name,
    setName,
    email,
    setEmail,
    mobileNo,
    setMobileNo,
    city,
    setCity,
    error,
    validation,
    checked,
    onCheck,
  };
};

export default twentyMinutesFranchiseController;
