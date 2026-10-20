import React from 'react';
import {Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {color} from '../../theme';

const PosterShimmer: React.FC = () => {
  const {width} = Dimensions.get('window');
  return (
    <SkeletonPlaceholder
      backgroundColor={color.gray88}
      highlightColor={color.gray}
      children={
        <SkeletonPlaceholder.Item height={width * 0.7} width={'100%'} />
      }
    />
  );
};

export default PosterShimmer;
