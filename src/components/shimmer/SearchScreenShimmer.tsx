import React, {memo} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {color} from '../../theme';

const SearchScreenShimmer = () => {
  const list = [1, 2, 3, 4];

  return (
    <ScrollView scrollEnabled={false}>
      <SkeletonPlaceholder
        backgroundColor="#e0e0e0"
        highlightColor="#9F9F9F"
        children={
          <View>
            <SkeletonPlaceholder.Item
              width="40%"
              height={18}
              borderRadius={4}
              marginHorizontal={18}
              marginBottom={20}
            />
            {list.map((item, index) => (
              <View style={style.container}>
                <SkeletonPlaceholder.Item
                  width={78}
                  height={91}
                  borderRadius={5}
                  marginRight={12}
                />
                <View style={{flexDirection: 'column', flex: 1, marginTop: 8}}>
                  <SkeletonPlaceholder.Item
                    width="80%"
                    height={18}
                    borderRadius={4}
                  />
                  <SkeletonPlaceholder.Item
                    width="50%"
                    height={14}
                    borderRadius={4}
                    marginTop={6}
                  />
                  <SkeletonPlaceholder.Item
                    width="70%"
                    height={14}
                    borderRadius={4}
                    marginTop={6}
                  />
                </View>
              </View>
            ))}
          </View>
        }></SkeletonPlaceholder>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: color.timeBorder,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    marginHorizontal: 18,
  },
});

export default memo(SearchScreenShimmer);
