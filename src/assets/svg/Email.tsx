import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
} from 'react-native-svg';

const Email = (props: SvgProps) => (
  <Svg width={14} height={14.611} {...props}>
    <Defs>
      <LinearGradient
        id="a"
        x1={0.842}
        x2={0.621}
        y1={1}
        y2={-1.933}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#eaac2f" />
        <Stop offset={0.456} stopColor="#836a2e" />
        <Stop offset={1} stopColor="#f3ed9a" />
      </LinearGradient>
    </Defs>
    <G fill="url(#a)" data-name="envelope (1)" transform="translate(0 -1)">
      <Path
        d="M12.642 3.397 8.2 7.84a2.643 2.643 0 0 1-3.732 0L.024 3.397C.017 3.48 0 3.555 0 3.639v6.333a2.642 2.642 0 0 0 2.639 2.639h7.389a2.642 2.642 0 0 0 2.639-2.639V3.639c0-.084-.017-.159-.025-.242Z"
        data-name="Path 1"
      />
      <Path
        d="m7.449 7.094 4.821-4.821A2.631 2.631 0 0 0 10.028 1H2.639A2.631 2.631 0 0 0 .393 2.272l4.821 4.822a1.587 1.587 0 0 0 2.24 0Z"
        data-name="Path 2"
      />
    </G>
  </Svg>
);

export default Email;
