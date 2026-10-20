export interface MembershipListControllerProps {
  loading: boolean;
  list?: any;
  onClick: (item: any) => void;
  refreshing: boolean;
  refreshJob: () => void;
  search: string;
  handleSearch: (text: string) => void;
  onClear: () => void;
  onClickMembership: () => void;
  formattedDurationText: string;
  getMembershipDurationText: (days: number) => string;
}
