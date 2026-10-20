import React, {memo} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {color} from '../../theme';

const NotificationShimmer = () => {
  const list = [1, 2, 3, 4];

  return (
    <ScrollView scrollEnabled={false}>
      <SkeletonPlaceholder
        backgroundColor="#e0e0e0"
        highlightColor="#9F9F9F"
        children={
          <View>
            {list.map((item, index) => (
              <View style={style.container}>
                <SkeletonPlaceholder.Item
                  width={51}
                  height={51}
                  borderRadius={25.5}
                  marginRight={12}
                />
                <View style={{flexDirection: 'column', flex: 1}}>
                  <SkeletonPlaceholder.Item
                    width="50%"
                    height={18}
                    borderRadius={4}
                  />
                  <SkeletonPlaceholder.Item
                    width="80%"
                    height={14}
                    borderRadius={4}
                    marginTop={15}
                  />
                  <SkeletonPlaceholder.Item
                    width="70%"
                    height={14}
                    borderRadius={4}
                    marginTop={6}
                  />
                  <SkeletonPlaceholder.Item
                    width="50%"
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
    borderBottomWidth: 1,
    borderColor: color.timeBorder,
    padding: 18,
    // marginBottom: 10,
    // paddingHorizontal: 18,
  },
});

export default memo(NotificationShimmer);
