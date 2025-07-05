import { WorldMap } from './components/Map/WorldMap';
import { MapControls } from './components/Map/MapControls';
import { CountryPanel } from './components/CountryInfo/CountryPanel';
import { LanguagePanel } from './components/LanguageInfo/LanguagePanel';
import { useState } from 'react';

function App() {
  const [mapPosition, setMapPosition] = useState<{
    coordinates: [number, number];
    zoom: number;
  }>({
    coordinates: [0, 0],
    zoom: 1,
  });
  const [showCountryNames, setShowCountryNames] = useState(true);

  const handleZoomIn = () => {
    setMapPosition((prev) => ({ ...prev, zoom: Math.min(prev.zoom * 1.5, 8) }));
  };

  const handleZoomOut = () => {
    setMapPosition((prev) => ({ ...prev, zoom: Math.max(prev.zoom / 1.5, 1) }));
  };

  const handleReset = () => {
    setMapPosition({ coordinates: [0, 0], zoom: 1 });
  };

  const handleToggleCountryNames = () => {
    setShowCountryNames(!showCountryNames);
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* 地図エリア */}
      <div className="flex-1 relative">
        <WorldMap
          position={mapPosition}
          onPositionChange={setMapPosition}
          showCountryNames={showCountryNames}
        />
        <MapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
          showCountryNames={showCountryNames}
          onToggleCountryNames={handleToggleCountryNames}
        />
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
