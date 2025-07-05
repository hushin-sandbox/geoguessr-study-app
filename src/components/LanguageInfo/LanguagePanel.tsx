import { useAppStore } from '../../store/appStore';
import { getLanguageById } from '../../data/languages';
import { LanguageDetails } from './LanguageDetails';

export const LanguagePanel = () => {
  const { selectedLanguage, isLanguagePanelOpen, toggleLanguagePanel } = useAppStore();
  
  const language = selectedLanguage ? getLanguageById(selectedLanguage) : null;

  if (!isLanguagePanelOpen) {
    return null;
  }

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-50 transform transition-transform">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">言語情報</h2>
          <button
            onClick={toggleLanguagePanel}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {language ? (
            <LanguageDetails language={language} />
          ) : (
            <div className="text-center text-gray-500 mt-8">
              <div className="text-4xl mb-4">💬</div>
              <p>言語が選択されていません</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};