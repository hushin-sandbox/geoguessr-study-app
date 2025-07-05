
interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  showCountryNames: boolean;
  onToggleCountryNames: () => void;
}

export const MapControls = ({ onZoomIn, onZoomOut, onReset, showCountryNames, onToggleCountryNames }: MapControlsProps) => {
  return (
    <div className="absolute top-4 left-4 space-y-4">
      <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col space-y-2">
        <button
          onClick={onZoomIn}
          className="w-8 h-8 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
          title="拡大"
        >
          +
        </button>
        <button
          onClick={onZoomOut}
          className="w-8 h-8 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
          title="縮小"
        >
          -
        </button>
        <button
          onClick={onReset}
          className="w-8 h-8 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center justify-center text-xs"
          title="リセット"
        >
          ⌂
        </button>
        <button
          onClick={onToggleCountryNames}
          className={`w-8 h-8 ${showCountryNames ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} text-white rounded flex items-center justify-center text-xs`}
          title={showCountryNames ? '国名を非表示' : '国名を表示'}
        >
          {showCountryNames ? 'A' : 'A'}
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h3 className="text-lg font-semibold mb-3">凡例</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-gray-500" />
            <span className="text-sm">GeoGuessr対象</span>
          </div>
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
    </div>
  );
};