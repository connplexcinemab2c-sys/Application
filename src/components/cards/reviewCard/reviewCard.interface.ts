export interface ReviewCardProps {
  item: RateAndReviewProps;
  isModal?: boolean;
  index: number;
  dataLength?: any;
}

export interface RateAndReviewProps {
  _id: string;
  movieRate: number;
  connplexRate: number;
  movieReview: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    profile: string;
  };
  movieId: string;
  isActive: true;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
