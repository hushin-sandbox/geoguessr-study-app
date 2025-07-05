export enum Region {
  Europe = 'europe',
  WestAsia = 'west-asia',
  Africa = 'africa',
  CentralSouthAsia = 'central-south-asia',
  EastAsia = 'east-asia',
  SoutheastAsia = 'southeast-asia',
  Oceania = 'oceania',
  NorthAmerica = 'north-america',
  CentralAmericaCaribbean = 'central-america-caribbean',
  SouthAmerica = 'south-america',
}

export interface Country {
  id: string; // ISO 3166-1 alpha-2
  name: string;
  nameJa: string;
  region: Region;
  languages: string[]; // 言語IDの配列
  flag: string; // 絵文字または画像URL
  landscapeFeatures: string; // 事前定義された特徴
  userNotes?: string; // ユーザーメモ
  enabled: boolean; // GeoGuessrで使用可能か
  coordinates: [number, number]; // [経度, 緯度]
}

export interface Language {
  id: string;
  name: string;
  nameJa: string;
  examples: string[];
  identificationFeatures: string; // 事前定義された特徴
  userNotes?: string; // ユーザーメモ
  countries: string[]; // 国IDの配列
}

export interface AppState {
  selectedCountry: string | null;
  selectedLanguage: string | null;
  isLanguagePanelOpen: boolean;
  userNotes: {
    countries: Record<string, string>;
    languages: Record<string, string>;
  };
  // アクション
  selectCountry: (countryId: string) => void;
  selectLanguage: (languageId: string) => void;
  toggleLanguagePanel: () => void;
  updateCountryNote: (countryId: string, note: string) => void;
  updateLanguageNote: (languageId: string, note: string) => void;
}