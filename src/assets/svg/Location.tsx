import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Location = (props: SvgProps) => (
  
  <Svg width={22} height={22} {...props}>
    <Path
      fill="#d29d2f"
      d="M13.5 11A2.5 2.5 0 1 1 11 8.5a2.5 2.5 0 0 1 2.5 2.5Zm8.5 0a1 1 0 0 1-1 1h-1.56A8.52 8.52 0 0 1 12 19.44V21a1 1 0 0 1-2 0v-1.56A8.52 8.52 0 0 1 2.56 12H1a1 1 0 0 1 0-2h1.56A8.52 8.52 0 0 1 10 2.56V1a1 1 0 0 1 2 0v1.56A8.52 8.52 0 0 1 19.44 10H21a1 1 0 0 1 1 1Zm-4.59 1H17a1 1 0 0 1 0-2h.41A6.49 6.49 0 0 0 12 4.59V5a1 1 0 0 1-2 0v-.41A6.49 6.49 0 0 0 4.59 10H5a1 1 0 0 1 0 2h-.41A6.49 6.49 0 0 0 10 17.41V17a1 1 0 0 1 2 0v.41A6.49 6.49 0 0 0 17.41 12Z"
      data-name="Path 138"
    />
  </Svg>
);

export default Location;
