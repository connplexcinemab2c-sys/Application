import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React from 'react';
import useReturnOrder from './useReturnOrder';
import styles from './returnOrder.style';
import {CustomStatusBar} from '../../../components';
import EcomHeader from '../../../components/ecomHeader/EcomHeader';
import SvgIndex from '../../../assets/svgIndex';
import {color} from '../../../theme';
import RadioButton from '../../../components/radioButton/RadioButton';
import {returnOrderReason} from './returnOrder.const';
import constant from '../../../services/config/constant';
import moment from 'moment';

const ReturnOrder: React.FC = () => {
  const {
    onSelectAddress,
    productDetails,
    returnOrderState,
    setReturnOrderState,
    validation,
    userData,
  } = useReturnOrder();

  return (
    <View style={styles.container}>
      <CustomStatusBar transparent backgroundColor={color.blackBackground} />
      <EcomHeader
        showCart={false}
        showLogo={false}
        showNotification={false}
        title="Orders"
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
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
        <View style={styles.eligibleContainer}>
          <SvgIndex.Elligeble />
          <Text style={styles.eligibleText}>
            Eligible to Return till{' '}
            {moment(productDetails?.createdAt)
              ?.add(7, 'days')
              ?.format('DD MMM YYYY')}
          </Text>
        </View>
        {returnOrderState?.returnStep === 1 ? (
          <>
            <View style={styles.reasonContainer}>
              <Text style={styles.reasonCancelText}>
                Why are you returning?
              </Text>
              <View style={styles.borderView} />
              <FlatList
                data={returnOrderReason}
                contentContainerStyle={styles.flatlistContainer}
                keyExtractor={(_, index) => `${index}`}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <RadioButton
                    item={item}
                    index={index}
                    selected={returnOrderState?.selectedOption}
                    onItemPress={() => {
                      setReturnOrderState('selectedOption', item.title);
                    }}
                  />
                )}
              />
            </View>
            {returnOrderState.selectedOptionError && (
              <Text style={styles.errorText}>
                {returnOrderState.selectedOptionError}
              </Text>
            )}
            <TextInput
              multiline
              style={styles.commentInput}
              value={returnOrderState?.additionalComments}
              onChangeText={(text: string) =>
                setReturnOrderState('additionalComments', text?.trimStart())
              }
              textAlignVertical="top"
              placeholder="Additional Comments"
              placeholderTextColor={color.ecomInputColor}
            />
            {returnOrderState.additionalCommentsError && (
              <Text style={styles.errorText}>
                {returnOrderState.additionalCommentsError}
              </Text>
            )}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                setReturnOrderState('checked', !returnOrderState?.checked)
              }
              style={styles.checkContainer}>
              <View style={styles.checkBox}>
                {returnOrderState?.checked ? (
                  <SvgIndex.Checked fill={color.black} />
                ) : (
                  <SvgIndex.Uncheck />
                )}
              </View>
              <Text style={styles.checkDataText}>
                I confirm that the product is unused with the original tags
                intact.
              </Text>
            </TouchableOpacity>
            {returnOrderState.checkedError && (
              <Text style={styles.errorText}>
                {returnOrderState.checkedError}
              </Text>
            )}
          </>
        ) : (
          <View>
            <Text style={styles.pickupText}>Pickup Address</Text>
            <View style={styles.addressDataContainer}>
              <View style={styles.nameMobileContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.customerName}>
                    {productDetails?.shippingDetails?.billing_name}
                  </Text>
                  <View style={styles.sideBorder} />
                </View>
                <Text style={styles.customerMobile}>
                  +91 {userData?.mobileNumber}
                </Text>
              </View>
              <Text style={styles.customerAddress}>
                {productDetails?.shippingDetails?.billing_address}{' '}
                {productDetails?.shippingDetails?.billing_locality}{' '}
                {productDetails?.shippingDetails?.billing_landmark}{' '}
                {productDetails?.shippingDetails?.billing_city}{' '}
                {productDetails?.shippingDetails?.billing_state}{' '}
                {productDetails?.shippingDetails?.billing_country}{' '}
                {productDetails?.shippingDetails?.billing_zip}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.cancelContainer}>
        <View style={styles.flex}>
          <Text style={styles.refundText}>Refund Amount</Text>
          <Text style={styles.amountText}>₹ {productDetails?.totalAmount}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.cancelButton}
          onPress={() => {
            if (returnOrderState?.returnStep === 1) {
              validation();
            } else {
              onSelectAddress();
            }
          }}>
          <Text style={styles.cancelText}>
            {returnOrderState?.returnStep === 1 ? 'Select Address' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReturnOrder;
