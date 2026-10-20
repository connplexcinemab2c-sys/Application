import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import {Container, Header} from '../../components';
import filtersController from './filters.controller';
import {genre, languages} from './filters.const';
import style from './filters.style';

const Filters: React.FC = () => {
  const {onGenre, onLanguage, getColor} = filtersController();
  const {onBack} = commonFunctions();
  return (
    <Container
      containerStyle={style.mainContainer}
      scrollContentContainerStyle={style.scrollView}>
      <Header
        backIcon
        onBack={onBack}
        title="Filters"
        titleContainerStyle={style.title}
        rightText="Reset"
      />
      <View style={style.container}>
        <Text allowFontScaling={false} style={style.languages}>
          Languages
        </Text>
        <View style={style.languageContainer}>
          {languages.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              style={style.languageTouch}
              onPress={() => onLanguage(item)}>
              <LinearGradient
                colors={getColor(item, 'language')}
                start={{x: 0.6, y: 1}}
                end={{x: 0, y: 0}}
                style={style.buttonContainer}>
                <Text allowFontScaling={false} style={style.name}>
                  {item.name}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
        <Text allowFontScaling={false} style={style.languages}>
          Genre
        </Text>
        <View style={style.languageContainer}>
          {genre.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              style={style.languageTouch}
              onPress={() => onGenre(item)}>
              <LinearGradient
                colors={getColor(item, 'genre')}
                start={{x: 0.6, y: 1}}
                end={{x: 0, y: 0}}
                style={style.buttonContainer}>
                <Text allowFontScaling={false} style={style.name}>
                  {item.name}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Container>
  );
};

export default Filters;
