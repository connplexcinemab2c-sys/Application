import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'fr';

const translations = {
  en: {
    january: `January 2023`,
  },
  fr: {
    january: `Janvier 2023`,
  },
};

export default new LocalizedStrings(translations);
