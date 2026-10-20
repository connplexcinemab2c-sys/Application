import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
import {color} from '../../theme';

const Likes = (props: SvgProps) => (
  <Svg width={12.388} height={13.397} {...props}>
    <G data-name="Group 2019">
      <Path
        fill={color.green}
        d="M.337 5.007A.337.337 0 0 0 0 5.344v4.952a.337.337 0 0 0 .337.337h2.031V5.007Z"
        data-name="Path 4832"
      />
      <G data-name="Group 2016">
        <G data-name="Group 2015">
          <Path
            fill={color.green}
            d="M11.388 6.869a1.176 1.176 0 0 0-.573-1.009 1.175 1.175 0 0 0-.967-1.843H7.367c.076-.345.18-.862.252-1.4.188-1.409.06-2.19-.405-2.458a1.016 1.016 0 0 0-.88-.1 1.157 1.157 0 0 0-.669.775l-.652 1.707a6.368 6.368 0 0 1-1.971 2.147v6.092a10.9 10.9 0 0 0 3.616.614h2.7a1.175 1.175 0 0 0 1-1.794 1.174 1.174 0 0 0 .454-1.725 1.176 1.176 0 0 0 .576-1.006Z"
            data-name="Path 4833"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default Likes;
