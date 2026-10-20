import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

const Cinema = (props: SvgProps) => (
  <Svg width={16.991} height={18.156} {...props}>
    <G fill="#fff" data-name="cinema (1)">
      <Path
        d="m7.229 3.914 1.267-.594 1.267.594-.176-1.408.955-1.019-1.372-.263L8.496 0l-.674 1.223-1.372.263.955 1.019Z"
        data-name="Path 117"
      />
      <Path d="M0 16.625h16.991v1.531H0Z" data-name="Path 118" />
      <Path d="M7.704 10.177h1.583v5.384H7.704Z" data-name="Path 119" />
      <Path
        d="M1.207 10.177v5.384H6.64v-5.384Zm3.85 3.641H3.993v-1.9h1.064Z"
        data-name="Path 120"
      />
      <Path d="M0 7.583h16.991v1.531H0Z" data-name="Path 121" />
      <Path d="M0 4.989h16.991V6.52H0Z" data-name="Path 122" />
      <Path
        d="M10.351 10.177v5.384h5.433v-5.384Zm2.647 3.641H11.93v-1.9h1.064Z"
        data-name="Path 123"
      />
    </G>
  </Svg>
);

export default Cinema;
