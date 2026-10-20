import {RefObject} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ItemProps} from '../../components/cards/cinemaList/cinemaList.interface';

export interface MoviesPerCinemaControllerProps {
  cinemaDetails?: ItemProps;
  showDates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onSelectTime: (item: any, movieDetails: any) => void;
  selectedTime: string;
  loading: boolean;
  movieId?: string;
  movieDetails: any;
  getInfo: (item: string[]) => void;
  infoSheet: RefObject<RBSheet>;
  amenities: any[];
  refreshing: boolean;
  refreshCall: () => void;
  toggleSelection: (item: any) => void;
  handleCloseModal: () => void;
  isVisible: boolean;
  isTimeVisible: boolean;
  handlePriceClear: () => void;
  handleClosePriceModal: () => void;
  handleTimeClear: () => void;
  toggleTimeSelection: (item: any) => void;
  onPriceFilter: () => void;
  onTimeFilter: () => void;
  isAvailable: boolean;
  setIsAvailable: any;
  handleAge: () => void;
  handleFilterChange: () => void;
  tempSelectedTimeItems: any;
  tempSelectedItems: any;
  filterArray: any;
}
