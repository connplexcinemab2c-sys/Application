export interface AddressStateProps {
  activeAddress?: {
    _id: string;
    addressDetails: {
      billing_address: string;
      billing_city: string;
      billing_country: string;
      billing_email: string;
      billing_landmark: string;
      billing_locality: string;
      billing_name: string;
      billing_state: string;
      billing_tel: string;
      billing_zip: string;
    };
    createdAt: string;
    isActive: boolean;
    isDeleted: boolean;
    updatedAt: string;
    userId: string;
  };
  firstName: string;
  lastName: string;
  mobile: string;
  emailId: string;
  address: string;
  locality: string;
  landMark: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  firstNameError: string;
  lastNameError: string;
  mobileError: string;
  emailIdError: string;
  addressError: string;
  localityError: string;
  landMarkError: string;
  pincodeError: string;
  cityError: string;
  stateError: string;
  countryError: string;
  spinner: boolean;
  stateISO: string;

}
