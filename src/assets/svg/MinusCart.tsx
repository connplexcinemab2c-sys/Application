import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const MinusCart = (props: SvgProps) => (
  <Svg width={12} height={2} viewBox="0 0 12 2" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.575317 0.999924C0.575317 0.654746 0.871228 0.374924 1.23625 0.374924H10.4894C10.8544 0.374924 11.1503 0.654746 11.1503 0.999924C11.1503 1.3451 10.8544 1.62492 10.4894 1.62492H1.23625C0.871228 1.62492 0.575317 1.3451 0.575317 0.999924Z"
      fill="#1C304F"
    />
  </Svg>
);
export default MinusCart;
