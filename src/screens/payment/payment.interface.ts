import React from 'react';

export interface PaymentControllerProps {
  couponCode?: string;
  setCouponCode: React.Dispatch<React.SetStateAction<string | undefined>>;
  createOrder: () => void;
  route: any;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  cancelModal: boolean;
  setCancelModal: React.Dispatch<React.SetStateAction<boolean>>;
  transactionModal: boolean;
  setTransactionModal: React.Dispatch<React.SetStateAction<boolean>>;
  cancelSpinner: boolean;
  cancelTransaction: (flag: string) => void;
  movieDetails: any;
  details: any;
  onSnacks: (data: any) => void;
  snacks: any;
  onMoreFood: () => void;
  onMoreFees: () => void;
  more: any;
  loading: boolean;
  transactionError?: string;
  sectionType?: string;
  ticketCGST: number;
  ticketSGST: number;
  CGST3D: number;
  SGST3D: number;
  convenienceFees: any;
  uri: string;
  paymentModal: boolean;
  onCancelPayment: () => void;
  onFailPayment: () => void;
  onSuccessPayment: () => void;
  setTransactionError: React.Dispatch<React.SetStateAction<string | undefined>>;
  onCouponCode: () => void;
  error: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  onBackModal: () => void;
  cinemaData: any;
  pricePackage: string | undefined;
  onSkipModal: () => void;
  load: boolean;
  isNumberVisible: boolean;
  setIsNumberVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onCouponCall: (itemIndex: number) => void;
  coupon: any;
  couponData: any;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  checkPromo: boolean;
  isLoad: boolean;
  refreshing: boolean;
  refreshCall: () => void;
  staticCouponData: Array<any>;
  onApplyCall: () => void;
  total: any;
  totalAmount: any;
  finalAmount: any;
  discount: any;
  setTicketPriceWoGST?: React.Dispatch<React.SetStateAction<any>>;
  FNBTotal?: number;
  discountableAmount?: any;
  FNBDiscount: any;
  discountMerge: any;
  FNBDiscountMerge: any;
  cartCalculation: cartCalculations;
  couponCodes: any;
  isAppliedCoupons: any;
  cinemaGSTToolTip: boolean;
  setCinemaGSTToolTip: React.Dispatch<React.SetStateAction<boolean>>;
  fnbGSTToolTip: boolean;
  setFnbGSTToolTip: React.Dispatch<React.SetStateAction<boolean>>;
  isTaxVisible: boolean;
  setIsTaxVisible: React.Dispatch<React.SetStateAction<boolean>>;
  rewardPoints: number;
  rewardModal: boolean;
  setRewardModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRewardPoints: number;
  setSelectedRewardPoints: React.Dispatch<React.SetStateAction<number>>;
  appliedRewardPoints: number;
  setAppliedRewardPoints: React.Dispatch<React.SetStateAction<number>>;
}

interface cartCalculations {
  ticketCart: TicketCart;
  foodCart: TicketCart;
  finalAmount: number;
  totalDiscount: number;
  membershipDiscount: MembershipDiscount[];
}

interface MembershipDiscount {
  discountType: string;
  discount: number;
  couponTitle: string;
  couponFor: string;
  couponType: string;
  couponCategory: string;
}

interface TicketCart {
  totalAfterDiscount: any;
  discountAmount: number;
  basePrice: number;
  membershipDiscount: number;
  cgst: number;
  sgst: number;
  coupons: any[];
  total: number;
}
