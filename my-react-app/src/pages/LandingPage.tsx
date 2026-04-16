import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ShieldPlus, PhoneCall, ArrowRight, HeartHandshake, Timer, HeartPulse, Syringe, ShieldCheck, Globe } from 'lucide-react';
import { campaigns } from '../data/campaigns';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      image: '/heroimg1.jpg',
      title: 'Digitalizing Emergency Infrastructure',
      subtitle: 'Transforming Emergency Care. Saving Lives.'
    },
    {
      image: '/heroimg2.jpg',
      title: 'Real-Time Ambulance Dispatch',
      subtitle: 'Instant deployment using GPS-enabled intelligent routing.'
    },
    {
      image: '/heroimg3.jpg',
      title: 'Seamless Hospital Integration',
      subtitle: 'Connecting patients to available beds and life-saving medicines.'
    }
  ];

  const buttonsRef = useRef<HTMLDivElement>(null);
  const pairsRef = useRef<(HTMLDivElement | null)[]>([]);

  const pairs = [
    {
      challenge: 'Delayed emergency response times due to poor dispatch systems',
      solutionTitle: 'Smart Ambulance Dispatch',
      solutionDesc: 'Rapid deployment using GPS and intelligent routing',
      icon: '🚑'
    },
    {
      challenge: 'Lack of real-time communication between ambulances and hospitals',
      solutionTitle: 'Hospital Coordination System',
      solutionDesc: 'Real-time visibility of hospital capacity',
      icon: '🏥'
    },
    {
      challenge: 'Frequent shortages of essential medicines',
      solutionTitle: 'Emergency Medicine Distribution',
      solutionDesc: 'Fast access to life-saving drugs',
      icon: '💊'
    },
    {
      challenge: 'Fragmented infrastructure lacking coordination',
      solutionTitle: '24/7 Emergency Call Center',
      solutionDesc: 'Immediate triage and response coordination',
      icon: '📞'
    },
    {
      challenge: 'Citizens unable to reach immediate help without hurdles',
      solutionTitle: 'Citizen Access Platform',
      solutionDesc: 'Direct access to emergency services',
      icon: '📱'
    },
    {
      challenge: 'Financial barriers preventing access to urgent care',
      solutionTitle: 'Healthcare Financing',
      solutionDesc: 'Affordable access through inclusive financial systems',
      icon: '💳'
    }
  ];

  useEffect(() => {
    // GSAP Intro Animation for the hero buttons
    if (buttonsRef.current) {
      gsap.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)', delay: 0.5 }
      );
    }

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;

          if (target.classList.contains('pairs-container')) {
            const challengeBox = target.querySelector('.challenge-box');
            const solutionBox = target.querySelector('.solution-box');
            if (challengeBox) {
              gsap.fromTo(challengeBox,
                { x: -100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
              );
            }
            if (solutionBox) {
              gsap.fromTo(solutionBox,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
              );
            }
          } else if (target.classList.contains('gsap-section')) {
            gsap.fromTo(target,
              { opacity: 0, y: 80 },
              { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
            );
          }

          observer.unobserve(target);
        }
      });
    }, { threshold: 0.15 });

    // Observe challenge pairs
    const currentRefs = pairsRef.current;
    currentRefs.forEach(el => {
      if (el) observer.observe(el);
    });

    // Observe all gsap-sections
    document.querySelectorAll('.gsap-section').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [heroSlides.length]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* ── New Video Hero Section ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/herosection-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/60 to-slate-950/90" />

        <div className="relative z-10 px-6 text-center flex flex-col items-center w-full max-w-5xl mx-auto pt-10 pb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-tight mb-6 drop-shadow-2xl text-white italic uppercase"
          >
            Emergency Healthcare <span className="text-blue-500">System</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl lg:text-3xl text-blue-100 font-bold drop-shadow-lg mb-12 max-w-3xl text-center italic tracking-tight"
          >
            Transforming Emergency Care Across The Continent. Fast, Reliable, & Lifesaving.
          </motion.p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
            <Link to="/emergencies" className="bg-red-600 hover:bg-red-500 text-white font-black uppercase text-lg py-5 px-10 rounded-full shadow-2xl shadow-red-600/30 transition-all flex items-center justify-center gap-3 animate-pulse tracking-widest italic hover:scale-105">
              <PhoneCall size={24} /> Emergency Portal
            </Link>
            <div className="flex gap-4 justify-center">
              <Link to="/about" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-black uppercase tracking-widest italic py-5 px-8 rounded-full transition-all flex items-center gap-2 shadow-xl whitespace-nowrap hover:scale-105">
                Partner <ArrowRight size={18} />
              </Link>
              <Link to="/donate" className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest italic py-5 px-8 rounded-full transition-all flex items-center gap-2 shadow-xl whitespace-nowrap hover:scale-105">
                Support <HeartHandshake size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Critical Life Marquee ── */}
      <div className="bg-red-600 text-white overflow-hidden py-4 border-y border-red-700 flex relative z-20 shadow-2xl">
        <motion.div
          className="flex gap-12 whitespace-nowrap font-black italic tracking-widest uppercase text-xs items-center px-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {[...campaigns, ...campaigns, ...campaigns, ...campaigns].map((camp, i) => (
            <Link key={i} to={`/donate/${camp.id}`} className="hover:text-red-200 transition flex items-center gap-3">
              <span className="bg-white text-red-600 px-2 py-0.5 rounded text-[9px] animate-pulse">URGENT</span>
              {camp.title} <ArrowRight size={14} className="opacity-50 ml-1" />
            </Link>
          ))}
        </motion.div>
      </div>

      {/* ── What We Do (Formally Hero Section) ── */}
      <section className="text-slate-900 bg-slate-50 relative pt-16 lg:pt-20 pb-0 lg:pb-16 gsap-section" style={{ opacity: 0 }}>

        {/* Mobile ONLY Title */}
        <div className="lg:hidden text-center mb-8 px-6">
          <h2 className="text-4xl font-black text-slate-800 italic uppercase tracking-tighter">What We Do</h2>
        </div>

        {/* ── MOBILE: full-width background image with overlay ── */}
        <div className="lg:hidden mb-12 relative h-[50vh] flex items-center justify-center mx-0 rounded-none overflow-hidden hover:-translate-y-1 transition-transform duration-700">
          {/* Background images */}
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          ))}
          {/* Sea Blue UI Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/90 via-blue-500/80 to-blue-600/90" />

          {/* Mobile Text */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center py-10 px-6 text-center">
            <div className="relative flex items-center justify-center w-full h-full mb-8">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute transition-all duration-1000 ease-out flex flex-col items-center ${index === currentSlide
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                >
                  <h1 className="text-3xl font-black tracking-tight leading-tight mb-3 drop-shadow-2xl text-white italic uppercase">
                    {slide.title}
                  </h1>
                  <p className="text-sm text-blue-200 font-bold drop-shadow-lg italic">
                    {slide.subtitle}
                  </p>
                </div>
              ))}
            </div>
            {/* Slide dots */}
            <div className="absolute bottom-6 flex gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`rounded-full transition-all duration-300 ${i === currentSlide ? 'w-7 h-2 bg-white' : 'w-2 h-2 bg-white/40'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── DESKTOP: split layout ── */}
        <div className="hidden lg:flex bg-blue-500 min-h-[600px] shadow-2xl relative w-full overflow-hidden items-center border-y border-blue-400 py-16 mb-8 hover:-translate-y-2 transition-transform duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-blue-600/80 z-0"></div>

          <div className="max-w-7xl mx-auto px-12 lg:px-20 w-full relative z-10 flex flex-col">

            {/* Desktop Only Internal Title */}
            <div className="mb-16 border-l-4 border-white pl-6 transform hover:translate-x-2 transition-transform duration-500">
              <h2 className="text-5xl lg:text-6xl font-black text-blue-950 italic uppercase tracking-tighter drop-shadow-md">What We Do</h2>
              <p className="hidden lg:block text-xl text-blue-900 font-bold leading-relaxed max-w-3xl mt-4 italic">
                EHMS is a fully integrated operational platform connecting critical systems into one seamless network. We eliminate fragmentation and ensure care is delivered faster and smarter.
              </p>
            </div>

            <div className="flex flex-row items-center gap-16">

              {/* Left: Text */}
              <div className="w-1/2 text-left flex flex-col items-start min-h-[250px] justify-center">
                <div className="grid w-full">
                  {heroSlides.map((slide, index) => (
                    <div
                      key={index}
                      className={`col-start-1 row-start-1 transition-all duration-1000 ease-out transform ${index === currentSlide
                          ? 'translate-x-0 opacity-100'
                          : '-translate-x-8 opacity-0 pointer-events-none'
                        }`}
                    >
                      <h3 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6 leading-tight text-blue-950 italic uppercase drop-shadow-sm">
                        {slide.title}
                      </h3>
                      <p className="max-w-xl text-xl lg:text-3xl text-white font-black italic tracking-tight leading-snug drop-shadow-md">
                        {slide.subtitle}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Desktop Slide dots */}
                <div className="flex gap-3 mt-12 w-full">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`rounded-full transition-all duration-300 ${i === currentSlide ? 'w-12 h-2 bg-blue-400' : 'w-3 h-2 bg-white/20 hover:bg-white/40'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right: Slider Image Card */}
              <div className="w-1/2 h-[450px] relative overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-800 border-4 border-slate-700/50">
                {heroSlides.map((slide, index) => (
                  <img
                    key={index}
                    src={slide.image}
                    alt="EHMS Display"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out ${index === currentSlide
                        ? 'opacity-100 scale-100 rotate-0'
                        : 'opacity-0 scale-110 rotate-1'
                      }`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* The Challenge & Solution */}
      <section className="min-h-screen flex flex-col justify-center py-12 bg-white relative overflow-hidden gsap-section" style={{ opacity: 0 }}>
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-slate-800 mb-4"
            >
              The Challenge <span className="text-blue-600">vs</span> Our Solution
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 font-medium text-sm md:text-base max-w-3xl mx-auto"
            >
              Across many African countries, emergency healthcare systems face systemic challenges. We are actively converting these friction points into seamless technology-enabled lifelines.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pairs.map((pair, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 items-stretch pairs-container"
                ref={el => pairsRef.current[i] = el}
                data-index={i}
              >
                {/* Red Challenge Div */}
                <div style={{ opacity: 0 }} className="challenge-box bg-red-50 border border-red-100 rounded-xl p-4 flex flex-col justify-center flex-1 transition hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-red-500 shadow-sm shadow-red-500/20 text-white w-6 h-6 rounded-full flex items-center justify-center font-black flex-shrink-0 text-xs italic">
                      {i + 1}
                    </div>
                    <h3 className="text-red-500 font-black italic uppercase tracking-widest text-[10px]">The Challenge</h3>
                  </div>
                  <p className="text-slate-800 font-bold text-sm leading-snug italic tracking-tight">
                    "{pair.challenge}"
                  </p>
                </div>

                {/* Green Solution Div */}
                <div style={{ opacity: 0 }} className="solution-box bg-emerald-600 border border-emerald-500 rounded-xl p-4 flex flex-col justify-center relative overflow-hidden flex-1 transition hover:-translate-y-1 hover:shadow-md">
                  <div className="absolute top-0 right-0 p-2 text-5xl opacity-10 pointer-events-none transform rotate-12">
                    {pair.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-2 relative z-10">
                    <div className="bg-white text-emerald-600 w-6 h-6 rounded-full flex items-center justify-center font-black flex-shrink-0 shadow-sm shadow-emerald-900/20">
                      <ShieldPlus size={12} />
                    </div>
                    <h3 className="text-emerald-100 font-black italic uppercase tracking-widest text-[10px]">Our Solution</h3>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-white font-black text-sm italic tracking-tight mb-1">
                      {pair.solutionTitle}
                    </h4>
                    <p className="text-emerald-50 font-medium text-[11px] leading-tight">
                      {pair.solutionDesc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="relative py-24 w-full text-center gsap-section overflow-hidden" style={{ opacity: 0 }}>
        {/* Background Image Setup */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/supportlife.jpg')" }}
        />
        {/* Dark overlay to reduce opacity of the picture so elements stand out */}
        <div className="absolute inset-0 bg-blue-950/85" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-12 drop-shadow-2xl">Our Impact</h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20"
          >
            {[
              { text: 'Reduced Response Times', icon: <Timer size={32} className="text-blue-500" /> },
              { text: 'Increased Survival Rates', icon: <HeartPulse size={32} className="text-red-500" /> },
              { text: 'Medical Accessibility', icon: <Syringe size={32} className="text-emerald-400" /> },
              { text: 'Financial Protection', icon: <ShieldCheck size={32} className="text-cyan-400" /> },
              { text: 'System Strengthening', icon: <Globe size={32} className="text-white" /> }
            ].map((impact, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-4 lg:p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 lg:gap-6 hover:-translate-y-3 transition duration-500 group"
              >
                <div className="bg-slate-900/50 p-4 lg:p-5 rounded-2xl group-hover:scale-110 transition duration-500 shadow-inner">
                  {impact.icon}
                </div>
                <p className="font-black uppercase tracking-widest text-[10px] lg:text-xs italic text-blue-50 text-center drop-shadow-md">{impact.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <div className="bg-white text-slate-900 py-16 px-8 lg:p-20 rounded-[3.5rem] shadow-2xl flex flex-col items-center relative overflow-hidden transition-all duration-1000 ease-out hover:scale-[1.02]">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-6 relative z-10 text-center text-blue-900">Be part of this transformative movement</h2>
            <p className="text-slate-600 font-bold text-lg mb-12 max-w-2xl text-center relative z-10 italic">Partner with us to build national impact and support the Community Emergency Fund.</p>
            <div className="flex flex-col sm:flex-row gap-6 relative z-10">
              <Link to="/about" className="bg-blue-600 hover:bg-blue-500 text-white font-black italic uppercase tracking-widest text-sm py-5 px-10 rounded-full transition duration-300 shadow-xl shadow-blue-600/30 hover:scale-105">
                Partner With Us
              </Link>
              <Link to="/donate" className="bg-slate-900 text-white hover:bg-slate-800 font-black italic uppercase tracking-widest text-sm py-5 px-10 rounded-full transition duration-300 shadow-xl hover:scale-105">
                Donate to Emergency Fund
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
