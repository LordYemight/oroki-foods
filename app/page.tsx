'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import {
  CheckCircle,
  Phone,
  Menu,
  X,
  Quote,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ArrowRight,
  MoveDown
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * UTILITIES
 */
function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={cn("transition-opacity duration-700", className)}
      priority={priority}
      unoptimized
    />
  );
}

/**
 * DATA
 */
const BRAND = {
  name: "Oroki Foods",
  tagline: "Experience the Art of Premium Nutrients.",
  description: "Authentic, fresh, and exquisite traditional delights from Osogbo.",
  accent: "#FF0000"
};

const IMAGES = {
  hero: [
    "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&q=80&w=800", // Dark Grains
    "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=800", // Spices
    "https://images.unsplash.com/photo-1476718406336-bb18274d6185?auto=format&fit=crop&q=80&w=800", // Dark Luxury Food
    "https://images.unsplash.com/photo-1621262133036-ed45543c7068?auto=format&fit=crop&q=80&w=800", // Black & Gold
    "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800", // Golden Wheat
    "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&q=80&w=800"  // Dark Background
  ],
  products: [
    "/soyabean.png",
    "/coconut.png",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
    "/strawberry.png",
    "/kunu.png"
  ],
  about: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2070"
};

const PRODUCTS = [
  {
    name: "Classic Soyabean & Groundnut",
    tag: "Energy",
    description: "The perfect energy-boosting mix of soyabeans and groundnuts, carefully milled for a smooth texture.",
    price: "₦3,500",
    image: IMAGES.products[0],
  },
  {
    name: "Coconut & Tiger Nuts",
    tag: "Creamy",
    description: "Rich, creamy, and naturally sweet fusion of premium coconuts and tiger nuts.",
    price: "₦4,200",
    image: IMAGES.products[1],
  },
  {
    name: "Fruity Pineapple & Banana",
    tag: "Fruity",
    description: "A delightful tropical twist, combining the tang of pineapple with the sweetness of banana.",
    price: "₦3,800",
    image: IMAGES.products[2],
  },
  {
    name: "Strawberry Bliss",
    tag: "Sweet",
    description: "Infused with real strawberries for a beautifully pink, naturally sweet, and luscious pap.",
    price: "₦4,000",
    image: IMAGES.products[3],
  },
  {
    name: "Spiced Ginger & Kunu",
    tag: "Traditional",
    description: "Authentic hearty flavor with a warm ginger kick, paying homage to traditional kunu.",
    price: "₦3,500",
    image: IMAGES.products[4],
  }
];

const TESTIMONIALS = [
  { name: "Aisha Kareem", role: "Parent", text: "Finally, a brand that respects our traditions while meeting modern standards. My kids love the Tombrown blend.", image: "https://i.pravatar.cc/150?u=aisha" },
  { name: "Segun Martins", role: "Fitness Coach", text: "The nutrient profile is incredible. It's clean, natural, and gives me sustained energy for hours.", image: "https://i.pravatar.cc/150?u=segun" },
  { name: "Mrs. Bose", role: "Grandmother", text: "This taste takes me back to my village in Osogbo. It is pure, thick, and very satisfying.", image: "https://i.pravatar.cc/150?u=bose" },
  { name: "David Okoro", role: "Nutritionist", text: "NAFDAC approval is one thing, but the quality of ingredients here is another level entirely.", image: "https://i pravatar.cc/15 ?u=david" }
];

/**
 * COMPONENTS
 */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-[100] transition-all duration-300 px-6",
      scrolled ? "bg-black/95 backdrop-blur-xl border-b border-white/5 py-3" : "bg-gradient-to-b from-black/80 to-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 bg-[#FF0000] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-white font-black text-xl">O</span>
          </div>
          <span className="font-serif text-2xl font-bold tracking-[0.1em] text-white">OROKI</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-12">
          {['About', 'Menu', 'Contact'].map((item, idx) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-sm font-medium text-white/80 hover:text-[#FF0000] transition-colors tracking-wide"
            >
              {item}
            </motion.a>
          ))}
          <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
            <Phone size={16} /> 234 703 561 6879
          </div>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-white/20 text-white hover:bg-white/10 px-8 py-2.5 rounded-sm font-medium text-sm tracking-widest transition-all"
          >
            ORDER NOW
          </motion.a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-black z-[200] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-serif text-2xl font-bold text-white">OROKI</span>
              <button onClick={() => setMobileMenu(false)} className="text-white"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8 text-4xl font-serif text-white">
              {['Products', 'Story', 'Quality', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="hover:text-[#FF0000] transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  return (
    <section ref={containerRef} id="home" className="relative h-[110vh] flex items-center justify-center overflow-hidden bg-black w-full fixed top-0 z-0">
      <motion.div style={{ y, scale, opacity, filter: `blur(${blur}px)` }} className="absolute inset-0 z-0 w-full h-full flex flex-col justify-center">
        {/* Marquee Background */}
        <div className="absolute inset-0 flex flex-col gap-4 opacity-40 rotate-[-5deg] scale-125 pointer-events-none">
          {/* Row 1 */}
          <div className="flex gap-4 w-[200vw] animate-marquee">
            {[...IMAGES.hero, ...IMAGES.hero, ...IMAGES.hero].map((img, i) => (
              <div key={i} className="relative w-72 h-48 rounded-xl overflow-hidden shrink-0 border border-white/5">
                <SafeImage src={img} alt="texture" fill className="object-cover" />
              </div>
            ))}
          </div>
          {/* Row 2 (Reverse) */}
          <div className="flex gap-4 w-[200vw] animate-marquee [animation-direction:reverse]">
            {[...IMAGES.hero, ...IMAGES.hero, ...IMAGES.hero].reverse().map((img, i) => (
              <div key={i} className="relative w-80 h-56 rounded-xl overflow-hidden shrink-0 border border-white/5">
                <SafeImage src={img} alt="texture" fill className="object-cover" />
              </div>
            ))}
          </div>
          {/* Row 3 */}
          <div className="flex gap-4 w-[200vw] animate-marquee">
            {[...IMAGES.hero, ...IMAGES.hero, ...IMAGES.hero].map((img, i) => (
              <div key={i} className="relative w-72 h-48 rounded-xl overflow-hidden shrink-0 border border-white/5">
                <SafeImage src={img} alt="texture" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/0 via-black/40 to-black" />
      </motion.div>

      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), opacity }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-serif text-6xl md:text-9xl font-bold text-white mb-6 tracking-tighter drop-shadow-2xl">
            OROKI <span className="text-[#FF0000] drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">FOODS</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-light mb-12 leading-relaxed">
            Experience the Art of Grains: <span className="text-[#FF0000] font-medium italic underline decoration-white/10 underline-offset-8">Fresh</span>, Authentic, and <span className="text-white font-medium italic">Exquisite</span> Delights
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            <a href="#contact" className="group relative bg-[#FF0000] text-white px-12 py-5 rounded-sm font-bold text-sm tracking-[0.2em] transition-all shadow-[0_10px_40px_rgba(255,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(255,0,0,0.5)] uppercase w-full md:w-auto text-center overflow-hidden">
              <span className="relative z-10">Order Now</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a href="#menu" className="group border border-white/20 text-white backdrop-blur-md bg-white/5 px-12 py-5 rounded-sm font-bold text-sm tracking-[0.2em] hover:bg-white/10 hover:border-[#FF0000]/40 transition-all uppercase w-full md:w-auto text-center">
              View Menu
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#FF0000] to-transparent animate-pulse" />
        <span className="text-[8px] tracking-[0.5em] text-white/30 uppercase">Scroll to explore</span>
      </motion.div>
    </section>
  );
}

function ProductSection() {
  const [activeTab, setActiveTab] = useState('ALL');
  const tabs = ['ALL', 'TRADITIONAL', 'ENERGY', 'FRUITY', 'SWEET'];

  const filteredProducts = activeTab === 'ALL'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.tag.toUpperCase() === activeTab || (activeTab === 'TRADITIONAL' && p.tag === 'Creamy'));

  return (
    <section id="menu" className="py-32 relative z-10 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-[#FF0000]" />
              <span className="text-white/50 font-bold tracking-widest uppercase text-xs">Our Menu</span>
            </motion.div>
            <h2 className="font-serif text-5xl md:text-7xl font-light text-white">Discover <br /><span className="italic text-[#FF0000]">Our Selection.</span></h2>
          </div>

          <div className="flex flex-wrap gap-6 items-center border-b border-white/10 pb-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 relative pb-2",
                  activeTab === tab ? "text-[#FF0000]" : "text-white/40 hover:text-white/70"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-[-2px] left-0 w-full h-[1px] bg-[#FF0000]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Slider */}
        <div className="relative overflow-hidden group">
          <motion.div
            className="flex gap-6 py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity
            }}
          >
            {[...filteredProducts, ...filteredProducts].map((product, i) => (
              <div
                key={`${product.name}-${i}`}
                className="w-[300px] flex-shrink-0 flex flex-col bg-white/[0.02] border border-white/5 hover:border-[#FF0000]/40 transition-all duration-500 h-[500px]"
              >
                <div className="relative aspect-square overflow-hidden bg-black/40">
                  <SafeImage src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 duration-700 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-[#FF0000] transition-colors truncate">{product.name}</h3>
                    <p className="text-white/40 text-sm mb-4 leading-relaxed font-light line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="font-bold text-[#FF0000] tracking-widest">{product.price}</span>
                    <a href="#contact" className="text-[10px] font-bold tracking-widest text-white uppercase border-b border-white/20 hover:border-[#FF0000] hover:text-[#FF0000] transition-all pb-1">
                      Order
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-32 bg-black relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-[#FF0000]" />
            <span className="text-white/50 font-bold tracking-widest uppercase text-xs">Testimonials</span>
            <div className="h-[1px] w-12 bg-[#FF0000]" />
          </motion.div>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-white">Voices of <br /><span className="italic text-[#FF0000]">Tradition.</span></h2>
        </div>

        <div className="border border-white/10 bg-white/[0.01]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={cn(
                "p-12 md:p-20 border-white/10 group transition-colors duration-700 hover:bg-white/[0.02] relative overflow-hidden",
                i === 0 ? "border-b md:border-r" : "",
                i === 1 ? "border-b" : "",
                i === 2 ? "md:border-r" : "",
                i === 3 ? "" : ""
              )}>
                <Quote size={32} className="text-[#FF0000]/20 mb-8 group-hover:text-[#FF0000]/60 transition-colors" />
                <p className="text-xl md:text-2xl font-serif leading-relaxed text-white/90 mb-12 relative z-10">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <SafeImage src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white tracking-[0.2em] uppercase">{t.name}</h4>
                    <p className="text-[#FF0000] text-[10px] tracking-widest uppercase mt-1">{t.role}</p>
                  </div>
                </div>
                {/* Subtle accent on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF0000]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Heritage() {
  return (
    <section id="about" className="py-32 relative bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-5xl md:text-6xl font-light text-white mb-6">The Legacy of <br /><span className="text-[#FF0000] italic font-bold">Osogbo</span></h2>
          <p className="text-white/60 text-lg font-light leading-relaxed">
            We seamlessly blend Nigeria’s rich culinary history with modern nutritional science to present an unmatched eating experience. Every bowl tells a story of authenticity.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Large Featured Card */}
          <div className="md:col-span-2 md:row-span-2 group">
            <div className="relative h-[600px] bg-white/[0.02] overflow-hidden border border-white/5">
              <SafeImage src={IMAGES.hero[1]} alt="Heritage" fill className="object-cover group-hover:scale-105 transition-transform duration-[2s] opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <h3 className="font-serif text-4xl text-white mb-4">Traditional Purity</h3>
                <p className="text-white/70 font-light max-w-md">Our process respects the slow, rhythmic traditions of our ancestors, delivering unparalleled flavor profiles.</p>
              </div>
            </div>
          </div>

          {/* Small Top Card */}
          <div className="group">
            <div className="relative h-[288px] bg-white/[0.05] border border-white/5 flex flex-col justify-center items-center text-center p-8 hover:border-[#FF0000]/40 transition-all duration-500 shadow-xl">
              <ShieldCheck size={48} strokeWidth={1} className="text-[#FF0000] mb-6 group-hover:scale-110 transition-all" />
              <h4 className="font-serif text-2xl text-white mb-2">NAFDAC Approved</h4>
              <p className="text-white/60 font-light text-sm">Certified production facility meeting premium health standards.</p>
            </div>
          </div>

          {/* Small Bottom Card */}
          <div className="group">
            <div className="relative h-[288px] bg-white/[0.02] overflow-hidden border border-white/5">
              <SafeImage src={IMAGES.hero[2]} alt="Grains" fill className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h4 className="font-serif text-2xl text-white mb-2">Locally Sourced</h4>
                <p className="text-white/50 font-light text-sm">Finest non-GMO grains handpicked by local farmers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductBenefits() {
  return (
    <section className="py-32 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <div className="relative aspect-[3/4] overflow-hidden border border-white/5 shadow-2xl">
          <SafeImage src={IMAGES.products[1]} alt="Tombrown" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <span className="font-serif text-xs tracking-widest text-white text-center leading-relaxed">PREMIUM<br />BLEND</span>
          </div>
        </div>

        <div>
          <h3 className="font-bold tracking-[0.3em] uppercase text-xs text-[#FF0000] mb-4">Signature Profile</h3>
          <h2 className="font-serif text-5xl md:text-6xl text-white font-light mb-8">Tombrown <span className="italic">Royale</span></h2>
          <p className="text-white/60 font-light text-lg leading-relaxed mb-10">
            A multigrain powerhouse meticulously crafted with soybeans, groundnuts, and traditional spices. Designed for those who demand sustained energy without compromising on a rich, authentic taste.
          </p>

          <ul className="space-y-6">
            {[
              "Rich in essential amino acids from premium soy.",
              "Naturally sweet, zero refined sugars added.",
              "Slow-releasing carbohydrates for all-day energy."
            ].map((benefit, i) => (
              <li key={i} className="flex items-start gap-4">
                <CheckCircle size={20} className="text-[#FF0000] shrink-0 mt-1" />
                <span className="text-white/80 font-light">{benefit}</span>
              </li>
            ))}
          </ul>

          <a href="#contact" className="inline-block mt-12 bg-transparent border border-white/20 text-white hover:bg-white/10 px-10 py-4 font-medium text-sm tracking-widest transition-all">
            DISCOVER MORE
          </a>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', inquiry: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
    }, 2000);
  };

  const closeSuccess = () => {
    setFormState('idle');
    setFormData({ name: '', email: '', phone: '', inquiry: '' });
  };

  return (
    <section id="contact" className="py-32 bg-black relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-[#FF0000]" />
              <span className="text-white/50 font-bold tracking-widest uppercase text-xs">Reach Out</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl font-light text-white mb-12">Let's start a <br /><span className="italic text-[#FF0000]">Conversation.</span></h2>

            <div className="space-y-12">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#FF0000] mb-4 font-bold">Phone number:</p>
                <a href="tel:2347035616879" className="text-2xl md:text-3xl text-white hover:text-[#FF0000] transition-colors font-serif font-light">(234) 703 561 6879</a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#FF0000] mb-4 font-bold">Address:</p>
                <p className="text-2xl md:text-3xl text-white font-serif leading-tight font-light">Osogbo, Osun State, Nigeria.</p>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#FF0000] mb-4 font-bold">Service Hours:</p>
                  <p className="text-white/60 font-light text-sm">Monday to Sunday<br />8:00 am - 10:00 pm</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#FF0000] mb-4 font-bold">Email:</p>
                  <a href="mailto:hello@orokifoods.com" className="text-white/60 hover:text-white transition-colors font-light text-sm">hello@orokifoods.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/[0.02] p-8 md:p-12 rounded-sm border border-white/5 backdrop-blur-sm">
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold block">Full Name *</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    type="text"
                    placeholder="Jane Smith"
                    className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-white focus:outline-none focus:border-[#FF0000] transition-colors placeholder:text-white/10 font-light"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold block">Email *</label>
                    <input
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      type="email"
                      placeholder="jane@framer.com"
                      className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-white focus:outline-none focus:border-[#FF0000] transition-colors placeholder:text-white/10 font-light"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold block">Phone *</label>
                    <input
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      type="tel"
                      placeholder="(123)-456-7890"
                      className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-white focus:outline-none focus:border-[#FF0000] transition-colors placeholder:text-white/10 font-light"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold block">Inquiry *</label>
                  <textarea
                    required
                    value={formData.inquiry}
                    onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                    rows={4}
                    placeholder="Please type in your inquiry here."
                    className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-white focus:outline-none focus:border-[#FF0000] transition-colors resize-none placeholder:text-white/10 font-light"
                  ></textarea>
                </div>
                <button
                  disabled={formState !== 'idle'}
                  type="submit"
                  className="w-full bg-[#FF0000] text-white py-5 rounded-sm font-bold text-xs tracking-[0.3em] uppercase hover:bg-[#CC0000] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {formState === 'loading' && <Loader2 className="animate-spin" size={20} />}
                  {formState === 'loading' ? 'SUBMITTING...' : 'SUBMIT'}
                </button>
              </form>
            </div>

            <AnimatePresence>
              {formState === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center text-center p-12 z-50 border border-[#FF0000]/20"
                >
                  <div className="w-20 h-20 bg-[#FF0000] rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,0,0,0.4)]">
                    <CheckCircle size={40} className="text-white" />
                  </div>
                  <h3 className="font-serif text-3xl text-white mb-4">Message Sent!</h3>
                  <p className="text-white/60 mb-12 font-light">We've received your inquiry and will get back to you shortly.</p>
                  <button
                    onClick={closeSuccess}
                    className="border border-[#FF0000] text-[#FF0000] px-8 py-3 rounded-sm text-xs font-bold tracking-[0.2em] hover:bg-[#FF0000] hover:text-white transition-all uppercase"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black pt-32 pb-10 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-4xl font-bold mb-8 text-white">Ready to taste <br /><span className="text-[#FF0000] italic">perfection?</span></h3>
            <div className="space-y-6">
              <a href="mailto:hello@orokifoods.com" className="block text-2xl hover:text-[#FF0000] transition-colors underline underline-offset-8 decoration-[#FF0000]/30 font-light text-white">
                hello@orokifoods.com
              </a>
              <div className="flex gap-8 items-center text-xs font-bold tracking-[0.2em] text-white/40">
                <a href="#" className="hover:text-[#FF0000] transition-colors">THREADS</a>
                <a href="#" className="hover:text-[#FF0000] transition-colors">WHATSAPP</a>
                <a href="#" className="hover:text-[#FF0000] transition-colors">FACEBOOK</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-[#FF0000] mb-8">Navigation</h4>
            <ul className="space-y-4 text-white/60 font-light text-sm">
              {['Home', 'Products', 'Our Story', 'Wholesale', 'Contact'].map(item => (
                <li key={item}><a href={`#${item.toLowerCase().replace(' ', '')}`} className="hover:text-[#FF0000] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-[#FF0000] mb-8">Headquarters</h4>
            <p className="text-white/60 leading-loose font-light text-sm">
              Osogbo,<br />
              Osun State,<br />
              Nigeria.<br />
              Tel: 234 703 561 6879
            </p>
          </div>
        </div>

        <div className="flex flex-col md:row justify-between items-center pt-8 border-t border-white/5 text-[10px] font-bold tracking-widest text-white/20">
          <p>© 2024 OROKI FOODS PREMIUM TRADITION.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white/60 transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-white/60 transition-colors">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <main className="bg-black text-white selection:bg-[#FF0000] selection:text-white">
      <Navbar />
      <Hero />
      <div className="relative z-10 bg-black mt-[100vh] w-full min-h-screen">
        <ProductSection />
        <ProductBenefits />
        <Heritage />
        <Testimonials />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}