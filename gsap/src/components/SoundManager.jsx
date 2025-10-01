import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const SoundManager = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const soundRef = useRef();

  // Create audio context for Web Audio API
  const audioContext = useRef();
  const gainNode = useRef();

  useGSAP(() => {
    // Initialize audio context
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      gainNode.current = audioContext.current.createGain();
      gainNode.current.connect(audioContext.current.destination);
      gainNode.current.gain.value = 0.3;
    }

    // Sound effect functions
    const playClickSound = () => {
      if (isMuted) return;
      
      const oscillator = audioContext.current.createOscillator();
      const envelope = audioContext.current.createGain();
      
      oscillator.connect(envelope);
      envelope.connect(gainNode.current);
      
      oscillator.frequency.setValueAtTime(800, audioContext.current.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.current.currentTime + 0.1);
      
      envelope.gain.setValueAtTime(0, audioContext.current.currentTime);
      envelope.gain.linearRampToValueAtTime(0.2, audioContext.current.currentTime + 0.01);
      envelope.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.1);
      
      oscillator.start(audioContext.current.currentTime);
      oscillator.stop(audioContext.current.currentTime + 0.1);
    };

    const playHoverSound = () => {
      if (isMuted) return;
      
      const oscillator = audioContext.current.createOscillator();
      const envelope = audioContext.current.createGain();
      
      oscillator.connect(envelope);
      envelope.connect(gainNode.current);
      
      oscillator.frequency.setValueAtTime(1200, audioContext.current.currentTime);
      oscillator.type = 'sine';
      
      envelope.gain.setValueAtTime(0, audioContext.current.currentTime);
      envelope.gain.linearRampToValueAtTime(0.1, audioContext.current.currentTime + 0.05);
      envelope.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.2);
      
      oscillator.start(audioContext.current.currentTime);
      oscillator.stop(audioContext.current.currentTime + 0.2);
    };

    const playBubbleSound = () => {
      if (isMuted) return;
      
      const oscillator = audioContext.current.createOscillator();
      const envelope = audioContext.current.createGain();
      
      oscillator.connect(envelope);
      envelope.connect(gainNode.current);
      
      oscillator.frequency.setValueAtTime(600 + Math.random() * 400, audioContext.current.currentTime);
      oscillator.type = 'sine';
      
      envelope.gain.setValueAtTime(0, audioContext.current.currentTime);
      envelope.gain.linearRampToValueAtTime(0.05, audioContext.current.currentTime + 0.01);
      envelope.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.3);
      
      oscillator.start(audioContext.current.currentTime);
      oscillator.stop(audioContext.current.currentTime + 0.3);
    };

    // Add event listeners
    const buttons = document.querySelectorAll('button, a');
    buttons.forEach(button => {
      button.addEventListener('click', playClickSound);
      button.addEventListener('mouseenter', playHoverSound);
    });

    // Random bubble sounds
    const bubbleInterval = setInterval(() => {
      if (!isMuted && Math.random() < 0.1) {
        playBubbleSound();
      }
    }, 3000);

    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', playClickSound);
        button.removeEventListener('mouseenter', playHoverSound);
      });
      clearInterval(bubbleInterval);
    };
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    // Animate the sound button
    gsap.fromTo(soundRef.current,
      { scale: 1, rotation: 0 },
      { 
        scale: 1.2, 
        rotation: 360,
        duration: 0.4, 
        ease: 'back.out(1.7)',
        onComplete: () => {
          gsap.to(soundRef.current, { scale: 1, duration: 0.2 });
        }
      }
    );
  };

  return (
    <div className="fixed top-6 left-6 z-50">
      <button
        ref={soundRef}
        onClick={toggleMute}
        className={`
          w-12 h-12 rounded-full flex items-center justify-center
          bg-black/80 backdrop-blur-sm border border-white/20
          hover:bg-white/10 transition-all duration-300
          ${isMuted ? 'text-red-400' : 'text-yellow'}
        `}
        title={isMuted ? 'Unmute Sounds' : 'Mute Sounds'}
      >
        {isMuted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default SoundManager;