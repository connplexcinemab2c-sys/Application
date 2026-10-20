import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
} from 'react-native-svg';

const UserLocation = (props: SvgProps) => (
  <Svg width={15.345} height={18.72} {...props}>
    <Defs>
      <LinearGradient
        id="a"
        x1={0.028}
        x2={1.795}
        y1={-0.404}
        y2={2.187}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#eaac2f" />
        <Stop offset={0.539} stopColor="#836a2e" />
        <Stop offset={1} stopColor="#f3ed9a" />
      </LinearGradient>
    </Defs>
    <G data-name="location (3)">
      <Path
        fill="url(#a)"
        fillRule="evenodd"
        d="M254.172 243a7.175 7.175 0 0 1 7.172 7.172 10.74 10.74 0 0 1-2.315 5.777 29.683 29.683 0 0 1-4.022 4.457 1.266 1.266 0 0 1-1.669 0 26.017 26.017 0 0 1-4.022-4.457 10.74 10.74 0 0 1-2.316-5.777 7.175 7.175 0 0 1 7.172-7.172Zm0 4.219a2.953 2.953 0 1 0 2.953 2.953 2.955 2.955 0 0 0-2.953-2.953Z"
        data-name="Path 88"
        transform="translate(-247 -243)"
      />
    </G>
  </Svg>
);

export default UserLocation;
