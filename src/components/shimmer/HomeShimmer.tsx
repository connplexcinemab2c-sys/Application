import React, {memo} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {color} from '../../theme';

const HomeShimmer = () => {
  const list = [1, 2, 3];
  const {width} = Dimensions.get('window');
  return (
    <SkeletonPlaceholder
      backgroundColor={color.gray88}
      highlightColor={color.gray}
      children={
        <View style={style.mainContainer}>
          {list?.map((_, index) => (
            <View style={style.container} key={index}>
              <SkeletonPlaceholder.Item
                height={230}
                width={width / 3.5}
                borderRadius={8}
              />
              <SkeletonPlaceholder.Item
                height={20}
                width={width / 3.45}
                borderRadius={5}
                marginTop={7}
              />
            </View>
          ))}
        </View>
      }
    />
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginRight: 10,
    marginBottom: 20,
  },
});

export default memo(HomeShimmer);
