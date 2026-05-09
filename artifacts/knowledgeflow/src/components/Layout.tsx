import React from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const LOGO_URL = "https://knowledgeflowbooks.com/wp-content/uploads/2025/11/headerlogo-194x59.png";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-card-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 shrink-0">
              <img src={LOGO_URL} alt="Knowledge Flow Books" className="h-10 md:h-12 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors hover:text-primary uppercase",
                    location === link.path ? "text-primary font-bold" : "text-foreground/80"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="h-6 w-6" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-card-border bg-card animate-in slide-in-from-top-2">
            <nav className="flex flex-col py-4 px-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "text-lg font-medium py-2 transition-colors uppercase",
                    location === link.path ? "text-primary" : "text-foreground/80"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 mt-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <img src={LOGO_URL} alt="Knowledge Flow Books" className="h-10 mb-6 brightness-0 invert" />
              <p className="text-background/70 text-sm leading-relaxed mb-6 font-sans">
                An educational and lifestyle book publisher serving readers who want to grow their minds and enrich their lives.
              </p>
              <div className="flex gap-4 text-background/80">
                <a href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-xl font-medium mb-6 text-primary">Quick Links</h4>
              <ul className="space-y-3 text-sm text-background/80">
                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/shop" className="hover:text-primary transition-colors">Shop Books</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xl font-medium mb-6 text-primary">Categories</h4>
              <ul className="space-y-3 text-sm text-background/80">
                <li><Link href="/shop?category=Engineering" className="hover:text-primary transition-colors">Engineering</Link></li>
                <li><Link href="/shop?category=Medical+Science" className="hover:text-primary transition-colors">Medical Science</Link></li>
                <li><Link href="/shop?category=Programming+%26+Technology" className="hover:text-primary transition-colors">Programming & Technology</Link></li>
                <li><Link href="/shop?category=Business+%26+Management" className="hover:text-primary transition-colors">Business & Management</Link></li>
                <li><Link href="/shop?category=Self-Help+%26+Skills" className="hover:text-primary transition-colors">Self-Help & Skills</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xl font-medium mb-6 text-primary">Newsletter</h4>
              <p className="text-background/70 text-sm mb-4">
                Subscribe to receive updates, access to exclusive deals, and more.
              </p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="bg-white/10 border border-white/20 text-background px-4 py-2 w-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-sm transition-all"
                />
                <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-sm ml-2 hover:bg-primary/90 transition-colors">
                  <Mail className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-background/60">
            <p>&copy; {new Date().getFullYear()} Knowledge Flow Books. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
