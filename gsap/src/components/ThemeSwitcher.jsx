import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('mojito');
  const switcherRef = useRef();

  const themes = {
    mojito: {
      name: 'Mojito',
      primary: '#e7d393',
      accent: '#2c5f2d',
      background: '#000000',
      icon: '🍃'
    },
    sunset: {
      name: 'Sunset',
      primary: '#ff6b35',
      accent: '#f7931e',
      background: '#1a0e0a',
      icon: '🌅'
    },
    ocean: {
      name: 'Ocean',
      primary: '#4a90e2',
      accent: '#7bb3f0',
      background: '#0a1929',
      icon: '🌊'
    },
    lavender: {
      name: 'Lavender',
      primary: '#9b59b6',
      accent: '#e74c3c',
      background: '#2c1810',
      icon: '🌸'
    }
  };

  useGSAP(() => {
    const updateTheme = (theme) => {
      const root = document.documentElement;
      
      // Animate theme transition
      gsap.to('body', {
        backgroundColor: theme.background,
        duration: 0.8,
        ease: 'power2.inOut'
      });

      // Update CSS variables
      root.style.setProperty('--color-yellow', theme.primary);
      root.style.setProperty('--color-accent', theme.accent);
      
      // Update elements with theme colors
      gsap.to('.text-yellow, .hover\\:text-yellow:hover, .border-yellow', {
        color: theme.primary,
        borderColor: theme.primary,
        duration: 0.6,
        ease: 'power2.inOut'
      });

      // Animate switcher
      gsap.fromTo(switcherRef.current, 
        { scale: 0.8, rotation: -10 },
        { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    };

    updateTheme(themes[currentTheme]);
  }, [currentTheme]);

  const handleThemeChange = (themeKey) => {
    if (themeKey !== currentTheme) {
      setCurrentTheme(themeKey);
      
      // Add a subtle pulse animation
      gsap.fromTo(switcherRef.current,
        { scale: 1 },
        { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }
      );
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div 
        ref={switcherRef}
        className="bg-black/80 backdrop-blur-sm rounded-2xl p-3 border border-white/20"
      >
        <div className="flex flex-col gap-2">
          <span className="text-xs text-white/60 text-center mb-1">Theme</span>
          <div className="flex gap-2">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key)}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm
                  transition-all duration-300 hover:scale-110
                  ${currentTheme === key 
                    ? 'ring-2 ring-white/60 scale-110' 
                    : 'hover:ring-1 hover:ring-white/30'
                  }
                `}
                style={{ 
                  backgroundColor: theme.primary,
                  boxShadow: currentTheme === key ? `0 0 20px ${theme.primary}40` : 'none'
                }}
                title={theme.name}
              >
                {theme.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;