import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Back = (props: SvgProps) => (
  <Svg width={13.271} height={10.617} {...props}>
    <Path
      fill="#fff"
      d="M12.608 4.645H2.266l3.512-3.512A.664.664 0 1 0 4.84.195L.195 4.839a.664.664 0 0 0 0 .938l4.645 4.646a.664.664 0 1 0 .938-.938L2.266 5.972h10.342a.664.664 0 1 0 0-1.327Z"
      data-name="back (1)"
    />
  </Svg>
);

export default Back;
