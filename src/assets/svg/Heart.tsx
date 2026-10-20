import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const Heart = (props: SvgProps) => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.959386 6.73422C0.249323 4.51735 1.07916 1.98349 3.40656 1.23373C4.6308 0.838658 5.98211 1.0716 6.99989 1.83724C7.96274 1.09277 9.36368 0.841305 10.5866 1.23373C12.914 1.98349 13.7491 4.51735 13.0397 6.73422C11.9346 10.2481 6.99989 12.9547 6.99989 12.9547C6.99989 12.9547 2.10158 10.2892 0.959386 6.73422Z"
      stroke="white"
      strokeWidth={0.868553}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.66664 3.46674C10.38 3.6974 10.884 4.33407 10.9446 5.0814"
      stroke="white"
      strokeWidth={0.875}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Heart;
