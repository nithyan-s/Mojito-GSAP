import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const ScrollProgress = () => {
  const progressRef = useRef();
  const circleRef = useRef();

  useGSAP(() => {
    const progressBar = progressRef.current;
    const circle = circleRef.current;

    if (!progressBar || !circle) return;

    // Define updateActiveSection function first
    const updateActiveSection = (index) => {
      const sections = ['hero', 'cocktails', 'about', 'art', 'menu', 'contact'];
      const percentage = ((index + 1) / sections.length) * 100;
      gsap.to(circle, {
        background: `conic-gradient(#e7d393 ${percentage}%, rgba(255,255,255,0.2) ${percentage}%)`,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    // Main scroll progress animation
    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    });

    // Circular progress indicator
    gsap.to(circle, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    });

    // Show/hide based on scroll position
    ScrollTrigger.create({
      start: 'top -80',
      end: 'max',
      onUpdate: (self) => {
        if (self.progress > 0.05) {
          gsap.to([progressBar, circle], {
            opacity: 1,
            duration: 0.3
          });
        } else {
          gsap.to([progressBar, circle], {
            opacity: 0,
            duration: 0.3
          });
        }
      }
    });

    // Add section tracking
    const sections = ['hero', 'cocktails', 'about', 'art', 'menu', 'contact'];
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => updateActiveSection(index),
        onEnterBack: () => updateActiveSection(index),
      });
    });

  }, []);

  const scrollToTop = () => {
    // Simple fallback if ScrollTo plugin isn't available
    if (gsap.plugins?.ScrollToPlugin) {
      gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 1.5,
        ease: 'power3.inOut'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Linear Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-white/10">
        <div 
          ref={progressRef}
          className="h-full bg-gradient-to-r from-yellow to-white origin-left scale-x-0"
          style={{
            background: 'linear-gradient(90deg, #e7d393 0%, #ffffff 100%)',
            boxShadow: '0 0 10px rgba(231, 211, 147, 0.8)'
          }}
        />
      </div>

      {/* Circular Progress Indicator */}
      <div className="fixed bottom-8 left-8 z-40">
        <div className="relative w-16 h-16">
          {/* Background Circle */}
          <div className="absolute inset-0 rounded-full bg-black/80 backdrop-blur-sm border border-white/20" />
          
          {/* Progress Circle */}
          <div 
            ref={circleRef}
            className="absolute inset-1 rounded-full opacity-0"
            style={{
              background: 'conic-gradient(#e7d393 0%, rgba(255,255,255,0.2) 0%)',
              transition: 'background 0.5s ease'
            }}
          />
          
          {/* Click to scroll to top */}
          <button
            onClick={scrollToTop}
            className="absolute inset-2 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors group"
            title="Scroll to top"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-yellow group-hover:scale-110 transition-transform"
            >
              <path 
                d="M12 19V5M5 12L12 5L19 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ScrollProgress;