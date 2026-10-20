import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
  Rect,
} from 'react-native-svg';

const Male = (props: SvgProps) => (
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
        x1={0.504}
        x2={0.487}
        y1={1.056}
        y2={-0.902}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#fdc38b" />
        <Stop offset={0.36} stopColor="#fd955d" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={0.055}
        x2={1.756}
        y1={0.5}
        y2={0.5}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#fdc38b" />
        <Stop offset={0.475} stopColor="#fd955d" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={0.5}
        x2={0.19}
        y1={1.26}
        y2={-2.033}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#eaac2f" />
        <Stop offset={1} stopColor="#f3ed9a" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x2={1}
        y1={0.5}
        y2={0.5}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} />
        <Stop offset={1} stopColor="#1c1c1c" />
      </LinearGradient>
    </Defs>
    <G data-name="Group 2027" transform="translate(-775.958 -758.898)">
      <Path
        fill="url(#a)"
        fillRule="evenodd"
        d="M811.23 758.9a35.272 35.272 0 1 1-35.272 35.272A35.272 35.272 0 0 1 811.23 758.9Z"
        data-name="Path 4864"
      />
      <Rect
        fill="#ffcca9"
        data-name="Rectangle 6996"
        transform="translate(820.087 795.467)"
      />
      <Path
        fill="#36393a"
        fillRule="evenodd"
        d="m828.261 803.884.1.02-.1-.02Z"
        data-name="Path 4865"
      />
      <Path
        fill="#36393a"
        fillRule="evenodd"
        d="m796.774 803.091.109-.038-.109.038Z"
        data-name="Path 4866"
      />
      <Path
        fill="url(#b)"
        fillRule="evenodd"
        d="M960.531 979.971c-1.422-.656-4.39-1.581-4.7-3.788a22.32 22.32 0 0 1-.189-2.753c-.009-1.2.025-2.433.136-3.721a8.555 8.555 0 0 1-8.128 4.831c-2.7-.057-5.087-2.305-6.633-5.288a44.873 44.873 0 0 1 .357 4.563c0 .067-.015.548-.032 1.06-.075 2.2-2.507 3.786-4.664 4.533 5.529 9.634 17.887 9.843 23.854.562Z"
        data-name="Path 4867"
        transform="translate(-135.963 -177.953)"
      />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M820.783 774.77a.189.189 0 0 1-.023.03.044.044 0 0 0 .023-.03Z"
        data-name="Path 4868"
      />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="m819.989 775.675.1.046c-.005-.013-.042-.029-.1-.046Z"
        data-name="Path 4869"
      />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M803.739 779.042a.2.2 0 0 1-.037 0 .043.043 0 0 0 .037 0Z"
        data-name="Path 4870"
      />
      <Path
        fill="url(#c)"
        fillRule="evenodd"
        d="M958.672 852.49a.751.751 0 0 0-.174-.034c-.6-.04-1.048.587-1.35 1.593 0 .008 0 .016-.007.023v-.016c-.03.04-.06.081-.094.122a51.9 51.9 0 0 0-1.479-8.6c-.875-.724-1.953-2.209-11.156-1.935-1.07-.308-4 1.915-4.036 1.972a8.959 8.959 0 0 0-1.041 3.071 49.82 49.82 0 0 0-.743 5.5 2.02 2.02 0 0 1-.214-.217c-.024-.082-.046-.167-.071-.245-.291-.877-.707-1.416-1.264-1.386a.782.782 0 0 0-.389.135c-.786.518-1.085 2.458-.457 4.29.724 2.11 1.164 4.019 2.227 3.96.526-.029.654-.384.636-1.033a16.837 16.837 0 0 0 1.284 3.31c1.547 2.983 3.928 5.232 6.633 5.288a8.557 8.557 0 0 0 8.129-4.831 14.9 14.9 0 0 0 1.3-3.453c.012.511.166.788.63.818 1.064.069 1.523-1.834 2.269-3.937.695-1.985.306-4.103-.633-4.395Z"
        data-name="Path 4871"
        transform="translate(-135.271 -71.662)"
      />
      <Path
        fill="url(#d)"
        fillRule="evenodd"
        d="M880.9 1040.082a8.946 8.946 0 0 0-3.837-6.149c-4.187-2.8-12.365-4.844-15.424-6.655-3.3 10.057-17.184 7.917-18.883-.161-3.6 1.318-13.23 3.581-16.888 6.9-.945.859-1.811 3.412-2.046 4.429l-.636 4.078a35.276 35.276 0 0 0 57.715-2.444Z"
        data-name="Path 4872"
        transform="translate(-39.951 -226.904)"
      />
      <Path
        fill="url(#e)"
        fillRule="evenodd"
        d="m940.62 818.418.1.109a4.075 4.075 0 0 0 .338.353 49.838 49.838 0 0 1 .743-5.5 8.958 8.958 0 0 1 1.041-3.071c.614-.969 14.94 1.733 14.984 1.77.39 1.161 1.154 4.476 1.687 6.794.034-.041.064-.082.094-.122l.005-.007c.3-1.006.748-1.633 1.35-1.593a.748.748 0 0 1 .174.034 48.624 48.624 0 0 0 .026-6.526c.06-6.523-7.229-9.083-12.462-8.755-9.192.574-10.9 6.859-9.494 15.258.838 0 1.2.605 1.413 1.253Z"
        data-name="Path 4873"
        transform="translate(-137.735 -36.36)"
      />
    </G>
  </Svg>
);

export default Male;
