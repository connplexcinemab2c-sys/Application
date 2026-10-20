import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
} from 'react-native-svg';

const CinemaFilled = (props: SvgProps) => (
  
  <Svg width={16.991} height={18.156} {...props}>
    <Defs>
      <LinearGradient
        id="a"
        x1={0.5}
        x2={0.19}
        y1={1.26}
        y2={-2.033}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#eaac2f" />
        <Stop offset={1} stopColor="#f3ed9a" />
      </LinearGradient>
    </Defs>
    <G fill="url(#a)" data-name="cinema (1)" transform="translate(-16.418)">
      <Path
        d="m23.647 3.914 1.267-.594 1.267.594-.176-1.408.955-1.019-1.372-.263L24.914 0l-.674 1.223-1.372.263.955 1.019Z"
        data-name="Path 117"
      />
      <Path d="M16.418 16.625h16.991v1.531H16.418Z" data-name="Path 118" />
      <Path d="M24.122 10.177h1.583v5.384h-1.583Z" data-name="Path 119" />
      <Path
        d="M17.625 10.177v5.384h5.433v-5.384Zm3.85 3.641h-1.064v-1.9h1.064Z"
        data-name="Path 120"
      />
      <Path d="M16.418 7.583h16.991v1.531H16.418Z" data-name="Path 121" />
      <Path d="M16.418 4.989h16.991V6.52H16.418Z" data-name="Path 122" />
      <Path
        d="M26.769 10.177v5.384h5.433v-5.384Zm2.647 3.641h-1.068v-1.9h1.064Z"
        data-name="Path 123"
      />
    </G>
  </Svg>
);

export default CinemaFilled;
