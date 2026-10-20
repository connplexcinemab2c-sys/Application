import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {color} from '../../theme';

const Warning = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      enableBackground: 'new 0 0 24 24',
    }}
    height={18}
    width={18}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.66c-.938 0-1.58-.723-1.58-1.66 0-.964.669-1.66 1.58-1.66.963 0 1.58.696 1.58 1.66 0 .938-.617 1.66-1.58 1.66zm.622-6.339c-.239.815-.992.829-1.243 0-.289-.956-1.316-4.585-1.316-6.942 0-3.11 3.891-3.125 3.891 0-.001 2.371-1.083 6.094-1.332 6.942z"
      style={{
        fill: color.secondary,
      }}
    />
  </Svg>
);

export default Warning;
