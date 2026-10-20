import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

const Search = (props: SvgProps) => (
  
  <Svg width={13} height={13} {...props}>
    <G fill="#fff">
      <Path
        d="M5.778 11.556a5.778 5.778 0 1 1 5.778-5.778 5.778 5.778 0 0 1-5.778 5.778Zm0-10.111a4.333 4.333 0 1 0 4.333 4.333 4.333 4.333 0 0 0-4.333-4.334Z"
        data-name="Path 90"
      />
      <Path
        d="M12.278 13a.722.722 0 0 1-.511-.212L8.878 9.899a.722.722 0 1 1 1.021-1.021l2.89 2.889A.722.722 0 0 1 12.278 13Z"
        data-name="Path 91"
      />
    </G>
  </Svg>
);

export default Search;
