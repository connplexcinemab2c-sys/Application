import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from 'react-native-svg';

const Home = (props: SvgProps) => (
  <Svg width={18.901} height={18.903} {...props}>
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
      d="m17.42 7.786-7.3-7.3a1.648 1.648 0 0 0-2.331 0l-7.3 7.3-.007.008a1.647 1.647 0 0 0 1.1 2.808H1.924v5.374A1.931 1.931 0 0 0 3.846 17.9H6.7a.525.525 0 0 0 .525-.525v-4.211a.881.881 0 0 1 .88-.88h1.688a.881.881 0 0 1 .88.88v4.214a.524.524 0 0 0 .525.525h2.857a1.931 1.931 0 0 0 1.929-1.929V10.6h.27a1.648 1.648 0 0 0 1.166-2.814Zm0 0"
      data-name="home (2)"
      transform="translate(0 .001)"
    />
  </Svg>
);

export default Home;
