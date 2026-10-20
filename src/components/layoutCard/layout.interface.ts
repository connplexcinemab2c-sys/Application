export interface LayoutProps {
  item: any;
  id: number;
  onSeat: (
    key: any,
    item: any,
    price: number,
    index: number,
    keys: number,
  ) => void;
}
