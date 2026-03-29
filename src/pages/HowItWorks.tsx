import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Search, MessageCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-base font-semibold text-primary">Mamad Directory</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-3">How It Works</h1>
        <p className="text-muted-foreground text-lg mb-10">
          Finding a safe place or sharing yours takes just a few steps.
        </p>

        {/* For Guests */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">Looking for shelter?</h2>
          <div className="space-y-6">
            <Step
              number={1}
              icon={<Search className="h-5 w-5" />}
              title="Browse listings"
              description="Use the city and neighborhood filters to find available mamads near you. If you allow location access, listings will be sorted by distance."
            />
            <Step
              number={2}
              icon={<MessageCircle className="h-5 w-5" />}
              title="Contact the host"
              description="Found a good match? Tap the WhatsApp button to message the host directly. Introduce yourself and coordinate your stay."
            />
            <Step
              number={3}
              icon={<Home className="h-5 w-5" />}
              title="Stay safe"
              description="The host will share their address and any details you need. Bring your essentials and stay as long as needed."
            />
          </div>
        </div>

        {/* For Hosts */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">Want to help?</h2>
          <div className="space-y-6">
            <Step
              number={1}
              icon={<Shield className="h-5 w-5" />}
              title="Create an account"
              description="Sign up with your email. Complete a quick onboarding with your name and WhatsApp number."
            />
            <Step
              number={2}
              icon={<Home className="h-5 w-5" />}
              title="Add your listing"
              description="Share details about your apartment — number of beds, bedrooms, and your city. Your exact address stays private."
            />
            <Step
              number={3}
              icon={<MessageCircle className="h-5 w-5" />}
              title="Get contacted"
              description="Families in need will reach out via WhatsApp. You're in full control of who you host and when."
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/">Browse Listings</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Step({
  number,
  icon,
  title,
  description,
}: {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
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
