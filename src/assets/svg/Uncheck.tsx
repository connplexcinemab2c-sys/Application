import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Uncheck = (props: SvgProps) => (
  <Svg
    width={15} // Set width to 15
    height={15} // Set height to 15
    viewBox="0 0 18.998 18.998" // Keep original viewBox for proper scaling
    data-name="check (2)"
    {...props}>
    <Path
      fill="#eaac2f"
      d="M15.935 18H2.062A2.064 2.064 0 0 1 0 15.935V2.062A2.064 2.064 0 0 1 2.062 0h13.873A2.064 2.064 0 0 1 18 2.062v13.873A2.064 2.064 0 0 1 15.935 18ZM2.062 1.125a.939.939 0 0 0-.937.937v13.873a.939.939 0 0 0 .937.937h13.873a.939.939 0 0 0 .937-.937V2.062a.939.939 0 0 0-.937-.937Zm0 0"
      data-name="Path 5247"
    />
  </Svg>
);

export default Uncheck;
