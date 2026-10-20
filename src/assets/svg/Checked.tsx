import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Checked = (props: SvgProps) => (
  <Svg
    width={15} // Set width to 14
    height={15} // Set height to 15
    viewBox="0 0 18.998 18.998" // Keep original viewBox for proper scaling
    data-name="check (3)"
    {...props}>
    <Path
      fill="#eaac2f"
      d="M18 2.062A2.064 2.064 0 0 0 15.935 0H2.062A2.064 2.064 0 0 0 0 2.062v13.873A2.064 2.064 0 0 0 2.062 18h13.873A2.064 2.064 0 0 0 18 15.935Zm0 0"
      data-name="Path 5248"
    />
    <Path
      fill="#fff"
      d="M13.56 6.031a.749.749 0 0 1 0 1.06l-4.874 4.874a.749.749 0 0 1-1.06 0L5.189 9.528a.75.75 0 0 1 1.06-1.06l1.907 1.907L12.5 6.031a.749.749 0 0 1 1.06 0Zm0 0"
      data-name="Path 5249"
      {...props}
    />
  </Svg>
);

export default Checked;
