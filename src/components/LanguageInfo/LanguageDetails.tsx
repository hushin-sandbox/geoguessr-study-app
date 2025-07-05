import { Language } from '../../types';
import { getCountryById } from '../../data/countries';
import { useAppStore } from '../../store/appStore';
import { EditableNote } from '../CountryInfo/EditableNote';
import 'flag-icons/css/flag-icons.min.css';
import world from '../../data/world.json';

interface LanguageDetailsProps {
  language: Language;
}

export const LanguageDetails = ({ language }: LanguageDetailsProps) => {
  const { userNotes, selectCountry, updateLanguageNote } = useAppStore();

  const handleCountryClick = (countryId: string) => {
    selectCountry(countryId);
  };

  const handleNoteUpdate = (note: string) => {
    updateLanguageNote(language.id, note);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">{language.nameJa}</h2>
        <p className="text-gray-600">{language.name}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">例文</h3>
        <div className="space-y-2">
          {language.examples.map((example, index) => (
            <div key={index} className="bg-gray-50 p-2 rounded">
              <p className="text-sm font-mono">{example}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">判別特徴</h3>
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-gray-700">
            {language.identificationFeatures}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">使用国</h3>
        <div className="space-y-2">
          {language.countries.map((countryId) => {
            const iso2 =
              world.find((c) => c.alpha3 === countryId.toLowerCase())?.alpha2 ||
              countryId.slice(0, 2).toLowerCase();
            const country = getCountryById(countryId);
            if (!country) return null;

            return (
              <button
                key={countryId}
                onClick={() => handleCountryClick(countryId)}
                className="w-full text-left p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span
                    className={`fi fi-${iso2} text-8xl border box-content`}
                  ></span>
                  <div>
                    <p className="font-medium">{country.nameJa}</p>
                    <p className="text-sm text-gray-500">{country.name}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">メモ</h3>
        <EditableNote
          note={userNotes.languages[language.id] || ''}
          onSave={handleNoteUpdate}
          placeholder="この言語についてのメモを入力..."
        />
      </div>
    </div>
  );
};
