import React, {memo} from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width, height} = Dimensions.get('window');

const MovieDetailShimmer = () => {
  const list = [1, 2, 3, 4, 5];
  return (
    <SkeletonPlaceholder
      backgroundColor="#e0e0e0"
      highlightColor="#9F9F9F"
      children={
        <View>
          <SkeletonPlaceholder.Item height={height / 2.5} width={width} />
          <SkeletonPlaceholder.Item
            width="80%"
            height={20}
            borderRadius={4}
            marginHorizontal={10}
            marginTop={10}
          />
          <SkeletonPlaceholder.Item
            width="60%"
            height={18}
            borderRadius={4}
            marginHorizontal={10}
            marginTop={8}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              marginTop: 8,
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
          <SkeletonPlaceholder.Item
            width="25%"
            height={18}
            borderRadius={4}
            marginHorizontal={10}
            marginTop={25}
          />
          <ScrollView horizontal scrollEnabled={false}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 15,
              }}>
              {list.map((item, index) => (
                <SkeletonPlaceholder.Item
                  height={51}
                  width={51}
                  borderRadius={25.5}
                  key={index}
                  marginRight={10}
                />
              ))}
            </View>
          </ScrollView>
          <SkeletonPlaceholder.Item
            width="25%"
            height={18}
            borderRadius={4}
            marginHorizontal={10}
            marginTop={25}
          />
          <ScrollView horizontal scrollEnabled={false}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginTop: 15,
              }}>
              {list.map((item, index) => (
                <SkeletonPlaceholder.Item
                  marginBottom={20}
                  height={210}
                  width={145}
                  borderRadius={8}
                  key={index}
                  marginRight={10}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      }
    />
  );
};

export default memo(MovieDetailShimmer);
