import svg from '../../assets/svgIndex';
import {ItemProps} from '../../components/cards/accountList/accountList.interface';
import screenName from '../../navigation/screenName';

export const baseAccountList: ItemProps[] = [
  {
    id: 1,
    icon: svg.Notification,
    title: 'Notifications',
    navigation: screenName.notifications,
  },
  {
    id: 2,
    icon: svg.History,
    title: 'Booking History',
    navigation: screenName.bookingHistory,
  },
  {
    id: 3,
    icon: svg.Transaction,
    title: 'Membership History',
    navigation: screenName.membershipList,
  },
  {
    id: 4,
    icon: svg.Cashback,
    title: 'Welcome gift',
    navigation: screenName.welcomeGift,
  },
  {
    id: 5,
    icon: svg.Rewards,
    title: 'Reward / Coin',
    navigation: screenName.rewards,
  },
  {
    id: 6,
    icon: svg.AboutUs,
    title: 'About Connplex',
    navigation: screenName.aboutUs,
  },
  {
    id: 7,
    icon: svg.Terms,
    title: 'Terms & Conditions',
    navigation: screenName.termsConditions,
  },
  {
    id: 8,
    icon: svg.PrivacyPolicy,
    title: 'Privacy Policy',
    navigation: screenName.privacyPolicy,
  },
  {
    id: 9,
    icon: svg.ContactUs,
    title: 'Contact Us',
    navigation: screenName.contactUs,
  },
  {
    id: 10,
    icon: svg.ApplyForFranchise,
    title: 'Apply For Franchise',
    navigation: screenName.applyFranchise,
  },
  // {
  //   id: 25,
  //   icon: svg.Merchantized,
  //   title: 'Merchandise',
  //   navigation: screenName.ecomHomePage,
  // },
  {
    id: 11,
    icon: svg.TwentyMinutesFranchise,
    title: '20 Minutes Franchise',
    navigation: screenName.twentyMinutesFranchise,
  },
  {
    id: 12,
    icon: svg.Regulations,
    title: 'Legal Notice',
    navigation: screenName.legalNotice,
  },
  {id: 13, icon: svg.Faq, title: 'FAQ', navigation: screenName.legalNotice},
  {
    id: 14,
    icon: svg.Delete,
    title: 'Delete Account',
    navigation: screenName.legalNotice,
  },
];
