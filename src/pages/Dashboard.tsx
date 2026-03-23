import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, ArrowLeft, Home, Plus, Upload, X, PawPrint, Cigarette, Pencil, MapPin, User, BedDouble, Eye, EyeOff, Image, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { SearchableSelect } from '@/components/SearchableSelect';
import { ALL_CITIES, getNeighborhoods, getCityCoords } from '@/lib/locations';
import type { Tables } from '@/integrations/supabase/types';

type Listing = Tables<'listings'>;

export default function Dashboard() {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
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
  
  const [sleepingNotes, setSleepingNotes] = useState('');
  const [mamadNotes, setMamadNotes] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [smokingAllowed, setSmokingAllowed] = useState(false);
  const [priceType, setPriceType] = useState('free');
  const [pricePerNight, setPricePerNight] = useState<number | ''>('');

  // Photo state
  const [existingPhotos, setExistingPhotos] = useState<{ name: string; url: string }[]>([]);
  const [newPhotos, setNewPhotos] = useState<File[]>([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const populateForm = (data: Listing) => {
    setHostName(data.host_name);
    setPhone(data.phone);
    setCity(data.city);
    setNeighborhood(data.neighborhood);
    setAddress(data.address || '');
    setBedrooms(data.bedrooms);
    setTotalBeds(data.total_beds);
    
    setSleepingNotes(data.sleeping_notes || '');
    setMamadNotes(data.mamad_notes || '');
    setIsActive(data.is_active);
    setPetsAllowed((data as any).pets_allowed ?? false);
    setSmokingAllowed((data as any).smoking_allowed ?? false);
    setPriceType((data as any).price_type ?? 'free');
    setPricePerNight((data as any).price_per_night ?? '');
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }

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
        populateForm(data);

        const { data: files } = await supabase.storage
          .from('listing-photos')
          .list(data.id, { limit: 10 });
        if (files && files.length > 0) {
          setExistingPhotos(files.map(f => ({
            name: f.name,
            url: supabase.storage.from('listing-photos').getPublicUrl(`${data.id}/${f.name}`).data.publicUrl,
          })));
        }
      }
      setLoading(false);
    };

    fetchListing();
  }, [user, toast]);

  const handleDeletePhoto = async (fileName: string) => {
    if (!listing) return;
    const { error } = await supabase.storage
      .from('listing-photos')
      .remove([`${listing.id}/${fileName}`]);
    if (error) {
      toast({ title: 'Error deleting photo', description: error.message, variant: 'destructive' });
    } else {
      setExistingPhotos(prev => prev.filter(p => p.name !== fileName));
    }
  };

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
      
      sleeping_notes: sleepingNotes || null,
      mamad_notes: mamadNotes || null,
      is_active: isActive,
      pets_allowed: petsAllowed,
      smoking_allowed: smokingAllowed,
      price_type: priceType,
      price_per_night: priceType === 'paid' ? (pricePerNight || null) : null,
    };

    let error;
    let listingId = listing?.id;
    if (listing) {
      ({ error } = await supabase.from('listings').update(payload).eq('id', listing.id));
    } else {
      const result = await supabase.from('listings').insert(payload).select('id').single();
      error = result.error;
      listingId = result.data?.id;
    }

    if (!error && listingId && newPhotos.length > 0) {
      setUploadingPhotos(true);
      for (const file of newPhotos) {
        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('listing-photos')
          .upload(`${listingId}/${fileName}`, file);
        if (uploadError) {
          toast({ title: 'Photo upload error', description: uploadError.message, variant: 'destructive' });
        }
      }
      setUploadingPhotos(false);
      setNewPhotos([]);
    }

    setSaving(false);

    if (error) {
      toast({ title: 'Error saving', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: listing ? 'Listing updated' : 'Listing created', description: 'Your changes are live.' });
      const { data } = await supabase.from('listings').select('*').eq('host_id', user.id).maybeSingle();
      if (data) {
        setListing(data);
        populateForm(data);
        const { data: files } = await supabase.storage
          .from('listing-photos')
          .list(data.id, { limit: 10 });
        if (files && files.length > 0) {
          setExistingPhotos(files.map(f => ({
            name: f.name,
            url: supabase.storage.from('listing-photos').getPublicUrl(`${data.id}/${f.name}`).data.publicUrl,
          })));
        } else {
          setExistingPhotos([]);
        }
      }
      setEditing(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleStartEdit = () => {
    if (listing) populateForm(listing);
    setEditing(true);
  };

  const handleCancelEdit = () => {
    if (listing) populateForm(listing);
    setNewPhotos([]);
    setEditing(false);
  };

  // --- HEADER (shared) ---
  const header = (
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
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {header}
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
              <Skeleton className="h-11 w-full rounded-lg" />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // --- VIEW MODE ---
  const viewMode = listing && !editing && (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Your Listing</CardTitle>
          <CardDescription className="flex items-center gap-1.5 mt-1">
            {listing.is_active ? (
              <><Eye className="h-3.5 w-3.5 text-green-600" /> <span className="text-green-600">Live — visible to families</span></>
            ) : (
              <><EyeOff className="h-3.5 w-3.5 text-muted-foreground" /> <span>Hidden from public feed</span></>
            )}
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleStartEdit}>
          <Pencil className="h-4 w-4 mr-1.5" />
          Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Photos */}
        {existingPhotos.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {existingPhotos.map((photo) => (
              <img key={photo.name} src={photo.url} alt="" className="h-24 w-32 object-cover rounded-lg border border-border shrink-0" />
            ))}
          </div>
        )}

        {/* Location & Host */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <span className="text-base font-semibold text-foreground">{listing.city} · {listing.neighborhood}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <span>{listing.host_name}</span>
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Stats */}
        <p className="text-sm text-muted-foreground">
          {listing.bedrooms} bedroom{listing.bedrooms !== 1 ? 's' : ''} · {listing.total_beds} bed{listing.total_beds !== 1 ? 's' : ''}
        </p>

        {/* Pets & Smoking */}
        <div className="flex flex-wrap gap-2">
          {(listing as any).pets_allowed ? (
            <Badge variant="outline" className="text-xs gap-1 border-green-200 text-green-700 bg-green-50">
              <PawPrint className="h-3 w-3" /> Pets Welcome
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs gap-1 border-red-200 text-red-600 bg-red-50">
              <PawPrint className="h-3 w-3" /> No Pets
            </Badge>
          )}
          {(listing as any).smoking_allowed ? (
            <Badge variant="outline" className="text-xs gap-1 border-green-200 text-green-700 bg-green-50">
              <Cigarette className="h-3 w-3" /> Smoking OK
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs gap-1 border-red-200 text-red-600 bg-red-50">
              <Cigarette className="h-3 w-3" /> No Smoking
            </Badge>
          )}
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-primary font-medium">₪</span>
          {(listing as any).price_type === 'free' ? (
            <span className="font-medium text-green-700">Free — חסד (act of kindness)</span>
          ) : (
            <span className="text-muted-foreground">₪{(listing as any).price_per_night}/night <span className="text-xs">(subsidized)</span></span>
          )}
        </div>

        {/* Notes */}
        {(listing.sleeping_notes || listing.mamad_notes) && (
          <div className="space-y-1.5">
            {listing.sleeping_notes && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <BedDouble className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{listing.sleeping_notes}</span>
              </div>
            )}
            {listing.mamad_notes && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{listing.mamad_notes}</span>
              </div>
            )}
          </div>
        )}

        {listing.address && (
          <p className="text-xs text-muted-foreground/70">
            📍 Private address: {listing.address}
          </p>
        )}
      </CardContent>
    </Card>
  );

  // --- EDIT / CREATE FORM ---
  const formMode = (editing || !listing) && (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>{listing ? 'Edit Your Listing' : 'Create Your Listing'}</CardTitle>
          <CardDescription>
            {listing ? 'Update your shelter information below.' : 'Fill out the form to list your shelter.'}
          </CardDescription>
        </div>
        {listing && (
          <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
            Cancel
          </Button>
        )}
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
              <Label>City</Label>
              <SearchableSelect
                options={ALL_CITIES}
                value={city}
                onValueChange={(v) => { setCity(v); setNeighborhood(''); }}
                placeholder="Search city..."
                showAll={false}
              />
            </div>
            <div className="space-y-2">
              <Label>Neighborhood</Label>
              <SearchableSelect
                options={city ? getNeighborhoods(city) : []}
                value={neighborhood}
                onValueChange={setNeighborhood}
                placeholder="Search neighborhood..."
                showAll={false}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Approximate Address</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. Near Dizengoff Center" />
            <p className="text-xs text-muted-foreground">Private — not shown publicly.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input id="bedrooms" type="number" min={0} value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalBeds">Total Beds</Label>
              <Input id="totalBeds" type="number" min={0} value={totalBeds} onChange={(e) => setTotalBeds(Number(e.target.value))} required />
            </div>
          </div>

          {/* Pets & Smoking */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="flex items-center gap-2">
                <PawPrint className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Pets Welcome</Label>
              </div>
              <Switch checked={petsAllowed} onCheckedChange={setPetsAllowed} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="flex items-center gap-2">
                <Cigarette className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Smoking OK</Label>
              </div>
              <Switch checked={smokingAllowed} onCheckedChange={setSmokingAllowed} />
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-3 rounded-lg border border-border p-4">
            <div>
              <Label className="text-sm font-medium">Pricing</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                🕊️ This platform is built on חסד — kindness. We encourage offering your space for free or at a symbolic cost to cover expenses. This is about helping families in need.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={priceType === 'free' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriceType('free')}
                className="flex-1"
              >
                <Heart className="h-4 w-4 mr-1.5" />
                Free (חסד)
              </Button>
              <Button
                type="button"
                variant={priceType === 'paid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriceType('paid')}
                className="flex-1"
              >
                <span className="mr-1.5">₪</span>
                Subsidized
              </Button>
            </div>
            {priceType === 'paid' && (
              <div className="space-y-2">
                <Label htmlFor="pricePerNight">Price per night (₪)</Label>
                <Input
                  id="pricePerNight"
                  type="number"
                  min={0}
                  max={200}
                  value={pricePerNight}
                  onChange={(e) => setPricePerNight(e.target.value ? Number(e.target.value) : '')}
                  placeholder="e.g. 50"
                />
                <p className="text-xs text-muted-foreground">
                  Please keep costs minimal — just enough to cover utilities or supplies. Families are counting on your generosity. 💙
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sleepingNotes">Sleeping Notes (optional)</Label>
            <Textarea id="sleepingNotes" value={sleepingNotes} onChange={(e) => setSleepingNotes(e.target.value)} placeholder="e.g. 2 mattresses available, sofa bed in living room" rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mamadNotes">Mamad Notes (optional)</Label>
            <Textarea id="mamadNotes" value={mamadNotes} onChange={(e) => setMamadNotes(e.target.value)} placeholder="e.g. Reinforced door, stocked with water" rows={2} />
          </div>

          {/* Photo Upload */}
          <div className="space-y-3">
            <Label>Photos (optional)</Label>
            <p className="text-xs text-muted-foreground">Add photos of your space to help families feel comfortable. Max 5 photos.</p>

            {existingPhotos.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {existingPhotos.map((photo) => (
                  <div key={photo.name} className="relative group w-20 h-20 rounded-lg overflow-hidden border border-border">
                    <img src={photo.url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleDeletePhoto(photo.name)}
                      className="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {newPhotos.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {newPhotos.map((file, i) => (
                  <div key={i} className="relative group w-20 h-20 rounded-lg overflow-hidden border border-border border-dashed">
                    <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setNewPhotos(prev => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {existingPhotos.length + newPhotos.length < 5 && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    const remaining = 5 - existingPhotos.length - newPhotos.length;
                    setNewPhotos(prev => [...prev, ...files.slice(0, remaining)]);
                    e.target.value = '';
                  }}
                />
                <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-1.5" />
                  Add Photos
                </Button>
              </>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={saving || uploadingPhotos}>
            {saving || uploadingPhotos ? 'Saving...' : listing ? 'Update Listing' : 'Create Listing'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {header}

      <main className="max-w-2xl mx-auto px-4 py-6">
        {!listing && !editing ? (
          <div className="text-center py-24">
            <Home className="h-16 w-16 mx-auto text-muted-foreground/30 mb-5" strokeWidth={1.5} />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              You haven't added a shelter yet
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
              Add your mamad to help families in need. Your listing will appear in the public directory once published.
            </p>
            <Button size="lg" onClick={() => setEditing(true)}>
              <Plus className="h-5 w-5 mr-1.5" />
              Create Listing
            </Button>
          </div>
        ) : (
          <>
            {viewMode}
            {formMode}
          </>
        )}
      </main>
    </div>
  );
}