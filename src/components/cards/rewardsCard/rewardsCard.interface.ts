export interface RewardsCardProps {
  item: ItemProps;
  index: number;
}

export interface ItemProps {
  id: number;
  name: string;
  points: number;
  totalPoints: number;
}
