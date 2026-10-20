import moment from 'moment';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import image from '../../assets/imageIndex';
import svg from '../../assets/svgIndex';
import {BookingDetailShimmer, Container, Header} from '../../components';
import QRCode from '../../components/qrCode/QrCode';
import constant from '../../services/config/constant';
import {color} from '../../theme';
import movieTicketController from './movieTicket.controller';
import style from './movieTicket.style';

const MovieTicket: React.FC = () => {
  const {
    details,
    loading,
    onBack,
    onMore,
    showDetails,
    total,
    foodTotalWithGST,
    onShare,
    imageSpinner,
    onImageLoad,
    convenienceFees,
    totalTickets,
    ticketCGST,
    ticketSGST,
    cinemaGSTToolTip,
    setCinemaGSTToolTip,
    fnbGSTToolTip,
    setFnbGSTToolTip,
    rewardTransaction,
  } = movieTicketController();

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

  const originalFoodPrice = details?.fAndBDetails?.reduce(
    (acc, item) => acc + Number(item.price ?? 0),
    0,
  );

  const totalamount = details?.finalBookingCalculation?.finalAmount;

  const discountedFoodPrice =
    details?.finalBookingCalculation?.foodCart?.totalAfterDiscount ?? 0;

  const getDiscountCoke = originalFoodPrice - discountedFoodPrice;
  const ticketMembershipDiscount =
    details?.finalBookingCalculation?.ticketCart?.membershipDiscount ?? 0;

  const foodMembershipDiscount =
    details?.finalBookingCalculation?.foodCart?.membershipDiscount ?? 0;

  const newMembershipDiscount =
    ticketMembershipDiscount + foodMembershipDiscount;

  const newSubTotal =
    totalamount -
    details?.finalBookingCalculation?.convenienceFeesObject?.total;

  const newSubTotalFormatted = `₹${newSubTotal.toFixed(2)}`;

  return (
    <Container
      containerStyle={style.mainContainer}
      scrollContentContainerStyle={style.scrollView}>
      <Header
        backIcon
        onBack={onBack}
        rightIcon={svg.Share}
        onRightIcon={onShare}
        backContainerStyle={style.back}
      />
      {loading ? (
        <BookingDetailShimmer />
      ) : (
        <View style={style.ticketContainer}>
          {rewardTransaction?.coins != 0 && (
            <Text allowFontScaling={false} style={style.earned}>
              You earned{' '}
              <Text style={{color: color.golden}}>
                {rewardTransaction?.coins} pts
              </Text>{' '}
              on this booking
            </Text>
          )}
          <Text allowFontScaling={false} style={style.booked}>
            Booked Successfully !
          </Text>
          <Text allowFontScaling={false} style={style.downloadText}>
            You can Download Your Ticket Now
          </Text>
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
                  {details?.movieId?.censorRating}){' '}
                  {details?.movieId?.category &&
                    ` - ${
                      details?.movieId?.category
                        ? details?.movieId?.category.replace(/\r\n/g, '')
                        : '-'
                    }`}
                </Text>
                <Text allowFontScaling={false} style={style.movieTitle}>
                  {moment(details?.showId?.sessionRealShow)?.format(
                    'DD MMM YYYY | hh:mm A',
                  )}
                </Text>
                <Text allowFontScaling={false} style={style.location}>
                  {details?.cinemaId?.address}
                </Text>
              </View>
            </View>
            <View style={style.semiCircleContainer}>
              <View style={style.leftSemiCircle} />
              <View style={style.rightSemiCircle} />
            </View>
            <View style={style.seatNoContainer}>
              <View>
                <Text allowFontScaling={false} style={style.number}>
                  {
                    details?.setSeatData?.strSeatInfo?.split('-')[1]?.split(',')
                      ?.length
                  }
                </Text>
                <Text allowFontScaling={false} style={style.tickets}>
                  {details?.setSeatData?.strSeatInfo?.split('-')[1]?.split(',')
                    ?.length > 1
                    ? 'Tickets'
                    : 'Ticket'}
                </Text>
              </View>
              <View style={style.container}>
                <Text allowFontScaling={false} style={style.tickets}>
                  {details?.setSeatData?.strSeatInfo?.split('-')[0]}
                </Text>
                <Text allowFontScaling={false} style={style.seatNo}>
                  {details?.setSeatData?.strSeatInfo?.split('-')[1]}
                </Text>
                <Text allowFontScaling={false} style={style.screenName}>
                  {details?.showId?.screenName}
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
            <TouchableOpacity
              activeOpacity={0.7}
              style={style.amountContainer}
              onPress={onMore}>
              <Text allowFontScaling={false} style={style.totalPrice}>
                Total Amount
              </Text>
              <View style={style.arrowContainer}>
                {false ? (
                  <svg.DownArrow fill={color.black} style={style.arrow} />
                ) : (
                  <svg.DownArrow fill={color.black} />
                )}
              </View>
              <Text allowFontScaling={false} style={style.amountValueText}>
                {/* ₹{Number(details?.paymentResponse?.amount ?? 0)?.toFixed(2)} */}
                {Number(details?.finalBookingCalculation?.finalAmount)?.toFixed(
                  2,
                )}
              </Text>
            </TouchableOpacity>
            {showDetails && (
              <View>
                <View>
                  <View style={[style.detailAmount, {marginTop: 15}]}>
                    <Text
                      allowFontScaling={false}
                      style={style.amountHeadingText}>
                      Ticket Price :
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={style.amountValueText}>
                      ₹
                      {Number(
                        details?.finalBookingCalculation?.ticketCart
                          ?.ticketTotal,
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
                      <Text
                        allowFontScaling={false}
                        style={style.amountValueText}>
                        - {`₹${newMembershipDiscount.toFixed(2)}`}
                      </Text>
                    </View>
                  )}

                  {details?.finalBookingCalculation?.rewardDiscountApplied !=
                    0 && (
                    <View style={style.detailAmount}>
                      <Text
                        allowFontScaling={false}
                        style={style.amountHeadingText}>
                        Reward Discount :
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={style.amountValueText}>
                        -{' '}
                        {`₹${parseFloat(
                          details?.finalBookingCalculation
                            ?.rewardDiscountApplied,
                        ).toFixed(2)}`}
                      </Text>
                    </View>
                  )}

                  {details?.finalBookingCalculation?.ticketCart
                    ?.discountAmount != 0 && (
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
                          details?.finalBookingCalculation?.totalDiscount,
                        )?.toFixed(2)}
                      </Text>
                    </View>
                  )}

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
                            details?.finalBookingCalculation?.foodCart
                              ?.fnbTotal ?? 0,
                          ).toFixed(2)}
                        </Text>
                      </View>
                      <View style={style.foodContainer}>
                        {details?.fAndBDetails?.map(
                          (item: any, index: number) => (
                            <View style={style.foodDetailContainer} key={index}>
                              <Text
                                allowFontScaling={false}
                                style={[style.amountHeadingText]}>
                                {item.quantity} x {item.name}
                              </Text>
                              <Text
                                allowFontScaling={false}
                                style={[style.amountValueText, {fontSize: 12}]}>
                                ₹ {item.price?.toFixed(2)}
                              </Text>
                            </View>
                          ),
                        )}
                      </View>
                    </View>
                  )}

                  <View style={style.detailAmount}>
                    <Text
                      allowFontScaling={false}
                      style={style.amountHeadingText}>
                      Sub Total :
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={style.amountValueText}>
                      {newSubTotalFormatted ?? '0.00'}
                    </Text>
                  </View>

                  <View style={style.detailAmount}>
                    <Text
                      allowFontScaling={false}
                      style={style.amountHeadingText}>
                      Convenience Fee :{'\n'}
                      <Text
                        allowFontScaling={false}
                        style={[style.amountHeadingText, {fontSize: 10}]}>
                        (Including GST)
                      </Text>
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={style.amountValueText}>
                      {/* {`₹${taxAmount.toFixed(2)}`} */}
                      {`₹${Number(
                        details?.finalBookingCalculation?.convenienceFeesObject
                          ?.total ?? '0.00',
                      ).toFixed(2)}`}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            <Text allowFontScaling={false} style={style.ticketDetails}>
              Ticket Details are sent on SMS, Show QR Code{`\n`}at Cinema Hall.
            </Text>
          </View>
        </View>
      )}
    </Container>
  );
};

export default MovieTicket;
