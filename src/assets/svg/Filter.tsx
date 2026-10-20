import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Filter = (props: SvgProps) => (
  <Svg width={15.3} height={13} {...props}>
    <Path
      fill="#fff"
      d="M10.4 1.95a1.95 1.95 0 1 1 1.95 1.95 1.95 1.95 0 0 1-1.95-1.95ZM.65 2.6h7.8a.65.65 0 1 0 0-1.3H.65a.65.65 0 1 0 0 1.3Zm3.9 1.95a1.95 1.95 0 0 0-1.833 1.3H.65a.65.65 0 0 0 0 1.3h2.067a1.95 1.95 0 1 0 1.833-2.6Zm9.1 1.3h-5.2a.65.65 0 0 0 0 1.3h5.2a.65.65 0 0 0 0-1.3Zm-7.8 4.55H.65a.65.65 0 0 0 0 1.3h5.2a.65.65 0 0 0 0-1.3Zm7.8 0h-2.067a1.95 1.95 0 1 0 0 1.3h2.067a.65.65 0 0 0 0-1.3Z"
      data-name="Path 92"
    />
  </Svg>
);

export default Filter;
