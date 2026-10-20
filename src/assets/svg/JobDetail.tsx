import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
  Circle,
} from 'react-native-svg';

const JobDetail = (props: SvgProps) => (
  <Svg width={15.689} height={18.39} {...props}>
    <Defs>
      <LinearGradient
        id="a"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#fadb62" />
        <Stop offset={1} stopColor="#fcca47" />
      </LinearGradient>
    </Defs>
    <G fill="url(#a)" transform="translate(-3.33 -1)">
      <Path
        d="M3.33 3.887v10.382a2.894 2.894 0 0 0 2.887 2.887h3.907A4.067 4.067 0 0 1 10.466 16a4.424 4.424 0 0 1 2.365-2.272 2.838 2.838 0 0 1-1.223-2.342 2.872 2.872 0 0 1 2.869-2.869 2.735 2.735 0 0 1 .817.122 2.843 2.843 0 0 1 1.159.672V3.887A2.887 2.887 0 0 0 13.567 1h-7.35A2.891 2.891 0 0 0 3.33 3.887Zm3.5-.012h6.121a.58.58 0 1 1 0 1.159h-6.12a.58.58 0 1 1 0-1.159Zm0 3.084h6.121a.58.58 0 1 1 0 1.159h-6.12a.58.58 0 1 1 0-1.159Zm0 3.078h2.784a.58.58 0 0 1 0 1.159H6.831a.58.58 0 1 1 0-1.159Z"
        data-name="Path 4804"
      />
      <Circle
        cx={2}
        cy={2}
        r={2}
        data-name="Ellipse 525"
        transform="translate(12.477 9.382)"
      />
      <Path
        d="M11.521 18.391h5.918a.581.581 0 0 0 .58-.58 3.539 3.539 0 0 0-7.078 0 .581.581 0 0 0 .58.58Z"
        data-name="Path 4805"
      />
    </G>
  </Svg>
);
export default JobDetail;
