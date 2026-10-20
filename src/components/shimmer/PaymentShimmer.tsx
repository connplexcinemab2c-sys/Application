import React, {memo} from 'react';
import {View, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const PaymentShimmer = () => {
  const list = [1, 2, 3, 4, 5];
  return (
    <SkeletonPlaceholder
      backgroundColor="#e0e0e0"
      highlightColor="#9F9F9F"
      children={
        <View>
          <ScrollView scrollEnabled={false}>
            <View
              style={{
                marginHorizontal: 18,
                marginTop: 20,
                paddingHorizontal: 10,
                paddingBottom: 15,
              }}>
              {list.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                  }}>
                  <SkeletonPlaceholder.Item
                    width="50%"
                    height={18}
                    borderRadius={4}
                  />
                  <SkeletonPlaceholder.Item
                    width="20%"
                    height={18}
                    borderRadius={4}
                  />
                </View>
              ))}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  borderTopWidth: 1,
                  paddingTop: 15,
                }}>
                <SkeletonPlaceholder.Item
                  width="50%"
                  height={18}
                  borderRadius={4}
                />
                <SkeletonPlaceholder.Item
                  width="20%"
                  height={18}
                  borderRadius={4}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      }
    />
  );
};

export default memo(PaymentShimmer);
