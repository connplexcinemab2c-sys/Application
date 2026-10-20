import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from 'react-native-svg';

const Key = (props: SvgProps) => (
  
  <Svg width={13.968} height={13.968} {...props}>
    <Defs>
      <LinearGradient
        id="a"
        x1={0.842}
        x2={0.621}
        y1={1}
        y2={-1.933}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#eaac2f" />
        <Stop offset={0.456} stopColor="#836a2e" />
        <Stop offset={1} stopColor="#f3ed9a" />
      </LinearGradient>
    </Defs>
    <Path
      fill="url(#a)"
      d="M12.773 0h-.835a1.731 1.731 0 0 0-1.233.511L5.75 5.463a4.369 4.369 0 1 0 2.722 2.723l1.395-1.395V4.65h1.743V2.906h2.064A1.731 1.731 0 0 0 13.935 2v-.838A1.162 1.162 0 0 0 12.773 0Zm-9.59 11.624a.872.872 0 1 1 .872-.872.872.872 0 0 1-.872.872Z"
      data-name="key (1)"
      transform="translate(.032)"
    />
  </Svg>
);

export default Key;
