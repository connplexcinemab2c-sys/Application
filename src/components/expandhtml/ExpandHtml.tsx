// components/ExpandableHtmlText.tsx
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';

interface Props {
  htmlContent: string;
  maxLines?: number;
}

const ExpandableHtml = ({htmlContent, maxLines = 3}: Props) => {
  const {width} = useWindowDimensions();
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <RenderHTML
        contentWidth={width}
        source={{html: expanded ? htmlContent : `<p>${htmlContent}</p>`}}
        baseStyle={{
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: expanded ? 'none' : maxLines,
          WebkitBoxOrient: 'vertical',
        }}
      />
      <TouchableOpacity onPress={() => setExpanded(prev => !prev)}>
        <Text style={{color: 'blue', marginTop: 4}}>
          {expanded ? 'Read less' : 'Read more'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpandableHtml;
