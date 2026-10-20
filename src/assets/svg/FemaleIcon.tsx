import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
} from 'react-native-svg';

const FemaleIcon = (props: SvgProps) => (
  <Svg width={120} height={120} {...props}>
    <Defs>
      <LinearGradient
        id="a"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#473d2f" />
        <Stop offset={1} stopColor="#19140e" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x2={1}
        y1={0.5}
        y2={0.5}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} />
        <Stop offset={1} stopColor="#1c1c1c" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={0.459}
        x2={0.553}
        y1={0.923}
        y2={-0.063}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#fdc38b" />
        <Stop offset={1} stopColor="#fd955d" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={0.271}
        x2={2.417}
        y1={0.533}
        y2={0.167}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#fdc38b" />
        <Stop offset={0.519} stopColor="#fd955d" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={0.5}
        x2={0.19}
        y1={1.26}
        y2={-2.033}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#eaac2f" />
        <Stop offset={1} stopColor="#f3ed9a" />
      </LinearGradient>
    </Defs>
    <G fillRule="evenodd" data-name="Group 2030">
      <Path
        fill="url(#a)"
        d="M206.073 196.585a60 60 0 1 1-60 60 60 60 0 0 1 60-60Z"
        data-name="Path 4887"
        transform="translate(-146.073 -196.585)"
      />
      <Path
        fill="url(#b)"
        d="M309.253 340.4c-21.943-1.792-21.142-44.314-19.7-62.956 1.371-17.687 8.986-34.793 19.871-33.07 16.159-4.979 25.259 13.312 26.461 32.4 1.19 18.881 6.815 65.56-26.635 63.629Z"
        data-name="Path 4888"
        transform="translate(-251.498 -231.24)"
      />
      <Path
        fill="url(#c)"
        d="M286.181 385.812s2.008 13.988-.329 17.914c-3.854 4.9-10.26 6.3-19.391 10.75 19.72 45.971 45.65 35.578 59.666.573-14.153-8.029-14.876-7.506-18.411-11.286-1.945-2.082-2.667-7.385-2.961-18.749l-18.574.8Z"
        data-name="Path 4889"
        transform="translate(-234.916 -335.641)"
      />
      <Path
        fill="url(#d)"
        d="M346.994 284.477c-.569 0-1 .48-1.319 1.285.123-11.553.239-19.722-14.57-19.725a20.245 20.245 0 0 0-8.715 1.566c-6.094 2.906-5.9 9.565-5.794 17.924-.3-.685-.711-1.086-1.23-1.088-1.4 0-2.236 3.148-1.447 6.2s1.222 5.783 2.622 5.787c.565 0 .8-.324.88-.941 2.3 8.946 9.048 14.018 13.411 14.17 4.855.429 11.7-5.33 14.017-14.6.021.913.218 1.4.908 1.4 1.4 0 1.846-2.73 2.652-5.772s-.016-6.201-1.415-6.206Z"
        data-name="Path 4890"
        transform="translate(-269.715 -247.839)"
      />
      <Path
        fill="url(#b)"
        d="M317.89 278.215c1.966-7.8 1.87-10.258 9.078-16.046 8.558 9.25 18.469 6.1 20.2 17.417 2.109-1.555 1.439-5.441 1.334-7.221-.269-8.584-8.191-17.9-16.139-16.908-11.334 2.25-13.36 5.627-16.895 19.282l2.426 3.476Z"
        data-name="Path 4891"
        transform="translate(-271.08 -239.978)"
      />
      <Path
        fill="url(#e)"
        d="m299.193 501.36-2.628-14.031c-.708-3.728-4.885-7.7-8.794-9.264-5.186-2.517-8.919-3.385-13.669-6.141-5.748 23.734-31.593 16.738-32.619.116-6.82 2.5-7.827 3.256-14.874 5.988 0 .007-7.567 2.46-9.481 10.008l-3.479 14.3a59.993 59.993 0 0 0 85.546-.974Z"
        data-name="Path 4892"
        transform="translate(-195.941 -399.779)"
      />
    </G>
  </Svg>
);

export default FemaleIcon;
