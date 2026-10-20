export interface FiltersControllerProps {
  onLanguage: (item: LanguageProps) => void;
  onGenre: (item: LanguageProps) => void;
  getColor: (item: any, type: string) => string[];
}

export interface LanguageProps {
  id: number;
  name: string;
}
