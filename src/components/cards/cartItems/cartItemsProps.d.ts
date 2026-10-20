import {CartDataProps} from '../../../screens/ecommerce/ecomCart/ecomCart.interface';

interface CartItemsProps {
  item: CartDataProps;
  index: number;
  onDelete?: () => void;
  onMinus?: () => void;
  onPlus?: () => void;
  onLike?: () => void;
  valueData?: any;
  hasCheckedDelivery?: boolean;
}
