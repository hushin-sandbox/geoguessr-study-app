import { WorldMap } from './components/Map/WorldMap';
import { MapControls } from './components/Map/MapControls';
import { CountryPanel } from './components/CountryInfo/CountryPanel';
import { LanguagePanel } from './components/LanguageInfo/LanguagePanel';

function App() {
  return (
    <div className="h-screen flex bg-gray-100">
      {/* 地図エリア */}
      <div className="flex-1 relative">
        <WorldMap />
        <MapControls />
      </div>
      
      {/* 国情報パネル */}
      <div className="w-96 border-l border-gray-200">
        <CountryPanel />
      </div>
      
      {/* 言語情報サイドパネル */}
      <LanguagePanel />
    </div>
  );
}

export default App;