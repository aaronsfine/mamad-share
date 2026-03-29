import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Heart, Users, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/i18n/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-base font-semibold text-primary">{t('app.name')}</span>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-6">{t('about.title')}</h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-lg">{t('about.intro')}</p>

          <div className="grid gap-6 sm:grid-cols-3 my-8">
            <div className="bg-card rounded-xl border border-border p-5 text-center space-y-3">
              <Heart className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold text-foreground">{t('about.community')}</h3>
              <p className="text-sm">{t('about.communityDesc')}</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-5 text-center space-y-3">
              <Users className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold text-foreground">{t('about.people')}</h3>
              <p className="text-sm">{t('about.peopleDesc')}</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-5 text-center space-y-3">
              <Home className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold text-foreground">{t('about.shelter')}</h3>
              <p className="text-sm">{t('about.shelterDesc')}</p>
            </div>
          </div>

          <p>{t('about.believe')}</p>
          <p>{t('about.free')}</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
