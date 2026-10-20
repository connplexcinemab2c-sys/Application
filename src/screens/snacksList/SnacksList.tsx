import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BookingWarning,
  Button,
  CustomStatusBar,
  Header,
  Snacks,
} from '../../components';
import {color} from '../../theme';
import {snacks} from './snackList.const';
import snacksController from './snacksList.controller';
import {SnacksListProps} from './snacksList.interface';
import style from './snacksList.style';

const SnacksList: React.FC<SnacksListProps> = props => {
  const {
    search,
    snackListData,
    onClear,
    onSearchFilterSnacks,
    loading,
    handleAdd,
    handleIncrease,
    handleDecrease,
    onAddToCart,
    addSpinner,
    modal,
    setModal,
    activeIndex,
    onClickTab,
    timer,
  } = snacksController(props);

  return (
    <View style={style.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        title="Snacks"
        titleContainerStyle={style.titleContainer}
        containerStyle={style.header}
        withBackground={false}
        backIcon
        onBack={props.onBack}
        skip
        onSkip={props.onCancel}
        isDisabled={props.load}
      />

      {/* <Input
        placeholder="Search for the Snacks"
        value={search}
        setValue={(text: any) => onSearchFilterSnacks(text?.trimStart())}
        leftIcon={svg.Search}
        inputContainer={style.inputContainer}
        inputStyle={style.input}
        inputProps={{placeholderTextColor: color.white}}
        rigthFilterIcon={search ? true : false}
        onPressRightFilterIcon={onClear}
      /> */}
      <View>
        <FlatList
          data={snacks}
          contentContainerStyle={style.tabContent}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={[
                  style.tabParent,
                  {
                    backgroundColor:
                      activeIndex == item.label
                        ? color.borderColor
                        : color.inputBackground,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => onClickTab(item)}>
                <Text allowFontScaling={false} style={style.tabLabel}>
                  {item?.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={[style.timerContainer]}>
        <Text style={[style.timerText]}>Session Ends in : {timer}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.scrollView}>
        {loading ? (
          <ActivityIndicator
            color={color.white}
            size="large"
            style={style.container}
          />
        ) : (
          <View style={style.searchContainer}>
            {snackListData?.length > 0 && (
              <Text allowFontScaling={false} style={style.headerLabel}>
                {`Select ${
                  activeIndex == 'All' ? 'Food & Beverages' : activeIndex
                }`}
              </Text>
            )}
            <FlatList
              numColumns={2}
              data={snackListData}
              contentContainerStyle={style.flatlistContainer}
              columnWrapperStyle={style.contentWrapper}
              keyExtractor={item => item?.id?.toString()}
              renderItem={({item, index}) => {
                return (
                  <Snacks
                    item={item}
                    index={index}
                    addQuantity={() => {
                      handleAdd(item?.id);
                    }}
                    increaseQuantity={() => {
                      handleIncrease(item?.id);
                    }}
                    decreaseQuantity={() => {
                      handleDecrease(item?.id);
                    }}
                  />
                );
              }}
              ListEmptyComponent={() => (
                <View style={style.listEmpty}>
                  <Text allowFontScaling={false} style={style.noTextData}>
                    No {activeIndex == 'All' ? 'Food & Beverages' : activeIndex}{' '}
                    Available
                  </Text>
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>
      {snackListData?.length > 0 && (
        <View style={style.addToCart}>
          <Button
            title="Proceed To Pay"
            onPress={onAddToCart}
            isLoading={addSpinner}
          />
        </View>
      )}
      <BookingWarning isVisible={modal} onClose={() => setModal(false)} />
    </View>
  );
};

export default SnacksList;
