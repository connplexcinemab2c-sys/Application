import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {LayoutProps} from './layout.interface';
import svg from '../../assets/svgIndex';
import style from './layout.style';

const Layout: React.FC<LayoutProps> = ({item, onSeat, id}) => {
  const price = item?.area_price;
  // const sortedRowData = item?.rowData?.sort((a: any, b: any) =>
  //   a.strRowPhyID.localeCompare(b.strRowPhyID),
  // );
  const sortedRowData = item?.rowData;
  return (
    <View style={style.mainContainer}>
      <Text allowFontScaling={false} style={style.title}>
        {item?.strAreaDesc}
        {item?.strAreaDesc?.split(' ')[0]?.toLowerCase() == 'couple' &&
          '(Each)'}{' '}
        ₹ {item?.area_price}
      </Text>
      {sortedRowData?.map((value: any, key: number) => (
        <View style={style.rowContainer} key={key}>
          <Text allowFontScaling={false} style={style.key}>
            {value?.strRowPhyID}
          </Text>
          {value?.seatData?.map((item: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={style.seatTouchable}
              activeOpacity={0.7}
              disabled={item?.strSeatStatus === '1' ? true : false}
              onPress={() => {
                onSeat(value?.strRowPhyID, item, price, index, key);
              }}>
              {item?.strSeatStatus == '-1' ? (
                <View style={style.gapView} />
              ) : item?.strSeatStatus === '2' ? (
                <svg.SelectedSeat />
              ) : item?.strSeatStatus === '1' ? (
                <svg.ReservedSeat />
              ) : (
                <svg.AvailableSeat />
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default memo(Layout);
