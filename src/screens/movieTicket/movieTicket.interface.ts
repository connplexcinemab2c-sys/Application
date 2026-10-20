export interface MovieTicketControllerProps {
  loading: boolean;
  details: any;
  onBack: () => void;
  showDetails: boolean;
  onMore: () => void;
  total: number;
  foodTotalWithGST?: number;
  onShare: () => void;
  imageSpinner: boolean;
  onImageLoad: () => void;
  convenienceFees: number;
  totalTickets: number;
  ticketCGST: number;
  ticketSGST: number;
  CGST3D: number;
  SGST3D: number;
  cinemaGSTToolTip: boolean;
  setCinemaGSTToolTip: any;
  fnbGSTToolTip: boolean;
  setFnbGSTToolTip: any;
  rewardTransaction: any;
}
