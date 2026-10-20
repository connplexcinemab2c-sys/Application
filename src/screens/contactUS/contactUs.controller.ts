import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ErrorProps, contactUsProps } from './contactUs.interface';
import {
  StringValidation,
  checkEmail,
  checkMobileNumber,
  checkNameSpace,
} from '../../utility/validation/stringValidation';
import validationMessage from '../../utility/validation/validationMessage';
import params from '../../services/config/params';
import axiosInstance from '../../services/api';
import constant from '../../services/config/constant';
import Snackbar from 'react-native-snackbar';
import { AuthNavigationProps } from '../../navigation/stacks/authStack';
import { Keyboard } from 'react-native';

const contactUsController = (): contactUsProps => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [mobileNumber, setMobileNumber] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorProps>({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    message: undefined,
    mobileNumber: undefined,
  });
  const navigation = useNavigation<AuthNavigationProps>();

  const validation = (): void => {
    /* Contact us form validation */
    Keyboard.dismiss();
    let isValid = true;
    if (!firstName) {
      isValid = false;
      error.firstName = validationMessage.emptyFirstName;
    } else if (!checkNameSpace(firstName)) {
      isValid = false;
      error.firstName = validationMessage.invalidaFirstName;
    } else if (firstName?.length < 2) {
      isValid = false;
      error.firstName = validationMessage.firstNameLength;
    } else {
      error.firstName = undefined;
    }
    if (!lastName) {
      isValid = false;
      error.lastName = validationMessage.emptyLatsName;
    } else if (!checkNameSpace(lastName)) {
      isValid = false;
      error.lastName = validationMessage.invalidLastName;
    } else if (lastName?.length < 2) {
      isValid = false;
      error.lastName = validationMessage.lastNameLength;
    } else {
      error.lastName = undefined;
    }
    if (!email) {
      isValid = false;
      error.email = validationMessage.emptyEmail;
    } else if (!checkEmail(email)) {
      isValid = false;
      error.email = validationMessage.invalidEmail;
    } else {
      error.email = undefined;
    }
    if (!mobileNumber) {
      isValid = false;
      error.mobileNumber = validationMessage.emptyMobile;
    } else if (
      !checkMobileNumber(mobileNumber) ||
      parseInt(mobileNumber) === 0
    ) {
      isValid = false;
      error.mobileNumber = validationMessage.invalidMobile;
    } else {
      error.mobileNumber = undefined;
    }
    if (!message) {
      isValid = false;
      error.message = validationMessage.emptyChatRenterMessage;
    } else if (!StringValidation(message)) {
      isValid = false;
      error.message = validationMessage.invalidMessage;
    } else {
      error.message = undefined;
    }
    setError({ ...error });
    if (isValid) {
      onContactUs();
    }
  };

  const onContactUs = async () => {
    /* API call for contact us */
    try {
      const formData = {
        [params.email]: email,
        [params.firstName]: firstName,
        [params.lastName]: lastName,
        [params.message]: message,
        [params.mobileNumber]: mobileNumber,
      };
      setLoading(true);
      const { data } = await axiosInstance.post(constant.contact, formData);
      setLoading(false);
      Snackbar.show({ text: data?.message });
      setEmail('');
      setFirstName('');
      setLastName('');
      setMobileNumber('');
      setMessage('');
      navigation.navigate('bottom');
    } catch (e: any) {
      setLoading(false);
      Snackbar.show({ text: e?.response?.data?.message });
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    mobileNumber,
    setMobileNumber,
    message,
    setMessage,
    loading,
    setLoading,
    error,
    validation,
  };
};

export default contactUsController;
