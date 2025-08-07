"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function LoveWebsite() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [confetti, setConfetti] = useState<Array<{id: number, x: number, y: number, color: string}>>([]);
  const [heartRain, setHeartRain] = useState<Array<{id: number, x: number, delay: number}>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false); // Set to false to skip loading
  const [countdownFinished, setCountdownFinished] = useState(true); // Changed to true to show content immediately
  const [showScrollArrow, setShowScrollArrow] = useState(true);
  
  // Refs for performance
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Parallax transforms
  const parallaxX = useTransform(mouseX, [-300, 300], [-50, 50]);
  const parallaxY = useTransform(mouseY, [-300, 300], [-30, 30]);

  useEffect(() => {
    // Countdown timer - Set to current time + 10 seconds for demo
    const now = new Date();
    const countDownDate = new Date(now.getTime() + 10000).getTime(); // 10 seconds from now

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(timer);
        setCountdown({ days: 0, hours, minutes: 0, seconds: 0 });
        setCountdownFinished(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;
      
      mouseX.set(x * 300);
      mouseY.set(y * 300);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Sparkle effect - Extremely rare
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // Only 20% chance
        const newSparkle = {
          id: Date.now() + Math.random(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        };
        setSparkles(prev => [...prev, newSparkle]);
        
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 4000);
      }
    }, 5000); // Much slower

    return () => clearInterval(interval);
  }, []);

  // Heart rain effect - Extremely minimal
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // Only 30% chance
        const newHeart = {
          id: Date.now() + Math.random(),
          x: Math.random() * window.innerWidth,
          delay: 0
        };
        setHeartRain(prev => [...prev, newHeart]);
        
        setTimeout(() => {
          setHeartRain(prev => prev.filter(h => h.id !== newHeart.id));
        }, 22000); // Match animation duration + buffer
      }
    }, 20000); // Very slow creation

    return () => clearInterval(interval);
  }, []);

  // Konfeti effect - Extremely minimal
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) { // Only 10% chance
        const colors = ['#f472b6', '#ec4899', '#be185d'];
        const newConfetti = {
          id: Date.now() + Math.random(),
          x: Math.random() * window.innerWidth,
          y: -20,
          color: colors[Math.floor(Math.random() * colors.length)]
        };
        setConfetti(prev => [...prev, newConfetti]);
        
        setTimeout(() => {
          setConfetti(prev => prev.filter(c => c.id !== newConfetti.id));
        }, 6000);
      }
    }, 4000); // Much slower

    return () => clearInterval(interval);
  }, []);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Reduced from 2000 to 1000ms

    return () => clearTimeout(timer);
  }, []);

  // Prevent scrolling when countdown is active
  useEffect(() => {
    if (!countdownFinished) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, [countdownFinished]);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-fade-in');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Hide scroll arrow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollArrow(false);
      } else {
        setShowScrollArrow(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Touch effects
  const handleTouch = useCallback((e: React.TouchEvent) => {
    const element = e.currentTarget as HTMLElement;
    element.classList.add('vibrate');
    
    // Create touch ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'touch-ripple';
    element.appendChild(ripple);
    
    setTimeout(() => {
      element.classList.remove('vibrate');
      element.removeChild(ripple);
    }, 300);
  }, []);

  // Swipe gestures
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      console.log('Swipe left');
    }
    if (touchEnd - touchStart > 50) {
      // Swipe right
      console.log('Swipe right');
    }
  };

  // Scroll to content function
  const scrollToContent = () => {
    const contentSection = document.getElementById('main-content');
    if (contentSection) {
      contentSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const photos = [
    { id: 1, src: "/images/photos/foto1.jpg", alt: "İlk Buluşmamız - O Unutulmaz Gün" },
    { id: 2, src: "/images/photos/foto2.jpg", alt: "Deniz Kenarında - Huzurlu Anlar" },
    { id: 3, src: "/images/photos/foto3.jpg", alt: "Gülümseme Dolu Anlar" },
    { id: 4, src: "/images/photos/foto4.jpg", alt: "Sevgi Dolu Bakışlar" },
    { id: 5, src: "/images/photos/foto5.jpg", alt: "Birlikte Geçen Mutlu Zamanlar" },
    { id: 6, src: "/images/photos/foto6.jpg", alt: "Sonsuza Dek Hatırlayacağımız An" },
  ];

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="loading-indicator mb-4"></div>
          <p className="text-pink-300">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`bg-gray-900 text-white relative ${!countdownFinished ? 'h-screen overflow-hidden' : 'min-h-screen overflow-auto'}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Custom Konfeti */}
      {confetti.map(confetti => (
        <div
          key={confetti.id}
          className="confetti-piece"
          style={{
            left: confetti.x,
            top: confetti.y,
            backgroundColor: confetti.color,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}

      {/* Heart Rain */}
      {heartRain.map(heart => (
        <div
          key={heart.id}
          className="heart-rain"
          style={{
            left: heart.x,
            animationDelay: `${heart.delay}s`
          }}
        >
          ❤️
        </div>
      ))}

      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}

      {/* Hero Section: Starry Night & Countdown */}
      <section className="h-screen w-full flex flex-col items-center justify-center text-center starry-night p-4 relative">
        <div className="shooting-star"></div>
        
        {/* Additional shooting stars */}
        <div className="shooting-star" style={{ top: '20%', left: '80%', animationDelay: '1s' }}></div>
        <div className="shooting-star" style={{ top: '60%', left: '20%', animationDelay: '2s' }}></div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 scroll-fade-in"
          style={{
            transform: `translateX(${parallaxX.get()}px) translateY(${parallaxY.get()}px)`
          }}
        >
          <h1 className="font-dancing text-5xl md:text-7xl text-pink-300 mb-4 neon-glow" 
              style={{ 
                textShadow: '0 0 10px rgba(244, 114, 182, 0.8), 0 0 20px rgba(244, 114, 182, 0.6), 2px 2px 4px rgba(0,0,0,0.3)',
                fontWeight: '600'
              }}>
            Canım Sevgilim,
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 gradient-text">
            10. ayımız kutlu olsun!
          </p>
          
          {/* Countdown with 3D effect */}
          <div className="text-2xl md:text-4xl flex justify-center space-x-4 md:space-x-8">
            {[
              { value: countdown.days, label: 'Gün' },
              { value: countdown.hours, label: 'Saat' },
              { value: countdown.minutes, label: 'Dakika' },
              { value: countdown.seconds, label: 'Saniye' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="card-3d glass rounded-lg p-4 touch-friendly"
                whileHover={{ scale: 1.1, rotateY: 10 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onTouchStart={handleTouch}
              >
                <span className="font-bold text-pink-400 heart-beat">{item.value}</span>
                <div className="text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating hearts - Christmas tree lights effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-400"
              style={{
                left: `${15 + i * 18}%`,
                top: `${25 + (i % 2) * 25}%`,
                fontSize: '16px',
                animationDelay: `${i * 0.8}s`,
                filter: 'drop-shadow(0 0 3px #f472b6)'
              }}
            >
              <Heart className="floating" />
            </div>
          ))}
          {/* Additional hearts with different animation */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`extra-${i}`}
              className="absolute text-pink-300"
              style={{
                left: `${25 + i * 35}%`,
                top: `${60 + (i % 2) * 15}%`,
                fontSize: '12px',
                animationDelay: `${i * 1.5 + 1}s`,
                filter: 'drop-shadow(0 0 2px #ec4899)'
              }}
            >
              <Heart className="floating-lights" />
            </div>
          ))}
          {/* Corner sparkle hearts */}
          {[
            { left: '5%', top: '15%' },
            { left: '85%', top: '20%' },
            { left: '10%', top: '75%' },
            { left: '90%', top: '80%' }
          ].map((pos, i) => (
            <div
              key={`corner-${i}`}
              className="absolute text-pink-200"
              style={{
                left: pos.left,
                top: pos.top,
                fontSize: '10px',
                animationDelay: `${i * 2 + 0.5}s`,
                filter: 'drop-shadow(0 0 1px #be185d)'
              }}
            >
              <Heart className="floating-lights" />
            </div>
          ))}
        </div>
      </section>

      {/* Scroll Arrow - Only show when countdown is finished and user hasn't scrolled */}
      {countdownFinished && showScrollArrow && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="scroll-arrow"
          onClick={scrollToContent}
        >
          <ChevronDown />
        </motion.div>
      )}

      {/* Main Content - Only show when countdown is finished */}
      {countdownFinished && (
        <div id="main-content">
          {/* Romantic Note Section */}
          <section className="py-20 px-6 bg-gray-800 relative">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 scroll-fade-in mouse-follow"
                style={{
                  '--mouse-x': `${mousePosition.x}px`,
                  '--mouse-y': `${mousePosition.y}px`
                } as React.CSSProperties}
              >
                <h2 className="font-dancing text-4xl text-pink-300 mb-6 neon-glow"
                    style={{ 
                      textShadow: '0 0 8px rgba(244, 114, 182, 0.8), 0 0 16px rgba(244, 114, 182, 0.6), 1px 1px 3px rgba(0,0,0,0.3)',
                      fontWeight: '600'
                    }}>
                  Bizim Hikayemiz
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Bundan aylar önce başlayan bu masal, hayatıma doğan en parlak güneş, en anlamlı yolculuğum oldu. Seninle tanıştığım o ilk an, sanki evrenin tüm güzel tesadüfleri benim için bir araya gelmiş gibiydi ve o günden beri her şey daha anlamlı, her renk daha canlı. Aramıza giren yüzlerce, binlerce kilometre, özlemin o tatlı sızısını her gün kalbime bıraksa da, seninle kurduğumuz o sarsılmaz bağ, tüm bu fiziksel engelleri anlamsız kılıyor. Varlığın ruhuma o kadar derin işledi ki, kilometrelerce uzakta olsan bile sıcaklığını her an yanımda, kalbimin en derin köşesinde hissediyorum; bu bağ, mesafelere inatla direnen ve her geçen gün daha da güçlenen en büyük mucizem. Aklıma geldikçe yüzümde kocaman bir tebessüm oluşturan o kadar çok özel anımız birikti ki... Saatlerce gezdiğimiz bir günün sonunda, yorgunluğa inat birbirimize sıkıca sarılmamız veya ilk buluşmamızda deniz kenarında sadece dalgaların sesini dinlerken, tüm geleceği gözlerime sığdıran o derin ve huzurlu bakışını asla unutmuyorum. Bu anlar, yalnızca geçmişe ait tatlı hatıralar değil, en zor anlarımda sığındığım bir liman ve geleceğe dair umutlarımı besleyen en büyük güç kaynağım. Şimdi en büyük hayalim ve en içten dileğim, bu mesafeleri tamamen ortadan kaldırmak; her sabaha seninle uyanmak, günün ilk kahvesini birlikte yudumlamak ve hayatın tüm telaşını el ele vererek omuzlamak. Bu masalı, bir ömür boyu sürecek mutlu bir gerçeğe dönüştürmek ve seninle birlikte yaşlanmak için sabırsızlanıyorum yavrum.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Photo Gallery Section */}
          <section className="py-20 px-6">
            <div className="max-w-5xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="font-dancing text-4xl text-pink-300 mb-12 text-center gradient-text scroll-fade-in neon-glow"
                style={{ 
                  textShadow: '0 0 10px rgba(244, 114, 182, 0.9), 0 0 20px rgba(244, 114, 182, 0.7), 0 0 30px rgba(244, 114, 182, 0.5), 1px 1px 3px rgba(0,0,0,0.3)',
                  fontWeight: '600'
                }}
              >
                Anılarımız
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {photos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-lg shadow-lg group magnetic touch-ripple swipe-container bg-gray-800 flex items-center justify-center"
                    onTouchStart={handleTouch}
                    style={{ height: '280px', minHeight: '280px' }}
                  >
                    <div className="relative w-full h-full flex items-center justify-center p-2">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={600}
                        height={400}
                        className="max-w-full max-h-full object-contain rounded-md transform group-hover:scale-102 transition-transform duration-300 optimized-image"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                        <Heart className="w-8 h-8 text-white heart-beat" />
                      </div>
                      {/* Rainbow border on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <div className="rainbow-border h-full w-full rounded-lg"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="py-20 px-6 bg-gray-800 relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 scroll-fade-in"
              >
                <h2 className="font-dancing text-4xl text-pink-300 mb-6 neon-glow"
                    style={{ 
                      textShadow: '0 0 8px rgba(244, 114, 182, 0.8), 0 0 16px rgba(244, 114, 182, 0.6), 1px 1px 3px rgba(0,0,0,0.3)',
                      fontWeight: '600'
                    }}>
                  Mesafeler Engel Değil
                </h2>
                <p className="text-lg text-gray-400 mb-8">
                  Aramızdaki kilometreler sadece birer sayı...
                </p>
                <div className="relative w-full max-w-2xl mx-auto">
                  <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M 150 250 Q 400 100 650 250"
                      stroke="rgba(244, 114, 182, 0.6)"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="10 5"
                      className="animate-pulse"
                    />
                    <circle cx="150" cy="250" r="10" fill="#f472b6" className="heart-beat" />
                    <text
                      x="150"
                      y="280"
                      fontFamily="Montserrat"
                      fontSize="20"
                      fill="#ffffff"
                      textAnchor="middle"
                      style={{
                        filter: 'drop-shadow(0 0 3px rgba(244, 114, 182, 0.5)) drop-shadow(1px 1px 2px rgba(0,0,0,0.3))',
                        fontWeight: '600'
                      }}
                    >
                      Bursa
                    </text>
                    <circle cx="650" cy="250" r="10" fill="#f472b6" className="heart-beat" />
                    <text
                      x="650"
                      y="280"
                      fontFamily="Montserrat"
                      fontSize="20"
                      fill="#ffffff"
                      textAnchor="middle"
                      style={{
                        filter: 'drop-shadow(0 0 3px rgba(244, 114, 182, 0.5)) drop-shadow(1px 1px 2px rgba(0,0,0,0.3))',
                        fontWeight: '600'
                      }}
                    >
                      Samsun
                    </text>
                    {/* Mesafe bilgisi */}
                    <text
                      x="400"
                      y="120"
                      fontFamily="Montserrat"
                      fontSize="16"
                      fill="rgba(244, 114, 182, 0.8)"
                      textAnchor="middle"
                      fontWeight="bold"
                      className="gradient-text"
                    >
                      ~850 km
                    </text>
                    <text
                      x="400"
                      y="140"
                      fontFamily="Montserrat"
                      fontSize="14"
                      fill="rgba(244, 114, 182, 0.6)"
                      textAnchor="middle"
                    >
                      Aşkımızın Mesafesi
                    </text>
                  </svg>
                </div>
                <div className="mt-8 text-center">
                  <p className="text-lg text-gray-300 mb-4">
                    Bursa&apos;dan Samsun&apos;a uzanan bu yol, aşkımızın gücünü gösteriyor
                  </p>
                  <p className="text-gray-400">
                    Mesafeler ne kadar uzun olursa olsun, kalplerimiz hep bir arada atıyor ❤️
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-8 relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="glass rounded-lg p-4 scroll-fade-in"
            >
              <p className="text-gray-500 neon-glow" 
                 style={{ 
                   color: '#d1d5db',
                   textShadow: '0 0 6px rgba(244, 114, 182, 0.6), 0 0 12px rgba(244, 114, 182, 0.4), 1px 1px 2px rgba(0,0,0,0.3)',
                   fontWeight: '500'
                 }}>
                Sonsuz bir aşkla, senin için yapıldı ❤️
              </p>
              <p className="text-gray-600 text-sm mt-1">08.11.2024 - ∞ • ✅ AUTO-DEPLOY ÇALIŞIYOR! 🚀</p>
            </motion.div>
          </footer>
        </div>
      )}
    </div>
  );
}
