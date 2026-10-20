import moment from 'moment';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import svgIndex from '../../assets/svgIndex';
import {CustomStatusBar, Header, Input} from '../../components';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import {capitalizeFirstLetter} from '../../utility/validation/stringValidation';
import MembershipListController from './membershipList.controller';
import style from './membershipList.style';

const MembershipList: React.FC = () => {
  const {
    list,
    loading,
    onClick,
    refreshing,
    refreshJob,
    search,
    handleSearch,
    onClear,
    onClickMembership,
    formattedDurationText,
    getMembershipDurationText,
  } = MembershipListController();

  const {onBack} = commonFunctions();

  const renderData = (item: any, index: number) => {
    return (
      <TouchableOpacity
        style={[style.parentView]}
        activeOpacity={0.7}
        onPress={() => onClick(item)}
        key={index}>
        <View style={style.flatListParent}>
          <Text style={style.titleText}>
            {capitalizeFirstLetter(item?.subscription?.title || 'N/A')}
          </Text>
          <View style={style.priceContainer}>
            <Text allowFontScaling={false} style={style.priceDurationTextStyle}>
              {item?.isDiscounted && (
                <Text allowFontScaling={false} style={style.priceDurationText}>
                  ₹{item?.price}{' '}
                </Text>
              )}
              ₹{item?.isDiscounted ? item?.discountedPrice : item?.price}
              <Text allowFontScaling={false} style={style.durationText}>
                {'/'}
                {getMembershipDurationText(item?.membershipDuration || '')}
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={[
            style.lineView,
            {
              backgroundColor: item?.isActive
                ? color.golden
                : color.switchThumbColor,
            },
          ]}
        />
        <View style={style.content}>
          <Text style={style.labelText}>Amount: </Text>
          <Text allowFontScaling={false} style={style.labelPriceDurationText}>
            ₹{item?.isDiscounted ? item?.discountedPrice : item?.price}
          </Text>
        </View>

        <View style={style.content}>
          <Text style={style.labelText}>Payment Type: </Text>
          <Text allowFontScaling={false} style={style.labelPriceDurationText}>
            {item?.paymentResponse?.method ??
              item?.paymentResponse?.payment_mode}
          </Text>
        </View>
        <View style={style.content}>
          <Text style={style.labelText}>Payment Status: </Text>
          <Text
            allowFontScaling={false}
            style={[style.labelPriceDurationText, {color: color.green}]}>
            {item?.paymentResponse?.order_status},{' '}
            {item?.paymentResponse?.trans_date}
          </Text>
        </View>
        <View style={style.content}>
          <Text style={style.labelText}>Start Date: </Text>
          <Text allowFontScaling={false} style={style.labelPriceDurationText}>
            {moment(item?.subscriptionStartDate).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View style={style.content}>
          <Text style={style.labelText}>Expiry Date: </Text>
          <Text allowFontScaling={false} style={style.labelPriceDurationText}>
            {moment(item?.subscriptionEndDate).format('DD/MM/YYYY')}
          </Text>
        </View>
        {/* <View
          style={[style.content, {justifyContent: 'flex-end', marginTop: 6}]}>
          <TouchableOpacity onPress={() => onClick(item)} activeOpacity={0.7}>
            <Text style={style.actionEyeIcon}>&#128065;</Text>
          </TouchableOpacity>
        </View> */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        backIcon
        onBack={onBack}
        title="Membership History"
        titleContainerStyle={style.title}
      />
      {!refreshing && loading ? (
        <View style={style.common}>
          <ActivityIndicator size="large" color={color.white} />
        </View>
      ) : (
        <View style={style.main}>
          <Input
            value={search}
            setValue={(text: any) => handleSearch(text?.trimStart())}
            placeholder="Search..."
            leftIcon={svgIndex.Search}
            inputContainer={style.inputContainer}
            inputMainContainer={style.inputMainContainer}
            inputStyle={style.input}
            inputProps={{placeholderTextColor: color.white}}
            rigthFilterIcon={search ? true : false}
            onPressRightFilterIcon={onClear}
          />

          <FlatList
            data={list}
            renderItem={({item, index}) => renderData(item, index)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={style.flatlistContainer}
            ListEmptyComponent={() => (
              <View style={style.common}>
                <Text allowFontScaling={false} style={style.noData}>
                  No Membership Available
                </Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshJob}
                tintColor={color.white}
              />
            }
          />
        </View>
      )}
    </View>
  );
};

export default MembershipList;
