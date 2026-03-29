import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export default function Contact() {
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
        <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-3">Contact Us</h1>
        <p className="text-muted-foreground text-lg mb-10">
          Have questions, feedback, or want to help? We'd love to hear from you.
        </p>

        <div className="bg-card rounded-xl border border-border p-6 md:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Email</h3>
              <p className="text-sm text-muted-foreground mb-3">For general inquiries, partnerships, or support.</p>
              <a href="mailto:aaronsfine@gmail.com" className="text-sm font-medium text-primary hover:underline">
                aaronsfine@gmail.com
              </a>
            </div>
          </div>

          <div className="border-t border-border" />

          <div>
            <h3 className="font-semibold text-foreground mb-2">Want to volunteer?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mamad Directory is a community project. If you're a developer, designer, translator, or community
              organizer who wants to help — reach out. We're especially looking for help with Hebrew translation and
              outreach to host families.
            </p>
          </div>

          <div className="border-t border-border" />

          <div>
            <h3 className="font-semibold text-foreground mb-2">Report an issue</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you encounter a problem with a listing or have safety concerns, please email us immediately and we'll
              look into it.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
