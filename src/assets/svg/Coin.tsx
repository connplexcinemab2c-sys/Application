import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
const Coin = (props: SvgProps) => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
    <Path
      d="M5.85786 34.1421C-1.95262 26.3316 -1.95262 13.6683 5.85786 5.85786C13.6684 -1.95262 26.3316 -1.95262 34.1421 5.85786C41.9526 13.6684 41.9526 26.3316 34.1421 34.1421C26.3316 41.9526 13.6684 41.9526 5.85786 34.1421Z"
      fill="url(#paint0_linear_0_1)"
    />
    <Path
      d="M21.133 11C24.3911 11 26.7803 12.1935 26.7803 12.1935V16.456C26.7803 16.456 23.8843 14.7754 21.1089 15.1407C18.0439 15.5061 16.7407 17.5277 16.7407 20.0122C16.7407 22.4966 18.0439 24.5913 21.133 24.7862C24.3911 25.0298 27.094 23.2517 26.9975 23.3248L26.9251 27.6604C26.9251 27.6604 24.7048 29 21.133 29C15.7995 29 13 25.3951 13 20.0122C13 14.6292 15.7754 11 21.133 11Z"
      fill="white"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_0_1"
        x1={16.9437}
        y1={-0.00000222981}
        x2={-14.4161}
        y2={-6.44138}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#EAAC2F" />
        <Stop offset={1} stopColor="#F3ED9A" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default Coin;
