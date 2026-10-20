import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';

const Close = (props: SvgProps) => (
  <Svg width={21.642} height={21.642} {...props}>
    <G data-name="Group 2674">
      {/* <Path
        d="M17.619 3.023a10.321 10.321 0 1 0-14.6 14.6 10.321 10.321 0 1 0 14.6-14.6Zm-.83 13.766A9.147 9.147 0 0 1 3.853 3.853a9.147 9.147 0 1 1 12.936 12.936Z"
        data-name="Path 5301"
        fill={'#fff'}
      /> */}
      <Path
        d="M14.869 5.775a.585.585 0 0 0-.83 0l-3.718 3.718-3.718-3.718a.587.587 0 1 0-.83.83l3.718 3.718-3.718 3.718a.589.589 0 0 0 .413 1 .572.572 0 0 0 .413-.174l3.718-3.718 3.718 3.718a.59.59 0 0 0 .413.174.565.565 0 0 0 .413-.174.585.585 0 0 0 0-.83l-3.71-3.718 3.718-3.718a.585.585 0 0 0 0-.826Z"
        data-name="Path 5302"
        fill={'#fff'}
        {...props}
      />
    </G>
  </Svg>
);

export default Close;
