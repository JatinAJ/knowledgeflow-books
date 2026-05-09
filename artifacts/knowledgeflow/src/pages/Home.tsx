import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Heart, Star, Sparkles, TrendingUp } from "lucide-react";
import { BOOKS, TESTIMONIALS, CATEGORIES, Book } from "@/lib/data";
import BookModal from "@/components/BookModal";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const featuredBooks = BOOKS.filter(b => b.isFeatured).slice(0, 4);
  const newArrivals = BOOKS.slice(4, 8);

  return (
    <>
      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Library background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-background">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-7xl font-serif mb-6 leading-tight"
            >
              Books that <span className="text-primary italic">Transform</span> Lives
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-lg md:text-xl text-background/90 mb-10 font-sans leading-relaxed max-w-2xl mx-auto"
            >
              Welcome to Knowledge Flow Books. Step into our curated library of educational and lifestyle literature designed to grow your mind and enrich your soul.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/shop" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-sm font-semibold tracking-wide uppercase transition-all w-full sm:w-auto text-sm"
              >
                Explore Collection
              </Link>
              <Link 
                href="/about" 
                className="bg-transparent border border-background hover:bg-background/10 text-background px-8 py-4 rounded-sm font-semibold tracking-wide uppercase transition-all w-full sm:w-auto text-sm"
              >
                Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">Our Philosophy</h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              We believe the right book at the right time can change everything. We don't just sell books; we curate ideas, perspectives, and wisdom. Every title in our collection is selected with intention.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {[
              { icon: BookOpen, title: "Curated Selection", desc: "Hand-picked titles focused on genuine personal and professional growth." },
              { icon: Sparkles, title: "Transformative Ideas", desc: "Literature that challenges your perspective and elevates your daily life." },
              { icon: Heart, title: "Community First", desc: "A literary space built for readers who share a passion for lifelong learning." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                className="text-center p-6"
              >
                <div className="mx-auto w-16 h-16 bg-background rounded-full flex items-center justify-center mb-6 shadow-sm border border-card-border text-primary">
                  <feature.icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">Editor's Choice</span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">Featured Books</h2>
            </motion.div>
            <Link href="/shop" className="group flex items-center text-sm font-bold text-foreground hover:text-primary transition-colors uppercase tracking-wide">
              View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredBooks.map((book) => (
              <motion.div
                key={book.id}
                variants={fadeIn}
                className="group cursor-pointer"
                onClick={() => setSelectedBook(book)}
              >
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-white border border-card-border shadow-sm transition-shadow duration-300 group-hover:shadow-md p-2">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white text-foreground text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-sm shadow-lg transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">{book.series || book.category}</span>
                  <h3 className="font-serif text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                  <p className="font-bold text-foreground">${book.price.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-card border-y border-card-border">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Browse by Category</h2>
            <div className="h-1 w-20 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.filter(c => c !== "All").map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link href={`/shop?category=${encodeURIComponent(category)}`} className="block group">
                  <div className="bg-background border border-card-border p-6 text-center hover:border-primary transition-colors duration-300 hover:shadow-sm h-full flex items-center justify-center min-h-[100px]">
                    <span className="font-serif text-base group-hover:text-primary transition-colors">{category}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Join Our Chapter</h2>
            <p className="text-primary-foreground/90 text-lg mb-8 leading-relaxed">
              Subscribe to receive weekly reading recommendations, exclusive insights from authors, and early access to new releases.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/60 px-4 py-3 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white rounded-sm transition-all"
                required
              />
              <button 
                type="submit" 
                className="bg-secondary text-secondary-foreground px-8 py-3 rounded-sm font-bold uppercase tracking-wide text-sm hover:bg-secondary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
