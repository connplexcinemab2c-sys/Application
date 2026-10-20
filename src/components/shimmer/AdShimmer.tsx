import React, {memo} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width} = Dimensions.get('window');

const AdShimmer = () => {
  return (
    <SkeletonPlaceholder
      backgroundColor="#e0e0e0"
      highlightColor="#9F9F9F"
      children={<SkeletonPlaceholder.Item height={width * 0.7} width={width} />}
    />
  );
};

export default memo(AdShimmer);
