export interface AccountControllerProps {
  onEditProfile: () => void;
  onClickLogout: () => void;
  loading?: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userData: any;
  imageSpinner: boolean;
  onImageLoad: () => void;
  onImageLoadStart: () => void;
  onRightIcon: () => void;
  onRefresh: () => void;
  onLogoClick: () => void;
  refreshing: boolean;
  onItemPress: (name: any, title: any) => void;
  visible: boolean;
  setVisible: any;
  onDelete: () => void;
  load: boolean;
  isLoad: boolean;
  onPremiumCall: () => void;
  scrollRef: any;
  getDetailSubscription: any;
  durationText: string;
  		getMembershipDurationText: (days: number) => string
  
}

export interface AccountScreenProps {
  id: number;
  name: string;
}
