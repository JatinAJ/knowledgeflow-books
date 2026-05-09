import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import { BOOKS, CATEGORIES, Book } from "@/lib/data";
import BookModal from "@/components/BookModal";

export default function Shop() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialCategory = searchParams.get("category") || "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const filteredBooks = useMemo(() => {
    return BOOKS.filter(book => {
      const matchesCategory = activeCategory === "All" || book.category === activeCategory;
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.series || "").toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />

      <div className="min-h-screen bg-background pt-8 pb-24">
        <div className="container mx-auto px-4 md:px-6">

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Our Library</h1>
            <div className="h-1 w-16 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our carefully curated selection of educational and lifestyle titles. Click any book to learn more.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">

            {/* Categories Sidebar */}
            <div className="w-full lg:w-1/4 xl:w-1/5 shrink-0">
              <div className="sticky top-28 bg-card border border-card-border p-6 shadow-sm rounded-sm">
                <h3 className="font-serif text-xl text-foreground mb-4 flex items-center">
                  <Filter className="w-4 h-4 mr-2 text-primary" /> Categories
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveCategory("All")}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors rounded-sm ${
                      activeCategory === "All"
                        ? "bg-primary/10 text-primary font-bold border-l-2 border-primary"
                        : "text-muted-foreground hover:bg-background hover:text-foreground border-l-2 border-transparent"
                    }`}
                  >
                    All Books
                    <span className="ml-1 text-[10px] text-muted-foreground">({BOOKS.length})</span>
                  </button>
                  {CATEGORIES.filter(c => c !== "All").map(category => {
                    const count = BOOKS.filter(b => b.category === category).length;
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors rounded-sm ${
                          activeCategory === category
                            ? "bg-primary/10 text-primary font-bold border-l-2 border-primary"
                            : "text-muted-foreground hover:bg-background hover:text-foreground border-l-2 border-transparent"
                        }`}
                      >
                        {category}
                        <span className="ml-1 text-[10px] text-muted-foreground">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Grid Area */}
            <div className="w-full lg:w-3/4 xl:w-4/5">
              {/* Search Bar */}
              <div className="mb-8 flex items-center bg-card border border-card-border rounded-sm shadow-sm px-4 py-2">
                <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by title, author, or series..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground text-sm"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-foreground ml-2">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Results Info */}
              <div className="mb-6 text-sm text-muted-foreground">
                Showing <span className="font-bold text-foreground">{filteredBooks.length}</span> result{filteredBooks.length !== 1 ? "s" : ""}
                {activeCategory !== "All" && <span> in <span className="font-bold text-foreground">{activeCategory}</span></span>}
                {searchQuery && <span> for "<span className="font-bold text-foreground">{searchQuery}</span>"</span>}
              </div>

              {/* Grid */}
              {filteredBooks.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                >
                  <AnimatePresence>
                    {filteredBooks.map((book) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        key={book.id}
                        className="group flex flex-col bg-card border border-card-border rounded-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedBook(book)}
                      >
                        {/* Cover */}
                        <div className="relative aspect-[3/4] overflow-hidden bg-white p-3 flex items-center justify-center border-b border-card-border">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="h-full w-auto object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Hover overlay with "View Details" */}
                          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 bg-white text-foreground text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-sm shadow-lg transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                              View Details
                            </span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-3 flex flex-col flex-1">
                          <span className="text-[9px] font-bold text-primary uppercase tracking-wider mb-1 block truncate">
                            {book.series || book.category}
                          </span>
                          <h3 className="font-serif text-sm text-foreground mb-1 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {book.title}
                          </h3>
                          <div className="mt-auto pt-2 flex items-center justify-between">
                            <span className="font-bold text-foreground text-sm">${book.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="bg-card border border-card-border p-12 text-center rounded-sm">
                  <BookOpenIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-serif text-foreground mb-2">No books found</h3>
                  <p className="text-muted-foreground mb-6">We couldn't find any books matching your current filters.</p>
                  <button
                    onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BookOpenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
