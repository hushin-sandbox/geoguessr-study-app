# GeoGuessr 学習アプリ設計書

## プロジェクト概要

GeoGuessr で使用される国の情報を学習するための Web アプリケーション。世界地図から国を選択し、その国の景観的特徴や言語情報を確認できる。

## 技術スタック

- React 18+
- TypeScript 5+
- react-simple-maps（地図表示）
- Tailwind CSS（スタイリング）
- Zustand（状態管理）
- React Router（ルーティング）

## アーキテクチャ

### データ構造

```typescript
// 国情報
interface Country {
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

// 言語情報
interface Language {
  id: string;
  name: string;
  nameJa: string;
  examples: string[];
  identificationFeatures: string; // 事前定義された特徴
  userNotes?: string; // ユーザーメモ
  countries: string[]; // 国IDの配列
}

// リージョン
enum Region {
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
```

### ディレクトリ構造

```
src/
├── components/
│   ├── Map/
│   │   ├── WorldMap.tsx
│   │   └── MapControls.tsx
│   ├── CountryInfo/
│   │   ├── CountryPanel.tsx
│   │   ├── CountryDetails.tsx
│   │   └── EditableNote.tsx
│   ├── LanguageInfo/
│   │   ├── LanguagePanel.tsx
│   │   ├── LanguageDetails.tsx
│   │   └── LanguageList.tsx
│   └── RegionView/
│       ├── RegionList.tsx
│       └── RegionCountries.tsx
├── data/
│   ├── countries.ts
│   ├── languages.ts
│   └── regions.ts
├── hooks/
│   ├── useLocalStorage.ts
│   └── useCountryData.ts
├── store/
│   └── appStore.ts
├── types/
│   └── index.ts
├── utils/
│   └── mapHelpers.ts
└── App.tsx
```

## 画面構成

### 1. メインビュー（地図表示）

- **レイアウト**: 2 ペイン構成
  - 左側: 世界地図（60%）
  - 右側: 国情報パネル（40%）
- **機能**:
  - 国をクリックで選択
  - GeoGuessr 対象外の国はグレーアウト
  - ズーム・パン機能
  - リージョンハイライト機能

### 2. 国情報パネル

- **表示項目**:
  - 国名（日本語・英語）
  - 国旗
  - 景色の特徴（事前定義 + ユーザーメモ）
  - 主要言語リスト（クリックで言語パネル表示）
- **機能**:
  - メモの編集・保存
  - 言語情報へのリンク

### 3. 言語情報サイドパネル

- **表示項目**:
  - 言語名
  - 例文リスト
  - 判別特徴（事前定義 + ユーザーメモ）
  - 使用国リスト（クリックで該当国へジャンプ）
- **機能**:
  - スライドイン/アウトアニメーション
  - メモの編集・保存

### 4. リージョン一覧ページ

- **レイアウト**: グリッド表示
- **機能**:
  - リージョンごとの国一覧
  - 各国への直接リンク
  - 学習進捗の表示（オプション）

## ルーティング

```
/                     # メインビュー（地図）
/regions              # リージョン一覧
/country/:countryId   # 特定の国に直接アクセス
/language/:languageId # 特定の言語情報
```

## 状態管理

### グローバル状態（Zustand）

```typescript
interface AppState {
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
```

### ローカルストレージ

- ユーザーメモのみ保存
- キー: `geoguessr-study-notes`
- 自動保存（デバウンス処理）

## 実装の優先順位

1. **Phase 1: 基本機能**

   - 地図表示と国の選択
   - 国情報の表示
   - 基本的なデータ構造

2. **Phase 2: 言語機能**

   - 言語情報パネル
   - 言語から国への逆引き

3. **Phase 3: データ永続化**

   - ユーザーメモの編集
   - ローカルストレージ保存

4. **Phase 4: 追加機能**
   - リージョン一覧ページ
   - 検索機能
   - キーボードショートカット

## 注意事項

- **パフォーマンス**: 地図の描画は重いので、メモ化を適切に使用
- **アクセシビリティ**: キーボード操作のサポート
- **データ更新**: 国・言語データは静的ファイルとして管理
- **エラーハンドリング**: ローカルストレージの容量制限に注意

## 今後の拡張可能性

- 学習モード（クイズ機能）
- 画像の追加（街並み、標識など）
- データのエクスポート/インポート
- 複数ユーザーのプロファイル管理
