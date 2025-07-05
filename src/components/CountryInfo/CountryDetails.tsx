import { Country } from '../../types';
import { getLanguagesByCountry } from '../../data/languages';
import { regionLabels } from '../../data/regions';
import { useAppStore } from '../../store/appStore';
import { EditableNote } from './EditableNote';

interface CountryDetailsProps {
  country: Country;
}

export const CountryDetails = ({ country }: CountryDetailsProps) => {
  const { userNotes, selectLanguage, updateCountryNote } = useAppStore();
  const languages = getLanguagesByCountry(country.id);

  const handleLanguageClick = (languageId: string) => {
    selectLanguage(languageId);
  };

  const handleNoteUpdate = (note: string) => {
    updateCountryNote(country.id, note);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <span className="text-3xl">{country.flag}</span>
        <div>
          <h2 className="text-xl font-bold">{country.nameJa}</h2>
          <p className="text-gray-600">{country.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">地域:</span>
          <p className="font-medium">{regionLabels[country.region]}</p>
        </div>
        <div>
          <span className="text-gray-500">GeoGuessr:</span>
          <p className={`font-medium ${country.enabled ? 'text-green-600' : 'text-red-600'}`}>
            {country.enabled ? '対象' : '対象外'}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">景色の特徴</h3>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-700">{country.landscapeFeatures}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">主要言語</h3>
        <div className="space-y-2">
          {languages.map((language) => (
            <button
              key={language.id}
              onClick={() => handleLanguageClick(language.id)}
              className="w-full text-left p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{language.nameJa}</span>
                <span className="text-sm text-gray-500">{language.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">メモ</h3>
        <EditableNote
          note={userNotes.countries[country.id] || ''}
          onSave={handleNoteUpdate}
          placeholder="この国についてのメモを入力..."
        />
      </div>
    </div>
  );
};