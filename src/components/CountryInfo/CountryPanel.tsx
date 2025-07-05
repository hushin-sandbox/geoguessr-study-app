import { useAppStore } from '../../store/appStore';
import { getCountryById } from '../../data/countries';
import { CountryDetails } from './CountryDetails';

export const CountryPanel = () => {
  const { selectedCountry } = useAppStore();
  
  const country = selectedCountry ? getCountryById(selectedCountry) : null;

  if (!country) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            地図から国を選択してください
          </h2>
          <p className="text-gray-500">
            クリックして詳細情報を表示します
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white">
      <div className="h-full overflow-y-auto p-6">
        <CountryDetails country={country} />
      </div>
    </div>
  );
};