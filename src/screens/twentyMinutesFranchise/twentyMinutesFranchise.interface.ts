export interface TwentyMinutesFranchiseProps {
  onBack: () => void;
  loading: boolean;
  name?: string;
  setName: React.Dispatch<React.SetStateAction<string | undefined>>;
  email?: string;
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
  mobileNo?: string;
  setMobileNo: React.Dispatch<React.SetStateAction<string | undefined>>;
  city?: string;
  setCity: React.Dispatch<React.SetStateAction<string | undefined>>;
  error: ErrorProps;
  validation: () => void;
  checked: boolean;
  onCheck: () => void;
}

export interface ErrorProps {
  name?: string;
  email?: string;
  mobileNo?: string;
  city?: string;
}
