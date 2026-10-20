import {ItemProps} from '../../components/cards/cinemaList/cinemaList.interface';

export interface CinemasControllerProps {
  onSelectLocation: () => void;
  handleSearch: (text: string) => void;
  cinemaRegionData: ItemProps[];
  setCinemaRegionData: React.Dispatch<React.SetStateAction<ItemProps[]>>;
  loading?: boolean;
  searchVisible: boolean;
  setSearchVisible: React.Dispatch<React.SetStateAction<boolean>>;
  search: string | undefined;
  setSearch: React.SetStateAction<React.Dispatch<string | undefined>>;
  cityData?: RegionProps;
  onCinema: (item: ItemProps) => void;
  refreshing: boolean;
  refreshJob: () => void;
  onLogoClick: () => void;
  onClear: () => void;
}

export interface RegionProps {
  _id: string;
  image: string;
  region: string;
}
