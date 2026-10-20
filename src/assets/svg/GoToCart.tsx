import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
const GoToCart = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M18.648 16.308a.688.688 0 0 0 .972.973l2.056-2.056.003-.003a.688.688 0 0 0 0-.972l-2.049-2.049a.688.688 0 0 0-.972.973.512.512 0 0 1-.363.874h-2.608a.688.688 0 0 0 0 1.375h2.595c.461 0 .693.559.366.885Z"
      clipRule="evenodd"
    />
    <Path
      fill="url(#b)"
      d="M13.75 7.192a.63.63 0 0 1-.625-.625v-1.15A3.15 3.15 0 0 0 12.1 3.1a3.092 3.092 0 0 0-2.408-.792c-1.5.142-2.817 1.675-2.817 3.275v.809a.63.63 0 0 1-.625.625.63.63 0 0 1-.625-.625v-.817c0-2.242 1.808-4.308 3.95-4.517 1.25-.116 2.45.275 3.367 1.117a4.392 4.392 0 0 1 1.433 3.242v1.15a.63.63 0 0 1-.625.625Z"
    />
    <Path
      fill="url(#c)"
      d="M12.85 10.958a.838.838 0 0 1-.842-.833c0-.458.375-.833.834-.833.458 0 .833.375.833.833a.829.829 0 0 1-.825.833Z"
    />
    <Path
      fill="url(#d)"
      d="M7.017 10.958a.838.838 0 0 1-.842-.833c0-.458.375-.833.833-.833.459 0 .834.375.834.833a.829.829 0 0 1-.825.833Z"
    />
    <Path
      fill="url(#e)"
      fillRule="evenodd"
      d="M7.5 18.958h5c2.055 0 3.218-.51 3.883-1.251.263-.294.012-.707-.383-.707-.361 0-.732.095-1.048.27-.512.28-1.281.447-2.452.447h-5c-3 0-3.367-1.1-3.508-2.434l-.625-4.991c-.109-1.034.025-1.725.433-2.175.492-.55 1.458-.825 2.867-.825h6.666c1.409 0 2.375.275 2.867.833.408.458.542 1.15.433 2.167l-.25 2.007a.624.624 0 0 0 1.238.154l.254-2.036c.092-.884.117-2.175-.75-3.142-.742-.825-1.983-1.233-3.792-1.233H6.667c-1.8 0-3.042.4-3.792 1.233-.875.967-.842 2.258-.75 3.158l.625 4.992c.183 1.742.9 3.533 4.75 3.533Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={17.914}
        x2={12.643}
        y1={12}
        y2={10.641}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#EAAC2F" />
        <Stop offset={1} stopColor="#F3ED9A" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={9.331}
        x2={2.744}
        y1={1.038}
        y2={-0.886}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#EAAC2F" />
        <Stop offset={1} stopColor="#F3ED9A" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={12.714}
        x2={11.408}
        y1={9.292}
        y2={9.023}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#EAAC2F" />
        <Stop offset={1} stopColor="#F3ED9A" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={6.881}
        x2={5.574}
        y1={9.292}
        y2={9.023}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#EAAC2F" />
        <Stop offset={1} stopColor="#F3ED9A" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={8.789}
        x2={-3.38}
        y1={6.042}
        y2={2.977}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#EAAC2F" />
        <Stop offset={1} stopColor="#F3ED9A" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default GoToCart;
