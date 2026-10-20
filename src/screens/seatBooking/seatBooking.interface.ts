import {MutableRefObject} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

export interface SeatBookingControllerProps {
  selectTime: (time: string) => void;
  onSeatClick: (
    key: any,
    item: any,
    price: number,
    index: number,
    newIndex: number,
    keys: number,
  ) => void;
  loading?: boolean;
  selectedTime: any;
  seatBookingData: any;
  setSeatBookingData: React.Dispatch<React.SetStateAction<any>>;
  isTimeSelected: boolean;
  setIsTimeSelected: React.Dispatch<React.SetStateAction<boolean>>;
  movieTimings: any;
  refRBSheet: MutableRefObject<RBSheet | undefined>;
  initBookingData: string;
  setInitBookingData: React.Dispatch<React.SetStateAction<string>>;
  checkStatus: () => void;
  addSeats: any;
  setAddSeats: React.Dispatch<React.SetStateAction<any>>;
  lastSeatData: any;
  setLastSeatData: React.Dispatch<React.SetStateAction<any>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSeat: any;
  movieName?: string;
  showTime?: string;
  disable: boolean;
  showSpinner: boolean;
  layoutData: any;
  setArea: any;
  closeSheet: () => void;
  refreshing: boolean;
  onRefreshCall: () => void;
  visible: boolean;
  setVisible: any;
  seatLayout: Array<any>;
  setSelectedSeatArea: any;
  strTotalPrice: any;
  strSelectedSeats: any;
}

export interface SeatData {
  id: number;
  rowData: any;
}
