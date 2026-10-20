import {useState} from 'react';
import {color} from '../../theme';
import {FiltersControllerProps, LanguageProps} from './filters.interface';

const filtersController = (): FiltersControllerProps => {
  const [language, setLanguage] = useState<string>('English');
  const [genre, setGenre] = useState<string>('Action');

  const onLanguage = (item: LanguageProps): void => {
    setLanguage(item.name);
  };

  const onGenre = (item: LanguageProps): void => {
    setGenre(item.name);
  };

  const getColor = (item: any, type: string): string[] => {
    if (type === 'language' ? item.name === language : item.name === genre) {
      return color.buttonGradient;
    } else {
      return [color.transparent, color.transparent];
    }
  };

  return {onLanguage, onGenre, getColor};
};

export default filtersController;
