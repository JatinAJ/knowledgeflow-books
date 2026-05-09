import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-card py-20 border-b border-card-border">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-foreground mb-6"
          >
            Connecting readers with books that <span className="text-primary italic">transform</span> lives.
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="h-1 w-24 bg-primary mx-auto"
          ></motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <div className="aspect-square bg-card border border-card-border p-4 relative">
                <div className="absolute inset-0 bg-primary/10 translate-x-4 translate-y-4 -z-10"></div>
                <img 
                  src="/hero-bg.png" 
                  alt="Inside Knowledge Flow Books" 
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 space-y-6 text-lg text-muted-foreground leading-relaxed"
            >
              <h2 className="text-3xl font-serif text-foreground">Our Story</h2>
              <p>
                Knowledge Flow Books began with a simple belief: the right idea at the right moment can change the trajectory of a life. Founded in a small neighborhood shop, we grew frustrated with algorithms determining what people should read based on trends rather than substance.
              </p>
              <p>
                We established this publisher and curation house to bring back the lost art of the personal recommendation. We read, we filter, and we curate. 
              </p>
              <p>
                Every book you find here has been selected because it offers genuine insight, challenges existing paradigms, or provides practical wisdom for living a better, more intentional life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif mb-4">What We Stand For</h2>
            <div className="h-1 w-20 bg-background/30 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                title: "Curated Excellence",
                desc: "We favor depth over breadth. We would rather offer 100 books that change lives than 10,000 that merely pass the time."
              },
              {
                title: "Quiet Authority",
                desc: "Loud marketing doesn't make a book good. We look for voices of quiet authority—experts who have lived what they write about."
              },
              {
                title: "Aesthetic Delight",
                desc: "A book is a physical artifact. We believe in the beauty of well-designed covers, quality paper, and beautiful typography."
              }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center border border-background/20 p-8 hover:bg-background/5 transition-colors"
              >
                <h3 className="text-xl font-serif mb-4 font-bold">{value.title}</h3>
                <p className="text-primary-foreground/80 leading-relaxed text-sm">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
