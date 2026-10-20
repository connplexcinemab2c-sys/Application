import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from 'react-native-svg';

const Investor = (props: SvgProps) => (
  <Svg width={12.502} height={14.695} {...props}>
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
      d="M103.076 6.152A3.076 3.076 0 1 0 100 3.076a3.08 3.08 0 0 0 3.076 3.076Zm0 0"
      data-name="Path 192"
      transform="translate(-97.325)"
    />
    <Path
      fill="url(#a)"
      d="M7.21 230h-.255v1.966l.527 2.636a.4.4 0 0 1-.135.386l-1.337 1.123a.4.4 0 0 1-.516 0l-1.337-1.123a.4.4 0 0 1-.135-.386l.527-2.636V230h-.257A4.5 4.5 0 0 0 0 234.681v2.461a.4.4 0 0 0 .4.4h10.7a.4.4 0 0 0 .4-.4v-2.461A4.5 4.5 0 0 0 7.21 230Zm0 0"
      data-name="Path 193"
      transform="translate(0 -223.848)"
    />
    <Path
      fill="url(#a)"
      d="m181.449 322.119.9.754.9-.754-.429-2.119h-.947Zm0 0"
      data-name="Path 194"
      transform="translate(-176.596 -311.44)"
    />
    <Path
      fill="url(#a)"
      d="M200 260h.8v.8h-.8Zm0 0"
      data-name="Path 195"
      transform="translate(-194.65 -253.046)"
    />
  </Svg>
);

export default Investor;
