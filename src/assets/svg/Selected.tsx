import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Rect,
} from 'react-native-svg';

const Selected = (props: SvgProps) => (
  
  <Svg width={15} height={15} {...props}>
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
    <Rect
      width={15}
      height={15}
      fill="url(#a)"
      data-name="Rectangle 587"
      rx={5}
    />
  </Svg>
);

export default Selected;
