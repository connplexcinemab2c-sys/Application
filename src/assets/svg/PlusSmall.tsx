import * as React from 'react';
import Svg, {SvgProps, G, Circle, Path} from 'react-native-svg';

const PlusSmall = (props: SvgProps) => (
  <Svg width={19} height={19} {...props}>
    <G data-name="Group 735">
      <G data-name="Group 1976">
        <G data-name="Group 1977">
          <G data-name="Group 1978">
            <Circle
              cx={9.5}
              cy={9.5}
              r={9.5}
              fill="#f9c14b"
              data-name="Ellipse 42"
            />
            <G fill="#4d3a13" data-name="03 Login">
              <Path
                d="M9.501 13.674a.408.408 0 0 1-.408-.407V5.734a.408.408 0 0 1 .815 0v7.533a.408.408 0 0 1-.407.407Z"
                data-name="Path 220"
              />
              <Path
                d="M13.267 9.908H5.734a.408.408 0 0 1 0-.815h7.533a.408.408 0 0 1 0 .815Z"
                data-name="Path 221"
              />
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default PlusSmall;
