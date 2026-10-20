export interface CartDataProps {
  _id: string;
  userId: string;
  productId: {
    _id: string;
    productName: string;
    description: string;
    category: string;
    seller: string;
    attributes: {
      color: string;
      size: string[];
      price: number;
      stock: number;
      images: string[];
      _id: string;
      discountedPrice: number;
    }[];
    isActive: boolean;
    isDeleted: boolean;
    maximumPurchaseQty: number;
  };
  quantity: number;
  price: number;
  image: string;
  attributes: {Color: string; Size: string; colorCode: string};
  isCheckOut: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  isAvailable: boolean;
  attributeId: string;
  liked: boolean;
}
export interface ValuesProps {
  cartData: CartDataProps[];
  totalPrice: number;
  deliveryPrice: number;
  isLoading: boolean;
  applyCoupon?: string;
  coupon: string;
  membershipDiscount: string;
  membershipDiscountAmount: number;
  totalCost: number;
  isLoadCoupon: boolean;
  loadCheckout: boolean;
  couponAmount: number;
  selectedAddress: any;
  addresses: any;
  deleiveryData: any;
  cartIdData:[];
}
