import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
} from 'react-native-svg';

const Booking = (props: SvgProps) => (
  <Svg width={17} height={13.467} {...props}>
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
    <G data-name="Layer 2">
      <Path
        fill="url(#a)"
        d="M16.113 5h-2.267a1.853 1.853 0 0 0-1.031.312L11.8 6l-.781-.6A1.859 1.859 0 0 0 9.885 5h-7A1.887 1.887 0 0 0 1 6.887v8.693a1.887 1.887 0 0 0 1.887 1.887h6.987a1.887 1.887 0 0 0 1.133-.4l.771-.606 1.031.691a1.853 1.853 0 0 0 1.031.312h2.267A1.887 1.887 0 0 0 18 15.58V6.887A1.887 1.887 0 0 0 16.113 5Zm-4.346 6.8a.567.567 0 1 1 .567-.567.567.567 0 0 1-.567.567Zm.567 2.1a.567.567 0 1 1-.567-.567.567.567 0 0 1 .566.567Zm-.567-4.76a.567.567 0 1 1 .567-.567.567.567 0 0 1-.567.564Z"
        data-name="Path 4819"
        transform="translate(-1 -5)"
      />
    </G>
  </Svg>
);

export default Booking;
