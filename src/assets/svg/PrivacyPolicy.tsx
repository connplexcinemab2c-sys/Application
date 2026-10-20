import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from 'react-native-svg';

const PrivacyPolicy = (props: SvgProps) => (
  <Svg width={12.003} height={13.031} data-name="Layer 2" {...props}>
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
      d="M13.288 3.127a10.693 10.693 0 0 1-2.42-.547 10.655 10.655 0 0 1-2.055-.98 1.081 1.081 0 0 0-1.122 0 10.666 10.666 0 0 1-2.055.984 10.7 10.7 0 0 1-2.42.547A1.076 1.076 0 0 0 2.25 4.2v3.2a6.621 6.621 0 0 0 3.4 5.784l2.074 1.153a1.067 1.067 0 0 0 1.047 0l2.079-1.157a6.621 6.621 0 0 0 3.4-5.784V4.2a1.076 1.076 0 0 0-.965-1.071ZM10.7 6.822 8.393 9.284a.615.615 0 0 1-.858.039L6.15 8.092a.615.615 0 1 1 .818-.92L7.9 8l1.9-2.02a.615.615 0 0 1 .9.842Z"
      data-name="Path 198"
      transform="translate(-2.25 -1.439)"
    />
  </Svg>
);

export default PrivacyPolicy;
