import React, {memo} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ComingSoonShimmer = () => {
  const list = [1, 2, 3];

  return (
    <ScrollView scrollEnabled={false}>
      <SkeletonPlaceholder
        backgroundColor="#e0e0e0"
        highlightColor="#9F9F9F"
        children={
          <View style={style.container}>
            {list.map((item, index) => (
              <SkeletonPlaceholder.Item
                key={index}
                width="47%"
                height={250}
                borderRadius={7}
                marginRight={10}
                marginTop={12}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 18,
  },
});

export default memo(ComingSoonShimmer);
