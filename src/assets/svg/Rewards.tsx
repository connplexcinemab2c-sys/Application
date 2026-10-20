import * as React from 'react';
import Svg, {SvgProps, G, LinearGradient, Stop, Path} from 'react-native-svg';
const Rewards = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={14.653}
    height={14.653}
    x={0}
    y={0}
    viewBox="0 0 1.707 1.707"
    style={{
      enableBackground: 'new 0 0 512 512',
    }}
    xmlSpace="preserve"
    fillRule="evenodd"
    className=""
    {...props}>
    <G>
      <LinearGradient
        id="a"
        x1={0.202}
        x2={1.505}
        y1={0.856}
        y2={0.856}
        gradientUnits="userSpaceOnUse">
        <Stop stopOpacity={1} stopColor="#eaac2f" offset={0} />
        <Stop stopOpacity={1} stopColor="#f3ed9a" offset={1} />
      </LinearGradient>
      <Path
        fill="url(#a)"
        fillRule="nonzero"
        d="m.424 1.142-.202.35a.02.02 0 0 0 .024.03l.248-.095.04.261a.02.02 0 0 0 .038.009L.8 1.3a.66.66 0 0 0 .106 0l.229.396a.02.02 0 0 0 .037-.009l.04-.261.249.096a.02.02 0 0 0 .023-.03l-.202-.35A.65.65 0 0 0 .853 0a.652.652 0 0 0-.429 1.142zm.43-.003a.487.487 0 1 1 0-.974.487.487 0 0 1 0 .974zM.536.336a.447.447 0 1 0 .632.632.447.447 0 0 0-.632-.632zm.118.37L.507.547A.02.02 0 0 1 .52.514L.731.473l.105-.19a.02.02 0 0 1 .036.002l.104.188.212.041c.009 0 .026.018.01.034l-.147.158.027.215a.02.02 0 0 1-.029.02L.853.85.657.94A.02.02 0 0 1 .63.92L.655.706zM.561.546.69.684a.02.02 0 0 1 .006.017L.673.89.844.81a.02.02 0 0 1 .018 0l.172.08L1.01.702c-.001-.006 0-.012.005-.017l.13-.139L.96.51A.02.02 0 0 1 .945.5L.853.334.763.5C.758.505.752.51.747.51L.56.546z"
        opacity={1}
        data-original="url(#a)"
        className=""
      />
    </G>
  </Svg>
);
export default Rewards;
