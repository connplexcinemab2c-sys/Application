import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
  Circle,
} from 'react-native-svg';

const Company = (props: SvgProps) => (
  <Svg width={12.939} height={12.78} {...props}>
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
    <G fill="url(#a)" transform="translate(-1 -1.496)">
      <Path
        d="M5.469 6.91h3a.891.891 0 0 0 .891-.887v-.116a2.177 2.177 0 0 0-.852-1.727 1.962 1.962 0 0 1-3.068 0 2.177 2.177 0 0 0-.858 1.727v.115a.891.891 0 0 0 .887.888Z"
        data-name="Path 4800"
      />
      <Path
        d="M12.087 10.547a1.962 1.962 0 0 1-3.068 0 2.177 2.177 0 0 0-.856 1.727v.115a.891.891 0 0 0 .887.887h3a.891.891 0 0 0 .891-.887v-.115a2.177 2.177 0 0 0-.852-1.727Z"
        data-name="Path 4801"
      />
      <Path
        d="M4.924 10.547a1.962 1.962 0 0 1-3.068 0A2.177 2.177 0 0 0 1 12.274v.115a.891.891 0 0 0 .887.887h3a.891.891 0 0 0 .891-.887v-.115a2.177 2.177 0 0 0-.852-1.727Z"
        data-name="Path 4802"
      />
      <Circle
        cx={1.592}
        cy={1.592}
        r={1.592}
        data-name="Ellipse 522"
        transform="translate(5.458 1.496)"
      />
      <Circle
        cx={1.592}
        cy={1.592}
        r={1.592}
        data-name="Ellipse 523"
        transform="translate(1.637 7.864)"
      />
      <Circle
        cx={1.592}
        cy={1.592}
        r={1.592}
        data-name="Ellipse 524"
        transform="translate(8.96 7.864)"
      />
      <Path
        d="M8.305 10.093a.4.4 0 0 0-.143-.541l-.8-.482v-.965a.4.4 0 1 0-.8 0v.967l-.8.482a.4.4 0 0 0 .4.681l.8-.474.8.474a.4.4 0 0 0 .543-.142Z"
        data-name="Path 4803"
      />
    </G>
  </Svg>
);
export default Company;
