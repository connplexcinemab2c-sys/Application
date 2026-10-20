import React, {memo} from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Rect,
  Path,
} from 'react-native-svg';

const SelectedSeat = (props: SvgProps) => (
  <Svg width={23.226} height={20.213} {...props}>
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
    <G
      fill="url(#a)"
      data-name="Group 606"
      transform="translate(-2327.794 -958)">
      <Rect
        width={17.656}
        height={17.656}
        data-name="Rectangle 686"
        rx={4}
        transform="translate(2330.58 958)"
      />
      <Path
        d="M2345.065 978.213h-11.315a5.956 5.956 0 0 1-5.956-5.956v-7.837h1.6v7.837a4.356 4.356 0 0 0 4.351 4.351h11.32a4.355 4.355 0 0 0 4.35-4.351v-7.837h1.605v7.837a5.955 5.955 0 0 1-5.956 5.956Z"
        data-name="Subtraction 5"
      />
    </G>
  </Svg>
);

export default memo(SelectedSeat);
