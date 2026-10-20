interface CinemaCardProps {
  item: CinemaListProps;
  index: number;
  onPress: (item: CinemaListProps) => void;
}

interface CinemaListProps {
  GSTNumber: string;
  _id: string;
  address: string;
  cinemaAmenities: string[];
  cinemaBranchCode: string;
  cinemaId: string;
  cinemaIsOnline: string;
  cinemaLastDataRefresh: string;
  cinemaLicenseName: string;
  cinemaLicenseNumber: string;
  cinemaName: string;
  cinemaSyncSequence: number;
  cinemaVistaRemoteVersion: string;
  cinemaWebServiceLogin: string;
  cinemaWebServicePWD: string;
  cinemaWebServiceUrl: string;
  cinemaWebServiceUrl2: string;
  cinemaWebServiceUrl3: string;
  cinemaWebServiceVersion: string;
  cinema_images: string[];
  convenienceFees: number;
  convenienceGST: number;
  createdAt: string;
  deletedStatus: number;
  displayName: string;
  emailId: string;
  googleUrl: string;
  images: string[];
  isActive: boolean;
  lastSync: string;
  lastSyncStatus: boolean;
  lat: string;
  long: string;
  mobileNumber: number;
  poster: string;
  regionId: string;
  serviceCharge: number;
  updatedAt: string;
}
