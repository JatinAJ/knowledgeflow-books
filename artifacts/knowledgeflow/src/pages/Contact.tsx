import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, ShoppingBag } from "lucide-react";

export default function Contact() {
  const searchParams = new URLSearchParams(window.location.search);
  const bookParam = searchParams.get("book") || "";

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: bookParam ? `Order Inquiry: ${bookParam}` : "",
    message: bookParam ? `Hi, I'd like to order a copy of "${bookParam}". Please let me know the next steps.` : "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (bookParam) {
      setFormState(prev => ({
        ...prev,
        subject: `Order Inquiry: ${bookParam}`,
        message: `Hi, I'd like to order a copy of "${bookParam}". Please let me know the next steps.`,
      }));
    }
  }, [bookParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-card py-16 border-b border-card-border">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Get in Touch</h1>
          <div className="h-1 w-16 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {bookParam
              ? `You're inquiring about "${bookParam}". Fill out the form and we'll get back to you with ordering details.`
              : "Whether you have a question about a title, an order, or just want to talk books — we're here for you."}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-1/3 space-y-10"
            >
              <div>
                <h3 className="text-2xl font-serif text-foreground mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0 mr-4 text-primary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1 text-sm uppercase tracking-wide">Email Us</h4>
                      <a
                        href="mailto:hello@knowledgeflowbooks.com"
                        className="text-muted-foreground text-sm hover:text-primary transition-colors"
                      >
                        hello@knowledgeflowbooks.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0 mr-4 text-primary">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1 text-sm uppercase tracking-wide">Response Time</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        We typically respond within<br />1–2 business days.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0 mr-4 text-primary">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1 text-sm uppercase tracking-wide">Order Inquiries</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Use the form to place an order. Include the book title and quantity and we'll follow up with payment details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {bookParam && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/10 border border-primary/20 p-5 rounded-sm"
                >
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Ordering</p>
                  <p className="font-serif text-foreground text-base leading-snug">{bookParam}</p>
                  <p className="text-xs text-muted-foreground mt-2">Your form has been pre-filled below.</p>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-2/3 bg-card border border-card-border p-8 md:p-10 rounded-sm shadow-sm"
            >
              <h3 className="text-2xl font-serif text-foreground mb-6">
                {bookParam ? "Place Your Order" : "Send a Message"}
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/10 border border-primary/20 p-8 text-center rounded-sm"
                >
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-serif text-foreground mb-2">Message Received</h4>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. A member of our team will get back to you within 1–2 business days.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-sm font-bold text-primary uppercase tracking-wide hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-bold text-foreground uppercase tracking-wide">
                        Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-background border border-input px-4 py-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground placeholder:text-muted-foreground"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-bold text-foreground uppercase tracking-wide">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-background border border-input px-4 py-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground placeholder:text-muted-foreground"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-bold text-foreground uppercase tracking-wide">
                      Subject <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formState.subject}
                      onChange={e => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full bg-background border border-input px-4 py-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground placeholder:text-muted-foreground"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-foreground uppercase tracking-wide">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      required
                      value={formState.message}
                      onChange={e => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-background border border-input px-4 py-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground resize-none placeholder:text-muted-foreground"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-60 py-4 rounded-sm font-bold uppercase tracking-widest transition-colors shadow-sm"
                  >
                    {isSubmitting ? "Sending…" : bookParam ? "Submit Order Request" : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
