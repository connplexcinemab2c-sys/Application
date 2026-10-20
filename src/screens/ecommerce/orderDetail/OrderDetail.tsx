import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import styles from './orderDetail.style';
import useOrderDetail from './useOrderDetail';
import {Button, CustomStatusBar} from '../../../components';
import EcomHeader from '../../../components/ecomHeader/EcomHeader';
import {color} from '../../../theme';
import SvgIndex from '../../../assets/svgIndex';
import ProgressSteps, {Title} from '@joaosousa/react-native-progress-steps';
import moment from 'moment';
import constant from '../../../services/config/constant';
const OrderDetail: React.FC = () => {
  const {
    onCancelOrder,
    onExchangeOrder,
    onReturnOrder,
    orderDetailState,
    handleInvoice,
    currentStepsss,
    loading,
  } = useOrderDetail();
  const steps = [
    {
      title: (
        <Title>
          {`Ordered (${moment(
            orderDetailState?.orderHistory?.statusTimestamps['Order Confirm'],
          )?.format('MMM DD, YYYY')} | ${moment(
            orderDetailState?.orderHistory?.statusTimestamps['Order Confirm'],
          )?.format('hh:mm A')})`}
        </Title>
      ),
    },

    {
      title: (
        <Title>
          {`Out for Delivery (${moment(
            orderDetailState?.orderHistory?.statusTimestamps[
              'Out for delivery'
            ],
          )?.format('MMM DD, YYYY')} | ${moment(
            orderDetailState?.orderHistory?.statusTimestamps[
              'Out for delivery'
            ],
          )?.format('hh:mm A')})`}
        </Title>
      ),
    },
    {
      title: (
        <Title>
          {`Delivered (${moment(
            orderDetailState?.orderHistory?.statusTimestamps['Delivered'],
          )?.format('MMM DD, YYYY')} | ${moment(
            orderDetailState?.orderHistory?.statusTimestamps['Delivered'],
          )?.format('hh:mm A')})`}
        </Title>
      ),
    },
  ];
  const Marker = ({stepState: {stepIndex = 0, isCompleted}}: any) => {
    return (
      <View
        style={{
          height: orderDetailState?.currentStep === stepIndex ? 14 : 10,
          width: orderDetailState?.currentStep === stepIndex ? 14 : 10,
          backgroundColor:
            orderDetailState?.currentStep === stepIndex
              ? color.stepYellow
              : isCompleted
              ? color.stepYellow
              : color.white,
          borderWidth: orderDetailState?.currentStep === stepIndex ? 4 : 0,
          borderColor: color.stepBorder,
          borderRadius: 10,
          marginTop: 15,
          marginLeft: orderDetailState?.currentStep === stepIndex ? -2 : 0,
        }}>
        {steps?.length - 1 !== stepIndex && (
          <View
            style={{
              height: 45,
              width: 1,
              backgroundColor: color.stepYellow,
              left: orderDetailState?.currentStep === stepIndex ? 3 : 5,
            }}
          />
        )}
      </View>
    );
  };
  const staticStatuses = [
    {key: 'Manifest uploaded', label: 'Ordered'},
    {key: 'Out for delivery', label: 'Out For Delivery'},
    {key: 'Delivered to consignee', label: 'Delivered'},
  ];

  return (
    <View style={styles.container}>
      <CustomStatusBar transparent backgroundColor={'#00000000'} />
      <EcomHeader showCart={false} showLogo={false} title="Order Details" />
      {orderDetailState?.isLoading ? (
        <ActivityIndicator
          size={'large'}
          color={color.white}
          style={styles.activityIndicator}
        />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.rowContainer}>
              <View
                style={[
                  styles.statusContainer,
                  {
                    backgroundColor:
                      orderDetailState?.orderHistory?.shippingStatus ===
                      'Cancelled'
                        ? color.failedRed
                        : orderDetailState?.orderHistory?.shippingStatus ===
                          'Delivered'
                        ? color.lightGreen
                        : orderDetailState?.orderHistory?.shippingStatus ===
                          'In process'
                        ? color.lightYellow
                        : orderDetailState?.orderHistory?.shippingStatus ===
                          'Return Requested'
                        ? color.returnGrey
                        : orderDetailState?.orderHistory?.shippingStatus ===
                          'Exchange Requested'
                        ? color.returnGrey
                        : orderDetailState?.orderHistory?.shippingStatus ===
                          'Out for delivery'
                        ? color.returnGrey
                        : color.white,
                  },
                ]}>
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        orderDetailState?.orderHistory?.shippingStatus ===
                        'Cancelled'
                          ? color.white
                          : orderDetailState?.orderHistory?.shippingStatus ===
                            'Delivered'
                          ? color.deliveredGreen
                          : orderDetailState?.orderHistory?.shippingStatus ===
                            'In process'
                          ? color.processingYellow
                          : orderDetailState?.orderHistory?.shippingStatus ===
                            'Out for delivery'
                          ? color.grey3A
                          : orderDetailState?.orderHistory?.shippingStatus ===
                            'Return Requested'
                          ? color.grey3A
                          : orderDetailState?.orderHistory?.shippingStatus ===
                            'Exchange Requested'
                          ? color.grey3A
                          : color.black,
                    },
                  ]}>
                  {orderDetailState?.orderHistory?.shippingStatus?.toUpperCase()}
                </Text>
              </View>
              <View style={styles.flex} />
              <Text style={styles.dateText}>
                {orderDetailState?.orderHistory?.shippingStatus === 'In process'
                  ? `Delivery Estimate : ${moment(
                      orderDetailState?.orderHistory?.createdAt,
                    )
                      ?.add(7, 'days')
                      ?.format('MMM DD YYYY')}`
                  : `${moment(
                      orderDetailState?.orderHistory?.createdAt,
                    )?.format('MMM DD YYYY')}`}
              </Text>
            </View>
            <View style={styles.itemDetailContainer}>
              <Image
                source={{
                  uri:
                    constant.ecomImageUrl +
                    orderDetailState?.orderHistory?.cartId?.image,
                }}
                style={styles.productImage}
              />
              <View style={styles.productInfoContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.idText}>
                    ID {orderDetailState?.orderHistory?.orderId}
                  </Text>
                  <Button
                    title="Invoice"
                    onPress={handleInvoice}
                    containerStyle={{
                      width: 60,
                      height: 24,
                      borderRadius: 6,
                      marginBottom: 6,
                    }}
                    isLoading={loading}
                  />
                </View>

                <Text style={styles.productNameText}>
                  {
                    orderDetailState?.orderHistory?.cartId?.productId
                      ?.productName
                  }
                </Text>
                <View style={styles.borderView} />
                {orderDetailState?.orderHistory?.cartId?.attributes?.Color && (
                  <View style={styles.dataDetailContainer}>
                    <Text style={styles.colorSizeQuantityText}>Color :</Text>
                    <Text style={styles.colorSizeQuantityDetailText}>
                      {
                        orderDetailState?.orderHistory?.cartId?.attributes
                          ?.Color
                      }
                    </Text>
                  </View>
                )}

                {orderDetailState?.orderHistory?.cartId?.attributes?.Size && (
                  <View style={styles.dataDetailContainer}>
                    <Text style={styles.colorSizeQuantityText}>Size :</Text>
                    <Text style={styles.colorSizeQuantityDetailText}>
                      {orderDetailState?.orderHistory?.cartId?.attributes?.Size}
                    </Text>
                  </View>
                )}

                {orderDetailState?.orderHistory?.cartId?.quantity && (
                  <View style={styles.dataDetailContainer}>
                    <Text style={styles.colorSizeQuantityText}>Quantity :</Text>
                    <Text style={styles.colorSizeQuantityDetailText}>
                      {orderDetailState?.orderHistory?.cartId?.quantity}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <Text style={styles.addressText}>Address & Shipping</Text>
            <View style={styles.addressDataContainer}>
              <View style={styles.nameMobileContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.customerName}>
                    {`${
                      orderDetailState?.orderHistory?.shippingDetails
                        ?.billing_firstName || ''
                    } ${
                      orderDetailState?.orderHistory?.shippingDetails
                        ?.billing_lastName || ''
                    }`}
                    {
                      orderDetailState?.orderHistory?.shippingDetails
                        ?.billing_name
                    }
                  </Text>

                  <View style={styles.sideBorder} />
                </View>
                <Text style={styles.customerMobile}>
                  +91{' '}
                  {orderDetailState?.orderHistory?.shippingDetails?.billing_tel}
                </Text>
              </View>
              <Text style={styles.customerAddress}>
                {`${orderDetailState?.orderHistory?.shippingDetails?.billing_address}, ${orderDetailState?.orderHistory?.shippingDetails?.billing_locality} ${orderDetailState?.orderHistory?.shippingDetails?.billing_landmark} ${orderDetailState?.orderHistory?.shippingDetails?.billing_city}, ${orderDetailState?.orderHistory?.shippingDetails?.billing_state}, ${orderDetailState?.orderHistory?.shippingDetails?.billing_country} ${orderDetailState?.orderHistory?.shippingDetails?.billing_zip}`}
              </Text>
            </View>
            {orderDetailState?.orderHistory?.shippingStatus !== 'Delivered' &&
              orderDetailState?.orderHistory?.shippingStatus !==
                'Return Requested' &&
              orderDetailState?.orderHistory?.shippingStatus !==
                'Exchange Requested' &&
              orderDetailState?.orderHistory?.shippingStatus !==
                'Cancelled' && (
                <>
                  <Text style={styles.trackingText}>Tracking Details</Text>
                  <View>
                    <View style={{marginTop: 20}}>
                      <FlatList
                        data={staticStatuses}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                          const isCompleted = index < currentStepsss + 1;
                          const isActive = index === currentStepsss;

                          return (
                            <View style={styles.row}>
                              {/* Marker + Line */}
                              <View style={styles.markerColumn}>
                                <View
                                  style={[
                                    styles.marker,
                                    isCompleted
                                      ? styles.completedMarker
                                      : isActive
                                      ? styles.activeMarker
                                      : styles.defaultMarker,
                                  ]}
                                />
                                {index !== staticStatuses.length - 1 && (
                                  <View
                                    style={[
                                      styles.verticalLine,
                                      isCompleted
                                        ? styles.completedLine
                                        : styles.defaultLine,
                                    ]}
                                  />
                                )}
                              </View>

                              {/* Label */}
                              <View style={styles.labelColumn}>
                                <Text
                                  style={[styles.trackingText, {bottom: 5}]}>
                                  {item.label}
                                </Text>
                              </View>
                            </View>
                          );
                        }}
                      />
                    </View>
                    {/* <ProgressSteps
                      orientation={'vertical'}
                      currentStep={orderDetailState?.currentStep}
                      marker={<Marker />}
                      steps={steps}
                      colors={{
                        title: {
                          text: {
                            normal: color.white,
                            active: color.white,
                            completed: color.white,
                          },
                        },
                      }}
                    /> */}
                  </View>
                </>
              )}
            {/* <Text style={styles.totalPriceText}>Total Price</Text> */}
            <View style={styles.borderView} />
            <View style={styles.priceDetailContainer}>
              <Text style={styles.priceTypeText}>Subtotal</Text>
              <Text style={styles.priceDetailText}>
                ₹ {orderDetailState?.orderHistory?.totalAmount}
              </Text>
            </View>
            <View style={[styles.priceDetailContainer]}>
              <Text style={styles.priceTypeText}>Sandard Shipping</Text>
              <Text style={styles.priceDetailText}>₹ 15</Text>
            </View>
            <View style={styles.priceDetailContainer}>
              <Text style={styles.priceTypeText}>Discount price</Text>
              <Text style={styles.priceDetailText}>-₹ 10</Text>
            </View>
            <View style={styles.borderView} />
            <View style={styles.priceDetailContainer}>
              <Text style={styles.totalPaidText}>Total Amount</Text>
              <Text style={styles.totalDetailText}>
                ₹ {orderDetailState?.orderHistory?.totalAmount!! + 15 - 10}
              </Text>
            </View>
            <View style={styles.paymentMethodContainer}>
              <SvgIndex.Rupee />
              <Text style={styles.paymentMethodText}>
                Paid by {orderDetailState?.orderHistory?.paymentMethod}
              </Text>
            </View>
            {orderDetailState?.orderHistory?.cartId?.quantity!! > 1 && (
              <>
                <Text style={styles.otherItemsText}>Other items in order</Text>
                <View style={styles.otherItemDetailContainer}>
                  <Image
                    source={{
                      uri: orderDetailState?.orderHistory?.cartId?.image,
                    }}
                    style={styles.productImageOtherItem}
                  />
                  <View style={styles.productInfoContainer}>
                    <Text style={styles.productNameText}>
                      {
                        orderDetailState?.orderHistory?.cartId?.productId
                          ?.productName
                      }
                    </Text>
                    <View style={styles.borderView} />
                    <View style={styles.dataDetailContainer}>
                      <Text style={styles.colorSizeQuantityText}>Color</Text>
                      <Text style={styles.colorSizeQuantityDetailText}>
                        {
                          orderDetailState?.orderHistory?.cartId?.attributes
                            ?.color
                        }
                      </Text>
                    </View>
                    <View style={styles.dataDetailContainer}>
                      <Text style={styles.colorSizeQuantityText}>Size</Text>
                      <Text style={styles.colorSizeQuantityDetailText}>
                        {
                          orderDetailState?.orderHistory?.cartId?.attributes
                            ?.size
                        }
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}
          </ScrollView>
          {orderDetailState?.orderHistory?.shippingStatus ===
          'Return Requested' ? (
            <></>
          ) : orderDetailState?.orderHistory?.shippingStatus ===
            'Exchange Requested' ? (
            <></>
          ) : orderDetailState?.orderHistory?.shippingStatus ===
            'In process' ? (
            <View style={styles.exchangeReturnContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.returnButton}
                onPress={onCancelOrder}>
                <Text style={styles.returnText}>Cancel Order</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.exchangeReturnContainer}>
              {/* <TouchableOpacity
                activeOpacity={0.7}
                style={styles.exchangeButton}
                onPress={onExchangeOrder}>
                <Text style={styles.exchangeText}>Exchange</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.returnButton}
                onPress={onReturnOrder}>
                <Text style={styles.returnText}>Return</Text>
              </TouchableOpacity> */}
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default OrderDetail;
