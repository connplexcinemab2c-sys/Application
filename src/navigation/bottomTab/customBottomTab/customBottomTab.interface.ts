export interface FlatListItemProps {
  id: number;
  title: string;
}
export interface FlatListItem {
  key: string;
  name: string;
}

export interface BottomTabItem {
  cuisine: string;
}

export interface TopTabProps {}

export interface bottomTabControllerProps {
  onAccount: () => void;
  visible: boolean;
  setVisible: any;
}
