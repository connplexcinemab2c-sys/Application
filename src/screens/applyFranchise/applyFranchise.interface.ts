export interface ApplyFranchiseProps {
  handleValidation: () => void;
  firstName?: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName?: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  email?: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  mobileNumber?: string;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  state?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  cityData?: string;
  setCityData: React.Dispatch<React.SetStateAction<string>>;
  jobTitle?: string;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  company?: string;
  setCompany: React.Dispatch<React.SetStateAction<string>>;
  loading?: boolean;
  error: ErrorProps;
  checked: boolean;
  onCheck: () => void;
}

export interface ErrorProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
  state?: string;
  cityData?: string;
  jobTitle?: string;
  company?: string;
}
