import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/i18n/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';

export default function Welcome() {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/login'); return; }
      const { data: profile } = await supabase.from('profiles').select('onboarding_completed').eq('id', session.user.id).maybeSingle();
      if (profile?.onboarding_completed) { navigate('/dashboard'); return; }
      setCheckingProfile(false);
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate('/login'); return; }
    const { error } = await supabase.from('profiles').upsert({
      id: session.user.id,
      full_name: fullName.trim(),
      whatsapp_phone: whatsappPhone.trim(),
      onboarding_completed: true,
    });
    setLoading(false);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      navigate('/dashboard');
    }
  };

  if (checkingProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute top-4 end-4">
        <LanguageToggle />
      </div>
      <Card className="w-full max-w-sm border-border">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-xl text-foreground">{t('welcome.title')}</CardTitle>
          <CardDescription>{t('welcome.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t('welcome.fullName')}</Label>
              <Input id="fullName" placeholder={t('welcome.fullNamePlaceholder')} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsappPhone">{t('welcome.whatsapp')}</Label>
              <Input id="whatsappPhone" placeholder="e.g. 972501234567" value={whatsappPhone} onChange={(e) => setWhatsappPhone(e.target.value)} required />
              <p className="text-xs text-muted-foreground">{t('welcome.whatsappHint')}</p>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t('welcome.saving') : t('welcome.submit')}
              {!loading && <ArrowRight className="h-4 w-4 ms-1" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
