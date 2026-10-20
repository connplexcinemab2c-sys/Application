import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
} from 'react-native-svg';

const Reminder = (props: SvgProps) => (
  <Svg width={15.915} height={16.525} {...props}>
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
    <G
      fill="url(#a)"
      data-name="05 notification"
      transform="translate(-5.581 -4.5)">
      <Path
        d="M19.393 16.917a1.214 1.214 0 0 1-1.206 1.206H7.893a1.206 1.206 0 0 1 0-2.413h.185a.447.447 0 0 0 .448-.448v-4.227a4.518 4.518 0 0 1 4.514-4.514 4.425 4.425 0 0 1 .824.075 4.505 4.505 0 0 1 3.691 4.44v4.224a.447.447 0 0 0 .448.448h.185a1.209 1.209 0 0 1 1.205 1.209Z"
        data-name="Path 4822"
      />
      <Path
        d="M14.612 19.019a1.046 1.046 0 0 1-.3.707 1.028 1.028 0 0 1-.725.3h-1.1a1.024 1.024 0 0 1-1.024-1.006Z"
        data-name="Path 4823"
      />
      <Path
        d="M13.877 5.339a.845.845 0 0 1-.075.343 5 5 0 0 0-.764-.057 5.425 5.425 0 0 0-.767.054.819.819 0 0 1-.072-.34.839.839 0 0 1 1.678 0Z"
        data-name="Path 4824"
      />
      <Path
        d="M6.03 10.841a.447.447 0 0 1-.447-.435 5.669 5.669 0 0 1 3.089-5.213.449.449 0 1 1 .408.8 4.775 4.775 0 0 0-1.927 1.8 4.843 4.843 0 0 0-.674 2.588.448.448 0 0 1-.435.461Z"
        data-name="Path 4825"
      />
      <Path
        d="M20.046 10.841h-.013a.448.448 0 0 1-.439-.461 4.843 4.843 0 0 0-.67-2.587 4.775 4.775 0 0 0-1.927-1.8.449.449 0 1 1 .408-.8 5.669 5.669 0 0 1 3.089 5.213.447.447 0 0 1-.448.435Z"
        data-name="Path 4826"
      />
    </G>
  </Svg>
);

export default Reminder;
