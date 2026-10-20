import {Ref} from 'react';
import type {TextStyle} from 'react-native';

interface ReadMoreTextProps {
  children?: React.JSX;
  /**
   *  @default 250
   *  @type number
   */
  readMoreWords?: number;
  style?: Omit<TextStyle, 'ref'>;
  readMoreStyle?: Omit<TextStyle, 'ref'>;
  ref?: Ref<ReadMoreTextMethods>;
}
interface ReadMoreTextMethods {
  readMore: () => void;
  readLess: () => void;
}
