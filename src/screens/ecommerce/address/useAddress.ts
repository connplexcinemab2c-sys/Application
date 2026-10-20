import useAppState from '../../../hooks/useAppState';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../../navigation/stacks/authStack';
import {ecomInstance} from '../../../services/api/api';
import constant from '../../../services/config/constant';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../services/config/redux/useReduxHooks';
import params from '../../../services/config/params';
import validationMessage from '../../../utility/validation/validationMessage';
import {
  checkEmail,
  checkMobileNumber,
  checkString,
} from '../../../utility/validation/stringValidation';
import Log from '../../../utility/log';
import {useEffect, useState} from 'react';
import {updateSelectedAddress} from '../../../services/config/redux/userReducer/action';
import {AddressStateProps} from './addressProps';
import axios from 'axios';
import {onLog} from '@react-native-firebase/app';
import {legacy_createStore} from 'redux';
import {stateToISOCode} from './address.const';

const useAddress = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<RouteProp<AuthParams, 'address'>>();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const [countryData, setCountryData] = useState('IN');
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allCartID, setAllCartID] = useState([]);
  const [getDeliveryCharges, setGetDeliveryCharges] = useState();
  const [allStatesISO, setAllStatesISO] = useState();

  const {token, userData, selectedAddress} = useAppSelector(
    state => state.UserReducer,
  );
  const [values, setValues, resetValues, newValue] =
    useAppState<AddressStateProps>({
      activeAddress: undefined,
      firstName: '',
      lastName: '',
      mobile: '',
      emailId: '',
      address: '',
      locality: '',
      landMark: '',
      pincode: '',
      city: '',
      state: '',
      country: '',
      firstNameError: '',
      lastNameError: '',
      mobileError: '',
      emailIdError: '',
      addressError: '',
      localityError: '',
      landMarkError: '',
      pincodeError: '',
      cityError: '',
      stateError: '',
      countryError: '',
      stateISO: '',
      spinner: false,
    });

  const stateisodata = selectedAddress?.addressDetails?.billing_state;
  const fullCode = stateToISOCode[stateisodata?.trim()];
  const stateCode = fullCode?.split('-')[1];

  useEffect(() => {
    onGetAllCountry();
    onGetAllStates();
    onGetAllCities(stateCode);
  }, [isFocused]);

  useEffect(() => {
    if (userData?.firstName) {
      setValues('firstName', userData?.firstName);
      setValues('lastName', userData?.lastName);
    }
    if (userData?.mobileNumber) {
      setValues('mobile', userData?.mobileNumber?.toString());
    }
    if (userData?.email) {
      setValues('emailId', userData?.email);
    }
  }, []);

  useEffect(() => {
    setValues('activeAddress', selectedAddress);
  }, [selectedAddress]);

  useEffect(() => {
    if (route?.params?.selectedAddress) {
      setValues('activeAddress', route?.params?.selectedAddress);
    }
  }, [route?.params?.selectedAddress]);

  useEffect(() => {
    if (values?.activeAddress) {
      setValues(
        'address',
        values?.activeAddress?.addressDetails?.billing_address,
      );
      setValues('city', values?.activeAddress?.addressDetails?.billing_city);
      setValues(
        'country',
        values?.activeAddress?.addressDetails?.billing_country,
      );
      setValues(
        'landMark',
        values?.activeAddress?.addressDetails?.billing_landmark,
      );
      setValues(
        'locality',
        values?.activeAddress?.addressDetails?.billing_locality,
      );
      setValues('state', values?.activeAddress?.addressDetails?.billing_state);
      setValues(
        'emailId',
        values?.activeAddress?.addressDetails?.billing_email?.includes(':')
          ? values?.activeAddress?.addressDetails?.billing_email?.split(':')[1]
          : values?.activeAddress?.addressDetails?.billing_email,
      );
      setValues('mobile', values?.activeAddress?.addressDetails?.billing_tel);
      setValues('pincode', values?.activeAddress?.addressDetails?.billing_zip);
      setValues('pincode', values?.activeAddress?.addressDetails?.billing_zip);
      setValues(
        'firstName',
        values?.activeAddress?.addressDetails?.billing_name?.split(' ')[0],
      );
      setValues(
        'lastName',
        values?.activeAddress?.addressDetails?.billing_name?.split(' ')[1],
      );
    }
  }, [values?.activeAddress]);

  const validation = () => {
    let isValid = true;
    if (!values?.firstName) {
      isValid = false;
      values.firstNameError = validationMessage?.emptyFirstName;
    } else if (!checkString(values?.firstName)) {
      isValid = false;
      values.firstNameError = validationMessage?.invalidaFirstName;
    } else {
      values.firstNameError = '';
    }
    if (!values?.lastName) {
      isValid = false;
      values.lastNameError = validationMessage?.emptyLatsName;
    } else if (!checkString(values?.lastName)) {
      isValid = false;
      values.lastNameError = validationMessage?.invalidLastName;
    } else {
      values.lastNameError = '';
    }
    if (!values?.mobile) {
      isValid = false;
      values.mobileError = validationMessage?.emptyMobile;
    } else if (!checkMobileNumber(values?.mobile)) {
      isValid = false;
      values.mobileError = validationMessage?.invalidMobileLength;
    } else {
      values.mobileError = '';
    }
    if (!values?.emailId) {
      isValid = false;
      values.emailIdError = validationMessage?.emptyEmail;
    } else if (!checkEmail(values?.emailId)) {
      isValid = false;
      values.emailIdError = validationMessage?.invalidEmail;
    } else {
      values.emailIdError = '';
    }
    if (!values?.address) {
      isValid = false;
      values.addressError = validationMessage?.emptyAddress;
    } else {
      values.addressError = '';
    }
    if (!values?.locality) {
      isValid = false;
      values.localityError = validationMessage?.emptyLocality;
    } else {
      values.localityError = '';
    }
    if (!values?.landMark) {
      isValid = false;
      values.landMarkError = validationMessage?.emptyLandmark;
    } else {
      values.landMarkError = '';
    }
    if (!values?.pincode) {
      isValid = false;
      values.pincodeError = validationMessage?.emptyPincode;
    } else if (values?.pincode?.length !== 6) {
      isValid = false;
      values.pincodeError = validationMessage?.invalidPincode;
    } else {
      values.pincodeError = '';
    }
    if (!values?.city) {
      isValid = false;
      values.cityError = validationMessage?.emptyCity;
    } else {
      values.cityError = '';
    }
    if (!values?.state) {
      isValid = false;
      values.stateError = validationMessage?.emptyState;
    } else {
      values.stateError = '';
    }
    if (!values?.country) {
      isValid = false;
      values.countryError = validationMessage?.emptyCountry;
    } else {
      values.countryError = '';
    }
    newValue({...values});
    if (isValid) {
      onPressAdd();
    }
  };

  const onGetAllCountry = async () => {
    try {
      setValues('spinner', true);
      const {data} = await ecomInstance.get(`${constant.getAllCountry}`, {
        headers: {
          auth: token,
        },
      });

      const countries = data?.data.map(item => ({
        name: item.name,
        isoCode: item.isoCode,
      }));

      countries.sort((a, b) => a.name.localeCompare(b.name));

      const defaultCountry =
        countries.find(item => item.name === 'India') || countries[0];
      setCountryData(defaultCountry?.isoCode);
      setValues('country', defaultCountry?.name);
      setValues('spinner', false);
    } catch (error: any) {
      setValues('spinner', false);
      Log('country error==========', error?.response);
    }
  };

  const onGetAllStates = async () => {
    try {
      setValues('spinner', true);

      const {data} = await ecomInstance.get(
        `${constant.getAllState}${countryData}`,

        {
          headers: {
            auth: token,
          },
        },
      );
      const statesData = data?.data.map(state => ({
        name: state.name,
        isoCode: state.isoCode,
      }));

      setAllStates(statesData);
      setValues('spinner', false);
    } catch (error: any) {
      setValues('spinner', false);
      Log('state  error ==', error?.response);
    }
  };

  const onGetAllCities = async (getiso: string) => {
    try {
      setValues('spinner', true);
      const {data} = await ecomInstance.get(
        `${constant.getAllCities}/${countryData}/${getiso}`,

        {
          headers: {
            auth: token,
          },
        },
      );
      const cityList = data?.data || [];

      const cityNames = cityList.map(city => city.name);
      setAllCities(cityNames);
      setValues('spinner', false);
    } catch (error: any) {
      setValues('spinner', false);
      Log('city  error==========', error?.response);
    }
  };

  const onPressAdd = async () => {
    try {
      setValues('spinner', true);
      const formData = {
        [params?.addressDetails]: {
          [params?.billingName]: values?.firstName + ' ' + values?.lastName,
          [params?.billingTel]: values?.mobile,
          [params?.billingEmail]: values?.emailId?.toLocaleLowerCase(),
          [params?.billingAddress]: values?.address,
          [params?.billingLocality]: values?.locality,
          [params?.billingLandmark]: values?.landMark,
          [params?.billingZip]: values?.pincode,
          [params?.billingCity]: values?.city,
          [params?.billingState]: values?.state,
          [params?.billingCountry]: values?.country,
        },
      };
      if (values?.activeAddress?._id) {
        formData[params.id] = values?.activeAddress?._id;
      }
      Log('formdata', formData);
      const {data} = await ecomInstance.post(
        constant.addEditAddress,
        formData,
        {
          headers: {
            auth: token,
          },
        },
      );
      Log('addEditAddress data', data);
      if (data?.data) {
        dispatch(updateSelectedAddress(data?.data));
        navigation?.goBack();
      }
      setValues('spinner', false);
    } catch (error: any) {
      setValues('spinner', false);
      Log('payment error', error?.response);
    }
  };

  const onNewAddress = () => {
    setValues('firstName', '');
    setValues('lastName', '');
    setValues('mobile', '');
    setValues('emailId', '');
    setValues('address', '');
    setValues('city', '');
    setValues('locality', '');
    setValues('landMark', '');
    setValues('pincode', '');
    setValues('state', '');
    setValues('country', '');
    setValues('activeAddress', undefined);
  };

  return {
    values,
    setValues,
    validation,
    route,
    onNewAddress,
    allStates,
    allCities,
    onGetAllCities,
    getDeliveryCharges,
  };
};

export default useAddress;
