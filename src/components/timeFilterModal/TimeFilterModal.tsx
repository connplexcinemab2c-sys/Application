import React from 'react';
import {Modal, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {color} from '../../theme';
import SvgIndex from '../../assets/svgIndex';
import style from './timeFilterModal.style';
import Button from '../button/Button';
import {TimeModalProps} from './timeFilterModal.interface';
import moment from 'moment';

const TimeFilterModal: React.FC<TimeModalProps> = ({
  tempSelectedItems,
  handleTimeClear,
  isVisible,
  showTimeItem,
  toggleTimeSelection,
  handleClose,
  handleFilterChange,
}) => {
  const renderTime = (item: any, index: number) => {
    const startTime12Hour = moment(item?.startTime, 'HH:mm').format('hh:mm');
    const endTime12Hour = moment(item?.endTime, 'HH:mm').format('hh:mm');
    return (
      <View style={style.filterParent}>
        <Text
          allowFontScaling={false}
          style={[style.filterText, {color: color.black, paddingVertical: 10}]}>
          {`${startTime12Hour} ${item?.period} - ${endTime12Hour} ${item?.period}`}
        </Text>
        <View style={style.priceView}>
          <Text allowFontScaling={false} style={style.timeText}>
            {item?.dayTime}
          </Text>
          <item.image />
        </View>
        <TouchableOpacity
          style={style.checkStyle}
          activeOpacity={0.6}
          onPress={() => toggleTimeSelection(item)}>
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
              data={showTimeItem}
              renderItem={({item, index}) => renderTime(item, index)}
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
              onPress={() => handleTimeClear()}
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

export default TimeFilterModal;
