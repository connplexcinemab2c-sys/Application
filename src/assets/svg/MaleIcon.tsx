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

const MaleIcon = (props: SvgProps) => (
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
    <G data-name="Group 2035" transform="translate(-640.11 -4127.456)">
      <Path
        fill="url(#a)"
        fillRule="evenodd"
        d="M835.958 758.9a60 60 0 1 1-60 60 60 60 0 0 1 60-60Z"
        data-name="Path 4864"
        transform="translate(-135.848 3368.558)"
      />
      <Rect
        fill="#ffcca9"
        data-name="Rectangle 6996"
        transform="translate(715.176 4189.663)"
      />
      <Path
        fill="#36393a"
        fillRule="evenodd"
        d="m729.081 4203.981.17.034-.17-.034Z"
        data-name="Path 4865"
      />
      <Path
        fill="url(#a)"
        fillRule="evenodd"
        d="M835.958 758.9a60 60 0 1 1-60 60 60 60 0 0 1 60-60Z"
        data-name="Path 4912"
        transform="translate(-135.848 3368.558)"
      />
      <Path
        fill="#36393a"
        fillRule="evenodd"
        d="m675.52 4202.633.186-.064-.186.064Z"
        data-name="Path 4866"
      />
      <Path
        fill="url(#b)"
        fillRule="evenodd"
        d="M977.363 987.534c-2.426-1.119-7.488-2.7-8.016-6.46a38.059 38.059 0 0 1-.323-4.7c-.015-2.05.043-4.149.232-6.346-2.744 5.112-7.277 8.378-13.863 8.24-4.613-.1-8.676-3.932-11.313-9.019a76.523 76.523 0 0 1 .608 7.783c0 .115-.025.935-.055 1.808-.128 3.758-4.275 6.457-7.956 7.731 9.431 16.432 30.508 16.789 40.686.959Z"
        data-name="Path 4867"
        transform="translate(-254.512 3213.272)"
      />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M716.36 4154.456a.322.322 0 0 1-.039.051.074.074 0 0 0 .039-.051Z"
        data-name="Path 4868"
      />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="m715.009 4155.995.175.079c-.009-.023-.073-.049-.175-.079Z"
        data-name="Path 4869"
      />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M687.367 4161.722a.343.343 0 0 1-.063-.008.074.074 0 0 0 .063.008Z"
        data-name="Path 4870"
      />
      <Path
        fill="url(#c)"
        fillRule="evenodd"
        d="M974.77 858.757a1.283 1.283 0 0 0-.3-.058c-1.027-.068-1.787 1-2.3 2.716 0 .013-.007.028-.011.04v-.028c-.051.069-.1.137-.161.208a88.537 88.537 0 0 0-2.523-14.67c-1.493-1.235-3.332-3.767-19.028-3.3-1.824-.526-6.823 3.267-6.884 3.364a15.28 15.28 0 0 0-1.776 5.238c-1.533 8.635-.76 6.209-1.267 9.374a3.446 3.446 0 0 1-.365-.37c-.04-.139-.078-.286-.122-.417-.5-1.5-1.206-2.416-2.155-2.364a1.334 1.334 0 0 0-.664.23c-1.34.884-1.851 4.193-.78 7.317 1.235 3.6 1.985 6.854 3.8 6.754.9-.049 1.116-.655 1.084-1.762a28.709 28.709 0 0 0 2.189 5.66c2.638 5.088 6.7 8.923 11.313 9.02 6.588.137 11.121-3.129 13.865-8.241a25.415 25.415 0 0 0 2.21-5.89c.02.872.282 1.344 1.074 1.4 1.814.118 2.6-3.128 3.869-6.715 1.202-3.387.534-7.008-1.068-7.506Z"
        data-name="Path 4871"
        transform="translate(-253.908 3306.012)"
      />
      <Path
        fill="url(#d)"
        fillRule="evenodd"
        d="M921.3 1049.23c-.885-4.206-2.465-7.763-6.524-10.488-7.119-4.779-21.021-8.262-26.222-11.35-5.6 17.153-29.214 13.5-32.1-.276-6.122 2.249-22.492 6.107-28.71 11.772-1.607 1.465-3.078 5.82-3.478 7.554l-1.082 6.956a59.86 59.86 0 0 0 98.118-4.169Z"
        data-name="Path 4872"
        transform="translate(-170.666 3170.486)"
      />
      <Path
        fill="url(#e)"
        fillRule="evenodd"
        d="m941.923 830.088.171.185a6.926 6.926 0 0 0 .576.6c.508-3.165-.265-.739 1.267-9.374a15.278 15.278 0 0 1 1.776-5.238c1.046-1.653 25.481 2.955 25.558 3.018.665 1.98 1.969 7.634 2.877 11.587.058-.07.109-.139.161-.208l.009-.012c.517-1.715 1.276-2.785 2.3-2.717a1.272 1.272 0 0 1 .3.058 82.9 82.9 0 0 0 .044-11.131c.1-11.126-12.329-15.492-21.255-14.934-15.678.979-18.59 11.7-16.193 26.025 1.429 0 2.042 1.033 2.409 2.137Z"
        data-name="Path 4873"
        transform="translate(-256.054 3336.869)"
      />
    </G>
  </Svg>
);

export default MaleIcon;
