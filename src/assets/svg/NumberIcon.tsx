import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from 'react-native-svg';

const NumberIcon = (props: SvgProps) => (
  <Svg width={16.709} height={15.146} {...props}>
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
      d="M22.8 37.3h9.077L26.485 41l-3.667-2.514A1.615 1.615 0 0 0 22.8 37.3Zm-2.374 2.145 1.323-.806a.848.848 0 0 0 .293-1.147l-1.194-2.069a.847.847 0 0 0-1.214-.274l-2.178 1.5c-1.037 3.653 3.623 11.563 7.2 12.464l2.388-1.137a.847.847 0 0 0 .37-1.189l-1.194-2.069a.848.848 0 0 0-1.14-.32l-1.359.743a12.949 12.949 0 0 1-3.289-5.7Zm12.11-1.67-5.835 4a.383.383 0 0 1-.439-.005l-3.874-2.656a1.613 1.613 0 0 1-.241.18l-.837.509a13.172 13.172 0 0 0 2.537 4.397l.86-.47a1.615 1.615 0 0 1 2.171.609l.741 1.283h4.315a.621.621 0 0 0 .619-.622v-7.08a.615.615 0 0 0-.017-.144Z"
      data-name="contact-us (1)"
      transform="translate(-16.781 -34.498)"
    />
  </Svg>
);
export default NumberIcon;
