export interface EditProfileProps {
  validateInputs: () => void;
  onEditMobile: () => void;
  onEditEmail: () => void;
  imagePermission: (flag: string) => void;
  handleGenderSelect: (option: string) => void;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  mobile: string;
  setMobile: React.Dispatch<React.SetStateAction<string>>;
  profileImage: any;
  address?: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  loading?: boolean;
  selectedGender: string;
  userData?: UserDataProps;
  error: ErrorProps;
  birthDate?: string;
  maritalStatus?: string;
  handleMaritalStatus: (maritalStatus: string) => void;
  maritalSheet: any;
  genderSheet: any;
  isMaritalSheet: boolean;
  isGenderSheet: boolean;
  handleOpenMaritalSheet: () => void;
  handleOpenGenderSheet: () => void;
  showPicker: boolean;
  setShowPicker: any;
  handleConfirm: (date: any) => void;
  setBirthDate: any;
  selectedDate: any;
  onRefresh: () => void;
  refreshing: boolean;
  isVisible: boolean;
  setIsVisible: any;
  loginType:any
}

export interface UserDataProps {
  firstName: string | undefined;
  lastName: string | undefined;
  address: string | undefined;
  mobileNumber: string | undefined;
  profile: string;
  gender: string | undefined;
}

export interface ErrorProps {
  firstName: string | undefined;
  lastName: string | undefined;
  address: string | undefined;
}
