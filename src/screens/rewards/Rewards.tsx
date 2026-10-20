import moment from 'moment';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import svgIndex from '../../assets/svgIndex';
import {CustomStatusBar, Header} from '../../components';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import RewardsController from './rewards.controller';
import style from './Rewards.style';

const FILTERS: Array<'All' | 'Earned' | 'Redeemed'> = [
  'All',
  'Earned',
  'Redeemed',
];

const Rewards: React.FC = () => {
  const {
    list,
    loading,
    refreshing,
    refreshJob,
    search,
    handleSearch,
    onClear,
    activeFilter,
    onFilterChange,
    totalEarned,
    totalRedeemed,
    availableBalance,
  } = RewardsController();
  const {onBack} = commonFunctions();

  const renderItem = ({item}: {item: any}) => {
    const isEarned = item?.type?.toLowerCase() === 'earned';
    const movieName = item?.transactionId?.movieId?.name ?? '-';
    const bookingId = item?.transactionId?.initTransId ?? '-';
    const amount = item?.transactionId?.paymentResponse?.amount;
    const expiry = item?.expiryDate
      ? moment(item?.expiryDate).format('DD/MM/YYYY')
      : '-';

    return (
      <View style={style.card}>
        {/* Card header: movie name + badge */}
        <View style={style.cardHeader}>
          <Text
            allowFontScaling={false}
            style={style.cardMovieName}
            numberOfLines={1}>
            {movieName}
          </Text>
          <View
            style={[
              style.typeBadge,
              isEarned ? style.earnedBadge : style.redeemedBadge,
            ]}>
            <Text
              allowFontScaling={false}
              style={[
                style.typeBadgeText,
                {color: isEarned ? '#4CAF50' : '#E57373'},
              ]}>
              {isEarned ? 'Earned' : 'Redeemed'}
            </Text>
          </View>
        </View>

        {/* Booking ID */}
        <Text allowFontScaling={false} style={style.cardBookingId}>
          Booking Id: <Text style={style.cardBookingIdValue}>{bookingId}</Text>
        </Text>

        <View style={style.cardDivider} />

        {/* Info grid */}
        <View style={style.cardInfoRow}>
          <View style={style.cardInfoItem}>
            <Text allowFontScaling={false} style={style.cardInfoLabel}>
              Date
            </Text>
            <Text allowFontScaling={false} style={style.cardInfoValue}>
              {moment(item?.createdAt).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View style={style.cardInfoItem}>
            <Text allowFontScaling={false} style={style.cardInfoLabel}>
              Coins
            </Text>
            <Text
              allowFontScaling={false}
              style={[style.cardInfoValue, {color: color.golden}]}>
              {item?.coins ?? '-'}
            </Text>
          </View>
          <View style={style.cardInfoItem}>
            <Text allowFontScaling={false} style={style.cardInfoLabel}>
              Amount
            </Text>
            <Text allowFontScaling={false} style={style.cardInfoValue}>
              {amount ? `₹${amount}` : '-'}
            </Text>
          </View>
          <View style={style.cardInfoItem}>
            <Text allowFontScaling={false} style={style.cardInfoLabel}>
              Expiry
            </Text>
            <Text allowFontScaling={false} style={style.cardInfoValue}>
              {expiry}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={style.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        backIcon
        onBack={onBack}
        title="Reward / Coin"
        titleContainerStyle={style.title}
      />

      {!refreshing && loading ? (
        <View style={style.centered}>
          <ActivityIndicator size="large" color={color.white} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          {/* Stat cards */}
          <View style={style.statsRow}>
            <View style={style.statCard}>
              <View style={style.statIconCircle}>
                <svgIndex.Coin width={18} height={18} />
              </View>
              <View style={style.statTextCol}>
                <Text allowFontScaling={false} style={style.statLabel}>
                  TOTAL EARNED
                </Text>
                <Text allowFontScaling={false} style={style.statValue}>
                  {totalEarned} pts
                </Text>
              </View>
            </View>

            <View style={[style.statCard, style.statCardMid]}>
              <View style={style.statIconCircle}>
                <svgIndex.Rewards width={18} height={18} />
              </View>
              <View style={style.statTextCol}>
                <Text allowFontScaling={false} style={style.statLabel}>
                  TOTAL REDEEMED
                </Text>
                <Text allowFontScaling={false} style={style.statValue}>
                  {totalRedeemed} pts
                </Text>
              </View>
            </View>

            <View style={[style.statCard, style.availableCard]}>
              <View style={style.statIconCircle}>
                <svgIndex.Coin width={18} height={18} />
              </View>
              <View style={style.statTextCol}>
                <Text allowFontScaling={false} style={style.statLabel}>
                  AVAILABLE BALANCE
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[style.statValue, {color: color.golden}]}>
                  {availableBalance} pts
                </Text>
                <Text allowFontScaling={false} style={style.statSubtitle}>
                  10 pts = ₹1
                </Text>
              </View>
            </View>
          </View>

          {/* Filter tabs + Search */}
          <View style={style.filterRow}>
            <View style={style.filterTabs}>
              {FILTERS.map(f => (
                <TouchableOpacity
                  key={f}
                  activeOpacity={0.7}
                  style={[
                    style.filterTab,
                    activeFilter === f && style.filterTabActive,
                  ]}
                  onPress={() => onFilterChange(f)}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      style.filterTabText,
                      activeFilter === f && style.filterTabTextActive,
                    ]}>
                    {f}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={style.searchBox}>
              <svgIndex.Search width={13} height={13} />
              <TextInput
                value={search}
                onChangeText={t => handleSearch(t?.trimStart())}
                placeholder="Search"
                placeholderTextColor="#666"
                style={style.searchInput}
                allowFontScaling={false}
              />
              {!!search && (
                <TouchableOpacity onPress={onClear} hitSlop={8}>
                  <svgIndex.Close width={12} height={12} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <FlatList
            data={list}
            keyExtractor={(_, i) => i.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={style.listContent}
            ListEmptyComponent={() => (
              <View style={style.centered}>
                <Text allowFontScaling={false} style={style.noData}>
                  No Rewards Available
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

export default Rewards;
