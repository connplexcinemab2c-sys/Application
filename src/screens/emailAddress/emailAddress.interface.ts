export interface contactUsProps {
  handleValidation: () => void;
  isMobile?: boolean;
  loading?: boolean;
  mobile?: string;
  setMobile: React.Dispatch<React.SetStateAction<string | undefined>>;
  error?: string;
  userData?: any;
}
