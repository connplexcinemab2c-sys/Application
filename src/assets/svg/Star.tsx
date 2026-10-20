import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Star = (props: SvgProps) => (
  <Svg width={12.6} height={12.6} {...props}>
    <Path
      fill="#d49e2f"
      d="M11.6 4.428c0-.1-.2-.209-.3-.209l-3.9-.1L6.1.25C6 .039 5.9-.061 5.7.039a.22.22 0 0 0-.2.209L4.2 4.115l-3.9.1q-.3 0-.3.313c0 .111 0 .211.1.211l3.1 2.509-1.1 3.865c0 .209 0 .313.2.418h.3l3.2-2.4 3.2 2.4a.243.243 0 0 0 .4-.1.2.2 0 0 0 0-.313l-1-3.865 3.1-2.514a.4.4 0 0 0 .1-.313Z"
    />
  </Svg>
);

export default Star;
