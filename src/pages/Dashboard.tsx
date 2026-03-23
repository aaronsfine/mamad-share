import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, ArrowLeft, Home, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import type { Tables } from '@/integrations/supabase/types';

type Listing = Tables<'listings'>;

export default function Dashboard() {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [hostName, setHostName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState(1);
  const [totalBeds, setTotalBeds] = useState(1);
  const [mamadSize, setMamadSize] = useState(4);
  const [sleepingNotes, setSleepingNotes] = useState('');
  const [mamadNotes, setMamadNotes] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }

      // Check onboarding
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed, full_name, whatsapp_phone')
        .eq('id', session.user.id)
        .maybeSingle();

      if (!profile?.onboarding_completed) {
        navigate('/welcome');
        return;
      }

      setUser({ id: session.user.id });

      // Pre-fill host name and phone from profile if creating new listing
      if (profile.full_name) setHostName(profile.full_name);
      if (profile.whatsapp_phone) setPhone(profile.whatsapp_phone);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/login');
      }
    });

    checkSession();

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Load existing listing
  useEffect(() => {
    if (!user) return;

    const fetchListing = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('host_id', user.id)
        .maybeSingle();

      if (error) {
        toast({ title: 'Error loading listing', description: error.message, variant: 'destructive' });
      } else if (data) {
        setListing(data);
        setHostName(data.host_name);
        setPhone(data.phone);
        setCity(data.city);
        setNeighborhood(data.neighborhood);
        setAddress(data.address || '');
        setBedrooms(data.bedrooms);
        setTotalBeds(data.total_beds);
        setMamadSize(data.mamad_size_sqm);
        setSleepingNotes(data.sleeping_notes || '');
        setMamadNotes(data.mamad_notes || '');
        setIsActive(data.is_active);
      }
      setLoading(false);
    };

    fetchListing();
  }, [user, toast]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    const payload = {
      host_id: user.id,
      host_name: hostName,
      phone,
      city,
      neighborhood,
      address: address || null,
      bedrooms,
      total_beds: totalBeds,
      mamad_size_sqm: mamadSize,
      sleeping_notes: sleepingNotes || null,
      mamad_notes: mamadNotes || null,
      is_active: isActive,
    };

    let error;
    if (listing) {
      ({ error } = await supabase.from('listings').update(payload).eq('id', listing.id));
    } else {
      ({ error } = await supabase.from('listings').insert(payload));
    }

    setSaving(false);

    if (error) {
      toast({ title: 'Error saving', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: listing ? 'Listing updated' : 'Listing created', description: 'Your changes are live.' });
      // Refetch
      const { data } = await supabase.from('listings').select('*').eq('host_id', user.id).maybeSingle();
      if (data) setListing(data);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground shadow-md">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <h1 className="text-lg font-bold">Host Dashboard</h1>
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-4 py-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-64 mt-2" />
            </CardHeader>
            <CardContent className="space-y-5">
              <Skeleton className="h-16 w-full rounded-lg" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
              </div>
              <Skeleton className="h-16 w-full" />
              <div className="grid gap-4 grid-cols-3">
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
                <Skeleton className="h-16" />
              </div>
              <Skeleton className="h-11 w-full rounded-lg" />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <h1 className="text-lg font-bold">Host Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Feed
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="h-4 w-4 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>{listing ? 'Edit Your Listing' : 'Create Your Listing'}</CardTitle>
            <CardDescription>
              {listing ? 'Update your shelter information below.' : 'Fill out the form to list your shelter.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-5">
              {/* Active toggle */}
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <Label className="text-sm font-medium">Listing Status</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isActive ? 'Your listing is visible to families.' : 'Your listing is hidden from the public feed.'}
                  </p>
                </div>
                <Switch checked={isActive} onCheckedChange={setIsActive} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hostName">Your Name</Label>
                  <Input id="hostName" value={hostName} onChange={(e) => setHostName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (with country code)</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="972501234567" required />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Neighborhood</Label>
                  <Input id="neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Approximate Address</Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. Near Dizengoff Center" />
                <p className="text-xs text-muted-foreground">Private — not shown publicly. Used for distance calculation in a future update.</p>
              </div>

              <div className="grid gap-4 grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input id="bedrooms" type="number" min={0} value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalBeds">Total Beds</Label>
                  <Input id="totalBeds" type="number" min={0} value={totalBeds} onChange={(e) => setTotalBeds(Number(e.target.value))} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mamadSize">Mamad (sqm)</Label>
                  <Input id="mamadSize" type="number" min={1} value={mamadSize} onChange={(e) => setMamadSize(Number(e.target.value))} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sleepingNotes">Sleeping Notes (optional)</Label>
                <Textarea id="sleepingNotes" value={sleepingNotes} onChange={(e) => setSleepingNotes(e.target.value)} placeholder="e.g. 2 mattresses available, sofa bed in living room" rows={2} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mamadNotes">Mamad Notes (optional)</Label>
                <Textarea id="mamadNotes" value={mamadNotes} onChange={(e) => setMamadNotes(e.target.value)} placeholder="e.g. Reinforced door, stocked with water" rows={2} />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={saving}>
                {saving ? 'Saving...' : listing ? 'Update Listing' : 'Create Listing'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
