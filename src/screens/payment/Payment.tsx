import Slider from '@react-native-community/slider';
import moment from 'moment';
import React, {useRef} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import WebView from 'react-native-webview';
import {default as image, default as imageIndex} from '../../assets/imageIndex';
import {default as svg, default as SvgIndex} from '../../assets/svgIndex';
import {Button, CustomStatusBar, Header, Input} from '../../components';
import Spinner from '../../components/spinner/Spinner';
import constant from '../../services/config/constant';
import {color, font} from '../../theme';
import {
  calculateExclusiveGst,
  calculateGst,
} from '../../utility/functions/commonFunctions/gstCalculation';
import NumberModal from '../numberModal/NumberModal';
import SnacksList from '../snacksList/SnacksList';
import paymentController from './payment.controller';
import style from './payment.style';

const Payment: React.FC = () => {
  const {
    setCouponCode,
    couponCode,
    createOrder,
    route,
    modal,
    setModal,
    cancelModal,
    setCancelModal,
    cancelSpinner,
    cancelTransaction,
    movieDetails,
    details,
    onSnacks,
    snacks,
    onMoreFees,
    onMoreFood,
    more,
    loading,
    setTransactionModal,
    transactionModal,
    transactionError,
    sectionType,
    ticketCGST,
    ticketSGST,
    convenienceFees,
    CGST3D,
    SGST3D,
    paymentModal,
    uri,
    onFailPayment,
    onCancelPayment,
    onSuccessPayment,
    setTransactionError,
    onCouponCode,
    error,
    setError,
    onBackModal,
    cinemaData,
    pricePackage,
    onSkipModal,
    load,
    isNumberVisible,
    setIsNumberVisible,
    onCouponCall,
    couponData,
    isVisible,
    setIsVisible,
    checkPromo,
    isLoad,
    refreshing,
    refreshCall,
    staticCouponData,
    onApplyCall,
    total,
    totalAmount,
    finalAmount,
    discount,
    FNBTotal,
    discountableAmount,
    FNBDiscount,
    discountMerge,
    FNBDiscountMerge,
    cartCalculation,
    isAppliedCoupons,
    cinemaGSTToolTip,
    setCinemaGSTToolTip,
    fnbGSTToolTip,
    setFnbGSTToolTip,
    isTaxVisible,
    setIsTaxVisible,
    selectedSeatTime,
    sessionTime,
    timeLeft,
    expiredModal,
    rewardPoints,
    rewardModal,
    setRewardModal,
    selectedRewardPoints,
    setSelectedRewardPoints,
    appliedRewardPoints,
    setAppliedRewardPoints,
    setRewardPoints,
    applyReward,
    removeReward,
    spinnerLoading,
    stopPayment,
  } = paymentController();
  const disCountAmt = discount ?? 0;
  const disCountAmtMerge = discountMerge ?? 0;
  const FNBDiscountAmt = FNBDiscount ?? 0;
  const disFNBDiscountMerge = FNBDiscountMerge ?? 0;
  const injectedJavascript = `const meta = document.createElement('meta'); meta.setAttribute('name', 'viewport'); meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'); document.getElementsByTagName('head')[0].appendChild(meta);`;

  const foodList = snacks.map((item: any) => ({
    name: item.name,
    quantity: item.quantity,
    // price: Number(item.price).toFixed(2) * Number(item.quantity),
    price: Number(item.price) * Number(item.quantity),
  }));

  const newFoodDiscount = cartCalculation?.foodCart?.total.toFixed(2);

  const newFoodPrice = foodList.reduce(
    (acc: number, current: any) => acc + current.price,
    0,
  );

  const newMemberShipDiscount = newFoodPrice - (newFoodDiscount ?? 0);

  const latestMembershipDiscount =
    cartCalculation?.foodCart?.membershipDiscount +
    cartCalculation?.ticketCart?.membershipDiscount;

  const CGST =
    pricePackage == 'Y'
      ? (ticketCGST * details?.totalTicket) / 100
      : ticketCGST * details?.totalTicket;

  const SGST =
    pricePackage == 'Y'
      ? (ticketSGST * details?.totalTicket) / 100
      : ticketSGST * details?.totalTicket;

  const ticketPrice = details?.ticketPrice - CGST - SGST;
  const ticketAfterDis = ticketPrice - disCountAmt - disCountAmtMerge;

  const MVCGSTAFTERDIS = calculateExclusiveGst({
    gstPercentage: '9',
    price: ticketAfterDis,
  });

  const MVSGSTAFTERDIS = calculateExclusiveGst({
    gstPercentage: '9',
    price: ticketAfterDis,
  });

  const isFNBDisAvail = FNBDiscountAmt != 0 || FNBDiscountMerge != 0;
  const isCinemaDisAvail = disCountAmt != 0 || disCountAmtMerge != 0;

  const MVCGST = !isCinemaDisAvail ? CGST : MVCGSTAFTERDIS;
  const MVSGST = !isCinemaDisAvail ? SGST : MVSGSTAFTERDIS;

  const categories =
    movieDetails?.category != ''
      ? movieDetails?.category
          .split(/\r?\n,\r?\n/)
          .map((category: any) => category.trim())
      : [];

  const newSelectedSeat = new Set(details?.selectedSeat);
  const selectedSeat = [...newSelectedSeat];

  let totalStaticDiscountOf: any = 0;

  if (staticCouponData?.length > 0) {
    let discountPrice: any = 0;
    staticCouponData?.forEach(item => {
      if (item?.discountType == 'flat') {
        discountPrice = item?.discount;
      } else if (item?.discountType === '%') {
        const disAmount: any =
          item.couponType == 'Cinema' ? ticketPrice : FNBTotal;

        let checkDiscount = (disAmount * item?.discount) / 100;

        if (item?.couponUpTo > checkDiscount) {
          discountPrice = checkDiscount;
        } else {
          discountPrice = item?.couponUpTo;
        }
      }
      totalStaticDiscountOf =
        Number(totalStaticDiscountOf) + Number(discountPrice);
    });
  }

  const FNBTotalGST = calculateGst({
    gstPercentage: '5',
    price: FNBTotal ?? 0,
  });
  const FNBTotalWOGST = ((FNBTotal ?? 0) - FNBTotalGST)?.toFixed(2);
  const totalFNBAFTERDISWOGST = Number(
    (FNBTotal ?? 0) - FNBTotalGST - FNBDiscountAmt,
  ).toFixed(2);

  const FNBTotalGSTAfterDis = isFNBDisAvail
    ? calculateExclusiveGst({
        gstPercentage: '5',
        price: Number(FNBTotalWOGST) - FNBDiscountAmt - FNBDiscountMerge,
      })
    : 0;

  const finalTicketAmount = (
    ticketPrice -
    disCountAmt -
    disCountAmtMerge +
    MVCGST +
    MVSGST
  ).toFixed(2);
  const FNBGSTAMT = isFNBDisAvail ? FNBTotalGSTAfterDis : FNBTotalGST;
  const FNBGST = (FNBGSTAMT / 2).toFixed(2);

  const finalFNBAmount = (
    parseFloat(FNBTotalWOGST) -
    FNBDiscountAmt -
    FNBDiscountMerge +
    parseFloat(FNBGST) * 2
  ).toFixed(2);

  const finalAmountAfterDis = (
    ticketPrice -
    disCountAmt -
    disCountAmtMerge +
    MVCGST +
    MVSGST
  ).toFixed(2);

  const payAbleAmount = Number(finalTicketAmount) + Number(finalFNBAmount);
  const scrollRef = useRef<ScrollView>(null);

  const isCartCalculation = Object.keys(cartCalculation).length;

  const validCoupon = () => {
    const category = isAppliedCoupons[0]?.couponCategory;
    const cinemaPrice = cartCalculation?.ticketCart?.totalAfterDiscount;
    const fnbPrice = cartCalculation?.foodCart?.totalAfterDiscount;
    if (category == 'Private') return false;
    if (isAppliedCoupons?.length >= 2) return false;
    if (cinemaPrice == 0 || fnbPrice == 0) return false;
    return true;
  };

  const baseAmount =
    Number(cinemaData?.convenienceFees ?? '0') *
    Number(details?.totalTicket ?? '0');
  const gstAmount = baseAmount * 0.18;
  const taxAmount = baseAmount + gstAmount;

  const subTotal =
    Number(cartCalculation?.ticketCart?.ticketTotal ?? '0') +
    Number(newFoodPrice);
  const newSubTotal =
    cartCalculation?.foodCart?.totalAfterDiscount +
    cartCalculation?.ticketCart?.totalAfterDiscount -
    cartCalculation?.totalDiscount;
  // subTotal - latestMembershipDiscount - cartCalculation?.totalDiscount;
  const totalFinalAmount = newSubTotal + taxAmount;

  const finalSubTotal = Number(
    Number(cartCalculation.finalAmount) -
      Number(cartCalculation?.convenienceFeesObject?.total || 0),
  );

  return (
    <View style={style.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        backIcon
        onBack={() => {
          setError(undefined);
          setCancelModal(true);
        }}
        title="Confirm Booking"
        titleContainerStyle={style.titleContainer}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={style.keyboardAvoid}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={style.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshCall}
              tintColor={color.white}
            />
          }>
          <View style={style.movieParent}>
            <View style={style.movieContainer}>
              <Image
                source={
                  movieDetails?.poster
                    ? {uri: `${constant.imageURL}${movieDetails?.poster}`}
                    : image.noImageAvailable
                }
                style={style.poster}
              />
              <View style={style.detailContainer}>
                <Text allowFontScaling={false} style={style.movieTitle}>
                  {movieDetails?.name}
                </Text>
                <Text allowFontScaling={false} style={style.language}>
                  {movieDetails?.languages} ({movieDetails?.censorRating})
                </Text>
                {categories?.length > 0 && (
                  <>
                    {categories?.map((item: any, index: any) => (
                      <View style={style.movieTypeButton} key={index}>
                        <Text
                          allowFontScaling={false}
                          style={style.movieTypeButtonText}>
                          {item}
                        </Text>
                      </View>
                    ))}
                  </>
                )}
                <View style={style.timeContainer}>
                  <svg.Clock />
                  <Text allowFontScaling={false} style={style.dateTime}>
                    {moment(details?.time)?.format('DD MMM YYYY | hh:mm A')}
                  </Text>
                </View>
                <Text allowFontScaling={false} style={style.language}>
                  {details?.totalTicket}{' '}
                  {details?.totalTicket > 1 ? 'Tickets' : 'Ticket'}
                </Text>
                <Text allowFontScaling={false} style={style.selectedSeat}>
                  {/* {sectionType} - {selectedSeat?.join(', ')} */}
                  {sectionType} - {details?.selectedSeat?.sort().join(', ')}
                </Text>
              </View>
            </View>
            <Text
              allowFontScaling={false}
              style={style.displayText}
              numberOfLines={2}>
              {cinemaData?.displayName?.toUpperCase()}
            </Text>
            <View style={style.addressContainer}>
              <svg.TheatreLocation style={{top: 4}} />
              <Text
                allowFontScaling={false}
                style={[style.dateTime, {fontSize: 10}]}>
                {cinemaData?.address}
              </Text>
            </View>
          </View>
          {isCartCalculation != 0 ? (
            <>
              <View style={[style.container, {marginTop: 22}]}>
                <View style={style.amountContainer}>
                  <Text allowFontScaling={false} style={style.totalPrice}>
                    Ticket Price ({details?.totalTicket} x {sectionType})
                  </Text>
                  <Text allowFontScaling={false} style={style.amountValueText}>
                    ₹
                    {Number(
                      cartCalculation?.ticketCart?.ticketTotal ?? 0,
                    ).toFixed(2)}
                  </Text>
                </View>
                {foodList?.length != 0 && (
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={style.amountContainer}
                      disabled={true}
                      onPress={onMoreFood}>
                      <Text
                        allowFontScaling={false}
                        style={style.amountHeadingText}>
                        Food & Beverages
                      </Text>
                      <View style={style.arrowContainer}>
                        {/* {more.food ? (
                          <svg.DownArrow style={style.arrow} />
                        ) : (
                          <svg.DownArrow />
                        )} */}
                      </View>
                      <Text
                        allowFontScaling={false}
                        style={style.amountValueText}>
                        ₹
                        {Number(
                          cartCalculation?.foodCart?.fnbTotal ?? 0,
                        ).toFixed(2)}
                      </Text>
                    </TouchableOpacity>
                    <View style={style.foodContainer}>
                      {foodList?.map((item: any, index: number) => (
                        <View style={style.foodDetailContainer} key={index}>
                          <Text allowFontScaling={false} style={style.food}>
                            {item.quantity} x {item.name}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={style.foodPrice}>
                            ₹{item.price?.toFixed(2)}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {cartCalculation?.ticketCart?.membershipDiscount != 0 && (
                  <View style={style.discountView}>
                    <Text
                      allowFontScaling={false}
                      style={[style.amountHeadingText, {flex: 1}]}>
                      Membership Discount
                    </Text>
                    <Text allowFontScaling={false} style={style.totalAmount}>
                      ₹{Number(latestMembershipDiscount || 0).toFixed(2)}
                    </Text>
                  </View>
                )}
                {cartCalculation?.rewardDiscount != 0 && (
                  <View style={style.discountView}>
                    <Text
                      allowFontScaling={false}
                      style={[style.amountHeadingText, {flex: 1}]}>
                      Reward Discount
                    </Text>
                    <Text allowFontScaling={false} style={style.totalAmount}>
                      ₹{Number(cartCalculation?.rewardDiscount || 0).toFixed(2)}
                    </Text>
                  </View>
                )}
                {cartCalculation?.ticketCart?.discountAmount != 0 && (
                  <View style={style.discountView}>
                    <Text
                      allowFontScaling={false}
                      style={[style.amountHeadingText, {flex: 1}]}>
                      Discount
                    </Text>
                    <Text allowFontScaling={false} style={style.totalAmount}>
                      ₹{Number(cartCalculation?.totalDiscount ?? 0).toFixed(2)}
                    </Text>
                  </View>
                )}

                <View>
                  <View style={[style.totalAmountContainer]}>
                    <Text
                      allowFontScaling={false}
                      style={[style.amountHeadingText, {flex: 1}]}>
                      Sub Total
                    </Text>
                    <Text allowFontScaling={false} style={style.totalAmount}>
                      {/* ₹{chatnewSubTotal.toFixed(2)} */}
                      {finalSubTotal.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[style.amountContainer, {marginTop: 3}]}
                  onPress={() => setIsTaxVisible(!isTaxVisible)}>
                  <Text
                    allowFontScaling={false}
                    style={style.amountHeadingText}>
                    Taxes & Fees
                  </Text>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      borderRadius: 50,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: color.golden,
                      marginHorizontal: 15,
                    }}>
                    <svg.DownArrow
                      fill={color.golden}
                      style={{
                        transform: [{rotate: isTaxVisible ? '180deg' : '0deg'}],
                      }}
                    />
                  </View>
                  <Text
                    allowFontScaling={false}
                    style={[style.totalAmount, {flex: 1, textAlign: 'right'}]}>
                    {`₹${Number(
                      cartCalculation?.convenienceFeesObject?.total ?? '0.00',
                    ).toFixed(2)}`}
                  </Text>
                </TouchableOpacity>

                {isTaxVisible && (
                  <>
                    <View
                      style={[
                        style.amountContainer,
                        {marginTop: Platform.OS == 'android' ? 2 : 3},
                      ]}>
                      <Text
                        allowFontScaling={false}
                        style={[style.amountHeadingText, {flex: 1}]}>
                        Convenience Fee{'\n'}
                        <Text
                          allowFontScaling={false}
                          style={[
                            style.amountHeadingText,
                            {flex: 1, fontSize: 10},
                          ]}>
                          (SAC CODE: 995212)
                        </Text>
                      </Text>
                      <Text allowFontScaling={false} style={style.totalAmount}>
                        {`₹${Number(
                          cartCalculation?.convenienceFeesObject
                            ?.convenienceFees ?? '0.00',
                        ).toFixed(2)}`}
                      </Text>
                    </View>
                    <View style={[style.amountContainer, {marginTop: 3}]}>
                      <Text
                        allowFontScaling={false}
                        style={[style.amountHeadingText, {flex: 1}]}>
                        GST
                      </Text>
                      <Text allowFontScaling={false} style={style.totalAmount}>
                        {`₹${Number(
                          cartCalculation?.convenienceFeesObject?.gst ?? '0.00',
                        ).toFixed(2)}`}
                      </Text>
                    </View>
                    <View style={[style.amountContainer, {marginTop: 3}]}>
                      <Text
                        allowFontScaling={false}
                        style={[style.amountHeadingText, {flex: 1}]}>
                        GST Number
                      </Text>
                      <Text allowFontScaling={false} style={style.totalAmount}>
                        {cinemaData?.GSTNumber}
                      </Text>
                    </View>
                  </>
                )}
                <View style={style.totalAmountContainer}>
                  <Text
                    allowFontScaling={false}
                    style={[style.amountHeadingText, {flex: 1}]}>
                    Total Amount
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[
                      style.totalAmount,
                      {
                        fontFamily: font.poppinsMedium,
                      },
                    ]}>
                    ₹{cartCalculation.finalAmount.toFixed(2)}
                  </Text>
                </View>

                {
                  <>
                    {isAppliedCoupons[0]?.couponCategory == 'Private' ||
                      (isAppliedCoupons?.length < 1 && (
                        <>
                          <View style={style.couponContainer}>
                            <Input
                              placeholder="Enter your promocode"
                              value={couponCode}
                              setValue={(text: string) => {
                                const reg = /[^a-zA-Z0-9]/g;
                                setCouponCode(
                                  text.replace(reg, '')?.trim().toUpperCase(),
                                );
                              }}
                              inputContainer={style.inputContainer}
                              inputMainContainer={style.inputMain}
                              inputStyle={style.input}
                              inputProps={{
                                placeholderTextColor: color.white,
                                autoCapitalize: 'characters',
                                onFocus: () => {
                                  setTimeout(() => {
                                    scrollRef.current?.scrollToEnd({
                                      animated: true,
                                    });
                                  }, 500);
                                },
                              }}
                              maxLength={20}
                            />
                            <Button
                              title="Apply"
                              titleStyle={style.addSnack}
                              containerStyle={style.applyButton}
                              onPress={onCouponCode}
                              isLoading={isLoad}
                            />
                          </View>
                          {error && (
                            <Text
                              allowFontScaling={false}
                              style={style.errorText}>
                              {error}
                            </Text>
                          )}
                        </>
                      ))}
                  </>
                }
                {rewardPoints != 0 && (
                  /** Reward Redeem */
                  <TouchableOpacity
                    onPress={() => setRewardModal(true)}
                    style={{
                      height: 55,
                      borderWidth: 1,
                      borderColor: color.golden,
                      borderRadius: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 15,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <SvgIndex.Coin width={25} height={25} />
                      <Text
                        style={{
                          color: color.golden,
                          marginLeft: 10,
                          fontFamily: font.poppinsSemiBold,
                          fontSize: 13,
                        }}>
                        Redeem Reward Points - {appliedRewardPoints} pts
                      </Text>
                    </View>
                    {rewardPoints != appliedRewardPoints && (
                      <TouchableOpacity
                        hitSlop={10}
                        onPress={() => {
                          removeReward();
                        }}>
                        <SvgIndex.Close />
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                )}
              </View>
              {/* {staticCouponData[0]?.couponCategory != 'Private' && (
                <>
                  {((!couponData && isAppliedCoupons?.length == 0) ||
                    couponData?.mergeWithAnotherCoupon != 0) && (
                    <>
                      {isAppliedCoupons?.length < 1 && (
                        <TouchableOpacity
                          style={[
                            style.couponParent,
                            {marginTop: couponData ? 15 : 0},
                          ]}
                          activeOpacity={0.7}
                          onPress={onApplyCall}>
                          <Text style={style.applyCoupon}>Apply Coupon</Text>
                          <svg.DownArrow
                            fill={color.black}
                            style={style.arrow}
                          />
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                </>
              )} */}

              {isAppliedCoupons?.length > 0
                ? isAppliedCoupons?.map((item: any, index: number) => {
                    return (
                      <View style={[style.couponParent, {marginTop: 15}]}>
                        <Text style={style.applyCoupon}>
                          {item} Coupon applied
                        </Text>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => onCouponCall(item)}>
                          <Text style={style.removeCoupon}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })
                : couponData && (
                    <TouchableOpacity
                      style={[
                        style.couponParent,
                        {marginTop: couponData ? 15 : 0},
                      ]}
                      activeOpacity={0.7}
                      onPress={() => onCouponCall('')}>
                      <Text style={style.applyCoupon}>
                        `{couponData?.couponTitle}` applied
                      </Text>
                      <Text style={style.removeCoupon}>Remove</Text>
                    </TouchableOpacity>
                  )}
            </>
          ) : (
            <View style={style.noData}>
              <ActivityIndicator color={color.white} />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <Spinner visible={spinnerLoading} />
      <View style={style.buttonContainer}>
        <View style={style.timerContainer}>
          <Text style={style.timerText}>Session Ends in : {timeLeft}</Text>
        </View>
        <View>
          {isCartCalculation != 0 && (
            <Button
              nestedText={
                timeLeft == 'Time expired'
                  ? "Time's up"
                  : cartCalculation?.finalAmount <= 0
                  ? `BOOK TICKET`
                  : `Proceed to pay `
              }
              title=""
              onPress={() => {
                if (stopPayment) {
                  Snackbar.show({
                    text: 'Payment is currently unavailable.',
                    backgroundColor: color.red,
                  });
                } else {
                  createOrder();
                }
              }}
              isLoading={loading}
              gradient={
                timeLeft == 'Time expired'
                  ? color.buttonTransparentGradient
                  : color.buttonGradient
              }
              disabled={loading || timeLeft == 'Time expired'}
            />
          )}
        </View>
      </View>

      <Modal visible={modal} animationType="none" onRequestClose={onBackModal}>
        <SnacksList
          details={route?.params}
          onCancel={onSkipModal}
          onSnacks={data => {
            onSnacks(data);
          }}
          onBack={onBackModal}
          timer={timeLeft}
          load={load}
          // onBack={() => onBackModal()}
        />
      </Modal>

      <Modal
        visible={cancelModal}
        transparent
        onRequestClose={() => setCancelModal(false)}>
        <View style={style.modalView}>
          <View style={style.warningContainer}>
            <Text allowFontScaling={false} style={style.warningText}>
              Are you sure you want to cancel the transaction?
            </Text>
            <View style={style.modalButtonContainer}>
              <Button
                title="No"
                containerStyle={style.button}
                onPress={() => setCancelModal(false)}
                buttonTouchable={style.buttonTouchable}
                titleStyle={style.buttonTitle}
                gradient={color.termsGradient}
              />
              <Button
                title="Yes"
                containerStyle={style.button}
                isLoading={cancelSpinner}
                onPress={() => cancelTransaction('yes')}
                buttonTouchable={style.buttonTouchable}
                titleStyle={style.buttonTitle}
                gradient={color.termsGradient}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={expiredModal}
        transparent
        onRequestClose={() => setTransactionModal(false)}>
        <View style={style.modalView}>
          <View style={style.warningContainer}>
            <Text allowFontScaling={false} style={style.transaction}>
              Booking Time Expired{'\n'}Please try again
            </Text>
            <Button
              title="OK"
              containerStyle={style.transactionButton}
              isLoading={cancelSpinner}
              onPress={() => cancelTransaction('Expired')}
              buttonTouchable={style.buttonTouchable}
              titleStyle={style.buttonTitle}
              gradient={color.termsGradient}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={transactionModal}
        transparent
        onRequestClose={() => setTransactionModal(false)}>
        <View style={style.modalView}>
          <View style={style.warningContainer}>
            <Text allowFontScaling={false} style={style.transaction}>
              {transactionError}
            </Text>
            <Button
              title="OK"
              containerStyle={style.transactionButton}
              isLoading={cancelSpinner}
              onPress={() => cancelTransaction('fail')}
              buttonTouchable={style.buttonTouchable}
              titleStyle={style.buttonTitle}
              gradient={color.termsGradient}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={isVisible} transparent>
        <View style={style.modalView}>
          <View style={style.successCouponView}>
            <Image style={style.discountImage} source={imageIndex.discount} />
            <Text
              allowFontScaling={false}
              style={[style.transaction, {marginTop: 15}]}>
              {staticCouponData?.length > 0
                ? staticCouponData?.[1]?.couponTitle
                : `${couponData?.couponTitle}`}{' '}
              applied
            </Text>
            <Button
              title="Yay!!"
              containerStyle={[
                style.transactionButton,
                {paddingHorizontal: 30},
              ]}
              isLoading={cancelSpinner}
              onPress={() => setIsVisible(false)}
              titleStyle={style.buttonTitle}
              gradient={color.termsGradient}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={paymentModal} transparent={false}>
        <CustomStatusBar
          backgroundColor={color.white}
          barStyle={'dark-content'}
        />
        <View style={style.keyboardAvoid}>
          <View style={style.headerView}>
            <Text allowFontScaling={false} style={style.headerText}>
              Payment
            </Text>
            <TouchableOpacity
              style={style.sheetClose}
              onPress={() => {
                onCancelPayment();
                setTransactionError('Transaction cancelled');
              }}>
              <svg.CloseIcon fill={color.black} />
            </TouchableOpacity>
          </View>
          <View
            style={[
              style.timerContainer,
              {
                backgroundColor: color.whiteBackground,
              },
            ]}>
            <Text
              style={[
                style.timerText,
                {
                  color: color.black,
                },
              ]}>
              Session Ends in : {timeLeft}
            </Text>
          </View>
          <WebView
            originWhitelist={['*']}
            source={{html: `${uri}`}}
            javaScriptEnabled={true}
            setBuiltInZoomControls={false}
            setDisplayZoomControls={false}
            domStorageEnabled={true}
            startInLoadingState={true}
            injectedJavaScript={injectedJavascript}
            onNavigationStateChange={(data: any) => {
              if (data.url.includes(constant.failPayment)) {
                onFailPayment();
              }
              if (data.url.includes(constant.successPayment)) {
                onSuccessPayment();
              }
            }}
            onShouldStartLoadWithRequest={(request: any) => {
              const {url} = request;
              if (
                url.includes('phonepe://pay?') ||
                url.includes('paytmmp://pay?') ||
                url.includes('tez://upi/pay?') ||
                url.includes('upi://pay?')
              ) {
                Linking.openURL(url);
                return false;
              }
              return true;
            }}
          />
        </View>
      </Modal>

      <NumberModal
        visible={isNumberVisible}
        onClose={() => setIsNumberVisible(false)}
      />

      <Modal visible={rewardModal} animationType="fade" transparent>
        <View style={style.modalView}>
          <View style={style.rewardModalCard}>
            {/* Header row */}
            <View style={style.rewardHeaderRow}>
              <View style={style.rewardTitleRow}>
                <SvgIndex.Coin width={22} height={22} />
                <Text allowFontScaling={false} style={style.rewardTitle}>
                  Redeem Reward Points
                </Text>
              </View>
              <View style={style.rewardBadge}>
                <Text allowFontScaling={false} style={style.rewardBadgeText}>
                  {rewardPoints} pts available
                </Text>
              </View>
            </View>

            {/* Subtitle */}
            <Text allowFontScaling={false} style={style.rewardSubtitle}>
              10 points = ₹1 · Max 2,000 points per transaction
            </Text>

            {/* Slider + Points to use */}
            <View style={style.rewardSliderRow}>
              <View style={style.rewardSliderArea}>
                <Slider
                  style={{width: '100%', height: 40}}
                  minimumValue={0}
                  maximumValue={Math.min(rewardPoints, 2000)}
                  step={1}
                  value={selectedRewardPoints}
                  onValueChange={val => setSelectedRewardPoints(val)}
                  minimumTrackTintColor={color.golden}
                  maximumTrackTintColor="#3A3025"
                  thumbTintColor={color.golden}
                />
                <View style={style.rewardSliderLabels}>
                  <Text
                    allowFontScaling={false}
                    style={style.rewardSliderLabel}>
                    0
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={style.rewardSliderLabel}>
                    {Math.min(rewardPoints, 2000)}
                  </Text>
                </View>
              </View>
              <View style={style.rewardPointsBox}>
                <Text allowFontScaling={false} style={style.rewardPointsLabel}>
                  POINTS TO USE
                </Text>
                <Text allowFontScaling={false} style={style.rewardPointsValue}>
                  {selectedRewardPoints}
                </Text>
              </View>
            </View>

            {/* Stats row */}
            <View style={style.rewardStatsRow}>
              <View style={[style.rewardStatBox, style.rewardStatBorderRight]}>
                <Text allowFontScaling={false} style={style.rewardStatLabel}>
                  POINTS USED
                </Text>
                <Text allowFontScaling={false} style={style.rewardStatValue}>
                  {selectedRewardPoints}
                </Text>
              </View>
              <View style={[style.rewardStatBox, style.rewardStatBorderRight]}>
                <Text allowFontScaling={false} style={style.rewardStatLabel}>
                  DISCOUNT
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[style.rewardStatValue, {color: '#4CAF50'}]}>
                  ₹{Math.floor(selectedRewardPoints / 10)}
                </Text>
              </View>
              <View style={style.rewardStatBox}>
                <Text allowFontScaling={false} style={style.rewardStatLabel}>
                  REMAINING
                </Text>
                <Text allowFontScaling={false} style={style.rewardStatValue}>
                  {rewardPoints - selectedRewardPoints}
                </Text>
              </View>
            </View>

            {/* Buttons */}
            <View style={style.rewardButtonRow}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={style.rewardCancelButton}
                onPress={() => {
                  setSelectedRewardPoints(0);
                  setRewardModal(false);
                }}>
                <Text allowFontScaling={false} style={style.rewardCancelText}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={style.rewardApplyButton}
                onPress={() => {
                  applyReward();
                }}>
                <Text allowFontScaling={false} style={style.rewardApplyText}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Payment;
