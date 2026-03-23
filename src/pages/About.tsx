import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Heart, Users, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-base font-semibold text-primary">Mamad Directory</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-6">About Mamad Directory</h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-lg">
            Mamad Directory is a community-driven platform connecting families who need a safe place to sleep 
            during rocket sirens with generous hosts who have a secure room (mamad) in their apartment.
          </p>

          <div className="grid gap-6 sm:grid-cols-3 my-8">
            <div className="bg-card rounded-xl border border-border p-5 text-center space-y-3">
              <Heart className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold text-foreground">Community First</h3>
              <p className="text-sm">Built by people who care, for people in need. No fees, no middlemen.</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-5 text-center space-y-3">
              <Users className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold text-foreground">People Helping People</h3>
              <p className="text-sm">Real families opening their homes to help others stay safe.</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-5 text-center space-y-3">
              <Home className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold text-foreground">Safe Shelter</h3>
              <p className="text-sm">Every listing includes a mamad — a reinforced safe room for protection.</p>
            </div>
          </div>

          <p>
            We believe that in times of crisis, the strongest thing a community can do is come together.
            This platform makes it easy for hosts to share their space and for families to find safety — 
            all through a simple, direct WhatsApp connection.
          </p>

          <p>
            Mamad Directory is free to use, open to everyone, and built with love for Israel.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
