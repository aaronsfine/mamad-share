import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Search, MessageCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { useLanguage } from '@/i18n/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';

export default function HowItWorks() {
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
        <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-3">{t('how.title')}</h1>
        <p className="text-muted-foreground text-lg mb-10">{t('how.subtitle')}</p>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">{t('how.guestTitle')}</h2>
          <div className="space-y-6">
            <Step number={1} icon={<Search className="h-5 w-5" />} title={t('how.guest1.title')} description={t('how.guest1.desc')} />
            <Step number={2} icon={<MessageCircle className="h-5 w-5" />} title={t('how.guest2.title')} description={t('how.guest2.desc')} />
            <Step number={3} icon={<Home className="h-5 w-5" />} title={t('how.guest3.title')} description={t('how.guest3.desc')} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">{t('how.hostTitle')}</h2>
          <div className="space-y-6">
            <Step number={1} icon={<Shield className="h-5 w-5" />} title={t('how.host1.title')} description={t('how.host1.desc')} />
            <Step number={2} icon={<Home className="h-5 w-5" />} title={t('how.host2.title')} description={t('how.host2.desc')} />
            <Step number={3} icon={<MessageCircle className="h-5 w-5" />} title={t('how.host3.title')} description={t('how.host3.desc')} />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/">{t('how.cta')}</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Step({ number, icon, title, description }: { number: number; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-semibold text-sm">
        {number}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-primary">{icon}</span>
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
