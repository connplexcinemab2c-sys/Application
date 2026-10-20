export interface premiumDetailProps {
  detail: any;
  userData: any;
  imageSpinner: boolean;
  setImageSpinner: React.Dispatch<React.SetStateAction<boolean>>;
  formattedDurationText: string;
  premiumData: any;
  getMembershipDurationText: (days: number) => string;
  loading: boolean;
}
