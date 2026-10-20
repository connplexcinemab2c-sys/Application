import {useEffect, useRef, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '../../navigation/stacks/authStack';
import axiosInstance from '../../services/api';
import {checkFirstNameSpace} from '../../utility/validation/stringValidation';
import constant from '../../services/config/constant';
import {EditProfileProps, ErrorProps} from './editProfile.interface';
import {editProfiles} from '../../services/config/redux/userReducer/action';
import params from '../../services/config/params';
import validationMessage from '../../utility/validation/validationMessage';
import moment from 'moment';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/config/redux/useReduxHooks';

const editProfileController = (): EditProfileProps => {
  const navigation = useNavigation<AuthNavigationProps>();
  const dispatch = useAppDispatch();
  const {userData, token, loginType}: any = useAppSelector(
    state => state.UserReducer,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>(
    userData?.profile ? userData?.profile : '',
  );
  const [firstName, setFirstName] = useState<string>(userData?.firstName);
  const [lastName, setLastName] = useState<string>(userData?.lastName);
  const [address, setAddress] = useState<string>(userData?.address);
  const [city, setCity] = useState<string>(userData?.city);
  const [selectedGender, setSelectedGender] = useState<string>(
    userData?.gender ? userData?.gender : '',
  );
  const [email, setEmail] = useState<string>(userData?.email);
  const [mobile, setMobile] = useState<string>(
    userData?.mobileNumber?.toString(),
  );
  const currentDate = new Date();
  const [birthDate, setBirthDate] = useState<any>(
    userData?.birthDate
      ? userData?.birthDate
      : new Date(1900, currentDate.getMonth(), currentDate.getDate()),
  );
  const [showPicker, setShowPicker] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState<string>(
    userData?.maritalStatus == 'true' ||
      userData?.maritalStatus == true ||
      userData?.maritalStatus == 'Married'
      ? 'Married'
      : userData?.maritalStatus == 'false' ||
        userData?.maritalStatus == false ||
        userData?.maritalStatus == 'Unmarried'
      ? 'Unmarried'
      : '',
  );
  const [error, setError] = useState<ErrorProps>({
    firstName: undefined,
    lastName: undefined,
    address: undefined,
  });
  const [isMaritalSheet, setIsMaritalSheet] = useState<boolean>(false);
  const [isGenderSheet, setIsGenderSheet] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<any>(
    userData?.birthDate ? userData?.birthDate : null,
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const maritalSheet = useRef<RBSheet | undefined>();
  const genderSheet = useRef<RBSheet | undefined>();

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    setMobile(userData?.mobileNumber?.toString());
    setEmail(userData?.email);
    setFirstName(userData?.firstName);
    setLastName(userData?.lastName);
    setBirthDate(
      userData?.birthDate
        ? userData?.birthDate
        : new Date(1900, currentDate.getMonth(), currentDate.getDate()),
    );
    setSelectedGender(userData?.gender ? userData?.gender : '');
    setMaritalStatus(
      userData?.maritalStatus == 'true' ||
        userData?.maritalStatus == true ||
        userData?.maritalStatus == 'Married'
        ? 'Married'
        : userData?.maritalStatus == 'false' ||
          userData?.maritalStatus == false ||
          userData?.maritalStatus == 'Unmarried'
        ? 'Unmarried'
        : '',
    );
    setAddress(userData?.address);
    setCity(userData?.city);
    setProfileImage(userData?.profile ? userData?.profile : '');
  }, [userData]);

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    genderSheet?.current?.close();
    setIsGenderSheet(false);
  };

  const handleMaritalStatus = (maritalStatus: string): void => {
    setMaritalStatus(maritalStatus);
    maritalSheet?.current?.close();
    setIsMaritalSheet(false);
  };

  const handleOpenMaritalSheet = (): void => {
    maritalSheet?.current?.open();
    setIsMaritalSheet(true);
  };

  const handleOpenGenderSheet = (): void => {
    genderSheet?.current?.open();
    setIsGenderSheet(true);
  };

  const imagePermission = (flag: string) => {
    if (flag == 'camera') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        .then(() => openCameraPicker())
        .catch(e => Snackbar.show({text: e}));
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      )
        .then(() => openImagePicker())
        .catch(e => Snackbar.show({text: e}));
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getUserInfo();
  };

  const getUserInfo = async () => {
    axiosInstance
      .get(`${constant.userInfo}` + '?' + new Date().getTime() + {}, {
        headers: {
          auth: token,
        },
      })
      .then(res => {
        setRefreshing(false);
        dispatch(editProfiles(res?.data?.data));
      })
      .catch((e: any) => {
        setRefreshing(false);
      });
  };

  const openCameraPicker = async () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
    })
      .then(image => {
        if (image?.mime == 'image/gif') {
          setTimeout(() => {
            Snackbar.show({text: 'Please select image only', duration: 3000});
          }, 500);
          setIsVisible(false);
          return;
        }
        if (image?.size / 1000 > 2000) {
          setTimeout(() => {
            Snackbar.show({
              text: 'Maximum allowed file size is 2 MB',
              duration: 3000,
            });
          }, 500);
          setIsVisible(false);
          return;
        }
        let imageData: any = {
          name: 'image.jpeg',
          uri: image?.path,
          type: 'image/jpeg',
        };
        setProfileImage(imageData);
        setIsVisible(false);
        return;
      })
      .catch(e => {
        setTimeout(() => {
          Snackbar.show({text: e?.message, duration: 3000});
        }, 500);
        setIsVisible(false);
      });
  };

  const openImagePicker = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    })
      .then(image => {
        if (image?.mime == 'image/gif') {
          setTimeout(() => {
            Snackbar.show({text: 'Please select image only', duration: 3000});
          }, 500);
          setIsVisible(false);
          return;
        }
        if (image?.size / 1000 > 2000) {
          setTimeout(() => {
            Snackbar.show({
              text: 'Maximum allowed file size is 2 MB',
              duration: 3000,
            });
          }, 500);
          setIsVisible(false);
          return;
        }
        let imageData: any = {
          name: 'image.jpeg',
          uri: image?.path,
          type: 'image/jpeg',
        };
        setProfileImage(imageData);
        setIsVisible(false);
        return;
      })
      .catch(e => {
        setTimeout(() => {
          Snackbar.show({text: e?.message, duration: 3000});
        }, 500);
        setIsVisible(false);
      });
  };

  const validateInputs = () => {
    /* Validation for edit profile form */
    let isValidate = true;
    if (!firstName) {
      isValidate = false;
      error.firstName = validationMessage.emptyFirstName;
    } else if (!checkFirstNameSpace(firstName)) {
      isValidate = false;
      error.firstName = validationMessage.invalidSpace;
    } else if (firstName?.length < 2) {
      isValidate = false;
      error.firstName = validationMessage.firstNameLength;
    } else {
      error.firstName = undefined;
    }
    if (!lastName) {
      isValidate = false;
      error.lastName = validationMessage.emptyLatsName;
    } else if (!checkFirstNameSpace(lastName)) {
      isValidate = false;
      error.lastName = validationMessage.invalidSpace;
    } else if (lastName?.length < 2) {
      isValidate = false;
      error.lastName = validationMessage.lastNameLength;
    } else {
      error.lastName = undefined;
    }
    setError({...error});
    if (isValidate) {
      editProfileDetail();
    }
  };

  const editProfileDetail = async () => {
    /* API call for edit profile */
    try {
      const formData = new FormData();
      if (firstName) {
        formData.append(params.firstName, firstName);
      }
      if (lastName) {
        formData.append(params.lastName, lastName);
      }
      if (profileImage) {
        formData.append(params.profile, profileImage);
      }
      if (address) {
        formData.append(params.address, address);
      }
      if (city) {
        formData.append(params.city, city);
      }
      if (selectedGender != '') {
        formData.append(params.gender, selectedGender);
      }
      if (selectedDate) {
        formData.append(
          params.birthDate,
          moment(selectedDate).format('YYYY/MM/DD'),
        );
      }
      if (maritalStatus != '') {
        formData.append(
          params.maritalStatus,
          maritalStatus === 'Married' ? true : false,
        );
      }
      setLoading(true);
      const {data} = await axiosInstance.post(constant.editProfile, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          auth: token,
        },
      });
      setLoading(false);
      dispatch(editProfiles(data?.data));
      Snackbar.show({text: data?.message});
      navigation.navigate('bottom');
    } catch (e: any) {
      setLoading(false);
      Snackbar.show({text: e?.response?.data?.message ?? e?.message});
    }
  };

  const onEditMobile = (): void => {
    navigation.navigate('emailAddress', {name: 'mobile'});
  };

  const onEditEmail = (): void => {
    navigation.navigate('emailAddress', {name: 'email'});
  };

  const handleConfirm = (date: any) => {
    setSelectedDate(birthDate);
    setShowPicker(false);
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    mobile,
    setMobile,
    address,
    setAddress,
    profileImage,
    onEditMobile,
    onEditEmail,
    loading,
    imagePermission,
    userData,
    validateInputs,
    error,
    selectedGender,
    handleGenderSelect,
    city,
    setCity,
    handleMaritalStatus,
    birthDate,
    maritalStatus,
    maritalSheet,
    genderSheet,
    isGenderSheet,
    isMaritalSheet,
    handleOpenGenderSheet,
    handleOpenMaritalSheet,
    showPicker,
    setShowPicker,
    handleConfirm,
    setBirthDate,
    selectedDate,
    onRefresh,
    refreshing,
    isVisible,
    setIsVisible,
    loginType,
  };
};

export default editProfileController;
