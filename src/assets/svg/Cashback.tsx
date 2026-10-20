import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
  Rect,
} from 'react-native-svg';

const Cashback = (props: SvgProps) => (
  <Svg width={16.92} height={16.92} {...props}>
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
    <G fill="url(#a)" data-name="Layer 2" transform="translate(-1.25 -1.25)">
      <Path
        d="M11.805 6.063H9.21a.555.555 0 0 1-.544-.666l.377-1.887a2.821 2.821 0 0 1 2.762-2.26 2.406 2.406 0 0 1 0 4.813ZM9.888 4.952h1.917a1.3 1.3 0 0 0 0-2.592 1.707 1.707 0 0 0-1.67 1.37Z"
        data-name="Path 4829"
      />
      <Path
        d="M9.21 6.063H6.618a2.406 2.406 0 0 1 0-4.813 2.821 2.821 0 0 1 2.759 2.262L9.754 5.4a.555.555 0 0 1-.544.666Zm-2.592-3.7a1.3 1.3 0 1 0 0 2.592h1.915l-.245-1.224a1.707 1.707 0 0 0-1.67-1.37Z"
        data-name="Path 4830"
      />
      <Rect
        width={15.92}
        height={4.813}
        data-name="Rectangle 6989"
        rx={2}
        transform="translate(1.25 4.952)"
      />
      <Path
        d="M8.655 10.506v6.664H4.397a2.035 2.035 0 0 1-2.036-2.036v-4.791a2.733 2.733 0 0 0 .926.163Z"
        data-name="Path 4827"
      />
      <Path
        d="M16.059 10.343v4.791a2.035 2.035 0 0 1-2.036 2.036H9.765v-6.664h5.368a2.733 2.733 0 0 0 .926-.163Z"
        data-name="Path 4828"
      />
    </G>
  </Svg>
);

export default Cashback;
