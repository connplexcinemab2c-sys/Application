import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';

const GoogleLogo = (props: SvgProps) => (
  <Svg width={45} height={45} {...props}>
    <G data-name="Group 1979" transform="translate(-167.5 -673.601)">
      <Rect
        width={45}
        height={45}
        fill="#fff"
        data-name="Rectangle 6984"
        rx={22.5}
        transform="translate(167.5 673.601)"
      />
      <Path
        fill="#fbbb00"
        d="m183.914 698.383-.761 2.841-2.782.059a10.952 10.952 0 0 1-.08-10.209l2.477.454 1.085 2.462a6.525 6.525 0 0 0 .061 4.393Z"
        data-name="Path 4799"
      />
      <Path
        fill="#518ef8"
        d="M200.742 694.059a10.928 10.928 0 0 1-3.9 10.568l-3.119-.159-.441-2.756a6.516 6.516 0 0 0 2.8-3.327h-5.846v-4.325h10.5Z"
        data-name="Path 4800"
      />
      <Path
        fill="#28b446"
        d="M196.844 704.626a10.936 10.936 0 0 1-16.474-3.345l3.543-2.9a6.5 6.5 0 0 0 9.369 3.329Z"
        data-name="Path 4801"
      />
      <Path
        fill="#f14336"
        d="m196.978 687.686-3.542 2.9a6.5 6.5 0 0 0-9.585 3.4l-3.56-2.917a10.935 10.935 0 0 1 16.687-3.383Z"
        data-name="Path 4802"
      />
    </G>
  </Svg>
);

export default GoogleLogo;
