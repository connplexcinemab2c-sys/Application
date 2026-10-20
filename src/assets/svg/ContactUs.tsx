import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from 'react-native-svg';

const ContactUs = (props: SvgProps) => (
  
  <Svg width={13.157} height={12.157} {...props}>
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
      d="M15.8 11.163a3.924 3.924 0 1 0-3.924 3.924 3.929 3.929 0 0 0 3.924-3.924Z"
      data-name="Path 199"
      transform="translate(-5.293 -5.43)"
    />
    <Path
      fill="url(#a)"
      d="M14.739 7.327h-.269a5.725 5.725 0 0 0-10.784 0h-.268a.919.919 0 0 0-.918.918v2.03a.919.919 0 0 0 .918.919h1.015a.244.244 0 0 0 .244-.244V7.571a.244.244 0 0 0-.244-.244h-.227a5.24 5.24 0 0 1 9.746 0h-.228a.244.244 0 0 0-.244.244v3.379a.244.244 0 0 0 .244.244h.215a5.24 5.24 0 0 1-3.99 3.23.931.931 0 1 0 .045.494 5.741 5.741 0 0 0 4.476-3.724h.268a.919.919 0 0 0 .918-.919v-2.03a.918.918 0 0 0-.918-.918Z"
      data-name="Path 200"
      transform="translate(-2.5 -3.526)"
    />
  </Svg>
);

export default ContactUs;
