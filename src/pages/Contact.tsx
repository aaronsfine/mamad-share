import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { useLanguage } from '@/i18n/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';

export default function Contact() {
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
        <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-3">{t('contact.title')}</h1>
        <p className="text-muted-foreground text-lg mb-10">{t('contact.subtitle')}</p>

        <div className="bg-card rounded-xl border border-border p-6 md:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">{t('contact.email')}</h3>
              <p className="text-sm text-muted-foreground mb-3">{t('contact.emailDesc')}</p>
              <a href="mailto:aaronsfine@gmail.com" className="text-sm font-medium text-primary hover:underline">
                aaronsfine@gmail.com
              </a>
            </div>
          </div>

          <div className="border-t border-border" />

          <div>
            <h3 className="font-semibold text-foreground mb-2">{t('contact.volunteer')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t('contact.volunteerDesc')}</p>
          </div>

          <div className="border-t border-border" />

          <div>
            <h3 className="font-semibold text-foreground mb-2">{t('contact.report')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t('contact.reportDesc')}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
