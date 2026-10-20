export interface TheatreSeatsControllerProps {
  onSelectDate: (date: string) => void;
  onSelectTime: (item: any, cinemaId: string, index: number) => void;
  getColor: (time: any, type: string) => string[];
  loading?: boolean;
  showDates: any;
  setShowDates: React.Dispatch<React.SetStateAction<any>>;
  onMoviesShows: () => void;
  showTimes: ShowTimesProps[];
  theatreId?: string;
  getUserInfo: (item: string[]) => void;
  getInfo: (id: string) => void;
  infoSheet: any;
  amenities: any[];
  onPriceFilter: () => void;
  onTimeFilter: () => void;
  refreshing: boolean;
  refreshCall: () => void;
  toggleSelection: (item: any) => void;
  isVisible: boolean;
  isTimeVisible: boolean;
  handlePriceClear: () => void;
  handleTimeClear: () => void;
  toggleTimeSelection: (item: any) => void;
  isAvailable: boolean;
  setIsAvailable: any;
  handleAge: () => void;
  handleFilterChange: () => void;
  tempSelectedTimeItems: any;
  handleCloseModal: () => void;
  tempSelectedItems: any;
  handleClosePriceModal: () => void;
  filterArray: any;
}

export interface SeatData {
  id: number;
  rowData: any;
}

export interface ShowTimesProps {
  cinemaDetails: {
    _id: string;
    address: string;
    displayName: string;
    cinemaId: string;
    emailId: string;
  };
  timings: TimingsProps[];
}

export interface TimingsProps {
  sid: number;
  showId: string;
  startTime: string;
  aData: string;
  areas: [];
}
