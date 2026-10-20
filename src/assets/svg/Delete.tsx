import * as React from 'react';
import Svg, {SvgProps, Defs, G, Path, Ellipse} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */
const Delete = (props: SvgProps) => (
  <Svg
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 11.89 10.24"
    width={12.003} height={13.031}
    {...props}>
    <Defs></Defs>
    <G id="Icon">
      <G id="UserDeleteCircle">
        <Path d="M8.44,10.24H1A1,1,0,0,1,.05,9l.78-2.5a1.44,1.44,0,0,1,1.89-.91,5.39,5.39,0,0,0,2,.36,5.37,5.37,0,0,0,2-.36l.09,0V5.6A2.85,2.85,0,0,0,9.17,8.42L9.35,9a1,1,0,0,1-.91,1.26Z" fill="#eaac2f" />
        <Ellipse cx={4.7} cy={2.5} rx={2.47} ry={2.5} fill="#eaac2f" />
        <Path d="M9.57,3.24A2.36,2.36,0,1,0,11.89,5.6,2.35,2.35,0,0,0,9.57,3.24Zm1.22,2.83a.55.55,0,0,1,0,.77.52.52,0,0,1-.76,0l-.46-.47-.47.47a.52.52,0,0,1-.76,0,.55.55,0,0,1,0-.77l.47-.47-.47-.47a.55.55,0,0,1,0-.77.52.52,0,0,1,.76,0l.47.47L10,4.36a.52.52,0,0,1,.76,0,.55.55,0,0,1,0,.77l-.46.47Z" fill="#eaac2f" />
      </G>
    </G>
  </Svg>
);
export default Delete;
