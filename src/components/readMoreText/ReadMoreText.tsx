import {Text} from 'react-native';
import React, {useState, useImperativeHandle, forwardRef} from 'react';
import styles from './readMoreText.style';
import {ReadMoreTextMethods, ReadMoreTextProps} from './readMoreTextProps';

const ReadMoreText = forwardRef<ReadMoreTextMethods, ReadMoreTextProps>(
  (
    {children, readMoreStyle, readMoreWords = 250, style}: ReadMoreTextProps,
    ref,
  ) => {
    const [numberOfWords, setNumberOfWords] = useState<number | undefined>(
      readMoreWords,
    );

    useImperativeHandle(ref, () => ({
      readMore() {
        setNumberOfWords(undefined);
      },
      readLess() {
        setNumberOfWords(readMoreWords);
      },
    }));

    return (
      <Text style={[style]}>
        {children?.slice(0, numberOfWords)}
        {children?.length > Number(readMoreWords) && (
          <Text
            style={[styles.reamMoreLabel, readMoreStyle]}
            onPress={() =>
              setNumberOfWords(val =>
                val != undefined ? undefined : readMoreWords,
              )
            }>
            {Number(numberOfWords) <= Number(readMoreWords)
              ? ' ...Read More'
              : ' ...Read Less'}
          </Text>
        )}
      </Text>
    );
  },
);

export default ReadMoreText;
