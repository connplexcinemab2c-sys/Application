import * as React from 'react';
import Svg, {SvgProps, Rect} from 'react-native-svg';

const Available = (props: SvgProps) => (
  <Svg width={14} height={15} {...props}>
    <Rect width={14} height={15} fill="#fff" data-name="Rectangle 585" rx={5} />
  </Svg>
);

export default Available;
