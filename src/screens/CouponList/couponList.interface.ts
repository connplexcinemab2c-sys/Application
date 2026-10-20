export interface PropType {
  list: any;
  loading: boolean;
  refreshing: boolean;
  refreshCall: () => void;
  onApplyCoupon: (item: any) => void;
  onBack: () => void;
}
