import React from 'react';

export interface SelectCityControllerProps {
  search: string | undefined;
  setSearch: React.SetStateAction<React.Dispatch<string | undefined>>;
  regionData: RegionData[];
  setRegionData: React.Dispatch<React.SetStateAction<RegionData[]>>;
  loading?: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  originalData: any;
  setOriginalData: React.Dispatch<React.SetStateAction<any>>;
  getRegionData: () => Promise<void>;
  handleSearch: (text: string) => void;
  navigateToCinemaScreen: (selectedCity: any) => void;
  locationPermission: () => void;
  locationSpinner: boolean;
  refreshing: boolean;
  refreshJob: () => void;
  onBack: () => void;
  onClear: () => void;
}

export interface RegionData {
  region: string;
}
