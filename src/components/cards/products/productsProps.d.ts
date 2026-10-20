import {
  AllProductsProps,
  WishListProducts,
} from '../../../screens/ecommerce/ecomHomePage/ecomHomePageProps';

export interface ProductsProps {
  item: AllProductsProps;
  onPress: () => void;
  onHeartPress?: () => void;
  onCartPress?: () => void;
  index: number;
  type?: 'row' | 'column';
  disbableCart?: boolean;
}
