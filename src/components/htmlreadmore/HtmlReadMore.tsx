import React, {useState, useEffect} from 'react';
import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {color} from '../../theme';

const HtmlReadMore = ({htmlContent}:any) => {
  const {width} = useWindowDimensions();
  const [showFull, setShowFull] = useState(false);
  const [truncatedText, setTruncatedText] = useState('');

  const truncateHtmlToText = (html, limit = 220) => {
    const plainText = html.replace(/<[^>]*>?/gm, '');
    return plainText.length > limit
      ? plainText.substring(0, limit).trim() + '...'
      : plainText;
  };

  useEffect(() => {
    if (htmlContent && !showFull) {
      const shortText = truncateHtmlToText(htmlContent);
      setTruncatedText(shortText);
    }
  }, [htmlContent, showFull]);

  return (
    <View>
      {showFull ? (
        <RenderHtml
          contentWidth={width - 20}
          source={{html: htmlContent}}
          tagsStyles={{
            body: {color: '#fff'},
            p: {margin: 0},
          }}
        />
      ) : (
        <Text style={{color: 'white'}}>
          {truncatedText}{' '}
          <Text
            onPress={() => setShowFull(true)}
            style={{color: color.goldenYellow}}>
            Read More
          </Text>
        </Text>
      )}

      {showFull && (
        <TouchableOpacity onPress={() => setShowFull(false)} style={{marginTop: 8}}>
          <Text style={{color: color.goldenYellow}}>Read Less</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HtmlReadMore;
