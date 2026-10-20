import moment from 'moment';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import SvgIndex from '../../assets/svgIndex';
import {Button, CustomStatusBar, Header, Input} from '../../components';
import {color} from '../../theme';
import useWelcomeGift from './useWelcomeGift';
import {styles} from './welcomeGift.style';

const WelcomeGift = () => {
  const {
    loading,
    modalVisible,
    confirmModalVisible,
    selectedCinema,
    search,
    giftCard,
    cinemaList,
    filteredCinemas,
    cardId,
    handleMarkAsReceived,
    handleCinemaSelect,
    handleSearch,
    handleConfirmSubmit,
    onBack,
    setModalVisible,
    setConfirmModalVisible,
  } = useWelcomeGift();
  const {height} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        title="Welcome gift"
        onBack={onBack}
        backIcon
        containerStyle={styles.title}
      />
      <View style={{flex: 1}}>
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="small" color={color.white} />
          </View>
        ) : (
          <FlatList
            data={giftCard}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 20}}
            renderItem={({item}) => {
              const isExpired =
                moment().format('YYYY-MM-DD') > item.collectBeforeDate;
              const status =
                item.status == 'received'
                  ? 'Gift Received'
                  : 'Mark as Received';
              return (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>
                    🎁 Welcome Gift | {item?.type}
                  </Text>
                  <Text style={styles.cardInfo}>
                    Welcome gift can be collected from your nearest cinema
                  </Text>
                  <View style={{marginTop: 6}}>
                    <Text style={styles.cardText}>
                      Issue Date: {moment(item.issueDate).format('DD MMM YYYY')}
                    </Text>
                    <Text style={styles.cardText}>
                      Collect Before:
                      {moment(item.collectBeforeDate).format('DD MMM YYYY')}
                    </Text>
                  </View>
                  {isExpired ? (
                    <>
                      {item.status == 'received' ? (
                        <Text style={styles.expiredText}>Gift received</Text>
                      ) : (
                        <Text style={styles.expiredText}>
                          Collection date has passed. You are no longer eligible
                          for the welcome gift.
                        </Text>
                      )}
                    </>
                  ) : (
                    <TouchableOpacity
                      disabled={item.status == 'received'}
                      activeOpacity={0.7}
                      style={[
                        styles.button,
                        {opacity: item.status == 'received' ? 0.6 : 1},
                      ]}
                      onPress={() => handleMarkAsReceived(item?._id)}>
                      <Text
                        style={[
                          styles.buttonText,
                          {
                            color:
                              item.status == 'received'
                                ? color.black
                                : color.white,
                          },
                        ]}>
                        {status}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
            ListEmptyComponent={
              <View
                style={{
                  marginTop: height * 0.4,
                }}>
                <Text allowFontScaling={false} style={styles.noDataText}>
                  No Gift Available
                </Text>
              </View>
            }
          />
        )}
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.searchContainer}>
              <TouchableOpacity
                style={styles.backIcon}
                activeOpacity={0.7}
                onPress={() => setModalVisible(false)}>
                <SvgIndex.Back />
              </TouchableOpacity>
              <View style={styles.inputDivider}>
                <Input
                  value={search}
                  setValue={(text: string) => handleSearch(text.trimStart())}
                  placeholder="Search for your cinema"
                  placeholderColor={color.white}
                  leftIcon={SvgIndex.Search}
                  inputContainer={styles.inputContainer}
                  inputStyle={styles.input}
                  inputProps={{placeholderTextColor: color.white}}
                  rigthFilterIcon={!!search}
                />
              </View>
            </View>

            <Text style={styles.modalTitle}>Select Cinema</Text>
            {loading ? (
              <ActivityIndicator
                size="small"
                color={color.primary}
                style={styles.noDataView}
              />
            ) : (
              <FlatList
                data={filteredCinemas}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatListContent}
                ListEmptyComponent={() => (
                  <View style={styles.noDataView}>
                    <Text style={styles.noDataText}>No Cinema Available</Text>
                  </View>
                )}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.cinemaItem}
                    onPress={() => handleCinemaSelect(item)}>
                    <Text numberOfLines={1} style={styles.cinemaText}>
                      {item.cinemaName}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}

            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              titleStyle={{color: color.white, fontSize: 16}}
              containerStyle={styles.buttonContainer}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={confirmModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setConfirmModalVisible(false)}>
        <View style={styles.confirmModalOverlay}>
          <View style={styles.confirmModalContainer}>
            <Text style={styles.confirmModalTitle}>
              Confirm collection at {selectedCinema?.cinemaName}?
            </Text>
            <Button
              title="Submit"
              onPress={handleConfirmSubmit}
              titleStyle={{color: color.white, fontSize: 16}}
              containerStyle={styles.buttonContainer}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WelcomeGift;
