import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ShieldPlus, PhoneCall, Building2, Pill, Car, ArrowRight, HeartHandshake, Timer, HeartPulse, Syringe, ShieldCheck, Globe } from 'lucide-react';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      image: '/heroimg1.jpg',
      title: 'Emergency Healthcare Management System',
      subtitle: 'Transforming Emergency Care. Saving Lives.'
    },
    {
      image: '/heroimg2.jpg',
      title: 'Real-Time Ambulance Dispatch & Tracking',
      subtitle: 'Instant deployment using GPS-enabled intelligent routing.'
    },
    {
      image: '/heroimg3.jpg',
      title: 'Seamless Hospital & Pharmacy Integration',
      subtitle: 'Connecting patients to available beds and life-saving medicines.'
    }
  ];

  const buttonsRef = useRef<HTMLDivElement>(null);

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
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero Section ── */}
      <section className="text-white overflow-hidden relative">

        {/* ── MOBILE: full-width background image with overlay ── */}
        <div className="lg:hidden relative min-h-[90vh] flex items-center justify-center">
          {/* Background images */}
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          ))}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/65 to-slate-950/90" />

          {/* Mobile Text + Buttons */}
          <div className="relative z-10 px-6 text-center flex flex-col items-center w-full max-w-2xl mx-auto pt-10 pb-20">
            <div className="relative w-full mb-8 min-h-[220px] flex items-center justify-center">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 ease-out ${
                    index === currentSlide
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                  } flex flex-col items-center justify-center`}
                >
                  <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4 drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl text-blue-100 font-bold drop-shadow-lg">
                    {slide.subtitle}
                  </p>
                </div>
              ))}
            </div>
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <Link to="/emergencies" className="bg-red-600 hover:bg-red-500 text-white font-bold text-base py-4 px-8 rounded-full shadow-2xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 animate-pulse">
                <PhoneCall size={22} /> Emergency Portal
              </Link>
              <div className="flex gap-3 justify-center">
                <Link to="/about" className="bg-white/15 hover:bg-white/25 backdrop-blur border border-white/30 text-white font-bold py-3 px-5 rounded-full transition-all flex items-center gap-2 shadow-lg whitespace-nowrap">
                  Partner <ArrowRight size={16} />
                </Link>
                <Link to="/donate" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-5 rounded-full transition-all flex items-center gap-2 shadow-lg whitespace-nowrap">
                  Support <HeartHandshake size={16} />
                </Link>
              </div>
            </div>
            {/* Slide dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-7 h-2 bg-white' : 'w-2 h-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── DESKTOP: original split layout (text left | image right) ── */}
        <div className="hidden lg:block bg-blue-900 min-h-[75vh] pt-20 pb-16 shadow-2xl mb-16">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <div className="flex flex-row items-center gap-12">

              {/* Left: Text */}
              <div className="w-1/2 text-left z-10 flex flex-col items-start">
                <div className="grid w-full">
                  {heroSlides.map((slide, index) => (
                    <div
                      key={index}
                      className={`col-start-1 row-start-1 transition-all duration-1000 ease-out transform ${
                        index === currentSlide
                          ? 'translate-x-0 opacity-100'
                          : '-translate-x-8 opacity-0 pointer-events-none'
                      }`}
                    >
                      <h1 className="text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="max-w-xl text-2xl text-emerald-300 font-bold mb-8">
                        {slide.subtitle}
                      </p>
                    </div>
                  ))}
                </div>
                <div ref={buttonsRef} className="flex flex-row gap-4 items-center">
                  <Link to="/emergencies" className="bg-red-600 hover:bg-red-500 text-white font-bold text-lg py-4 px-10 rounded-full shadow-lg hover:shadow-red-500/30 transition-all flex items-center gap-2 animate-pulse">
                    <PhoneCall size={24} /> Emergency Portal
                  </Link>
                  <div className="flex gap-4">
                    <Link to="/about" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white font-bold py-3 px-6 rounded-full transition-all flex items-center gap-2 shadow-lg whitespace-nowrap">
                      Partner <ArrowRight size={18} />
                    </Link>
                    <Link to="/donate" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-full transition-all flex items-center gap-2 shadow-lg whitespace-nowrap">
                      Support <HeartHandshake size={18} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right: Slider Image Card */}
              <div className="w-1/2 h-[540px] relative overflow-hidden rounded-3xl shadow-2xl bg-slate-800">
                {heroSlides.map((slide, index) => (
                  <img
                    key={index}
                    src={slide.image}
                    alt="EHMS Hero"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
                      index === currentSlide
                        ? 'translate-x-0 opacity-100 scale-100'
                        : 'translate-x-[100%] opacity-0 scale-95'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* What We Do */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 max-w-7xl mx-auto text-center"
      >
        <h2 className="text-3xl font-extrabold text-slate-800 mb-6">What We Do</h2>
        <p className="text-lg text-slate-600 max-w-4xl mx-auto mb-12">
          EHMS is a fully integrated digital and operational platform that connects critical components of the healthcare system into one seamless network. By synchronizing these elements, we eliminate fragmentation and ensure that emergency care is delivered faster, smarter, and more efficiently.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <PhoneCall size={32} className="text-blue-600" />, title: 'Call Centers' },
            { icon: <Car size={32} className="text-red-600" />, title: 'Ambulances' },
            { icon: <Building2 size={32} className="text-emerald-600" />, title: 'Hospitals' },
            { icon: <Pill size={32} className="text-purple-600" />, title: 'Pharmacies' }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-4 transition duration-300"
            >
              <div className="p-4 bg-slate-50 rounded-full">{item.icon}</div>
              <h3 className="font-bold text-slate-800">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* The Challenge & Solution */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-slate-50 rounded-3xl my-16 px-4 sm:px-12 mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-6">The Challenge</h2>
          <p className="text-slate-600 mb-6">Across Ghana and many African countries, emergency healthcare systems face systemic challenges:</p>
          <ul className="space-y-4">
            {[
              'Delayed emergency response times due to poor dispatch systems',
              'Lack of real-time communication between ambulances and hospitals',
              'Frequent shortages of essential medicines',
              'Financial barriers preventing access to urgent care',
              'Fragmented healthcare infrastructure lacking coordination'
            ].map((text, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                <span className="text-slate-700">{text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-red-600 font-medium">These inefficiencies lead to avoidable deaths and long-term health complications.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-6 flex items-center gap-3">
            <ShieldPlus className="text-blue-600" size={32} /> Our Solution
          </h2>
          <p className="text-slate-600 mb-6">EHMS addresses these challenges through a holistic, technology-enabled approach:</p>
          <ul className="space-y-5">
            {[
              { title: 'Smart Ambulance Dispatch', desc: 'Rapid deployment using GPS and intelligent routing', icon: '🚑' },
              { title: 'Hospital Coordination System', desc: 'Real-time visibility of hospital capacity', icon: '🏥' },
              { title: 'Emergency Medicine Distribution', desc: 'Fast access to life-saving drugs', icon: '💊' },
              { title: '24/7 Emergency Call Center', desc: 'Immediate triage and response coordination', icon: '📞' },
              { title: 'Citizen Access Platform', desc: 'Direct access to emergency services', icon: '📱' },
              { title: 'Healthcare Financing', desc: 'Affordable access through inclusive financial systems', icon: '💳' }
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-slate-800">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Our Impact */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="py-16 max-w-7xl mx-auto px-4 text-center"
      >
        <h2 className="text-3xl font-extrabold text-slate-800 mb-10">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { text: 'Significantly reduced emergency response times', icon: <Timer size={40} className="text-blue-600 mb-4" /> },
            { text: 'Increased survival rates during critical conditions', icon: <HeartPulse size={40} className="text-red-500 mb-4" /> },
            { text: 'Improved access to medicines and healthcare services', icon: <Syringe size={40} className="text-purple-600 mb-4" /> },
            { text: 'Financial protection for individuals and families', icon: <ShieldCheck size={40} className="text-emerald-600 mb-4" /> },
            { text: 'Strengthened national healthcare systems', icon: <Globe size={40} className="text-indigo-600 mb-4" /> }
          ].map((impact, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex flex-col items-center"
            >
              {impact.icon}
              <p className="font-semibold text-slate-800 text-center">{impact.text}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-slate-900 text-white p-12 rounded-3xl shadow-xl flex flex-col items-center"
        >
          <h2 className="text-3xl font-extrabold mb-4">Be part of a transformative movement</h2>
          <p className="text-slate-400 mb-8 max-w-2xl">Partner with us to build national impact and support the Community Emergency Fund.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/about" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition duration-300">
              Partner With Us
            </Link>
            <Link to="/donate" className="bg-white text-slate-900 hover:bg-slate-100 font-bold py-4 px-8 rounded-xl transition duration-300">
              Donate to Emergency Fund
            </Link>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
