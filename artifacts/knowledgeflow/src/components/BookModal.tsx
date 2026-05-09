import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ShoppingCart, ExternalLink } from "lucide-react";
import { Book } from "@/lib/data";

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
}

const STORE_CONFIG = {
  amazon: {
    label: "Buy on Amazon",
    icon: "🛒",
    bg: "bg-[#FF9900]",
    text: "text-black",
    hover: "hover:bg-[#e68900]",
  },
  "google-play": {
    label: "Buy on Google Play",
    icon: "▶",
    bg: "bg-[#01875F]",
    text: "text-white",
    hover: "hover:bg-[#016d4d]",
  },
} as const;

export default function BookModal({ book, onClose }: BookModalProps) {
  useEffect(() => {
    if (!book) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [book, onClose]);

  return (
    <AnimatePresence>
      {book && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] bg-card border border-card-border shadow-2xl rounded-sm overflow-hidden pointer-events-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-background border border-card-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors p-2 rounded-sm"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col sm:flex-row overflow-y-auto">
                {/* Cover */}
                <div className="sm:w-52 shrink-0 bg-white flex items-center justify-center p-6 border-b sm:border-b-0 sm:border-r border-card-border">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full max-w-[160px] sm:max-w-full object-contain drop-shadow-lg"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded-sm">
                      {book.category}
                    </span>
                    {book.series && book.series !== book.category && (
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider bg-muted px-2 py-1 rounded-sm">
                        {book.series}
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif text-2xl text-foreground leading-tight mb-2">
                    {book.title}
                  </h2>

                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground">{book.author}</span>
                  </div>

                  <div className="h-px bg-card-border mb-5" />

                  {book.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                      {book.description}
                    </p>
                  )}

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl font-bold text-foreground">
                        ${book.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        Ebook
                      </span>
                    </div>

                    {book.buyLinks && book.buyLinks.length > 0 ? (
                      <div className="space-y-2">
                        {book.buyLinks.map((link) => {
                          const cfg = STORE_CONFIG[link.store];
                          return (
                            <a
                              key={link.store}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center justify-center gap-2 w-full ${cfg.bg} ${cfg.text} ${cfg.hover} px-6 py-3 rounded-sm font-bold text-sm transition-colors`}
                            >
                              <ShoppingCart className="w-4 h-4" />
                              {cfg.label}
                              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                            </a>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-2">
                        Buy links coming soon.
                      </p>
                    )}

                    <p className="text-center text-xs text-muted-foreground pt-1">
                      Opens the retailer's site in a new tab.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
