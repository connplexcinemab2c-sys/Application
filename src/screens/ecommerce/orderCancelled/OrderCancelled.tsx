import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import styles from './orderCancelled.style';
import useOrderCancelled from './useOrderCancelled';
import {CustomStatusBar} from '../../../components';
import EcomHeader from '../../../components/ecomHeader/EcomHeader';
import SvgIndex from '../../../assets/svgIndex';
import {reasonCancelOptions} from './orderCancelled.const';
import RadioButton from '../../../components/radioButton/RadioButton';
import {color} from '../../../theme';
import constant from '../../../services/config/constant';

const OrderCancelled: React.FC = () => {
  const {
    orderCancelledState,
    productDetails,
    setOrderCancelledState,
    onDone,
    validation,
  } = useOrderCancelled();
  return (
    <View style={styles.container}>
      <CustomStatusBar transparent backgroundColor={'#00000000'} />
      <EcomHeader
        showCart={false}
        showLogo={false}
        showNotification={false}
        title="Orders"
      />
      {orderCancelledState?.orderCancel ? (
        <View style={styles.cancelReasonMainContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.eligibleContainer}>
              <SvgIndex.Elligeble />
              <Text style={styles.eligibleText}>Eligible for cancellation</Text>
              <TouchableOpacity
                style={styles.viewPolicyContainer}
                activeOpacity={0.7}>
                <Text style={styles.viewPolicyText}>View Policy</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemDetailContainer}>
              <Image
                source={{
                  uri: constant.ecomImageUrl + productDetails?.cartId?.image,
                }}
                style={styles.productImage}
              />
              <View style={styles.productInfoContainer}>
                <Text style={styles.idText}>ID {productDetails?.orderId}</Text>
                <Text style={styles.productNameText}>
                  {productDetails?.cartId?.productId?.productName}
                </Text>
                <View style={styles.borderView} />
                <View style={styles.dataDetailContainer}>
                  <Text style={styles.colorSizeQuantityText}>Color</Text>
                  <Text style={styles.colorSizeQuantityDetailText}>
                    {productDetails?.cartId?.attributes?.color}
                  </Text>
                </View>
                <View style={styles.dataDetailContainer}>
                  <Text style={styles.colorSizeQuantityText}>Size</Text>
                  <Text style={styles.colorSizeQuantityDetailText}>
                    {productDetails?.cartId?.attributes?.size}
                  </Text>
                </View>
                <View style={styles.dataDetailContainer}>
                  <Text style={styles.colorSizeQuantityText}>Quantity</Text>
                  <Text style={styles.colorSizeQuantityDetailText}>
                    {productDetails?.cartId?.quantity}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.reasonContainer}>
              <Text style={styles.reasonCancelText}>
                Reason for Cancellation
              </Text>
              <View style={styles.borderView} />
              <FlatList
                data={reasonCancelOptions}
                renderItem={({item, index}) => (
                  <RadioButton
                    item={item}
                    index={index}
                    selected={orderCancelledState?.selectedOption}
                    onItemPress={() => {
                      setOrderCancelledState('selectedOption', item.title);
                    }}
                  />
                )}
              />
            </View>
            {orderCancelledState.selectedOptionError && (
              <Text style={styles.errorText}>
                {orderCancelledState.selectedOptionError}
              </Text>
            )}
            <TextInput
              multiline
              style={styles.commentInput}
              value={orderCancelledState?.additionalComments}
              onChangeText={(text: string) =>
                setOrderCancelledState('additionalComments', text?.trimStart())
              }
              textAlignVertical="top"
              placeholder="Additional Comments"
              placeholderTextColor={color.ecomInputColor}
            />
            {orderCancelledState.additionalCommentsError && (
              <Text style={styles.errorText}>
                {orderCancelledState.additionalCommentsError}
              </Text>
            )}
          </ScrollView>
          <View style={styles.cancelContainer}>
            <View style={styles.flex}>
              <Text style={styles.refundText}>Refund Amount</Text>
              <Text style={styles.amountText}>
                ₹ {productDetails?.totalAmount}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.cancelButton}
              onPress={validation}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.cancelReasonMainContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.checkContainer}>
              <SvgIndex.Check />
              <Text style={styles.orderCancelText}>Order Cancelled</Text>
              <Text style={styles.orderIdText}>Order ID 235689</Text>
            </View>
            <View style={styles.productCancelContainer}>
              <Image
                source={{uri: productDetails?.productImage}}
                style={styles.productCancelImage}
              />
              <View style={styles.productInfoContainer}>
                <Text style={styles.productNameText}>
                  {productDetails?.cartId?.productId?.productName}
                </Text>
                <View style={styles.dataDetailContainer}>
                  <Text style={styles.colorSizeQuantityText}>
                    Color : {productDetails?.cartId?.attributes?.color}
                  </Text>
                  <Text style={styles.colorSizeQuantityText}>
                    Size : {productDetails?.cartId?.attributes?.size}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <SvgIndex.TickMark />
              <View style={styles.refundApplicableContainer}>
                <Text style={styles.refundDetailText}>Refund Details</Text>
                <Text style={styles.notApplicableText}>
                  A refund is not applicable on this order as it is a pay on
                  delivery order
                </Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.cancelContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.cancelButton}
              onPress={onDone}>
              <Text style={styles.cancelText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default OrderCancelled;
