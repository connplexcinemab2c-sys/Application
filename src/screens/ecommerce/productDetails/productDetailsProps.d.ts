interface ProductDetailsProps {
  productDetail: AllProductsProps;

  isWhistListed: boolean;
  activeProductImage: string;
  activeProductColor: string;
  activeProductSize: string;
  relatedProducts: [];
  activeColor: number;
  wishlistData: GetWishlistProps[] | undefined;
  products: AllProductsProps[] | undefined;
  cartData: CartItemProps[];
  applyPincode?: string;
  pincode: string;
  provideStatus: boolean;
  pincodeSpinner: boolean;
  addToCartSpinner: boolean;
  quantity: number;
  pinMessage: string;
  pinStatus: boolean;
  activeProductId: string;
  activeVariantId: string;
  variantDetail: any;
products: AllProductsProps;
isLoading: boolean,
    isRefreshing: boolean,
    isPagination: boolean,
    extractedData:[],
    cartQuantity: number
    attributeFilter: string,


}
