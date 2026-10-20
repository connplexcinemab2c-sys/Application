import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const RightArrow = (props: SvgProps) => (
  <Svg width={6.497} height={11.005} {...props}>
    <Path
      fill="#fff"
      d="M.646 0a.63.63 0 0 0-.582.51.936.936 0 0 0 .183.877l3.711 4.1-3.711 4.1a.9.9 0 0 0-.239.756.755.755 0 0 0 .412.62.515.515 0 0 0 .615-.191l4.249-4.687a.939.939 0 0 0 0-1.191L1.035.194a.54.54 0 0 0-.389-.2Z"
    />
  </Svg>
);

export default RightArrow;
