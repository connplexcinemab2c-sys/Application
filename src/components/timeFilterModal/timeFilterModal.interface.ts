export interface TimeModalProps {
  isVisible: boolean;
  showTimeItem: any[];
  toggleTimeSelection: (item: any) => void;
  handleClose: () => void;
  handleFilterChange: () => void;
  tempSelectedItems: any;
  handleTimeClear?: () => void;
}
