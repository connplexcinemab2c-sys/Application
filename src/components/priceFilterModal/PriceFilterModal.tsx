import React from 'react';
import {Modal, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {color} from '../../theme';
import SvgIndex from '../../assets/svgIndex';
import style from './priceFilterModal.style';
import Button from '../button/Button';
import {PriceModalProps} from './priceFilterModal.interface';

const PriceFilterModal: React.FC<PriceModalProps> = ({
  isVisible,
  showPriceItem,
  tempSelectedItems,
  toggleSelection,
  handleClose,
  handleFilterChange,
  handlePriceClear,
}) => {
  const renderPrice = (item: any, index: number) => {
    return (
      <View style={style.filterParent}>
        <Text
          allowFontScaling={false}
          style={[style.filterText, {color: color.black, paddingVertical: 10}]}>
          Rs. {item?.startPrice + ' - ' + item?.endPrice}
        </Text>
        <TouchableOpacity
          style={style.checkStyle}
          activeOpacity={0.6}
          onPress={() => toggleSelection(item)}>
          {tempSelectedItems?.includes(item) ? (
            <SvgIndex.Checked />
          ) : (
            <SvgIndex.Uncheck />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={style.modelStyle}>
        <TouchableOpacity style={style.timeFlatlist} onPress={handleClose} />
        <View style={style.priceContainer}>
          <View>
            <FlatList
              data={showPriceItem}
              renderItem={({item, index}) => renderPrice(item, index)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={style.content}
            />
          </View>
          <View style={style.filterPriceContainer}>
            {/* <Button
              title="Clear"
              mainContainer={[
                style.filterButton,
                {
                  marginRight: 10,
                },
              ]}
              onPress={() => handlePriceClear && handlePriceClear()}
            /> */}
            <Button
              title="Apply"
              mainContainer={style.filterButton}
              onPress={() => handleFilterChange()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PriceFilterModal;
