import React, {memo} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CinemaListShimmer = () => {
  const list = [1, 2, 3, 4, 5, 6];

  return (
    <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}>
      <SkeletonPlaceholder
        backgroundColor="#e0e0e0"
        highlightColor="#9F9F9F"
        children={
          <View style={style.container}>
            {list.map((item, index) => (
              <SkeletonPlaceholder.Item
                marginBottom={12}
                height={177}
                width={'90%'}
                borderRadius={14}
                key={index}
                marginRight={10}
                marginHorizontal={18}
              />
            ))}
          </View>
        }
      />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // marginRight: 10,
  },
});

export default memo(CinemaListShimmer);
