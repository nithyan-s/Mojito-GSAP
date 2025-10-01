import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef();
  const logoRef = useRef();
  const liquidRef = useRef();
  const percentageRef = useRef();
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(logoRef.current, { opacity: 0, y: 50 });
    gsap.set(liquidRef.current, { scaleY: 0, transformOrigin: 'bottom' });

    // Animate logo entrance
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, []);

  useGSAP(() => {
    // Update liquid fill animation
    gsap.to(liquidRef.current, {
      scaleY: progress / 100,
      duration: 0.5,
      ease: 'power2.out'
    });

    // Update percentage text
    gsap.to(percentageRef.current, {
      textContent: Math.round(progress),
      duration: 0.3,
      ease: 'power2.out',
      snap: { textContent: 1 }
    });

    // Complete loading
    if (progress >= 100) {
      setTimeout(() => {
        const exitTl = gsap.timeline({
          onComplete: () => onComplete && onComplete()
        });

        exitTl
          .to(liquidRef.current, {
            scaleY: 1.2,
            duration: 0.3,
            ease: 'power2.out'
          })
          .to([logoRef.current, percentageRef.current], {
            opacity: 0,
            y: -30,
            duration: 0.5,
            ease: 'power3.in'
          }, '-=0.2')
          .to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power3.inOut'
          }, '-=0.3')
          .set(containerRef.current, { display: 'none' });
      }, 500);
    }
  }, [progress, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div ref={logoRef} className="mb-16 text-center">
        <h1 className="text-6xl md:text-8xl font-modern-negra text-gradient mb-4">
          MOJITO
        </h1>
        <p className="text-xl text-white/60">Crafting Liquid Poetry</p>
      </div>

      {/* Liquid Loading Animation */}
      <div className="relative w-32 h-48 mx-auto mb-8">
        {/* Glass Container */}
        <div className="absolute inset-0 border-2 border-white/30 rounded-b-full rounded-t-lg bg-transparent">
          {/* Liquid Fill */}
          <div 
            ref={liquidRef}
            className="absolute bottom-0 left-0 right-0 rounded-b-full"
            style={{
              background: 'linear-gradient(180deg, #e7d393 0%, #a67c00 100%)',
              height: '100%'
            }}
          />
          
          {/* Bubbles */}
          <div className="absolute inset-0 overflow-hidden rounded-b-full rounded-t-lg">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full animate-bounce"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  bottom: `${10 + Math.random() * 70}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Highlight */}
          <div className="absolute top-4 left-4 w-6 h-12 bg-white/20 rounded-full blur-sm" />
        </div>
      </div>

      {/* Progress Percentage */}
      <div className="text-center">
        <div className="text-4xl font-bold text-yellow mb-2">
          <span ref={percentageRef}>0</span>%
        </div>
        <div className="text-sm text-white/50">Loading Experience...</div>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-white/20 rounded-full mt-8 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-yellow to-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;