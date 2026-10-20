import moment from 'moment';
import React from 'react';
import {ActivityIndicator, Image, ScrollView, Text, View} from 'react-native';
import SvgIndex from '../../assets/svgIndex';
import {CustomStatusBar, Header} from '../../components';
import constant from '../../services/config/constant';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import {capitalizeFirstLetter} from '../../utility/validation/stringValidation';
import styles from './membershipDetail.style';
import useMemberShipDetails from './useMemberShipDetails';

const MemberShipDetails = () => {
  const {
    detail,
    userData,
    imageSpinner,
    setImageSpinner,
    formattedDurationText,
    premiumData,
    loading,
    getMembershipDurationText,
  } = useMemberShipDetails();

  const {onBack} = commonFunctions();

  let info =
    detail?.subscription?.title == 'silver'
      ? 'Get started with basic savings and rewards'
      : detail?.subscription?.title == 'gold'
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
              {detail?.subscriptionEndDate && (
                <Text style={styles.noteText}>
                  This plan will expire on{' '}
                  {moment(detail?.subscriptionEndDate).format('DD MMM YYYY')}
                </Text>
              )}
              <View style={styles.planContent}>
                <Text style={styles.titleText}>
                  {capitalizeFirstLetter(detail?.subscription?.title)}
                </Text>
                <View style={[styles.priceContent]}>
                  {detail?.isDiscounted && (
                    <Text allowFontScaling={false} style={styles.priceText}>
                      ₹{detail?.price}
                    </Text>
                  )}
                  <Text
                    allowFontScaling={false}
                    style={styles.priceDurationText}>
                    ₹
                    {detail?.isDiscounted
                      ? detail?.discountedPrice
                      : detail?.price}
                    <Text allowFontScaling={false} style={styles.durationText}>
                      {'/ '}
                      {getMembershipDurationText(
                        detail?.membershipDuration || '',
                      )}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.lineView} />
              <Text style={styles.labelText}>{info}</Text>
              <View style={styles.infoContainer}>
                {/* {detail?.discountOfFAndBUpTo ? (
                  <>
                    <SvgIndex.Tick style={styles.icon} />
                    <Text style={styles.infoText}>
                      Upto{' '}
                      <Text style={styles.infoMainText}>
                        {detail?.discountOfFAndBUpTo}%{' '}
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
                {detail?.discountOnTicketUpTo ? (
                  <>
                    <SvgIndex.Tick style={styles.icon} />
                    <Text style={styles.infoText}>
                      Upto{' '}
                      <Text style={styles.infoMainText}>
                        {detail?.discountOnTicketUpTo}%{' '}
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
                {detail?.coins ? (
                  <>
                    <SvgIndex.Tick style={styles.icon} />
                    <Text style={styles.infoText}>
                      Upto{' '}
                      <Text style={styles.infoMainText}>
                        {detail?.coins}%{' '}
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
                {detail?.welcomeGift == 'Yes' ? (
                  <SvgIndex.Tick style={styles.icon} />
                ) : (
                  <SvgIndex.CrossIcon style={styles.icon} />
                )}
                <Text style={styles.infoText}>
                  {detail?.welcomeGift == 'Yes'
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

export default MemberShipDetails;
