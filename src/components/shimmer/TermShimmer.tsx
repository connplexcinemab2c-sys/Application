import React, {memo} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const TermShimmer = () => {
  const timeList = [1, 2, 3, 4];

  return (
    <ScrollView scrollEnabled={false}>
      <SkeletonPlaceholder
        backgroundColor="#e0e0e0"
        highlightColor="#9F9F9F"
        children={
          <View>
            {timeList.map((_, index) => (
              <View style={style.parent}>
                <SkeletonPlaceholder.Item
                  width="80%"
                  height={20}
                  borderRadius={4}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width="70%"
                  height={20}
                  borderRadius={4}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width="60%"
                  height={20}
                  borderRadius={4}
                  marginTop={10}
                />
                <SkeletonPlaceholder.Item
                  width="50%"
                  height={20}
                  borderRadius={4}
                  marginTop={10}
                />
              </View>
            ))}
          </View>
        }></SkeletonPlaceholder>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  parent: {
    marginHorizontal: 18,
    marginTop: 20,
  },
});

export default memo(TermShimmer);
