import React, {FC} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import WebView from 'react-native-webview';
import image from '../../assets/imageIndex';
import {default as svg, default as SvgIndex} from '../../assets/svgIndex';
import {Button, CustomStatusBar, Input} from '../../components';
import constant from '../../services/config/constant';
import {color} from '../../theme';
import LoginModal from '../loginModal.ts/LoginModal';
import memebershipController from './memebership.controller';
import style from './memebership.style';

const Memebership: FC = () => {
  const {
    onSubscribe,
    onPlan,
    selectedPlan,
    list,
    loading,
    refreshing,
    refreshCall,
    isLoad,
    uri,
    paymentModal,
    onCancelPayment,
    onFailPayment,
    onSuccessPayment,
    transactionModal,
    setTransactionModal,
    transactionError,
    setTransactionError,
    cancelSpinner,
    cancelTransaction,
    visible,
    setVisible,
    getMembershipDurationText,
    navigation,
    onBuy,
    showModal,
    setCoupon,
    coupon,
    setShowModal,
    selectedItem,
    onApplyCouponCode,
    showLoaderCoupon,
    setShowLoaderCoupon,
    cartCalculation,
    setCartCalculation,
    onCloseModal,
    onCouponCall,
  } = memebershipController();

  return (
    <>
      <View style={style.main}>
        <ImageBackground
          style={style.main}
          source={image.authBackground}
          resizeMode="cover">
          <CustomStatusBar backgroundColor={color.inputBackground} />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={color.memberGradient}
            style={style.main}>
            <ScrollView
              contentContainerStyle={style.scrollView}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={refreshCall}
                  tintColor={color.white}
                />
              }>
              <View style={style.goPremiumContainer}>
                <svg.PremiumMemberWBg />
                <Text allowFontScaling={false} style={style.goPremiumText}>
                  MEMBERSHIP
                </Text>
              </View>
              {selectedPlan ? (
                <Text allowFontScaling={false} style={style.selectPlanText}>
                  Join membership by choosing your perfect option below
                </Text>
              ) : (
                <Text allowFontScaling={false} style={style.selectPlanText}>
                  Get started with basic savings and rewards
                </Text>
              )}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('termsConditions', {
                    type: 'membership',
                  });
                }}>
                <Text allowFontScaling={false} style={style.textStyle}>
                  Terms and Conditions
                </Text>
              </TouchableOpacity>

              {!refreshing && loading ? (
                <View style={style.centerText}>
                  <ActivityIndicator color={color.primary} size="small" />
                </View>
              ) : (
                <View style={style.planContainer}>
                  <FlatList
                    data={list}
                    contentContainerStyle={style.scroll}
                    renderItem={({item, index}) => {
                      let title = item?.title?.toLowerCase();
                      let info =
                        title == 'silver'
                          ? 'Get started with basic savings and rewards'
                          : title == 'gold'
                          ? 'Unlock special discounts and perks for a premium movie experience'
                          : 'Enjoy exclusive benefits like free tickets and VIP access';
                      return (
                        <View
                          style={[
                            style.parentView,
                            {borderWidth: selectedPlan != item?._id ? 0 : 1},
                          ]}>
                          <TouchableWithoutFeedback
                            onPress={() => onPlan(item)}>
                            <LinearGradient
                              colors={color.planGradient}
                              start={{
                                x: 0,
                                y:
                                  selectedPlan != item?._id
                                    ? 1
                                    : Platform.OS == 'ios'
                                    ? 1
                                    : 0,
                              }}
                              end={{x: 0, y: 0}}
                              style={[
                                style.detailContainer,
                                {
                                  borderBottomLeftRadius:
                                    selectedPlan != item?._id ? 14 : 0,
                                  borderBottomRightRadius:
                                    selectedPlan != item?._id ? 14 : 0,
                                },
                              ]}>
                              <View style={style.planParent}>
                                <Text
                                  allowFontScaling={false}
                                  style={[
                                    style.planSubscribeText,
                                    {flex: item?.currentPlan ? 0 : 1},
                                  ]}>
                                  {item?.title?.toUpperCase()}
                                </Text>
                                {item?.currentPlan && (
                                  <View style={style.currentPlan}>
                                    <svg.PremiumMember style={style.iconView} />
                                  </View>
                                )}
                                <View style={[style.priceContent]}>
                                  {item?.isDiscounted && (
                                    <Text
                                      allowFontScaling={false}
                                      style={style.priceText}>
                                      ₹{item?.price}
                                    </Text>
                                  )}
                                  <Text
                                    allowFontScaling={false}
                                    style={style.priceDurationText}>
                                    ₹
                                    {item?.isDiscounted
                                      ? item?.discountedPrice
                                      : item?.price}
                                    <Text
                                      allowFontScaling={false}
                                      style={style.durationText}>
                                      {'/ '}
                                      {getMembershipDurationText(
                                        item?.membershipDuration || '',
                                      )}
                                    </Text>
                                  </Text>
                                </View>
                              </View>
                            </LinearGradient>
                          </TouchableWithoutFeedback>
                          {selectedPlan == item?._id && (
                            <LinearGradient
                              colors={color.planGradient}
                              style={style.planContent}>
                              <Text style={style.labelText}>{info}</Text>
                              <View style={style.infoContainer}>
                                {/* {item?.discountOfFAndBUpTo ? (
                                  <>
                                    <SvgIndex.Tick style={style.topStyle} />
                                    <Text style={style.infoText}>
                                      Upto{' '}
                                      <Text style={style.title}>
                                        {item?.discountOfFAndBUpTo}%{' '}
                                        <Text style={style.infoText}>
                                          Discount on F&B to save on delicious
                                          snacks and drinks
                                        </Text>
                                      </Text>
                                    </Text>
                                  </>
                                ) : (
                                  <>
                                    <SvgIndex.CrossIcon
                                      style={style.topStyle}
                                    />
                                    <Text style={style.infoText}>
                                      No Discount on F&B
                                    </Text>
                                  </>
                                )} */}
                              </View>
                              <View style={style.infoContainer}>
                                {item?.discountOnTicketUpTo ? (
                                  <>
                                    <SvgIndex.Tick style={style.topStyle} />
                                    <Text style={style.infoText}>
                                      Upto{' '}
                                      <Text style={style.title}>
                                        {item?.discountOnTicketUpTo}%{' '}
                                        <Text style={style.infoText}>
                                          Discount on Tickets to get more movies
                                          for your money
                                        </Text>
                                      </Text>
                                    </Text>
                                  </>
                                ) : (
                                  <>
                                    <SvgIndex.CrossIcon
                                      style={style.topStyle}
                                    />
                                    <Text style={style.infoText}>
                                      No Discount on Tickets
                                    </Text>
                                  </>
                                )}
                              </View>
                              <View style={style.infoContainer}>
                                {item?.coins ? (
                                  <>
                                    <SvgIndex.Tick style={style.topStyle} />
                                    <Text style={style.infoText}>
                                      Upto{' '}
                                      <Text style={style.title}>
                                        {item?.coins}%{' '}
                                        <Text style={style.infoText}>
                                          Coins to earn rewards redeemable for
                                          tickets.
                                        </Text>
                                      </Text>
                                    </Text>
                                  </>
                                ) : (
                                  <>
                                    <SvgIndex.CrossIcon
                                      style={style.topStyle}
                                    />
                                    <Text style={style.infoText}>
                                      No Coins to earn Rewards
                                    </Text>
                                  </>
                                )}
                              </View>
                              <View style={style.infoContainer}>
                                {item?.welcomeGift == 'Yes' ? (
                                  <SvgIndex.Tick style={style.topStyle} />
                                ) : (
                                  <SvgIndex.CrossIcon style={style.topStyle} />
                                )}
                                <Text style={style.infoText}>
                                  {item?.welcomeGift == 'Yes'
                                    ? 'Welcome Gift to receive a special surprise when you join'
                                    : 'No Welcome Gift'}
                                </Text>
                              </View>
                              {!item?.currentPlan && (
                                <TouchableOpacity
                                  style={style.buttonContainer}
                                  onPress={() => onBuy(item)}>
                                  <Text
                                    allowFontScaling={false}
                                    style={style.buttonTitle}>
                                    Buy Now
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </LinearGradient>
                          )}
                        </View>
                      );
                    }}
                    ListEmptyComponent={() => (
                      <View style={style.centerText}>
                        <Text
                          allowFontScaling={false}
                          style={[
                            style.priceDurationText,
                            {color: color.golden},
                          ]}>
                          COMING SOON...
                        </Text>
                      </View>
                    )}
                  />
                </View>
              )}
            </ScrollView>
          </LinearGradient>
        </ImageBackground>
        <Modal visible={paymentModal} transparent={false}>
          <CustomStatusBar
            backgroundColor={color.white}
            barStyle={'dark-content'}
          />
          <View style={style.main}>
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
            <WebView
              originWhitelist={['*']}
              source={{html: `${uri}`}}
              javaScriptEnabled={true}
              setBuiltInZoomControls={false}
              setDisplayZoomControls={false}
              domStorageEnabled={true}
              startInLoadingState={true}
              onNavigationStateChange={(data: any) => {
                if (data.url.includes(constant.premiumFailPayment)) {
                  onFailPayment();
                }
                if (data.url.includes(constant.premiumSuccessPayment)) {
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
      </View>
      <Modal visible={showModal} onRequestClose={() => onCloseModal()}>
        <ImageBackground
          style={style.main}
          source={image.authBackground}
          resizeMode="cover">
          <CustomStatusBar backgroundColor={color.inputBackground} />

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={color.memberGradient}
            style={style.main}>
            <TouchableOpacity
              style={style.cross}
              onPress={() => onCloseModal()}>
              <SvgIndex.CrossIcon fill={color.white} height={20} width={20} />
            </TouchableOpacity>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : undefined}
              style={style.keyboardAvoid}>
              <ScrollView
                keyboardShouldPersistTaps="always"
                contentContainerStyle={[
                  style.scrollView,
                  {
                    paddingBottom: 150,
                  },
                ]}
                showsVerticalScrollIndicator={false}>
                <View style={{flex: 1}}>
                  <View style={style.goPremiumContainer}>
                    <svg.PremiumMemberWBg />
                    <Text allowFontScaling={false} style={style.goPremiumText}>
                      PURCHASE MEMBERSHIP
                    </Text>
                  </View>

                  <Text allowFontScaling={false} style={style.selectPlanText}>
                    You are currently selected {selectedItem.title} plan quickly
                    upgrade your plan
                  </Text>

                  <View style={style.planContainer}>
                    <View style={[style.parentView, {borderWidth: 1}]}>
                      <LinearGradient
                        colors={color.planGradient}
                        start={{
                          x: 0,
                          y: 1,
                        }}
                        end={{x: 0, y: 0}}
                        style={[style.detailContainer]}>
                        <View style={style.planParent}>
                          <Text
                            allowFontScaling={false}
                            style={[style.planSubscribeText]}>
                            {selectedItem?.title?.toUpperCase()}
                          </Text>
                          {selectedItem?.currentPlan && (
                            <View style={style.currentPlan}>
                              <svg.PremiumMember style={style.iconView} />
                            </View>
                          )}
                          <View style={[style.priceContent]}>
                            {selectedItem?.isDiscounted && (
                              <Text
                                allowFontScaling={false}
                                style={style.priceText}>
                                ₹{selectedItem?.price}
                              </Text>
                            )}
                            <Text
                              allowFontScaling={false}
                              style={style.priceDurationText}>
                              ₹
                              {selectedItem?.isDiscounted
                                ? selectedItem?.discountedPrice
                                : selectedItem?.price}
                              <Text
                                allowFontScaling={false}
                                style={style.durationText}>
                                {'/ '}
                                {getMembershipDurationText(
                                  selectedItem?.membershipDuration || '',
                                )}
                              </Text>
                            </Text>
                          </View>
                        </View>
                      </LinearGradient>

                      <LinearGradient
                        colors={color.planGradient}
                        style={style.planContent}>
                        <View style={style.infoContainer}>
                          {/* {selectedItem?.discountOfFAndBUpTo ? (
                            <>
                              <SvgIndex.Tick style={style.topStyle} />
                              <Text style={style.infoText}>
                                Upto{' '}
                                <Text style={style.title}>
                                  {selectedItem?.discountOfFAndBUpTo}%{' '}
                                  <Text style={style.infoText}>
                                    Discount on F&B to save on delicious snacks
                                    and drinks
                                  </Text>
                                </Text>
                              </Text>
                            </>
                          ) : (
                            <>
                              <SvgIndex.CrossIcon style={style.topStyle} />
                              <Text style={style.infoText}>
                                No Discount on F&B
                              </Text>
                            </>
                          )} */}
                        </View>
                        <View style={style.infoContainer}>
                          {selectedItem?.discountOnTicketUpTo ? (
                            <>
                              <SvgIndex.Tick style={style.topStyle} />
                              <Text style={style.infoText}>
                                Upto{' '}
                                <Text style={style.title}>
                                  {selectedItem?.discountOnTicketUpTo}%{' '}
                                  <Text style={style.infoText}>
                                    Discount on Tickets
                                  </Text>
                                </Text>
                              </Text>
                            </>
                          ) : (
                            <>
                              <SvgIndex.CrossIcon style={style.topStyle} />
                              <Text style={style.infoText}>
                                No Discount on Tickets
                              </Text>
                            </>
                          )}
                        </View>
                        <View style={style.infoContainer}>
                          {selectedItem?.coins ? (
                            <>
                              <SvgIndex.Tick style={style.topStyle} />
                              <Text style={style.infoText}>
                                Upto{' '}
                                <Text style={style.title}>
                                  {selectedItem?.coins}%{' '}
                                  <Text style={style.infoText}>
                                    Coins (Earn Rewards)
                                  </Text>
                                </Text>
                              </Text>
                            </>
                          ) : (
                            <>
                              <SvgIndex.CrossIcon style={style.topStyle} />
                              <Text style={style.infoText}>
                                No Coins to earn Rewards
                              </Text>
                            </>
                          )}
                        </View>
                        <View style={style.infoContainer}>
                          {selectedItem?.welcomeGift == 'Yes' ? (
                            <SvgIndex.Tick style={style.topStyle} />
                          ) : (
                            <SvgIndex.CrossIcon style={style.topStyle} />
                          )}
                          <Text style={style.infoText}>
                            {selectedItem?.welcomeGift == 'Yes'
                              ? 'Welcome Gift: Special surprise when you join.'
                              : 'No Welcome Gift'}
                          </Text>
                        </View>
                      </LinearGradient>
                    </View>

                    <View style={[style.parentView, {borderWidth: 1}]}>
                      <LinearGradient
                        colors={color.planGradient}
                        start={{
                          x: 0,
                          y: 1,
                        }}
                        end={{x: 0, y: 0}}
                        style={[style.detailContainer]}>
                        <View style={style.planParent}>
                          <Text
                            allowFontScaling={false}
                            style={[style.cartSummery]}>
                            Cart Summary
                          </Text>
                        </View>
                      </LinearGradient>

                      {selectedPlan == selectedItem?._id && (
                        <LinearGradient
                          colors={color.planGradient}
                          style={style.planContent}>
                          <View style={style.rowItem}>
                            <Text
                              allowFontScaling={false}
                              style={style.textTitle}>
                              Amount
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={style.textValue}>
                              ₹
                              {selectedItem?.isDiscounted
                                ? selectedItem?.discountedPrice
                                : selectedItem?.price}
                            </Text>
                          </View>
                          {cartCalculation?.totalDiscount && (
                            <View style={style.rowItem}>
                              <Text
                                allowFontScaling={false}
                                style={style.textTitle}>
                                Discount
                              </Text>
                              <Text
                                allowFontScaling={false}
                                style={style.textValue}>
                                ₹{cartCalculation.totalDiscount || 0}
                              </Text>
                            </View>
                          )}
                          <View style={style.itemLine} />
                          <View style={style.rowItem}>
                            <Text
                              allowFontScaling={false}
                              style={style.textTitle}>
                              Sub Total
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={style.textValue}>
                              ₹
                              {cartCalculation?.finalAmount
                                ? cartCalculation?.finalAmount
                                : selectedItem?.isDiscounted
                                ? selectedItem?.discountedPrice
                                : selectedItem?.price}
                            </Text>
                          </View>
                        </LinearGradient>
                      )}
                    </View>

                    {cartCalculation?.totalDiscount && (
                      <View style={[style.couponParent, {marginTop: 15}]}>
                        <Text style={style.applyCoupon}>
                          {coupon} Coupon applied
                        </Text>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => onCouponCall()}>
                          <Text style={style.removeCoupon}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {!cartCalculation.totalDiscount && (
                      <View style={style.couponContainer}>
                        <Input
                          placeholder="Enter your promocode"
                          value={coupon}
                          setValue={(text: string) => {
                            const reg = /[^a-zA-Z0-9]/g;
                            setCoupon(
                              text.replace(reg, '')?.trim().toUpperCase(),
                            );
                          }}
                          inputContainer={style.inputContainer}
                          inputMainContainer={style.inputMain}
                          inputStyle={style.input}
                          inputProps={{
                            placeholderTextColor: color.white,
                            autoCapitalize: 'characters',
                          }}
                          maxLength={20}
                        />
                        <Button
                          title="Apply"
                          titleStyle={style.addSnack}
                          containerStyle={style.applyButton}
                          onPress={() => {
                            onApplyCouponCode();
                          }}
                          isLoading={showLoaderCoupon}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </LinearGradient>

          <View style={style.buttonContainerPay}>
            <Button
              nestedText={`Proceed to pay`}
              title=""
              onPress={() => {
                onSubscribe();
              }}
              isLoading={loading}
              disabled={loading}
            />
          </View>
        </ImageBackground>
      </Modal>
      <LoginModal visible={visible} onClose={() => setVisible(false)} />
    </>
  );
};

export default Memebership;
