import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

const CloseIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" viewBox="0 0 24 24" {...props}>
    <G fill="#fff" {...props}>
      <Path d="M8.854 8.146a.5.5 0 1 0-.708.708L11.293 12l-3.147 3.146a.5.5 0 0 0 .708.708L12 12.707l3.146 3.147a.5.5 0 0 0 .708-.708L12.707 12l3.147-3.146a.5.5 0 0 0-.708-.708L12 11.293z" />
      <Path
        fillRule="evenodd"
        d="M2 7a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5zm5-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"
        clipRule="evenodd"
      />
    </G>
  </Svg>
);
export default CloseIcon;
