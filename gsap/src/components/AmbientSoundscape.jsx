import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AmbientSoundscape = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioContextRef = useRef();
  const oscillatorsRef = useRef([]);
  const gainNodeRef = useRef();
  const [soundscape, setSoundscape] = useState('jazz');

  const soundscapes = {
    jazz: {
      name: 'Smooth Jazz',
      icon: '🎷',
      description: 'Warm, mellow tones',
      color: '#8B4513'
    },
    lounge: {
      name: 'Cocktail Lounge',
      icon: '🍸',
      description: 'Ambient atmosphere',
      color: '#2F4F4F'
    },
    rain: {
      name: 'Rain Ambience',
      icon: '🌧️',
      description: 'Gentle rainfall',
      color: '#4682B4'
    }
  };

  useEffect(() => {
    // Initialize Web Audio Context
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    gainNodeRef.current = audioContextRef.current.createGain();
    gainNodeRef.current.connect(audioContextRef.current.destination);
    gainNodeRef.current.gain.value = volume;

    return () => {
      stopAllSounds();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
    }
  }, [volume]);

  const createJazzAmbience = () => {
    const context = audioContextRef.current;
    const gainNode = gainNodeRef.current;

    // Create multiple oscillators for rich harmony
    const frequencies = [65, 98, 147, 220, 330]; // Jazz-like chord progression
    
    frequencies.forEach((freq, index) => {
      const oscillator = context.createOscillator();
      const oscGain = context.createGain();
      const filter = context.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(gainNode);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, context.currentTime);
      
      // Add subtle frequency modulation for organic feel
      const lfo = context.createOscillator();
      const lfoGain = context.createGain();
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      lfo.frequency.value = 0.1 + Math.random() * 0.3;
      lfoGain.gain.value = 2;
      lfo.type = 'sine';

      // Set filter for warmth
      filter.type = 'lowpass';
      filter.frequency.value = 800 + index * 200;
      filter.Q.value = 0.5;

      // Set individual volumes
      oscGain.gain.setValueAtTime(0.1 / frequencies.length, context.currentTime);

      oscillator.start();
      lfo.start();
      oscillatorsRef.current.push({ oscillator, lfo, gain: oscGain });
    });
  };

  const createLoungeAmbience = () => {
    const context = audioContextRef.current;
    const gainNode = gainNodeRef.current;

    // Create soft pad sounds
    const frequencies = [110, 165, 220, 275];
    
    frequencies.forEach((freq, index) => {
      const oscillator = context.createOscillator();
      const oscGain = context.createGain();
      
      oscillator.connect(oscGain);
      oscGain.connect(gainNode);
      
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(freq, context.currentTime);
      
      oscGain.gain.setValueAtTime(0.05, context.currentTime);
      
      oscillator.start();
      oscillatorsRef.current.push({ oscillator, gain: oscGain });
    });
  };

  const createRainAmbience = () => {
    const context = audioContextRef.current;
    const gainNode = gainNodeRef.current;

    // Create rain-like noise
    const bufferSize = context.sampleRate * 2;
    const noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = context.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 3000;

    const noiseGain = context.createGain();
    noiseGain.gain.value = 0.1;

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(gainNode);

    whiteNoise.start();
    oscillatorsRef.current.push({ oscillator: whiteNoise, gain: noiseGain });
  };

  const stopAllSounds = () => {
    oscillatorsRef.current.forEach(({ oscillator, lfo }) => {
      try {
        oscillator.stop();
        if (lfo) lfo.stop();
      } catch (e) {
        // Oscillator already stopped
      }
    });
    oscillatorsRef.current = [];
  };

  const togglePlay = async () => {
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    if (isPlaying) {
      stopAllSounds();
    } else {
      switch (soundscape) {
        case 'jazz':
          createJazzAmbience();
          break;
        case 'lounge':
          createLoungeAmbience();
          break;
        case 'rain':
          createRainAmbience();
          break;
      }
    }
    setIsPlaying(!isPlaying);
  };

  const changeSoundscape = (newSoundscape) => {
    if (isPlaying) {
      stopAllSounds();
      setSoundscape(newSoundscape);
      // Small delay to restart with new soundscape
      setTimeout(() => {
        switch (newSoundscape) {
          case 'jazz':
            createJazzAmbience();
            break;
          case 'lounge':
            createLoungeAmbience();
            break;
          case 'rain':
            createRainAmbience();
            break;
        }
      }, 100);
    } else {
      setSoundscape(newSoundscape);
    }
  };

  return (
    <div className="fixed bottom-8 left-24 z-40">
      {/* Collapsed Button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-14 h-14 bg-black/90 backdrop-blur-lg rounded-full border border-yellow/50 flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow/20"
        >
          <div className="text-center">
            <div className="text-xl">{soundscapes[soundscape].icon}</div>
            {isPlaying && (
              <div className="w-2 h-2 bg-yellow rounded-full mx-auto mt-1 animate-pulse"></div>
            )}
          </div>
        </button>
      )}

      {/* Expanded Panel */}
      {isExpanded && (
        <div className="bg-black/90 backdrop-blur-lg rounded-2xl p-4 border border-white/20 min-w-64 animate-fade-in">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{soundscapes[soundscape].icon}</span>
              <div>
                <h4 className="text-yellow font-semibold text-sm">{soundscapes[soundscape].name}</h4>
                <p className="text-white/60 text-xs">{soundscapes[soundscape].description}</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" className="fill-white/60">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          {/* Soundscape Selection */}
          <div className="flex gap-2 mb-4">
            {Object.entries(soundscapes).map(([key, config]) => (
              <button
                key={key}
                onClick={() => changeSoundscape(key)}
                className={`flex-1 p-2 rounded-lg text-xs transition-all ${
                  soundscape === key 
                    ? 'bg-yellow text-black' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <div>{config.icon}</div>
                <div className="text-xs mt-1">{config.name.split(' ')[0]}</div>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-10 h-10 bg-gradient-to-br from-yellow to-amber-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <svg width="12" height="12" viewBox="0 0 24 24" className="fill-black">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" className="fill-black ml-0.5">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" className="fill-white/60">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                </svg>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {isPlaying && (
            <div className="mt-3 text-center">
              <p className="text-white/40 text-xs">♪ Ambient soundscape active ♪</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AmbientSoundscape;