import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowUpRight, Star, CheckCircle2, Clock, MapPin, Phone, Mail, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DUMMY_AVATAR = "https://i.pravatar.cc/150?img=";
const HERO_IMAGE = "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop"; // Replace this URL with your transparent PNG (e.g., "/transparent-man.png")

function App() {
  const heroTextRef = useRef(null);
  const heroImgRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Using gsap.context is critical in React 18 Strict Mode
    let ctx = gsap.context(() => {
      // Hero Animation - Fades in from bottom
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.3 // Delay to make it noticeable on load
        });
      }

      // Marquee Animations
      if (marquee1Ref.current && marquee2Ref.current) {
        gsap.to(marquee1Ref.current, {
          xPercent: -50,
          ease: "none",
          duration: 15,
          repeat: -1
        });

        gsap.to(marquee2Ref.current, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1
        });
      }

      // Scroll Animations for all other sections
      const sectionContainers = gsap.utils.toArray("section:not(#home) .container");
      sectionContainers.forEach(container => {
        Array.from(container.children).forEach((child) => {
           // If the child is a grid or vertical list of cards, stagger animate its children
           if (child.classList.contains('grid') || (child.classList.contains('flex-col') && child.classList.contains('gap-4'))) {
              gsap.from(child.children, {
                scrollTrigger: { trigger: child, start: "top 85%" },
                y: 50, 
                opacity: 0, 
                duration: 0.8, 
                stagger: 0.15, 
                ease: "power3.out"
              });
           } else {
              // Otherwise, just fade up the whole block
              gsap.from(child, {
                scrollTrigger: { trigger: child, start: "top 85%" },
                y: 40, 
                opacity: 0, 
                duration: 0.8, 
                ease: "power3.out"
              });
           }
        });
      });
    });

    return () => {
      lenis.destroy();
      ctx.revert(); // Revert animations on unmount
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-white selection:bg-brand selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 px-6 py-4 flex items-center justify-between bg-[#111111]/80 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <div className="w-8 h-8 bg-brand rounded-md flex items-center justify-center font-oswald text-black font-bold">
            F
          </div>
          <span className="font-oswald font-bold text-xl tracking-wider">FLEXORA</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-sm hover:text-brand transition-colors font-medium">Home</a>
          <a href="#about" className="text-sm hover:text-brand transition-colors text-white/80">About</a>
          <a href="#services" className="text-sm hover:text-brand transition-colors text-white/80">Classes</a>
          <a href="#pricing" className="text-sm hover:text-brand transition-colors text-white/80">Pricing</a>
          <a href="#schedule" className="text-sm hover:text-brand transition-colors text-white/80">Schedule</a>
          <a href="#reviews" className="text-sm hover:text-brand transition-colors text-white/80">Reviews</a>
        </div>

        <a href="#pricing" className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand hover:text-white transition-all">
          Join Now
        </a>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen pt-32 pb-12 overflow-hidden flex flex-col items-center justify-center">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            alt="FLEXORA Gym"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark Gradient Overlay to ensure text readability and seamless transition to the next section */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 via-[#111111]/70 to-[#111111] z-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center mt-8 md:mt-16" ref={heroTextRef}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold font-oswald tracking-tight uppercase leading-[1.1] max-w-5xl mx-auto drop-shadow-lg">
            FLEXORA: TRAIN HARD. GET RESULTS.
          </h1>

          <p className="mt-6 text-white/80 max-w-2xl mx-auto text-base md:text-lg drop-shadow-md leading-relaxed">
            FLEXORA in Sector 14, Dwarka, Delhi.<br className="hidden sm:block" />
            Expert trainers, modern equipment, flexible timings.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="https://wa.me/919999999999?text=Hi,%20I%20want%20to%20join%20FLEXORA"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-brand text-black px-8 py-3.5 rounded-full font-bold text-sm md:text-base hover:bg-white hover:text-black transition-all text-center flex items-center justify-center gap-2"
            >
              Join on WhatsApp
            </a>
            <a
              href="#pricing"
              className="w-full sm:w-auto bg-transparent border-2 border-white/30 text-white px-8 py-3.5 rounded-full font-bold text-sm md:text-base hover:border-brand hover:text-brand transition-all text-center"
            >
              View Plans
            </a>
          </div>

          {/* Trust Row */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <span className="font-oswald font-bold text-xl text-brand">4.8</span>
              <div className="flex text-brand">
                <Star size={16} fill="currentColor" />
              </div>
              <span className="text-sm font-medium text-white/90">Google Rating</span>
            </div>

            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <span className="font-oswald font-bold text-xl text-white">250+</span>
              <span className="text-sm font-medium text-white/90">Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="relative w-full overflow-hidden py-12 bg-bg flex flex-col justify-center min-h-[300px]">
        {/* White Diagonal Band */}
        <div className="absolute w-[120%] h-16 bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-3 z-10 flex items-center shadow-2xl">
          <div className="flex whitespace-nowrap" ref={marquee1Ref}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                <span className="text-black font-oswald font-bold text-3xl uppercase mx-6 tracking-wide">Personal Training</span>
                <span className="text-brand text-4xl">*</span>
                <span className="text-black font-oswald font-bold text-3xl uppercase mx-6 tracking-wide">Weight Lifting</span>
                <span className="text-brand text-4xl">*</span>
                <span className="text-black font-oswald font-bold text-3xl uppercase mx-6 tracking-wide">Cardio Fitness</span>
                <span className="text-brand text-4xl">*</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orange Diagonal Band */}
        <div className="absolute w-[120%] h-16 bg-brand left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2 -rotate-2 z-20 flex items-center shadow-xl">
          <div className="flex whitespace-nowrap" ref={marquee2Ref}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                <span className="text-black font-oswald font-bold text-3xl uppercase mx-6 tracking-wide">Body Transformation</span>
                <span className="text-black text-4xl">*</span>
                <span className="text-black font-oswald font-bold text-3xl uppercase mx-6 tracking-wide">CrossFit</span>
                <span className="text-black text-4xl">*</span>
                <span className="text-black font-oswald font-bold text-3xl uppercase mx-6 tracking-wide">Yoga Classes</span>
                <span className="text-black text-4xl">*</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 mb-20">
            {/* Left side */}
            <div className="lg:w-1/3 flex flex-col gap-6">
              <span className="text-brand font-oswald uppercase tracking-widest text-sm font-semibold">About Flexora</span>

              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full border border-white/20"></div>
                <div className="absolute -left-4 -bottom-4 w-48 h-48 bg-brand/20 blur-2xl rounded-full"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-brand to-brand-hover rounded-full flex flex-col items-center justify-center text-black z-10 shadow-lg">
                  <span className="text-6xl font-bold font-oswald leading-none tracking-tighter">18</span>
                  <span className="text-[10px] uppercase font-bold text-black/80 tracking-widest mt-1 text-center leading-tight">Years of<br />Experience</span>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="lg:w-2/3 flex flex-col justify-center gap-8">
              <h2 className="text-3xl md:text-4xl font-oswald font-bold leading-snug">
                We are a results-driven fitness center dedicated to helping you train smarter, move better, and live stronger. With expert coaching and a supportive community, we make fitness achievable for everyone.
              </h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <a href="#pricing" className="flex items-center bg-white text-black pl-6 pr-2 py-2 rounded-full font-semibold hover:bg-brand hover:text-white transition-all group">
                  Start Journey
                  <div className="bg-brand group-hover:bg-black w-8 h-8 rounded-full ml-4 flex items-center justify-center transition-colors">
                    <ArrowUpRight size={16} className="text-black group-hover:text-white" />
                  </div>
                </a>
                <p className="text-sm text-white/50 max-w-sm leading-relaxed">
                  More than just a gym, we are a community of fitness enthusiasts dedicated to transforming lives through health and wellness. Join us and unleash your true potential.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            {[
              { num: "10K+", label: "Happy Members" },
              { num: "50+", label: "Expert Trainers" },
              { num: "150+", label: "Modern Equipment" },
              { num: "25+", label: "Weekly Classes" },
            ].map((stat, idx) => (
              <div key={idx} className="relative aspect-video rounded-3xl border border-white/10 flex flex-col items-center justify-center bg-bg-card/30 backdrop-blur-sm hover:border-brand/50 transition-colors cursor-pointer group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-start z-10">
                  <span className="text-3xl md:text-4xl font-bold font-oswald text-white group-hover:text-brand transition-colors">{stat.num}</span>
                </div>
                <span className="text-xs text-white/50 mt-1 font-medium z-10">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-gradient-to-b from-bg to-bg-card/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-brand font-oswald uppercase tracking-widest text-sm font-semibold block mb-2">Our Classes</span>
            <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase tracking-wide mb-4">
              Elevate Your Fitness
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto">
              Personalized programs, expert coaching, and proven methods to help you achieve real results.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Service Item 1 */}
            <div className="group relative bg-white text-black p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-brand/20 transition-shadow">
              <div className="absolute left-0 top-0 w-2 h-full bg-brand"></div>

              <div className="flex items-center gap-6 md:gap-12 pl-2">
                <span className="text-brand font-bold font-oswald text-xl">01</span>
                <h3 className="text-2xl md:text-3xl font-oswald font-bold uppercase">Personal Training</h3>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 rounded-full border border-black/10 text-xs font-semibold tracking-wide">1-on-1 Coaching</span>
                <span className="px-4 py-1.5 rounded-full border border-black/10 text-xs font-semibold tracking-wide">Custom Diet</span>
                <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center md:ml-4 group-hover:-rotate-45 transition-transform shadow-lg">
                  <ArrowUpRight size={20} className="text-black" />
                </div>
              </div>
            </div>

            {/* Service Item 2 */}
            <div className="group relative bg-bg-card/50 text-white p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/5 hover:border-white/20 hover:bg-bg-card transition-colors cursor-pointer">
              <div className="flex items-center gap-6 md:gap-12 pl-2">
                <span className="text-brand font-bold font-oswald text-xl">02</span>
                <h3 className="text-2xl md:text-3xl font-oswald font-bold uppercase">Weight Training</h3>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 rounded-full border border-white/10 text-xs text-white/70 font-semibold tracking-wide">Strength</span>
                <span className="px-4 py-1.5 rounded-full border border-white/10 text-xs text-white/70 font-semibold tracking-wide">Hypertrophy</span>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center md:ml-4 group-hover:-rotate-45 transition-transform opacity-50 group-hover:opacity-100">
                  <ArrowUpRight size={20} className="text-black" />
                </div>
              </div>
            </div>

            {/* Service Item 3 */}
            <div className="group relative bg-bg-card/50 text-white p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/5 hover:border-white/20 hover:bg-bg-card transition-colors cursor-pointer">
              <div className="flex items-center gap-6 md:gap-12 pl-2">
                <span className="text-brand font-bold font-oswald text-xl">03</span>
                <h3 className="text-2xl md:text-3xl font-oswald font-bold uppercase">CrossFit & HIIT</h3>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 rounded-full border border-white/10 text-xs text-white/70 font-semibold tracking-wide">Fat Loss</span>
                <span className="px-4 py-1.5 rounded-full border border-white/10 text-xs text-white/70 font-semibold tracking-wide">Endurance</span>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center md:ml-4 group-hover:-rotate-45 transition-transform opacity-50 group-hover:opacity-100">
                  <ArrowUpRight size={20} className="text-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule / Timings */}
      <section id="schedule" className="py-24 px-6 relative border-t border-white/5">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <span className="text-brand font-oswald uppercase tracking-widest text-sm font-semibold block mb-2">Gym Timings</span>
            <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase tracking-wide mb-6">
              When Can You Work Out?
            </h2>
            <p className="text-white/60 mb-8 max-w-md">
              We offer flexible timings so you never miss a workout. Our facility is accessible throughout the week to fit your busy schedule.
            </p>
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <Clock className="text-brand" size={20} />
                  <span className="font-semibold font-oswald text-xl tracking-wide">Monday - Friday</span>
                </div>
                <span className="text-white/80">05:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <Clock className="text-brand" size={20} />
                  <span className="font-semibold font-oswald text-xl tracking-wide">Saturday</span>
                </div>
                <span className="text-white/80">06:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Clock className="text-brand" size={20} />
                  <span className="font-semibold font-oswald text-xl tracking-wide">Sunday</span>
                </div>
                <span className="text-brand font-semibold">07:00 AM - 01:00 PM</span>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-brand/20 mix-blend-overlay z-10 pointer-events-none"></div>
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Gym interior" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-bg-card/20 border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-brand font-oswald uppercase tracking-widest text-sm font-semibold block mb-2">Pricing Plans</span>
            <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase tracking-wide mb-4">
              Choose Your Plan
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto">
              Affordable plans tailored to your fitness goals. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-bg-card p-8 rounded-3xl border border-white/10 flex flex-col">
              <h3 className="font-oswald text-2xl font-bold uppercase mb-2">Basic</h3>
              <p className="text-white/50 text-sm mb-6">Perfect for beginners getting started.</p>
              <div className="mb-8">
                <span className="text-5xl font-bold font-oswald">$29</span>
                <span className="text-white/50">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle2 size={18} className="text-brand" /> Full Gym Access</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle2 size={18} className="text-brand" /> 1 Group Class/Week</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle2 size={18} className="text-brand" /> Locker Room Access</li>
                <li className="flex items-center gap-3 text-sm text-white/30"><CheckCircle2 size={18} className="text-white/20" /> Personal Trainer</li>
              </ul>
              <button className="w-full py-3 rounded-full border border-white/20 font-semibold hover:bg-white hover:text-black transition-colors">
                Select Plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-brand text-black p-8 rounded-3xl border border-brand transform md:-translate-y-4 shadow-2xl shadow-brand/20 flex flex-col relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Most Popular</div>
              <h3 className="font-oswald text-2xl font-bold uppercase mb-2">Pro</h3>
              <p className="text-black/70 text-sm mb-6">For dedicated fitness enthusiasts.</p>
              <div className="mb-8">
                <span className="text-5xl font-bold font-oswald">$59</span>
                <span className="text-black/70">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={18} /> Full Gym Access 24/7</li>
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={18} /> Unlimited Group Classes</li>
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={18} /> Locker & Sauna Access</li>
                <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={18} /> 2 Personal Sessions/Mo</li>
              </ul>
              <button className="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-white hover:text-black transition-colors">
                Select Plan
              </button>
            </div>

            {/* Elite Plan */}
            <div className="bg-bg-card p-8 rounded-3xl border border-white/10 flex flex-col">
              <h3 className="font-oswald text-2xl font-bold uppercase mb-2">Elite</h3>
              <p className="text-white/50 text-sm mb-6">The ultimate VIP fitness experience.</p>
              <div className="mb-8">
                <span className="text-5xl font-bold font-oswald">$99</span>
                <span className="text-white/50">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle2 size={18} className="text-brand" /> Full Gym Access 24/7</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle2 size={18} className="text-brand" /> Unlimited Classes & Sauna</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle2 size={18} className="text-brand" /> Dedicated Personal Trainer</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle2 size={18} className="text-brand" /> Custom Diet Plan</li>
              </ul>
              <button className="w-full py-3 rounded-full border border-white/20 font-semibold hover:bg-white hover:text-black transition-colors">
                Select Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-brand font-oswald uppercase tracking-widest text-sm font-semibold block mb-2">Testimonials</span>
              <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase tracking-wide">
                What Members Say
              </h2>
            </div>
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand hover:border-brand transition-colors cursor-pointer">
                <ArrowUpRight size={18} className="rotate-[-135deg]" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-brand hover:text-white transition-colors cursor-pointer">
                <ArrowUpRight size={18} className="rotate-45" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "John Doe", role: "Athlete", review: "FLEXORA completely changed my fitness journey. The trainers are top-notch and the equipment is always well-maintained." },
              { name: "Sarah Smith", role: "Yoga Enthusiast", review: "The community here is so supportive! I love the group classes, especially the morning yoga sessions. Best gym in town." },
              { name: "Mike Johnson", role: "Bodybuilder", review: "If you want real results, this is the place. The pro plan is worth every penny with the personalized diet and training." }
            ].map((review, i) => (
              <div key={i} className="bg-bg-card/40 p-8 rounded-3xl border border-white/5 relative">
                <Quote size={40} className="text-brand/20 absolute top-6 right-6" />
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="var(--color-brand)" className="text-brand" />)}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-8">"{review.review}"</p>
                <div className="flex items-center gap-4">
                  <img src={`${DUMMY_AVATAR}${30 + i}`} alt="user" className="w-12 h-12 rounded-full border border-white/20" />
                  <div>
                    <h4 className="font-oswald font-bold tracking-wide">{review.name}</h4>
                    <span className="text-xs text-white/50">{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="bg-bg-card pt-20 pb-10 px-6 border-t border-white/10 mt-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand rounded-md flex items-center justify-center font-oswald text-black font-bold">F</div>
                <span className="font-oswald font-bold text-xl tracking-wider">FLEXORA</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Your ultimate fitness destination. Push your limits and achieve greatness with FLEXORA.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand hover:text-black transition-colors text-sm font-bold">FB</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand hover:text-black transition-colors text-sm font-bold">TW</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand hover:text-black transition-colors text-sm font-bold">IG</a>
              </div>
            </div>

            <div>
              <h4 className="font-oswald font-bold text-xl mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-white/60 hover:text-brand text-sm transition-colors">About Us</a></li>
                <li><a href="#services" className="text-white/60 hover:text-brand text-sm transition-colors">Classes</a></li>
                <li><a href="#pricing" className="text-white/60 hover:text-brand text-sm transition-colors">Pricing</a></li>
                <li><a href="#schedule" className="text-white/60 hover:text-brand text-sm transition-colors">Schedule</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-oswald font-bold text-xl mb-6">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/60 hover:text-brand text-sm transition-colors">FAQ</a></li>
                <li><a href="#" className="text-white/60 hover:text-brand text-sm transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-white/60 hover:text-brand text-sm transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-white/60 hover:text-brand text-sm transition-colors">Contact Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-oswald font-bold text-xl mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand shrink-0 mt-0.5" />
                  <span className="text-white/60 text-sm">123 Fitness Street, Gym City, NY 10001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-brand shrink-0" />
                  <span className="text-white/60 text-sm">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-brand shrink-0" />
                  <span className="text-white/60 text-sm">info@flexora.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm font-medium">© {new Date().getFullYear()} FLEXORA Fitness. All rights reserved.</p>
            <p className="text-white/40 text-sm font-medium flex items-center gap-1">Designed with <span className="text-brand">♥</span> for fitness.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;