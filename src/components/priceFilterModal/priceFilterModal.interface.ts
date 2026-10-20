export interface PriceModalProps {
  isVisible: boolean;
  showPriceItem: any[];
  toggleSelection: (item: any) => void;
  handleClose: () => void;
  handleFilterChange: () => void;
  tempSelectedItems: any;
  handlePriceClear?: () => void;
}
