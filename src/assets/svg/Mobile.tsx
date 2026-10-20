import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from 'react-native-svg';

const Mobile = (props: SvgProps) => (
  <Svg width={12} height={16} {...props}>
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
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      stroke="rgba(0,0,0,0)"
      strokeMiterlimit={10}
      d="m20.426 39.447 1.323-.806a.848.848 0 0 0 .293-1.147l-1.194-2.069a.847.847 0 0 0-1.214-.274l-2.178 1.5c-1.037 3.653 3.623 11.563 7.2 12.464l2.388-1.137a.847.847 0 0 0 .37-1.189L26.22 44.72a.848.848 0 0 0-1.14-.32l-1.359.743a12.949 12.949 0 0 1-3.289-5.7Z"
      data-name="contact-us (1)"
      transform="translate(-16.781 -34.498)"
    />
  </Svg>
);
export default Mobile;
