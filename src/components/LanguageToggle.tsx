import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLang(lang === 'en' ? 'he' : 'en')}
      className="gap-1.5 text-xs font-medium"
      title={lang === 'en' ? 'עברית' : 'English'}
    >
      <Globe className="h-4 w-4" />
      {lang === 'en' ? 'עב' : 'EN'}
    </Button>
  );
}
