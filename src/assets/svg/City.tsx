import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from 'react-native-svg';
const City = (props: SvgProps) => (
  <Svg width={17.695} height={18.696} {...props}>
    <Defs>
      <LinearGradient
        id="a"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#fadb62" />
        <Stop offset={1} stopColor="#fcca47" />
      </LinearGradient>
    </Defs>
    <Path
      fill="url(#a)"
      d="M16.958 16.221V7a.369.369 0 0 0-.223-.339l-5.162-2.208a.369.369 0 0 0-.514.339v11.429h-.737V.553a.553.553 0 0 0-.75-.517L1.831 2.985a.553.553 0 0 0-.356.517v12.719H.737a.737.737 0 0 0 0 1.475h16.221a.737.737 0 1 0 0-1.475ZM14.746 9.4a.553.553 0 1 1 1.106 0v1.106a.553.553 0 0 1-1.106 0Zm0 4.424a.553.553 0 0 1 1.106 0v1.106a.553.553 0 1 1-1.106 0ZM12.166 9.4a.553.553 0 1 1 1.106 0v1.106a.553.553 0 0 1-1.106 0Zm0 4.424a.553.553 0 0 1 1.106 0v1.106a.553.553 0 1 1-1.106 0ZM7 4.977a.553.553 0 0 1 1.106 0v1.106a.553.553 0 1 1-1.106 0ZM7 9.4a.553.553 0 1 1 1.106 0v1.106a.553.553 0 0 1-1.106 0Zm0 4.424a.553.553 0 0 1 1.106 0v1.106a.553.553 0 1 1-1.106 0ZM3.687 4.977a.553.553 0 0 1 1.106 0v1.106a.553.553 0 1 1-1.106 0Zm0 4.424a.553.553 0 1 1 1.106 0v1.106a.553.553 0 0 1-1.106 0Zm0 4.424a.553.553 0 0 1 1.106 0v1.105a.553.553 0 1 1-1.106 0Z"
    />
  </Svg>
);
export default City;
