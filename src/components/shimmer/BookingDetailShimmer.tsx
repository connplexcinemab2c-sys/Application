import React, {memo} from 'react';
import {View, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const BookingDetailShimmer = () => {
  const list = [1, 2, 3, 4, 5];
  return (
    <SkeletonPlaceholder
      backgroundColor="#e0e0e0"
      highlightColor="#9F9F9F"
      children={
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              marginHorizontal: 18,
              marginTop: 20,
            }}>
            <SkeletonPlaceholder.Item
              width={100}
              height={130}
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
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginHorizontal: 18,
            }}>
            <View style={{flex: 1}}>
              <SkeletonPlaceholder.Item
                width="80%"
                height={18}
                borderRadius={4}
                marginTop={8}
              />
              <SkeletonPlaceholder.Item
                width="70%"
                height={18}
                borderRadius={4}
                marginTop={8}
              />
              <SkeletonPlaceholder.Item
                width="50%"
                height={18}
                borderRadius={4}
                marginTop={8}
              />
              <SkeletonPlaceholder.Item
                width="30%"
                height={18}
                borderRadius={4}
                marginTop={8}
              />
            </View>
            <SkeletonPlaceholder.Item
              width={100}
              height={130}
              borderRadius={4}
              marginTop={10}
            />
          </View>
          <SkeletonPlaceholder.Item
            width="25%"
            height={18}
            borderRadius={4}
            marginHorizontal={18}
            marginTop={25}
          />
          <ScrollView scrollEnabled={false}>
            <View
              style={{
                marginHorizontal: 18,
                marginTop: 20,
                borderWidth: 1,
                paddingHorizontal: 10,
                borderRadius: 4,
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

export default memo(BookingDetailShimmer);
