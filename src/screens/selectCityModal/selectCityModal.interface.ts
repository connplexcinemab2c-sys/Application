export interface PropType {
  visible: boolean;
  regionData: any;
  loading: boolean;
  locationPermission: () => void;
  locationSpinner: boolean;
  navigateToCinemaScreen: (selectedCity: any) => void;
  refreshing: boolean;
  refreshCall: () => void;
}
