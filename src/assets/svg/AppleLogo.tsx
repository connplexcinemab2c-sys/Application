import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';

const AppleLogo = (props: SvgProps) => (
  <Svg width={45} height={45} {...props}>
    <G data-name="Group 1977" transform="translate(-242 -674)">
      <Rect
        width={45}
        height={45}
        fill="#fff"
        data-name="Rectangle 6985"
        rx={22.5}
        transform="translate(242 674)"
      />
      <G data-name="apple-logo (1)">
        <G data-name="Group 1976">
          <Path
            d="M268.986 683.544h.166a4.992 4.992 0 0 1-1.257 3.762 3.9 3.9 0 0 1-3.43 1.61 4.842 4.842 0 0 1 1.28-3.645 5.527 5.527 0 0 1 3.241-1.727Z"
            data-name="Path 4803"
          />
          <Path
            d="M274.002 700.656v.046a13.563 13.563 0 0 1-1.941 3.742c-.74 1.019-1.647 2.389-3.267 2.389-1.4 0-2.329-.9-3.763-.924-1.517-.025-2.351.752-3.738.948h-.472a4.224 4.224 0 0 1-2.44-1.683 14.726 14.726 0 0 1-3.388-8.471v-1.043a6.832 6.832 0 0 1 2.987-5.607 5.038 5.038 0 0 1 3.382-.779 8.508 8.508 0 0 1 1.657.475 4.576 4.576 0 0 0 1.656.5 3.976 3.976 0 0 0 1.162-.355 7.149 7.149 0 0 1 3.738-.663 5.187 5.187 0 0 1 3.811 2.273 4.891 4.891 0 0 0-2.484 4.852 5.009 5.009 0 0 0 3.1 4.3Z"
            data-name="Path 4804"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default AppleLogo;
