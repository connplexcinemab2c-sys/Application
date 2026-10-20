import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
} from 'react-native-svg';

const VideoRecorderFilled = (props: SvgProps) => (
  
  <Svg width={22.079} height={18.064} {...props}>
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
    <G fill="url(#a)" transform="translate(-2 -6)">
      <Path
        d="M23.323 14.471a1.489 1.489 0 0 0-1.508.005l-2.754 1.607v5.427l2.754 1.607a1.505 1.505 0 0 0 2.264-1.3v-6.04a1.489 1.489 0 0 0-.756-1.305Z"
        data-name="Path 124"
      />
      <Path
        d="M16.352 13.671a4.263 4.263 0 1 0-5.306-.144h-2.73a3.763 3.763 0 1 0-4.836.227A2.509 2.509 0 0 0 2 16.036v5.52a2.512 2.512 0 0 0 2.509 2.509h11.039a2.512 2.512 0 0 0 2.509-2.509v-5.52a2.5 2.5 0 0 0-1.705-2.365Zm-12.094-2.9a1.505 1.505 0 1 1 1.505 1.505 1.505 1.505 0 0 1-1.505-1.509Zm2.76 10.788H5.011a.5.5 0 0 1 0-1h2.007a.5.5 0 0 1 0 1Zm6.774-9.283a2.007 2.007 0 1 1 2.008-2.011 2.007 2.007 0 0 1-2.008 2.007Z"
        data-name="Path 125"
      />
    </G>
  </Svg>
);

export default VideoRecorderFilled;
