import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

const Clock = (props: SvgProps) => (
  <Svg width={13.309} height={13.309} {...props}>
    <G data-name="Group 369">
      <G data-name="Group 368">
        <Path
          fill="#eaac2f"
          d="M8.348 7.242 6.632 5.955V3.333a.477.477 0 1 0-.953 0v2.86a.476.476 0 0 0 .191.381l1.907 1.43a.477.477 0 0 0 .572-.763Z"
          data-name="Path 150"
        />
      </G>
    </G>
    <G data-name="Group 371">
      <G data-name="Group 370">
        <Path
          fill="#fff"
          d="M6.155 0a6.155 6.155 0 1 0 6.155 6.155A6.161 6.161 0 0 0 6.155 0Zm0 11.356a5.2 5.2 0 1 1 5.2-5.2 5.207 5.207 0 0 1-5.2 5.2Z"
          data-name="Path 151"
        />
      </G>
    </G>
  </Svg>
);

export default Clock;
