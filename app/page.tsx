'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  CheckCircle, 
  Leaf, 
  Utensils, 
  Truck, 
  Star, 
  Plus, 
  Heart, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Menu, 
  X,
  ImageOff,
  Quote,
  ShieldCheck,
  Facebook,
  Twitter
} from 'lucide-react';

/**
 * UTILITIES & HOOKS
 */
const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

/**
 * COMPONENTS
 */
function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#4A2C1A] to-[#D4A373]/20 ${className}`}>
        <ImageOff size={32} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

/**
 * DATA CONTEXT
 */
const BRAND = {
  name: "Oroki Foods",
  tagline: "Pure Nutrition, Traditional Taste",
  description: "Oroki Foods specializes in high-quality, NAFDAC-approved traditional Nigerian cereals and health foods, crafted from the finest natural ingredients to deliver wholesome nutrition with authentic, rich flavors.",
  industry: "food",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://picsum.photos/seed/food0/1920/1080",
  about: "https://picsum.photos/seed/food1/800/1000",
  trust: "https://picsum.photos/seed/food6/1200/800",
  products: [
    "https://picsum.photos/seed/food2/800/600",
    "https://picsum.photos/seed/food3/800/600",
    "https://picsum.photos/seed/food4/800/600",
    "https://picsum.photos/seed/food5/800/600"
  ]
};

const PRODUCTS = [
  { name: "Classic Ogi Starter Pack", description: "Our signature fermented maize and cereal blend, perfect for a wholesome start to the day.", price: "₦2,500", image: IMAGES.products[0] },
  { name: "Tombrown Super Blend", description: "A nutrient-dense mix of various grains, legumes, and spices, providing sustained energy.", price: "₦4,800", image: IMAGES.products[1] },
  { name: "Baby Cereal Variety Box", description: "Gentle, easily digestible cereals for infants, featuring flavors like Coconut and Tiger Nuts.", price: "₦3,200", image: IMAGES.products[2] },
  { name: "Flavor Infusion Mixes", description: "Individual flavor sachets: Pineapple, Ginger, Strawberry, Kunu. Add them to your favorite base.", price: "₦900", image: IMAGES.products[3] }
];

const FEATURES = [
  { title: "NAFDAC Certified", description: "Guaranteed safety and quality assurance from Nigeria's highest health body.", icon: <CheckCircle className="text-accent" /> },
  { title: "All-Natural Ingredients", description: "Sourced locally and processed without artificial preservatives or additives.", icon: <Leaf className="text-accent" /> },
  { title: "Traditional Preparation", description: "Time-honored methods ensure maximum nutrient retention and authentic taste.", icon: <Utensils className="text-accent" /> },
  { title: "Nationwide Delivery", description: "Sharp delivery across Nigeria, bringing wholesome goodness to your doorstep.", icon: <Truck className="text-accent" /> }
];

const TESTIMONIALS = [
  { name: "Aisha K.", role: "Health Enthusiast", text: "The Tombrown blend keeps my energy up all day. The taste is exactly how my grandmother made it!" },
  { name: "Segun M.", role: "New Parent", text: "My baby loves the cereal! I feel secure knowing it's NAFDAC approved and full of natural goodness." },
  { name: "Bose O.", role: "Baker", text: "Quality wey go loud! I use their flavor infusions in my puddings and the results are amazing." }
];

/**
 * MAIN PAGE
 */
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative overflow-x-hidden bg-primary text-secondary">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-md shadow-xl py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-primary font-black text-xl leading-none">O</span>
            </div>
            <span className="font-heading font-black text-white text-2xl tracking-tight">Oroki Foods</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Products', 'Our Story', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`} className="text-secondary/80 hover:text-accent font-medium transition-colors">
                {link}
              </a>
            ))}
            <a href="#products" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">
              Shop Essentials
            </a>
          </div>

          <button className="md:hidden text-secondary" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary border-l border-white/10 p-8">
          <div className="flex justify-between items-center mb-12">
            <span className="font-heading font-black text-white text-2xl">Oroki Foods</span>
            <button onClick={() => setMenuOpen(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-6">
            {['Home', 'Products', 'Our Story', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`} className="text-2xl font-heading font-bold" onClick={() => setMenuOpen(false)}>
                {link}
              </a>
            ))}
            <a href="#products" className="mt-8 bg-accent text-primary text-center py-4 rounded-xl font-bold" onClick={() => setMenuOpen(false)}>
              Shop Essentials
            </a>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center text-center px-6 pt-20">
        <div className="absolute inset-0">
          <SafeImage src={IMAGES.hero} alt="Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary" />
        </div>
        <div className="relative z-10 max-w-5xl">
          <h1 className="font-heading text-5xl md:text-8xl font-black text-white leading-[1.1] animate-fadeIn">
            Wholesome Nutrition, Rooted in Tradition.
          </h1>
          <p className="mt-8 text-lg md:text-2xl text-secondary/70 max-w-3xl mx-auto leading-relaxed animate-slideUp">
            Discover the pure, uncompromised taste of Nigeria's finest cereals and grain foods, crafted for your family's well-being.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <a href="#products" className="bg-accent text-primary px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
              Shop Our Essentials <ArrowRight size={20} />
            </a>
            <a href="#about" className="border-2 border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all">
              Our Heritage
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <SectionWrapper className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4">Why Choose Oroki Foods?</h2>
            <p className="text-secondary/60 text-lg">The commitment to quality you can trust in every spoonful.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, i) => (
              <div key={i} className="bg-primary/40 border border-white/10 p-8 rounded-3xl hover:bg-accent/10 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {React.cloneElement(feature.icon as React.ReactElement, { size: 32 })}
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-secondary/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* PRODUCTS SECTION */}
      <SectionWrapper id="products" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 text-white">Our Signature Offerings</h2>
              <p className="text-secondary/60 text-lg">Explore our range of perfectly balanced traditional foods and flavor infusions.</p>
            </div>
            <a href="#contact" className="text-accent font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View Price List <ArrowRight size={20} />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product, i) => (
              <div key={i} className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <SafeImage src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md px-4 py-1.5 rounded-full text-accent font-bold text-sm">
                    {product.price}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-heading text-2xl font-bold mb-3">{product.name}</h3>
                  <p className="text-secondary/60 text-sm mb-8 flex-1">{product.description}</p>
                  <a href="#contact" className="w-full bg-accent text-primary text-center py-4 rounded-xl font-bold hover:brightness-110 transition-all">
                    Order Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ABOUT SECTION */}
      <SectionWrapper id="about" className="py-24 bg-accent/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
            <SafeImage src={IMAGES.about} alt="The Heart of Osogbo" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
              <p className="text-white font-heading text-2xl italic leading-relaxed">
                "Our mission is to bring the wholesome nutrition of our ancestors to the modern table."
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">Our Story: The Heart of Osogbo</h2>
            <p className="text-secondary/70 text-lg leading-relaxed mb-10">
              Founded in Osogbo, Oroki Foods is dedicated to reviving and modernizing Nigeria's rich culinary heritage. We meticulously select the best raw materials to ensure every product meets the highest standards of purity and taste, backed by NAFDAC approval.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { label: 'Years of Quality', val: '10+', icon: <Star className="text-accent" /> },
                { label: 'Unique Flavors', val: '15+', icon: <Plus className="text-accent" /> },
                { label: 'Satisfaction', val: '99%', icon: <Heart className="text-accent" /> }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                  <div className="flex justify-center mb-3 opacity-60">{stat.icon}</div>
                  <div className="text-3xl font-heading font-black text-white">{stat.val}</div>
                  <div className="text-xs text-secondary/40 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* NAFDAC BADGE SECTION */}
      <SectionWrapper className="py-20 border-y border-white/10 bg-primary overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center animate-glow">
              <ShieldCheck size={48} className="text-accent" />
            </div>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 text-white">Your Safety is Our Priority</h2>
          <p className="text-secondary/60 text-lg max-w-2xl mx-auto mb-10">
            Oroki Foods proudly displays our NAFDAC certification, ensuring that our production processes meet stringent national health and safety guidelines.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full font-mono text-xs uppercase tracking-widest text-accent">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Certified Production Facility
          </div>
        </div>
      </SectionWrapper>

      {/* TESTIMONIALS */}
      <SectionWrapper className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 text-white">Hear It From Our Community</h2>
            <p className="text-secondary/60">Wholesome goodness loved by families across Nigeria.</p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="break-inside-avoid bg-gradient-to-br from-white/10 to-transparent p-8 rounded-3xl border border-white/10 relative group">
                <Quote size={64} className="absolute -top-4 -right-4 text-white/5 group-hover:text-accent/10 transition-colors" />
                <p className="text-white/90 text-lg italic leading-relaxed mb-8 relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-4 relative z-10 border-t border-white/10 pt-6">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <p className="text-accent/80 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CONTACT SECTION */}
      <SectionWrapper id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-4xl md:text-6xl font-bold mb-8 text-white">Get in Touch or Place an Order</h2>
              <p className="text-secondary/70 text-lg mb-12">
                Have questions about our blends or want to place a bulk order? Our team is ready to assist you in bringing Oroki Foods to your table.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: <MapPin />, title: "Headquarters", content: "Osogbo, Osun State, Nigeria" },
                  { icon: <Phone />, title: "Call / WhatsApp", content: "+234 800 OROKI FOODS" },
                  { icon: <Mail />, title: "Email Us", content: "contact@orokifoods.com" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-secondary/60">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {formSubmitted ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-accent/10 border border-accent/20 rounded-[40px] text-center p-12 animate-scaleIn">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-primary" />
                  </div>
                  <h3 className="text-3xl font-heading font-bold mb-4 text-white">Order Received!</h3>
                  <p className="text-secondary/70">Thank you for choosing Oroki Foods. We will reach out to you shortly to finalize your order.</p>
                  <button onClick={() => setFormSubmitted(false)} className="mt-8 text-accent font-bold underline underline-offset-4">
                    Send another message
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
                  className="bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-sm"
                >
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary/60 mb-2">Your Name</label>
                      <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary/60 mb-2">Phone Number</label>
                      <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-all" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-secondary/60 mb-2">Email Address</label>
                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-all" />
                  </div>
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-secondary/60 mb-2">Your Order / Inquiry</label>
                    <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-all resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-accent text-primary font-black py-4 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2">
                    Submit Request <ArrowRight size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* FOOTER */}
      <footer className="bg-black py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <a href="#home" className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-primary font-black text-xl leading-none">O</span>
                </div>
                <span className="font-heading font-black text-white text-3xl tracking-tight">Oroki Foods</span>
              </a>
              <p className="text-secondary/50 text-lg max-w-sm mb-8 leading-relaxed">
                Pure Nutrition, Traditional Taste. High-quality Nigerian health foods crafted from the finest natural ingredients.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/orokifoods" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all">
                  <Instagram size={20} />
                </a>
                <a href="https://wa.me/message/JAAV3A4T5N4GO1" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all">
                  <Phone size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-white text-xl mb-6">Explore</h4>
              <ul className="space-y-4 text-secondary/60">
                <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
                <li><a href="#products" className="hover:text-accent transition-colors">Products</a></li>
                <li><a href="#about" className="hover:text-accent transition-colors">Our Story</a></li>
                <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-white text-xl mb-6">Contact</h4>
              <ul className="space-y-4 text-secondary/60">
                <li className="flex items-center gap-3"><MapPin size={16} /> Osogbo, Osun State</li>
                <li className="flex items-center gap-3"><Mail size={16} /> contact@orokifoods.com</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-secondary/30 text-sm">
            <p>© {new Date().getFullYear()} Oroki Foods. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/**
 * HELPER WRAPPER
 */
function SectionWrapper({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className || ''}`}
    >
      {children}
    </section>
  );
}