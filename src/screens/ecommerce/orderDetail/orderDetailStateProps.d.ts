export interface OrderDetailStateProps {
  currentStep: number;
  isLoading: boolean;
  orderHistory?: OrderHistoryProps;
  instructions?:any

}

export interface OrderHistoryProps {
  OrderCancelled: {
    additionalComment: string;
    orderCancelledStatus: boolean;
    reasonForCancellation: string;
  };
  OrderReturn: {
    returnStatus: string;
    refundStatus: string;
  };
  _id: string;
  userId: string;
  checkOutId: string;
  cartId: {
    _id: string;
    userId: string;
    productId: {
      _id: string;
      productName: string;
    };
    quantity: number;
    price: number;
    image: string;
    attributes: {
      color: string;
      size: string;
    };
    isCheckOut: boolean;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  statusTimestamps: {
    Pending: string;
    'Order Confirm': string;
    'In process': string;
    'Out for delivery': string;
    Delivered: string;
  };
  totalAmount: number;
  shippingDetails: {
    billing_name: string;
    billing_tel: string;
    billing_email: string;
    billing_address: string;
    billing_locality: string;
    billing_landmark: string;
    billing_zip: string;
    billing_city: string;
    billing_state: string;
    billing_country: string;
  };
  sellerId: string;
  paymentStatus: string;
  shippingStatus: string;
  createdAt: string;
  orderId: string;
  updatedAt: string;
  __v: number;
  paymentId: string;
  paymentMethod: string;
}
