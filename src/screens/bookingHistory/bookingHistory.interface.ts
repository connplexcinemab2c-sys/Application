export interface BookingHistoryControllerProps {
  loading: boolean;
  bookingHistory?: any;
  onBookingHistory: (transactionId: string) => void;
  refreshing: boolean;
  refreshJob: () => void;
}

export interface BookingHistoryProps {
  id: string;
  movieTitle: string;
  genre: string;
  poster: string;
  date: string;
  time: string;
  totalTickets: number;
  price: number;
  paymentType: string;
  transactionId: string;
  screen: string;
  seat?: string;
  foodAndBvgResponse?: any;
}
