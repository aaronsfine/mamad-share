import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">{t('app.name')}</span>
          </div>

          <nav className="flex items-center gap-6">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.about')}
            </Link>
            <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.howItWorks')}
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.contact')}
            </Link>
            <LanguageToggle />
          </nav>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground/70 text-center">
            © {new Date().getFullYear()} {t('app.name')}. {t('app.tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
}
