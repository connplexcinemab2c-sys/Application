import {AllCategories} from '../../../screens/ecommerce/ecomHomePage/ecomHomePageProps';

export interface CategoriesCardProps {
  item: AllCategories;
  index: number;
  onPress: (item: AllCategories) => void;
  selected?: AllCategories;
}
