import { regionLabels, regionColors } from '../../data/regions';
import { Region } from '../../types';

export const MapControls = () => {
  return (
    <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
      <h3 className="text-lg font-semibold mb-3">凡例</h3>
      <div className="space-y-2">
        {Object.entries(regionLabels).map(([region, label]) => (
          <div key={region} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: regionColors[region as Region] }}
            />
            <span className="text-sm">{label}</span>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-gray-400" />
          <span className="text-sm">GeoGuessr対象外</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-red-500" />
          <span className="text-sm">選択中</span>
        </div>
      </div>
    </div>
  );
};