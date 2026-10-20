export interface RewardsControllerProps {
  loading: boolean;
  list: any[];
  onClick: (item: any) => void;
  refreshing: boolean;
  refreshJob: () => void;
  search: string;
  handleSearch: (text: string) => void;
  onClear: () => void;
  activeFilter: 'All' | 'Earned' | 'Redeemed';
  onFilterChange: (filter: 'All' | 'Earned' | 'Redeemed') => void;
  totalEarned: number;
  totalRedeemed: number;
  availableBalance: number;
}
