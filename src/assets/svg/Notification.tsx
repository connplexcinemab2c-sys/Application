import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from 'react-native-svg';

const Notification = (props: SvgProps) => (
  
  <Svg width={11.184} height={13.702} {...props}>
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
    <Path
      fill="url(#a)"
      d="M121.364 75.122H118.7a.712.712 0 1 1 0-1.424h2.665a.712.712 0 1 1 0 1.424Zm2.912-5.5v-2.553a4.245 4.245 0 0 0-3.566-4.191V62.1a.678.678 0 1 0-1.357 0v.781a4.245 4.245 0 0 0-3.566 4.189v2.552a1.774 1.774 0 0 0 0 3.443v.052h8.489v-.052a1.774 1.774 0 0 0 0-3.443Z"
      transform="translate(-114.44 -61.42)"
    />
  </Svg>
);

export default Notification;
