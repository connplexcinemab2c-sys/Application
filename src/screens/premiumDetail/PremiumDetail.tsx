import moment from 'moment';
import React from 'react';
import {ActivityIndicator, Image, ScrollView, Text, View} from 'react-native';
import SvgIndex from '../../assets/svgIndex';
import {CustomStatusBar, Header} from '../../components';
import constant from '../../services/config/constant';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import {capitalizeFirstLetter} from '../../utility/validation/stringValidation';
import premiumDetailController from './premiumDetail.controller';
import styles from './premiumDetail.style';

const PremiumDetail = () => {
  const {
    detail,
    userData,
    imageSpinner,
    setImageSpinner,
    formattedDurationText,
    premiumData,
    loading,
    getMembershipDurationText,
  } = premiumDetailController();

  const {onBack} = commonFunctions();
  let info =
    detail?.subscriptionId?.title == 'silver'
      ? 'Get started with basic savings and rewards'
      : premiumData?.subscriptionId?.title == 'gold'
      ? 'Unlock special discounts and perks for a premium movie experience'
      : 'Enjoy exclusive benefits like free tickets and VIP access';

  return (
    <View style={styles.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        title="Membership Details"
        onBack={onBack}
        backIcon
        containerStyle={styles.title}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyle}>
        {loading ? (
          <View style={{marginTop: '60%'}}>
            <ActivityIndicator size="large" color={color.white} />
          </View>
        ) : (
          <View>
            <View style={styles.mainView}>
              {imageSpinner && (
                <ActivityIndicator
                  color={color.gray}
                  style={styles.indicator}
                />
              )}
              {userData?.profile?.length ? (
                <Image
                  source={{uri: `${constant.imageURL}${userData?.profile}`}}
                  style={styles.profile}
                  resizeMode="cover"
                  onLoadStart={() => setImageSpinner(true)}
                  onLoadEnd={() => setImageSpinner(false)}
                />
              ) : (
                <View style={styles.userProfile}>
                  {userData?.gender === 'Female' ? (
                    <SvgIndex.Female />
                  ) : (
                    <SvgIndex.Male />
                  )}
                </View>
              )}
              <View
                style={[
                  styles.iconView,
                  {bottom: userData?.profile?.length ? 5 : 10},
                ]}>
                <SvgIndex.PremiumMember fill={color.white} />
              </View>
              <Text allowFontScaling={false} style={styles.name}>
                {userData?.firstName
                  ? `${userData?.firstName} ${
                      userData?.lastName ? userData?.lastName : ''
                    }`
                  : 'Guest User'}
              </Text>
              {detail?.isActive && (
                <Text style={styles.noteText}>
                  Your current plan expires on{' '}
                  {moment(detail?.subscriptionEndDate).format('DD MMM YYYY')}
                </Text>
              )}
              <View style={styles.planContent}>
                <Text style={styles.titleText}>
                  {capitalizeFirstLetter(detail?.subscriptionId?.title)}
                </Text>

                <View style={[styles.priceContent]}>
                  {detail?.subscriptionDetails?.isDiscounted && (
                    <Text allowFontScaling={false} style={styles.priceText}>
                      ₹{detail?.subscriptionDetails?.price}
                    </Text>
                  )}
                  <Text
                    allowFontScaling={false}
                    style={styles.priceDurationText}>
                    ₹
                    {detail?.subscriptionDetails?.isDiscounted
                      ? detail?.subscriptionDetails?.discountedPrice
                      : detail?.subscriptionDetails?.price}
                    <Text allowFontScaling={false} style={styles.durationText}>
                      {'/ '}
                      {getMembershipDurationText(
                        detail?.subscriptionDetails?.membershipDuration || '',
                      )}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.lineView} />
              <Text style={styles.labelText}>{info}</Text>
              <View style={styles.infoContainer}>
                {/* {detail?.subscriptionDetails?.discountOfFAndBUpTo ? (
                  <>
                    <SvgIndex.Tick style={styles.icon} />
                    <Text style={styles.infoText}>
                      Upto{' '}
                      <Text style={styles.infoMainText}>
                        {detail?.subscriptionDetails?.discountOfFAndBUpTo}%{' '}
                        <Text style={styles.infoText}>
                          Discount on F&B to save on delicious snacks and drinks
                        </Text>
                      </Text>
                    </Text>
                  </>
                ) : (
                  <>
                    <SvgIndex.CrossIcon style={styles.icon} />
                    <Text style={styles.infoText}>No Discount on F&B</Text>
                  </>
                )} */}
              </View>
              <View style={styles.infoContainer}>
                {detail?.subscriptionDetails?.discountOnTicketUpTo ? (
                  <>
                    <SvgIndex.Tick style={styles.icon} />
                    <Text style={styles.infoText}>
                      Upto{' '}
                      <Text style={styles.infoMainText}>
                        {detail?.subscriptionDetails?.discountOnTicketUpTo}%{' '}
                        <Text style={styles.infoText}>
                          Discount on Tickets to get more movies for your money
                        </Text>
                      </Text>
                    </Text>
                  </>
                ) : (
                  <>
                    <SvgIndex.CrossIcon style={styles.icon} />
                    <Text style={styles.infoText}>No Discount on Tickets</Text>
                  </>
                )}
              </View>

              <View style={styles.infoContainer}>
                {detail?.subscriptionDetails?.coins ? (
                  <>
                    <SvgIndex.Tick style={styles.icon} />
                    <Text style={styles.infoText}>
                      Upto{' '}
                      <Text style={styles.infoMainText}>
                        {detail?.subscriptionDetails?.coins}%{' '}
                        <Text style={styles.infoText}>
                          Coins to earn rewards redeemable for tickets.
                        </Text>
                      </Text>
                    </Text>
                  </>
                ) : (
                  <>
                    <SvgIndex.CrossIcon style={styles.icon} />
                    <Text style={styles.infoText}>
                      No Coins to earn Rewards
                    </Text>
                  </>
                )}
              </View>
              <View style={styles.infoContainer}>
                {detail?.subscriptionDetails?.welcomeGift == 'Yes' ? (
                  <SvgIndex.Tick style={styles.icon} />
                ) : (
                  <SvgIndex.CrossIcon style={styles.icon} />
                )}
                <Text style={styles.infoText}>
                  {detail?.subscriptionDetails?.welcomeGift == 'Yes'
                    ? 'Welcome Gift to receive a special surprise when you join'
                    : 'No Welcome Gift'}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PremiumDetail;
