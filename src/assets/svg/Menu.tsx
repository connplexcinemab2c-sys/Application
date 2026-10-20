import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const Menu = (props: SvgProps) => (
  <Svg fill="#ffffff" width="24" height="24" viewBox="0 0 24 24" {...props}>
    <Path
      id="primary"
      d="M3,12H21M9,18H21M3,6H15"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Menu;
