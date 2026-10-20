import * as React from 'react';
import Svg, {SvgProps, G, LinearGradient, Stop, Path} from 'react-native-svg';
const Transaction = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={14.653}
    height={14.653}
    x={0}
    y={0}
    viewBox="0 0 64 64"
    style={{
      enableBackground: 'new 0 0 512 512',
    }}
    xmlSpace="preserve"
    className=""
    {...props}>
    <G>
      <LinearGradient
        id="a"
        x1={7.605}
        x2={56.395}
        y1={32}
        y2={32}
        gradientUnits="userSpaceOnUse">
        <Stop stopOpacity={1} stopColor="#eaac2f" offset={0} />
        <Stop stopOpacity={1} stopColor="#f3ed9a" offset={1} />
      </LinearGradient>
      <Path
        fill="url(#a)"
        d="M48.599 38.61a11.011 11.011 0 0 0-14.107 10.494c.596 14.528 21.307 14.527 21.903 0a10.982 10.982 0 0 0-7.796-10.495zM46.48 49.103a1.091 1.091 0 0 1-.3.737l-3.956 3.945a1.039 1.039 0 0 1-1.464-1.474l3.644-3.644v-6.602a1.038 1.038 0 0 1 2.076 0zm-14.066 0c-.16-8.84 9.16-15.364 17.409-12.27V8.702A4.714 4.714 0 0 0 45.11 4H12.308a4.705 4.705 0 0 0-4.703 4.702V50.86a4.705 4.705 0 0 0 4.703 4.702h21.83a13.381 13.381 0 0 1-1.723-6.457zm-2.668-37.65a1.034 1.034 0 0 1-1.038 1.037H14.052a1.038 1.038 0 0 1 0-2.076h14.657a1.034 1.034 0 0 1 1.038 1.038zM13.014 38.941a1.041 1.041 0 0 1 1.038-1.038h8.927a1.038 1.038 0 1 1 0 2.076h-8.927a1.034 1.034 0 0 1-1.038-1.038zm30.903-4.454H14.052a1.038 1.038 0 0 1 0-2.076h29.865a1.038 1.038 0 0 1 0 2.076zm0-5.502H14.052a1.038 1.038 0 0 1 0-2.076h29.865a1.038 1.038 0 0 1 0 2.076zm0-5.501H14.052a1.038 1.038 0 0 1 0-2.077h29.865a1.038 1.038 0 0 1 0 2.077zm0-5.492H14.052a1.038 1.038 0 0 1 0-2.076h29.865a1.038 1.038 0 0 1 0 2.076z"
        opacity={1}
        data-original="url(#a)"
        className=""
      />
    </G>
  </Svg>
);
export default Transaction;
