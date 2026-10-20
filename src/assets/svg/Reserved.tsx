import * as React from 'react';
import Svg, {SvgProps, Rect} from 'react-native-svg';

const Reserved = (props: SvgProps) => (
  
  <Svg width={15} height={15} {...props}>
    <Rect
      width={15}
      height={15}
      fill="#505050"
      data-name="Rectangle 586"
      rx={5}
    />
  </Svg>
);

export default Reserved;
