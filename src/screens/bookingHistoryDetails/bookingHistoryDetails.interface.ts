export interface BookingHistoryDetailsControllerProps {
  loading: boolean;
  details: any;
  total: number;
  foodTotalWithGST?: number;
  imageSpinner: boolean;
  onImageLoad: () => void;
  onShare: () => void;
  convenienceFees: number;
  totalTickets: number;
  ticketCGST: number;
  ticketSGST: number;
  CGST3D: number;
  SGST3D: number;
  refreshing: boolean;
  refreshCall: () => void;
  onBackCall: () => void;
  cinemaGSTToolTip: boolean;
  setCinemaGSTToolTip: any;
  fnbGSTToolTip: boolean;
  setFnbGSTToolTip: any;
}
