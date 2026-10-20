import moment from 'moment';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import VersionInfo from 'react-native-version-info';
import imageIndex from '../../assets/imageIndex';
import svg from '../../assets/svgIndex';
import {
  AccountList,
  Border,
  BorderWithShadow,
  Button,
  CustomStatusBar,
} from '../../components';
import constant from '../../services/config/constant';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';
import {color} from '../../theme';
import {capitalizeFirstLetter} from '../../utility/validation/stringValidation';
import {baseAccountList} from './account.const';
import accountController from './account.controller';
import style from './account.style';

const Account: React.FC = () => {
  const {
    onEditProfile,
    onClickLogout,
    userData,
    imageSpinner,
    onImageLoad,
    onImageLoadStart,
    onRightIcon,
    loading,
    onRefresh,
    refreshing,
    onLogoClick,
    onItemPress,
    visible,
    setVisible,
    onDelete,
    load,
    isLoad,
    onPremiumCall,
    scrollRef,
    getDetailSubscription,
    getMembershipDurationText,
    durationText,
  } = accountController();

  const appVersion = `${VersionInfo?.appVersion} (${VersionInfo?.buildVersion})`;

  const {token} = useAppSelector(state => state.UserReducer);
  // const [onaccountList, onsetAccountList] = useState<ItemProps[]>([]);
  // const [activePlan, setActivePlan] = useState(false);
  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   getActivePlan();
  // }, []);

  // useEffect(() => {
  //   if (token) {
  //     getActivePlan();
  //   }
  // }, [isFocused, token]);

  // const welcomeGiftItem: ItemProps = {
  //   id: 4,
  //   icon: svg.Cashback,
  //   title: 'Welcome gift',
  //   navigation: screenName.welcomeGift,
  // };

  // const getActivePlan = async () => {
  //   try {
  //     const {data} = await axiosInstance.get(constant.activePlan, {
  //       headers: {
  //         auth: token,
  //       },
  //     });

  //     const isActive = data?.data?.[0]?.isActive === true;
  //     setActivePlan(isActive);

  //     // Build account list dynamically based on active status
  //     const updatedList = [...baseAccountList];

  //     if (isActive) {
  //       // Add welcome gift before rewards
  //       const insertIndex = updatedList.findIndex(item => item.id === 5); // ID 5 is Rewards
  //       if (insertIndex !== -1) {
  //         updatedList.splice(insertIndex, 0, welcomeGiftItem);
  //       } else {
  //         updatedList.push(welcomeGiftItem);
  //       }
  //     }

  //     onsetAccountList(updatedList);
  //   } catch (error: any) {
  //     console.error('getActivePlan error', error);
  //     onsetAccountList(baseAccountList); // fallback
  //   }
  // };

  return (
    <View style={style.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <View style={style.headerParent}>
        <TouchableOpacity activeOpacity={0.7} onPress={onLogoClick}>
          <Image style={style.appLogo} source={imageIndex.appLogoText} />
        </TouchableOpacity>
        <View style={style.rightIconContent}>
          <TouchableOpacity
            style={style.rightIcon}
            activeOpacity={0.6}
            onPress={onRightIcon}>
            <svg.Settings />
          </TouchableOpacity>
        </View>
      </View>
      <BorderWithShadow />
      {loading && (
        <ActivityIndicator color={color.gray} style={style.indicatorStyle} />
      )}
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.scrollStyle}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={color.white}
          />
        }>
        <View style={style.container}>
          <View style={style.profileContainer}>
            <View style={style.profileImageContainer}>
              <View style={style.imageContainer}>
                {imageSpinner && (
                  <ActivityIndicator
                    color={color.gray}
                    style={style.indicator}
                  />
                )}
                {userData?.profile?.length ? (
                  <View style={style.userProfile}>
                    <Image
                      source={{uri: `${constant.imageURL}${userData?.profile}`}}
                      style={style.profile}
                      resizeMode="cover"
                      onLoadStart={onImageLoadStart}
                      onLoadEnd={onImageLoad}
                    />
                    {getDetailSubscription &&
                      getDetailSubscription?.subscriptionId?.title && (
                        <View style={style.premium}>
                          <svg.PremiumMember />
                        </View>
                      )}
                  </View>
                ) : (
                  <View style={style.userProfile}>
                    {userData?.gender === 'Female' ? (
                      <svg.Female />
                    ) : (
                      <svg.Male />
                    )}
                    {getDetailSubscription &&
                      getDetailSubscription?.subscriptionId?.title && (
                        <View style={style.premium}>
                          <svg.PremiumMember />
                        </View>
                      )}
                  </View>
                )}
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onEditProfile}
                style={style.edit}>
                <svg.Edit />
              </TouchableOpacity>
            </View>
            <Text allowFontScaling={false} style={style.name}>
              {userData?.firstName
                ? `${userData?.firstName} ${
                    userData?.lastName ? userData?.lastName : ''
                  }`
                : 'Guest User'}
            </Text>
            <Text allowFontScaling={false} style={style.email}>
              {userData?.email && userData?.mobileNumber
                ? userData?.mobileNumber
                : userData?.email
                ? userData?.email
                : userData?.mobileNumber}
            </Text>
            <View style={style.rewardsBtn}>
              <Image style={style.rewardImage} source={imageIndex.rewards} />
              <Text allowFontScaling={false} style={style.rewardsText}>
                Rewards :{' '}
                <Text allowFontScaling={false} style={{top: 5}}>
                  {userData?.totalRewards ?? 0}
                </Text>
              </Text>
            </View>
            {getDetailSubscription &&
              getDetailSubscription?.subscriptionId?.title && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={style.premiumMemberBtn}
                  onPress={onPremiumCall}>
                  <svg.PremiumMember />
                  <Text
                    allowFontScaling={false}
                    style={style.premiumMemberText}>
                    {capitalizeFirstLetter(
                      getDetailSubscription?.subscriptionId?.title,
                    )}{' '}
                    Member
                  </Text>
                  <View style={style.exploreText}>
                    <Text
                      allowFontScaling={false}
                      style={style.priceDurationText}>
                      <Text allowFontScaling={false} style={style.durationText}>
                        current plan expires on{' '}
                        {moment(
                          getDetailSubscription?.subscriptionEndDate,
                        ).format('DD MMM YYYY')}{' '}
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
          </View>
          <Border borderStyle={style.border} />
          <FlatList
            data={baseAccountList}
            renderItem={({item}) => (
              <AccountList
                item={item}
                onClick={() => onItemPress(item?.navigation, item?.title)}
              />
            )}
            keyExtractor={(_, index) => `${index}`}
            contentContainerStyle={style.flatlist}
            scrollEnabled={false}
          />
          <Button
            title="LOGOUT"
            onPress={onClickLogout}
            mainContainer={style.logoutButton}
            containerStyle={{opacity: isLoad ? 0.5 : 1}}
            titleStyle={style.logout}
            disabled={isLoad}
          />

          <View style={style.versionContainer}>
            <Text style={style.version}>Version : {appVersion}</Text>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={visible}
        transparent
        onRequestClose={() => setVisible(false)}>
        <View style={style.modalView}>
          <View style={style.warningContainer}>
            <Text allowFontScaling={false} style={style.warningText}>
              Are you sure you want to delete this account ?
            </Text>
            <View style={style.modalButtonContainer}>
              <Button
                title="No"
                containerStyle={[style.button, {marginRight: 8}]}
                onPress={() => setVisible(false)}
                buttonTouchable={style.buttonTouchable}
                titleStyle={style.buttonTitle}
                gradient={color.termsGradient}
              />
              <Button
                title="Yes"
                containerStyle={style.button}
                isLoading={load}
                onPress={onDelete}
                buttonTouchable={style.buttonTouchable}
                titleStyle={style.buttonTitle}
                gradient={color.termsGradient}
              />
            </View>
          </View>
        </View>
      </Modal>
      {isLoad && <View style={style.blur} />}
    </View>
  );
};

export default Account;
