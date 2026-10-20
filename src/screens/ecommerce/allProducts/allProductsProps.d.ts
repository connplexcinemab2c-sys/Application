interface AllProductsValueProps {
  products: AllProductsProps[];
  wishlistData: GetWishlistProps[] | undefined;
  page: number;
  isPagination: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  allCategoryProducts: AllProductsProps[];
}
