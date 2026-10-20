import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from 'react-native-svg';

const History = (props: SvgProps) => (
  <Svg width={14.653} height={14.653} {...props}>
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
      d="M15.653 8.826A6.826 6.826 0 1 1 2 8.826a.488.488 0 0 1 .975 0A5.86 5.86 0 1 0 5.6 3.95h.3a.488.488 0 0 1 0 .975H4.438a.487.487 0 0 1-.488-.488V2.975a.488.488 0 1 1 .975 0v.251a6.825 6.825 0 0 1 10.727 5.6Zm-2.438 0a4.388 4.388 0 1 1-4.389-4.388 4.388 4.388 0 0 1 4.388 4.388ZM10.56 9.4l-1.246-.83V6.388a.488.488 0 1 0-.975 0v2.438a.488.488 0 0 0 .217.406l1.463.975a.488.488 0 1 0 .541-.807Z"
      data-name="Path 190"
      transform="translate(-2 -2)"
    />
  </Svg>
);

export default History;
