interface HomePageProps {
  search: string;
  categories: AllCategories[];
  selectedCategory?: AllCategories;
  products: AllProductsProps[];
  wishlistData: GetWishlistProps[];
  isLoading: boolean;
  bannerData: BannerProps[];
  updateFlag: number;
}
export interface BannerProps {
  isActive: boolean;
  _id: string;
  title: string;
  banner: string;
  createdAt: string;
  updatedAt: string;
  categoryId: {
    _id: string;
    name: string;
    image: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  description: string;
  isDeleted: boolean;
}
export interface AllCategories {
  _id: string;
  name: string;
  image: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface AllProductsProps {
  _id: string;
  productName: string;
  description: string;
  category: {
    _id: string;
    name: string;
    image: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  seller: string;
  attributes: AttributesProps[];
  isActive: boolean;
  isDeleted: boolean;
  liked?: boolean;
  addedToCart?: boolean;
  objectId?: string;
}

interface AttributesProps {
  Color: string;
  Size: string[];
  price: number;
  discountedPrice: number;
  stock: number;
  images: string[];
  _id: string;
  colorCode: string;
  Material: string;
}
export interface GetWishlistProps {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    mobileNumber: number;
    otp: string;
    profile: string;
    source: string;
    id: string;
    accessToken: string;
    providerId: string;
    otpExpiryDate: string;
    isActive: boolean;
    isAccountVerified: number;
    deletedStatus: number;
    login_type: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    fcmToken: string;
  } | null;
  product: AllProductsProps;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  liked?: boolean;
  addedToCart?: boolean;
}

export interface WishListProducts {
  _id: string;
  productName: string;
  description: string;
  category: string;
  seller: string;
  attributes: {
    color: string;
    size: string[];
    price: number;
    discountedPrice: number;
    stock: number;
    images: string[];
    _id: string;
  }[];
  isActive: boolean;
  isDeleted: boolean;
  __v: number;
}
