export interface SnacksProps {
  search?: string;
  snackListData: any[];
  onClear: () => void;
  onSearchFilterSnacks: (text: string) => void;
  loading: boolean;
  handleAdd: (id: string) => void;
  handleIncrease: (id: string) => void;
  handleDecrease: (id: string) => void;
  onAddToCart: () => void;
  addSpinner: boolean;
  modal: boolean;
  setModal: any;
  activeIndex: string;
  onClickTab: (item: any) => void;
  timer: number | string;
}

export interface SnacksListProps {
  details: any;
  onCancel: () => void;
  onSnacks: (data: any) => void;
  onBack?: () => void;
  load: boolean;
  timer: number | string;
}
