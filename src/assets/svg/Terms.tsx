import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from 'react-native-svg';

const Terms = (props: SvgProps) => (
  
  <Svg width={11.489} height={11.489} {...props}>
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
      d="M6.568 9.614a3.046 3.046 0 0 1 4.873-2.437c.029-.425.047-.9.048-1.432a18.319 18.319 0 0 0-.234-3.038A3.212 3.212 0 0 0 8.782.234 18.29 18.29 0 0 0 5.744 0a18.323 18.323 0 0 0-3.037.233A3.212 3.212 0 0 0 .233 2.707 18.345 18.345 0 0 0 0 5.744a18.349 18.349 0 0 0 .233 3.038 3.212 3.212 0 0 0 2.473 2.473 18.346 18.346 0 0 0 3.038.234c.532 0 1.007-.019 1.432-.048a3.023 3.023 0 0 1-.608-1.827ZM2.906 2.776h5.677a.665.665 0 0 1 0 1.33H2.906a.665.665 0 0 1 0-1.33Zm0 4.106a.665.665 0 0 1 0-1.33h3.333a.665.665 0 1 1 0 1.33Z"
      data-name="Path 196"
    />
  </Svg>
);

export default Terms;
