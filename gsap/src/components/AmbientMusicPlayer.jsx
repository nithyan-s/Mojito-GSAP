import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AmbientMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef();
  const playerRef = useRef();
  const vinylRef = useRef();
  const waveformRef = useRef();

  // Jazz tracks (you can replace these with actual jazz track URLs)
  const jazzTracks = [
    {
      title: "Smooth Jazz Lounge",
      artist: "Café Atmosphere",
      // Using a public jazz stream - replace with your preferred tracks
      src: "https://stream.zeno.fm/0r0xa792kwzuv", // Smooth Jazz stream
      duration: "∞"
    }
  ];

  const [currentTrack] = useState(jazzTracks[0]);

  useGSAP(() => {
    // Vinyl rotation animation
    if (isPlaying) {
      gsap.to(vinylRef.current, {
        rotation: 360,
        duration: 3,
        repeat: -1,
        ease: 'none'
      });

      // Waveform animation
      gsap.to('.wave-bar', {
        scaleY: 'random(0.3, 1.5)',
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
        ease: 'power2.inOut'
      });
    } else {
      gsap.to(vinylRef.current, { rotation: 0, duration: 1 });
      gsap.to('.wave-bar', { scaleY: 0.3, duration: 0.5 });
    }
  }, [isPlaying]);

  useGSAP(() => {
    if (isVisible) {
      gsap.fromTo(playerRef.current,
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.to(playerRef.current, {
        x: 300,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }, [isVisible]);

  const togglePlay = () => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Auto-play with user interaction (browsers require user gesture)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.volume = volume;
      }
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, [volume, isPlaying]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleVisibility}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-gradient-to-br from-yellow to-amber-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group"
        style={{ 
          boxShadow: '0 10px 30px rgba(231, 211, 147, 0.4)',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}
        title="Jazz Lounge Music"
      >
        <div className="relative">
          {isPlaying ? (
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-black animate-pulse wave-bar"></div>
              <div className="w-1 h-4 bg-black animate-pulse wave-bar" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-4 bg-black animate-pulse wave-bar" style={{ animationDelay: '0.2s' }}></div>
            </div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" className="fill-black">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
          )}
        </div>
      </button>

      {/* Music Player */}
      {isVisible && (
        <div 
          ref={playerRef}
          className="fixed bottom-24 left-6 z-40 bg-black/90 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-sm shadow-2xl"
          style={{ 
            background: 'linear-gradient(145deg, rgba(0,0,0,0.9) 0%, rgba(30,30,30,0.9) 100%)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                ref={vinylRef}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow to-amber-600 flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
              <div>
                <p className="text-yellow font-semibold text-sm">Jazz Lounge</p>
                <p className="text-white/60 text-xs">Ambient Music</p>
              </div>
            </div>
            <button
              onClick={toggleVisibility}
              className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" className="fill-white/60">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          {/* Track Info */}
          <div className="mb-4">
            <h4 className="text-white font-medium text-sm mb-1">{currentTrack.title}</h4>
            <p className="text-white/60 text-xs">{currentTrack.artist}</p>
          </div>

          {/* Waveform Visualization */}
          <div className="flex items-end justify-center gap-1 h-12 mb-4 bg-black/40 rounded-lg p-2">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="wave-bar w-1 bg-gradient-to-t from-yellow to-amber-300 rounded-full origin-bottom"
                style={{ 
                  height: `${Math.random() * 100 + 20}%`,
                  transform: 'scaleY(0.3)',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-gradient-to-br from-yellow to-amber-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
            >
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" className="fill-black">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" className="fill-black ml-1">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            <div className="flex-1 mx-4">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" className="fill-white/60">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="text-center">
            <p className="text-white/40 text-xs">
              ♪ Creating the perfect cocktail atmosphere ♪
            </p>
          </div>

          {/* Audio Element */}
          <audio
            ref={audioRef}
            src={currentTrack.src}
            loop
            preload="none"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e7d393, #d4af37);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(231, 211, 147, 0.4);
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e7d393, #d4af37);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(231, 211, 147, 0.4);
        }
      `}</style>
    </>
  );
};

export default AmbientMusicPlayer;