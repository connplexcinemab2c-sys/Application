export interface contactUsProps {
  validation: () => void;
  firstName?: string;
  setFirstName: React.Dispatch<React.SetStateAction<string | undefined>>;
  lastName?: string;
  setLastName: React.Dispatch<React.SetStateAction<string | undefined>>;
  email?: string;
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
  mobileNumber?: string;
  setMobileNumber: React.Dispatch<React.SetStateAction<string | undefined>>;
  message?: string;
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: ErrorProps;
}

export interface ErrorProps {
  firstName?: string;
  lastName?: string;
  message?: string;
  email?: string;
  mobileNumber?: string;
}
