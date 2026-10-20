import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';

const FacebookLogo = (props: SvgProps) => (
  <Svg width={45} height={45} {...props}>
    <G data-name="Group 1978" transform="translate(-94 -673.601)">
      <Rect
        width={45}
        height={45}
        fill="#fff"
        data-name="Rectangle 713"
        rx={22.5}
        transform="translate(94 673.601)"
      />
      <Path
        fill="#3d6ad6"
        d="M114.172 697.357h-2.41c-.38 0-.516-.137-.516-.519v-2.947c0-.378.144-.522.519-.522h2.407v-2.138a5.332 5.332 0 0 1 .663-2.736 4.028 4.028 0 0 1 2.17-1.8 5.363 5.363 0 0 1 1.867-.311h2.389c.342 0 .494.152.495.5v2.772c0 .348-.146.488-.5.492-.653.007-1.306 0-1.958.029a.887.887 0 0 0-1.005 1c-.016.721-.007 1.443-.007 2.19h2.812c.4 0 .534.137.534.537v2.931c0 .394-.128.52-.528.52h-2.825v7.907c0 .422-.133.556-.549.556h-3.042c-.368 0-.511-.143-.511-.51-.005-2.574-.005-7.861-.005-7.951Z"
      />
    </G>
  </Svg>
);

export default FacebookLogo;
