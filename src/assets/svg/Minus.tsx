import * as React from 'react';
import Svg, {SvgProps, G, Circle, Path} from 'react-native-svg';

const Minus = (props: SvgProps) => (
  <Svg width={19} height={19} {...props}>
    <G data-name="Group 736" transform="translate(-118 -1101)">
      <Circle
        cx={9.5}
        cy={9.5}
        r={9.5}
        fill="#f9c14b"
        data-name="Ellipse 43"
        transform="translate(118 1101)"
      />
      <G data-name="Group 521">
        <Path
          fill="#4d3a13"
          d="M123.842 1110.001h7.317a.5.5 0 0 1 0 1h-7.317a.5.5 0 0 1 0-1Z"
          data-name="Path 222"
        />
      </G>
    </G>
  </Svg>
);

export default Minus;
