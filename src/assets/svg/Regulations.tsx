import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from 'react-native-svg';

const Regulations = (props: SvgProps) => (
  <Svg width={12.24} height={12.24} {...props}>
    <Defs>
      <LinearGradient
        id="a"
        x1={0.5}
        x2={0.19}
        y1={1.26}
        y2={-2.033}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#eaac2f" />
        <Stop offset={1} stopColor="#f3ed9a" />
      </LinearGradient>
    </Defs>
    <Path
      fill="url(#a)"
      d="m16.213 14.673-2.731-2.31 1.118-1.119a.4.4 0 0 0 .559 0l.56-.56a.4.4 0 0 0 0-.56l-2.8-2.8a.4.4 0 0 0-.56 0l-.56.56a.4.4 0 0 0 0 .56L8.446 11.8a.4.4 0 0 0-.56 0l-.56.56a.4.4 0 0 0 0 .56l2.8 2.8a.4.4 0 0 0 .559 0l.56-.56a.4.4 0 0 0 0-.56l1.119-1.119 2.31 2.731a1.092 1.092 0 1 0 1.539-1.539Z"
      data-name="Path 5251"
      transform="translate(-4.358 -4.358)"
    />
    <Path
      fill="url(#a)"
      d="M7.517 0h-6.33A1.19 1.19 0 0 0 0 1.187v8.7a1.19 1.19 0 0 0 1.187 1.187h3.177L2.409 9.123a1.184 1.184 0 0 1 0-1.677l.322-.324h-.753a.4.4 0 0 1 0-.791h.791a.4.4 0 0 1 .4.4 1.213 1.213 0 0 1 .708-.187L4.913 5.5a.39.39 0 0 1-.165.039h-2.77a.4.4 0 1 1 0-.791h2.77a.4.4 0 0 1 .4.4.39.39 0 0 1-.039.165l1.431-1.44a1.207 1.207 0 0 1 .344-.906l.562-.558A1.189 1.189 0 0 1 8.7 2.136v-.95A1.19 1.19 0 0 0 7.517 0ZM5.934 3.956H1.978a.4.4 0 1 1 0-.791h3.956a.4.4 0 1 1 0 .791Zm.791-1.583H1.978a.4.4 0 0 1 0-.791h4.748a.4.4 0 1 1 0 .791Z"
      data-name="Path 5252"
    />
  </Svg>
);

export default Regulations;
