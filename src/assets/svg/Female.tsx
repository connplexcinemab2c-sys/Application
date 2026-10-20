import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
} from 'react-native-svg';

const Female = (props: SvgProps) => (
  <Svg width={72} height={72} {...props}>
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
        d="M181.573 196.585a35.5 35.5 0 1 1-35.5 35.5 35.5 35.5 0 0 1 35.5-35.5Z"
        data-name="Path 4887"
        transform="translate(-146.073 -196.585)"
      />
      <Path
        fill="url(#b)"
        d="M300.955 300.851c-12.983-1.061-12.509-26.219-11.654-37.249.811-10.465 5.317-20.586 11.757-19.567 9.561-2.946 14.945 7.876 15.656 19.169.7 11.171 4.032 38.79-15.759 37.647Z"
        data-name="Path 4888"
        transform="translate(-266.783 -236.265)"
      />
      <Path
        fill="url(#c)"
        d="M278.129 385.486s1.188 8.276-.195 10.6c-2.281 2.9-6.07 3.73-11.473 6.36 11.668 27.2 27.01 21.05 35.3.339-8.374-4.75-8.8-4.441-10.893-6.678-1.151-1.232-1.578-4.369-1.752-11.093l-10.99.472Z"
        data-name="Path 4889"
        transform="translate(-247.797 -355.802)"
      />
      <Path
        fill="url(#d)"
        d="M333.364 276.947c-.337 0-.593.284-.78.76.073-6.835.141-11.669-8.621-11.671a11.979 11.979 0 0 0-5.156.926c-3.605 1.719-3.493 5.659-3.428 10.605-.18-.405-.42-.643-.728-.643-.828 0-1.323 1.863-.856 3.665s.723 3.422 1.551 3.424c.334 0 .472-.192.52-.557 1.36 5.293 5.353 8.294 7.935 8.384 2.873.254 6.924-3.154 8.293-8.637.013.54.129.826.537.827.828 0 1.092-1.615 1.569-3.415s-.008-3.665-.836-3.668Z"
        data-name="Path 4890"
        transform="translate(-287.64 -255.27)"
      />
      <Path
        fill="url(#b)"
        d="M316.9 268.893c1.163-4.613 1.106-6.069 5.371-9.494 5.063 5.473 10.928 3.608 11.949 10.3 1.248-.92.852-3.219.789-4.273-.159-5.079-4.847-10.59-9.549-10-6.706 1.332-7.9 3.329-10 11.409l1.435 2.056Z"
        data-name="Path 4891"
        transform="translate(-289.203 -246.269)"
      />
      <Path
        fill="url(#e)"
        d="m264.261 489.341-1.555-8.3c-.419-2.206-2.891-4.558-5.2-5.481-3.068-1.489-5.277-2-8.087-3.634-3.4 14.043-18.693 9.9-19.3.069-4.035 1.477-4.631 1.926-8.8 3.543 0 0-4.477 1.455-5.61 5.922l-2.059 8.46a35.5 35.5 0 0 0 50.614-.576Z"
        data-name="Path 4892"
        transform="translate(-203.171 -429.238)"
      />
    </G>
  </Svg>
);

export default Female;
