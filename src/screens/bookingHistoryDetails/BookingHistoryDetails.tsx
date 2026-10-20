import moment from 'moment';
import React from 'react';
import {Image, RefreshControl, ScrollView, Text, View} from 'react-native';
import image from '../../assets/imageIndex';
import svg from '../../assets/svgIndex';
import {BookingDetailShimmer, CustomStatusBar, Header} from '../../components';
import QRCode from '../../components/qrCode/QrCode';
import constant from '../../services/config/constant';
import {color, font} from '../../theme';
import bookingHistoryDetailsController from './bookingHistoryDetails.controller';
import style from './bookingHistoryDetails.style';

const BookingHistoryDetails = () => {
  const {
    details,
    loading,
    total,
    foodTotalWithGST,
    imageSpinner,
    onImageLoad,
    onShare,
    convenienceFees,
    totalTickets,
    ticketCGST,
    ticketSGST,
    refreshing,
    refreshCall,
    onBackCall,
    cinemaGSTToolTip,
    setCinemaGSTToolTip,
    fnbGSTToolTip,
    setFnbGSTToolTip,
  } = bookingHistoryDetailsController();

  const ticketAmount =
    details?.commitBookingData?.curTicketsTotal -
    ticketCGST * totalTickets -
    ticketSGST * totalTickets;
  const baseAmount =
    Number(details?.cinemaId?.convenienceFees ?? 0) *
    Number(
      details?.setSeatData?.strSeatInfo?.split('-')[1]?.split(',')?.length ??
        '0',
    );
  const gstAmount = baseAmount * 0.18;
  const taxAmount = baseAmount + gstAmount;
  const totalamount = details?.finalBookingCalculation?.finalAmount;

  const originalFoodPrice = details?.fAndBDetails?.reduce(
    (acc, item) => acc + Number(item.price ?? 0),
    0,
  );

  const discountedFoodPrice =
    details?.finalBookingCalculation?.foodCart?.totalAfterDiscount ?? 0;

  const getDiscountCoke = originalFoodPrice - discountedFoodPrice;
  const ticketMembershipDiscount =
    details?.finalBookingCalculation?.ticketCart?.membershipDiscount ?? 0;

  const foodMembershipDiscount =
    details?.finalBookingCalculation?.foodCart?.membershipDiscount ?? 0;

  const newMembershipDiscount =
    ticketMembershipDiscount + foodMembershipDiscount;

  const totalAmountValue = Number(totalamount ?? 0);

  const convenienceFeeValue = Number(
    details?.finalBookingCalculation?.convenienceFeesObject?.total ?? 0,
  );

  const newSubTotal = totalAmountValue - convenienceFeeValue;

  const newSubTotalFormatted = `₹${newSubTotal.toFixed(2)}`;

  return (
    <View style={style.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        title="Booking History Details"
        titleContainerStyle={style.titleContainer}
        onBack={onBackCall}
        backIcon
        containerStyle={style.title}
        rightIcon={svg.Share}
        onRightIcon={onShare}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshCall}
            tintColor={color.white}
          />
        }>
        {!refreshing && loading ? (
          <BookingDetailShimmer />
        ) : details ? (
          <View style={style.ticketInfoContainer}>
            <View style={style.movieDetailsContainer}>
              <Image
                source={
                  details?.movieId?.poster
                    ? {
                        uri: `${constant.imageURL}${details?.movieId?.poster}`,
                      }
                    : image.noImageAvailable
                }
                style={style.poster}
              />
              <View style={style.detailsContainer}>
                <Text allowFontScaling={false} style={style.movieTitle}>
                  {details?.movieId?.name}
                </Text>
                <Text allowFontScaling={false} style={style.language}>
                  {details?.movieId?.languages} (
                  {details?.movieId?.censorRating})
                  {details?.movieId?.category &&
                    ` - ${
                      details?.movieId?.category
                        ? details?.movieId?.category.replace(/\r\n/g, '')
                        : '-'
                    }`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[style.movieTitle, {fontSize: 14}]}>
                  {moment(details?.showId?.sessionRealShow)?.format(
                    'DD MMM YYYY | hh:mm A',
                  )}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[style.location, {fontFamily: font.poppinsSemiBold}]}>
                  {details?.cinemaId?.displayName}
                </Text>
                <Text allowFontScaling={false} style={style.location}>
                  {details?.cinemaId?.address}
                </Text>
              </View>
            </View>
            <View style={style.semiCircleContainer}>
              <View style={style.circle}>
                <View style={style.leftSemiCircle} />
              </View>
              <View style={style.middleView} />
              <View style={style.circle}>
                <View style={style.rightSemiCircle} />
              </View>
            </View>
            <View
              style={[
                style.ticketDetailsContainer,
                {
                  opacity:
                    details?.commitStatus && details?.paymentsStatus ? 1 : 0.3,
                },
              ]}>
              <View style={style.ticketsView}>
                <Text allowFontScaling={false} style={style.totalTickets}>
                  {
                    details?.setSeatData?.strSeatInfo?.split('-')[1]?.split(',')
                      ?.length
                  }{' '}
                  {details?.setSeatData?.strSeatInfo?.split('-')[1]?.split(',')
                    ?.length > 1
                    ? 'Tickets'
                    : 'Ticket'}
                </Text>
                <Text allowFontScaling={false} style={style.screenName}>
                  {details?.showId?.screenName}
                </Text>
                <Text allowFontScaling={false} style={style.tickets}>
                  {details?.setSeatData?.strSeatInfo?.split('-')[0]} -{' '}
                  {details?.setSeatData?.strSeatInfo?.split('-')[1]}
                </Text>
                <Text allowFontScaling={false} style={style.bookingId}>
                  Booking ID : {details?.addSeatData?.strBookId}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[style.bookingId, {marginTop: 5}]}>
                  Order ID : {details?.initTransId}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[style.bookingId, {marginTop: 5}]}>
                  Status :{' '}
                  <Text
                    allowFontScaling={false}
                    style={[
                      style.bookingId,
                      {
                        marginTop: 5,
                        color: details?.commitStatus ? color.green : color.red,
                      },
                    ]}>
                    {details?.commitStatus ? 'BOOKED' : 'FAILED'}
                  </Text>
                </Text>
              </View>
              {details?.commitStatus && details?.paymentsStatus ? (
                <View style={style.qrCode}>
                  <QRCode
                    url={details?.addSeatData?.strBookId}
                    size={100}
                    backgroundColor="white"
                    logoBackgroundColor="transparent"
                  />
                </View>
              ) : (
                <Image source={image.ticketFailed} style={style.ticketBooked} />
              )}
            </View>
            {/* <View style={style.supportContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={style.cancelContainer}
                disabled>
                <svg.Cancellation />
                <Text allowFontScaling={false} style={style.cancelBooking}>
                  Cancel Booking
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={style.cancelContainer}
                disabled>
                <svg.Support />
                <Text allowFontScaling={false} style={style.cancelBooking}>
                  Contact Support
                </Text>
              </TouchableOpacity>
            </View> */}
            <View>
              <View style={[style.detailAmount, {marginTop: 20}]}>
                <Text allowFontScaling={false} style={style.amountHeadingText}>
                  Ticket Price :
                </Text>
                <Text allowFontScaling={false} style={style.amountValueText}>
                  ₹
                  {Number(
                    details?.finalBookingCalculation?.ticketCart?.ticketTotal,
                  )?.toFixed(2)}
                </Text>
              </View>
              {details?.finalBookingCalculation?.ticketCart
                ?.membershipDiscount != 0 && (
                <View style={style.detailAmount}>
                  <Text
                    allowFontScaling={false}
                    style={style.amountHeadingText}>
                    Membership Discount :
                  </Text>
                  <Text allowFontScaling={false} style={style.amountValueText}>
                    - {`₹${newMembershipDiscount.toFixed(2)}`}
                    {/* {Number(
                      details?.finalBookingCalculation?.ticketCart
                        ?.membershipDiscount,
                    )?.toFixed(2)} */}
                  </Text>
                </View>
              )}
              {details?.finalBookingCalculation?.rewardCoinsRedeemed != 0 && (
                <View style={style.detailAmount}>
                  <Text
                    allowFontScaling={false}
                    style={style.amountHeadingText}>
                    Reward Points Applied (
                    {details?.finalBookingCalculation?.rewardCoinsRedeemed} pts)
                    :
                  </Text>
                  <Text allowFontScaling={false} style={style.amountValueText}>
                    -{' '}
                    {`₹${parseFloat(
                      details?.finalBookingCalculation?.rewardDiscountApplied,
                    ).toFixed(2)}`}
                    {/* {Number(
                      details?.finalBookingCalculation?.ticketCart
                        ?.membershipDiscount,
                    )?.toFixed(2)} */}
                  </Text>
                </View>
              )}
              {details?.finalBookingCalculation?.ticketCart?.discountAmount !=
                0 && (
                <View style={style.detailAmount}>
                  <Text
                    allowFontScaling={false}
                    style={style.amountHeadingText}>
                    Discount :
                  </Text>
                  <Text allowFontScaling={false} style={style.amountValueText}>
                    ₹
                    {Number(
                      details?.finalBookingCalculation?.ticketCart
                        ?.discountAmount,
                    )?.toFixed(2)}
                  </Text>
                </View>
              )}
              {/* {details?.finalBookingCalculation?.ticketCart
                ?.totalAfterDiscount != 0 && (
                <View style={style.detailAmount}>
                  <Text
                    allowFontScaling={false}
                    style={style.amountHeadingText}>
                    Total After Discount :
                  </Text>
                  <Text allowFontScaling={false} style={style.amountValueText}>
                    ₹{Number(
                      details?.finalBookingCalculation?.ticketCart
                        ?.totalAfterDiscount ?? 0,
                    )?.toFixed(2)}
                  </Text>
                </View>
              )} */}
              {/* <View style={style.amountContainer}>
                <View style={style.tooltipContainer}>
                  <Text style={style.totalPriceToolTip} allowFontScaling>
                    GST
                  </Text>
                  <Tooltip
                    isVisible={cinemaGSTToolTip}
                    onClose={() => setCinemaGSTToolTip(false)}
                    content={
                      <Text
                        allowFontScaling={false}
                        style={style.toolTipsLabel}>
                        CGST (
                        {details?.finalBookingCalculation?.ticketCart
                          ?.totalAfterDiscount <= 115
                          ? '6%'
                          : '9%'}
                        ){'\n'}SGST (
                        {details?.finalBookingCalculation?.ticketCart
                          ?.totalAfterDiscount <= 115
                          ? '6%'
                          : '9%'}
                        )
                      </Text>
                    }>
                    <TouchableOpacity
                      onPress={() => setCinemaGSTToolTip(true)}
                      style={style.tooltipButton}>
                      <svg.ToolTipIcon />
                    </TouchableOpacity>
                  </Tooltip>
                </View>
                <Text allowFontScaling={false} style={style.amountValueText}>
                  ₹
                  {parseFloat(
                    details?.finalBookingCalculation?.ticketCart?.cgst +
                      details?.finalBookingCalculation?.ticketCart?.sgst,
                  ).toFixed(2)}
                </Text>
              </View> */}
              {/* <View style={style.detailAmount}>
                <Text allowFontScaling={false} style={style.amountHeadingText}>
                  Sub Total :
                </Text>
                <Text allowFontScaling={false} style={style.amountValueText}>
                  ₹
                  {Number(
                    details?.finalBookingCalculation?.ticketCart?.total,
                  )?.toFixed(2)}
                </Text>
              </View> */}
              {details?.fAndBDetails?.length != 0 && (
                <View>
                  <View style={style.detailAmount}>
                    <Text
                      allowFontScaling={false}
                      style={style.amountHeadingText}>
                      Food & Beverages Amount :
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={style.amountValueText}>
                      ₹
                      {Number(
                        details?.finalBookingCalculation?.foodCart?.fnbTotal,
                      ).toFixed(2)}
                    </Text>
                  </View>
                  <View style={style.foodContainer}>
                    {details?.fAndBDetails?.map((item: any, index: number) => (
                      <View style={style.foodDetailContainer} key={index}>
                        <Text allowFontScaling={false} style={style.food}>
                          {item.quantity} x {item.name}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={[style.amountValueText, {fontSize: 12}]}>
                          ₹{item.price?.toFixed(2)}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
              {/* {details?.finalBookingCalculation?.foodCart?.membershipDiscount !=
                0 && (
                <View style={style.detailAmount}>
                  <Text
                    allowFontScaling={false}
                    style={style.amountHeadingText}>
                    Membership Discount :
                  </Text>
                  <Text allowFontScaling={false} style={style.amountValueText}>
                    ₹
                    {Number(
                      details?.finalBookingCalculation?.foodCart
                        ?.membershipDiscount,
                    )?.toFixed(2)}
                  </Text>
                </View>
              )} */}
              {/* {details?.finalBookingCalculation?.foodCart?.basePrice != 0 && (
                <>
                  {details?.finalBookingCalculation?.foodCart?.discountAmount !=
                    0 && (
                    <View style={style.detailAmount}>
                      <Text
                        allowFontScaling={false}
                        style={style.amountHeadingText}>
                        Discount :
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={style.amountValueText}>
                        ₹
                        {Number(
                          details?.finalBookingCalculation?.foodCart
                            ?.discountAmount,
                        )?.toFixed(2)}
                      </Text>
                    </View>
                  )}
                  {details?.finalBookingCalculation?.foodCart
                    ?.totalAfterDiscount != 0 && (
                    <View style={style.detailAmount}>
                      <Text
                        allowFontScaling={false}
                        style={style.amountHeadingText}>
                        Total After Discount :
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={style.amountValueText}>
                        ₹
                        {Number(
                          details?.finalBookingCalculation?.foodCart
                            ?.totalAfterDiscount,
                        )?.toFixed(2)}
                      </Text>
                    </View>
                  )}
                  <View style={style.foodContainer}>
                    {details?.fAndBDetails?.map((item: any, index: number) => (
                      <View style={style.foodDetailContainer} key={index}>
                        <Text allowFontScaling={false} style={style.food}>
                          {item.name} ( {`x ${item.quantity}`} )
                        </Text>
                        <Text allowFontScaling={false} style={style.foodPrice}>
                          ₹ {item.price?.toFixed(2)}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View style={style.amountContainer}>
                    <View style={style.tooltipContainer}>
                      <Text style={style.totalPriceToolTip} allowFontScaling>
                        GST
                      </Text>
                      <Tooltip
                        isVisible={fnbGSTToolTip}
                        onClose={() => setFnbGSTToolTip(false)}
                        content={
                          <Text
                            allowFontScaling={false}
                            style={style.toolTipsLabel}>
                            CGST ({'2.5%'}){'\n'}SGST ({'2.5%'})
                          </Text>
                        }>
                        <TouchableOpacity
                          onPress={() => setFnbGSTToolTip(true)}
                          style={style.tooltipButton}>
                          <svg.ToolTipIcon />
                        </TouchableOpacity>
                      </Tooltip>
                    </View>
                    <Text
                      allowFontScaling={false}
                      style={style.amountValueText}>
                      ₹
                      {parseFloat(
                        details?.finalBookingCalculation?.foodCart?.cgst +
                          details?.finalBookingCalculation?.foodCart?.sgst,
                      ).toFixed(2)}
                    </Text>
                  </View>
                  <View style={style.detailAmount}>
                    <Text
                      allowFontScaling={false}
                      style={style.amountHeadingText}>
                      Sub Total :
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={style.amountValueText}>
                      ₹
                      {Number(
                        details?.finalBookingCalculation?.foodCart?.total,
                      )?.toFixed(2)}
                    </Text>
                  </View>
                </>
              )} */}
              {/* <View style={style.detailAmount}>
                <Text allowFontScaling={false} style={style.amountHeadingText}>
                  Service Charge :
                </Text>
                <Text allowFontScaling={false} style={style.amountValueText}>
                  ₹{Number(details?.cinemaId?.serviceCharge ?? 0)?.toFixed(2)}
                </Text>
              </View> */}
              <View style={style.detailAmount}>
                <Text allowFontScaling={false} style={style.amountHeadingText}>
                  Sub Total :
                </Text>
                <Text allowFontScaling={false} style={style.amountValueText}>
                  {newSubTotalFormatted ?? '0.00'}
                  {/* {`₹${totalamount.toFixed(2)}`}- {`₹${Number(
                    details?.finalBookingCalculation?.convenienceFeesObject
                      ?.total ?? '0.00',
                  ).toFixed(2)}`} */}
                  {/* {Number(
                          details?.finalBookingCalculation?.ticketCart
                            ?.membershipDiscount,
                        )?.toFixed(2)} */}
                </Text>
              </View>
              <View style={style.detailAmount}>
                <Text allowFontScaling={false} style={style.amountHeadingText}>
                  Convenience Fee :{'\n'}
                  <Text
                    allowFontScaling={false}
                    style={[style.amountHeadingText, {fontSize: 10}]}>
                    (Including GST)
                  </Text>
                </Text>
                <Text allowFontScaling={false} style={style.amountValueText}>
                  {/* ₹{taxAmount?.toFixed(2)} */}
                  {`₹${Number(
                    details?.finalBookingCalculation?.convenienceFeesObject
                      ?.total ?? '0.00',
                  ).toFixed(2)}`}
                </Text>
              </View>
            </View>
            <View style={style.totalAmountContainer}>
              <Text allowFontScaling={false} style={style.totalAmountTitle}>
                Total Amount :
              </Text>
              <Text allowFontScaling={false} style={style.totalAmount}>
                {/* ₹{Number(details?.paymentResponse?.amount)?.toFixed(2)} */}
                {`₹${totalamount.toFixed(2)}`}
              </Text>
            </View>
          </View>
        ) : (
          <View style={style.activityContainer}>
            <Text allowFontScaling={false} style={style.noData}>
              No Data Available
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default BookingHistoryDetails;
