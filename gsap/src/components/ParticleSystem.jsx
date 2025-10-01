import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ParticleSystem = () => {
  const containerRef = useRef();
  const particlesRef = useRef([]);

  useGSAP(() => {
    // Create particles
    const particleCount = 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: fixed;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: radial-gradient(circle, rgba(231, 211, 147, 0.8) 0%, rgba(231, 211, 147, 0.2) 70%, transparent 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        will-change: transform;
      `;
      
      containerRef.current.appendChild(particle);
      particles.push(particle);
    }

    particlesRef.current = particles;

    // Animate particles
    particles.forEach((particle, index) => {
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random() * 0.7 + 0.3,
      });

      // Floating animation
      gsap.to(particle, {
        y: '-=100',
        x: `+=${Math.random() * 100 - 50}`,
        duration: Math.random() * 8 + 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2,
      });

      // Opacity animation
      gsap.to(particle, {
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2,
      });

      // Rotation animation
      gsap.to(particle, {
        rotation: 360,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        ease: 'none',
      });
    });

    // Mouse interaction
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      particles.forEach((particle, index) => {
        const distance = Math.sqrt(
          Math.pow(clientX - parseFloat(particle.style.left || 0), 2) +
          Math.pow(clientY - parseFloat(particle.style.top || 0), 2)
        );

        if (distance < 150) {
          gsap.to(particle, {
            x: clientX + (Math.random() - 0.5) * 100,
            y: clientY + (Math.random() - 0.5) * 100,
            scale: 1.5,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default ParticleSystem;