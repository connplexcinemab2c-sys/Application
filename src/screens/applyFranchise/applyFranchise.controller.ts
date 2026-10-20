import {useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';
import {ApplyFranchiseProps, ErrorProps} from './applyFranchise.interface';
import {AuthNavigationProps} from '../../navigation/stacks/authStack';
import axiosInstance from '../../services/api';
import {
  checkEmail,
  checkMobileNumber,
  checkCompanyName,
  checkNameSpace,
} from '../../utility/validation/stringValidation';
import constant from '../../services/config/constant';
import params from '../../services/config/params';
import validationMessage from '../../utility/validation/validationMessage';
import {Keyboard} from 'react-native';

const applyFranchiseController = (): ApplyFranchiseProps => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [cityData, setCityData] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [error, setError] = useState<ErrorProps>({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    mobileNumber: undefined,
    state: undefined,
    cityData: undefined,
    jobTitle: undefined,
    company: undefined,
  });

  const navigation = useNavigation<AuthNavigationProps>();

  const handleValidation = (): void => {
    /* This code block is performing validation checks on the input fields of a apply for franchise form.*/
    Keyboard.dismiss();
    let isValidate = true;
    if (!firstName) {
      isValidate = false;
      error.firstName = validationMessage.emptyFirstName;
    } else if (!checkNameSpace(firstName)) {
      isValidate = false;
      error.firstName = validationMessage.invalidaFirstName;
    } else if (firstName?.length < 2) {
      isValidate = false;
      error.firstName = validationMessage.firstNameLength;
    } else {
      error.firstName = undefined;
    }
    if (!lastName) {
      isValidate = false;
      error.lastName = validationMessage.emptyLatsName;
    } else if (!checkNameSpace(lastName)) {
      isValidate = false;
      error.lastName = validationMessage.invalidLastName;
    } else if (lastName?.length < 2) {
      isValidate = false;
      error.lastName = validationMessage.lastNameLength;
    } else {
      error.lastName = undefined;
    }
    if (!email) {
      isValidate = false;
      error.email = validationMessage.emptyEmail;
    } else if (!checkEmail(email)) {
      isValidate = false;
      error.email = validationMessage.invalidEmail;
    } else {
      error.email = undefined;
    }
    if (!mobileNumber) {
      isValidate = false;
      error.mobileNumber = validationMessage.emptyMobile;
    } else if (!checkMobileNumber(mobileNumber)) {
      isValidate = false;
      error.mobileNumber = validationMessage.invalidMobile;
    } else if (mobileNumber == '0000000000') {
      isValidate = false;
      error.mobileNumber = validationMessage.invalidMobile;
    } else {
      error.mobileNumber = undefined;
    }
    if (!state) {
      isValidate = false;
      error.state = validationMessage.emptyState;
    } else if (!checkNameSpace(state)) {
      isValidate = false;
      error.state = validationMessage.invalidState;
    } else if (state?.length < 2) {
      isValidate = false;
      error.state = validationMessage.stateLength;
    } else {
      error.state = undefined;
    }
    if (!cityData) {
      isValidate = false;
      error.cityData = validationMessage.emptyCity;
    } else if (!checkNameSpace(cityData)) {
      isValidate = false;
      error.cityData = validationMessage.invalidCity;
    } else if (cityData?.length < 2) {
      isValidate = false;
      error.cityData = validationMessage.cityLength;
    } else {
      error.cityData = undefined;
    }
    if (!jobTitle) {
      isValidate = false;
      error.jobTitle = validationMessage.emptyJobTitle;
    } else if (!checkNameSpace(jobTitle)) {
      isValidate = false;
      error.jobTitle = validationMessage.invalidJobTitle;
    } else if (jobTitle?.length < 2) {
      isValidate = false;
      error.jobTitle = validationMessage.jobTitleLength;
    } else {
      error.jobTitle = undefined;
    }
    if (!company) {
      isValidate = false;
      error.company = validationMessage.emptyCompany;
    } else if (!checkCompanyName(company)) {
      isValidate = false;
      error.company = validationMessage.invalidCompany;
    } else if (company?.length < 2) {
      isValidate = false;
      error.company = validationMessage.companyLength;
    } else {
      error.company = undefined;
    }
    setError({...error});
    if (isValidate) {
      handleApply();
    }
  };

  const onCheck = (): void => {
    setChecked(!checked);
  };

  const handleApply = async () => {
    /** Apply For Franchise Api call */
    setLoading(true);
    const formData = {
      [params.email]: email,
      [params.firstName]: firstName,
      [params.lastName]: lastName,
      [params.city]: cityData,
      [params.state]: state,
      [params.jobTitle]: jobTitle,
      [params.company]: company,
      [params.mobileNumber]: mobileNumber,
    };
    try {
      const {data} = await axiosInstance.post(
        constant.applyFranchise,
        formData,
      );
      setLoading(false);
      Snackbar.show({text: data?.message});
      setEmail('');
      setFirstName('');
      setLastName('');
      setMobileNumber('');
      setState('');
      setCityData('');
      setJobTitle('');
      setCompany('');
      navigation.navigate('bottom');
    } catch (e: any) {
      setLoading(false);
      Snackbar.show({text: e?.response?.data?.message ?? e?.message});
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
    state,
    setState,
    cityData,
    setCityData,
    jobTitle,
    setJobTitle,
    company,
    setCompany,
    loading,
    error,
    handleValidation,
    checked,
    onCheck,
  };
};

export default applyFranchiseController;
