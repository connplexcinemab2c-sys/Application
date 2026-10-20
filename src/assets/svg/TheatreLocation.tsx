import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
} from 'react-native-svg';

const TheatreLocation = (props: SvgProps) => (
  <Svg width={12} height={15} {...props}>
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
    <G data-name="location (3)">
      <Path
        fill="url(#a)"
        fillRule="evenodd"
        d="M253 243a6.039 6.039 0 0 1 6 6.071 9.152 9.152 0 0 1-1.937 4.89 25.016 25.016 0 0 1-3.365 3.773 1.05 1.05 0 0 1-1.4 0 21.929 21.929 0 0 1-3.365-3.773 9.153 9.153 0 0 1-1.937-4.89A6.039 6.039 0 0 1 253 243Zm0 3.571a2.5 2.5 0 1 0 2.471 2.5 2.487 2.487 0 0 0-2.471-2.5Z"
        data-name="Path 88"
        transform="translate(-247 -243)"
      />
    </G>
  </Svg>
);

export default TheatreLocation;
