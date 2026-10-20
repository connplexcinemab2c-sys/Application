import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import styles from './orderHistoryCard.style';
import {color} from '../../theme';
import imageIndex from '../../assets/imageIndex';
import constant from '../../services/config/constant';
import moment from 'moment';

const OrderHistoryCard = ({
  item,
  index,
  onOrderDetail,
}: {
  item: any;
  index: number;
  onOrderDetail: () => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      key={index}
      activeOpacity={1}
      onPress={onOrderDetail}>
      <View style={styles.rowContainer}>
        <View
          style={[
            styles.statusContainer,
            {
              backgroundColor:
                item?.shippingStatus === 'Cancelled'
                  ? color.failedRed
                  : item?.shippingStatus === 'Delivered'
                  ? color.lightGreen
                  : item?.shippingStatus === 'In process'
                  ? color.lightYellow
                  : item?.shippingStatus === 'Return Requested'
                  ? color.returnGrey
                  : item?.shippingStatus === 'Exchange Requested'
                  ? color.returnGrey
                  : item?.shippingStatus === 'Out for delivery'
                  ? color.returnGrey
                  : color.white,
            },
          ]}>
          <Text
            style={[
              styles.statusText,
              {
                color:
                  item?.shippingStatus === 'Cancelled'
                    ? color.white
                    : item?.shippingStatus === 'Delivered'
                    ? color.deliveredGreen
                    : item?.shippingStatus === 'In process'
                    ? color.processingYellow
                    : item?.shippingStatus === 'Return Requested'
                    ? color.grey3A
                    : item?.shippingStatus === 'Exchange Requested'
                    ? color.grey3A
                    : item?.shippingStatus === 'Out for delivery'
                    ? color.grey3A
                    : color.black,
              },
            ]}>
            {item?.shippingStatus?.toUpperCase()}
          </Text>
        </View>
        <View style={styles.flex} />
        <Text style={styles.dateText}>
          {item?.shippingStatus === 'Pending'
            ? `Delivery Estimate : ${moment(item?.createdAt)
                ?.add(7, 'days')
                ?.format('MMM DD, YYYY')}`
            : item?.shippingStatus === 'Return Requested'
            ? `Pickup By : ${moment(item?.createdAt)?.format('MMM DD, YYYY')}`
            : `${moment(item?.createdAt)?.format('MMM DD, YYYY')}`}
        </Text>
      </View>
      <View style={styles.productDetailContainer}>
        <Image
          source={
            item?.cartId?.image
              ? {uri: `${constant.ecomImageUrl}${item?.cartId?.image}`}
              : imageIndex.noImageAvailable
          }
          style={styles.productImage}
        />
        <View style={styles.productNameQuantityContainer}>
          <Text style={styles.productNameText}>
            {item?.cartId?.productId?.productName}
          </Text>
          <Text style={styles.quantityText}>{item?.cartId?.quantity}X</Text>
        </View>
        <Text style={styles.priceText}>₹ {item?.totalAmount}</Text>
      </View>
      <View style={styles.borderView} />
      <Text style={styles.exchangeReturnText}>
        {'Exchange/Return window closed on ' +
          moment(item?.createdAt)?.add(14, 'days')?.format('MMM DD, YYYY')}
      </Text>
      <View style={styles.borderView} />
      <View style={styles.rowContainer}>
        <Text style={styles.idText}>
          ID <Text style={styles.orderIdText}>{item?.orderId}</Text>
        </Text>
        <View style={styles.flex} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.orderDetailBtn}
          onPress={onOrderDetail}>
          <Text style={styles.orderDetailText}>
            {item?.shippingStatus === 'Cancelled'
              ? 'Cancelled'
              : item?.shippingStatus === 'Delivered'
              ? 'Order Details'
              : item?.shippingStatus === 'Order Confirmed'
              ? 'Order Details'
              : item?.shippingStatus === 'Exchange Requested'
              ? 'Order Details'
              : item?.shippingStatus === 'Return Requested'
              ? 'Order Details'
              : item?.shippingStatus === 'In process'
              ? 'Track Order'
              : item?.shippingStatus === 'Out for delivery'
              ? 'Track Order'
              : 'Cancel'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default memo(OrderHistoryCard);
