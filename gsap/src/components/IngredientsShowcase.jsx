import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const IngredientsShowcase = () => {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef();
  const modalRef = useRef();

  const ingredients = [
    {
      id: 1,
      name: 'Fresh Mint',
      image: '/images/fav.png', // Using existing images
      description: 'Hand-picked fresh mint leaves for that authentic mojito flavor',
      color: '#2c5f2d',
      benefits: ['Digestive aid', 'Natural freshener', 'Antioxidant rich']
    },
    {
      id: 2,
      name: 'Premium Rum',
      image: '/images/drink1.png',
      description: 'Aged white rum with smooth, tropical notes',
      color: '#8b4513',
      benefits: ['Smooth finish', 'Complex flavors', 'Caribbean heritage']
    },
    {
      id: 3,
      name: 'Fresh Lime',
      image: '/images/drink2.png',
      description: 'Freshly squeezed lime juice for that perfect citrus kick',
      color: '#32cd32',
      benefits: ['Vitamin C rich', 'Natural preservative', 'Bright acidity']
    },
    {
      id: 4,
      name: 'Sparkling Water',
      image: '/images/drink3.png',
      description: 'Crisp, carbonated water for the perfect fizz',
      color: '#4a90e2',
      benefits: ['Zero calories', 'Perfect bubbles', 'Refreshing finish']
    }
  ];

  useGSAP(() => {
    if (isVisible) {
      const tl = gsap.timeline();
      
      tl.fromTo(containerRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo('.ingredient-card',
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.3'
      );
    }
  }, [isVisible]);

  useGSAP(() => {
    if (selectedIngredient && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [selectedIngredient]);

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setSelectedIngredient(null)
    });
  };

  const toggleVisibility = () => {
    if (isVisible) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: 100,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => setIsVisible(false)
      });
    } else {
      setIsVisible(true);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleVisibility}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-yellow rounded-full flex items-center justify-center text-black font-bold text-lg shadow-2xl hover:scale-110 transition-transform duration-300"
        style={{ boxShadow: '0 10px 30px rgba(231, 211, 147, 0.4)' }}
      >
        🌿
      </button>

      {/* Ingredients Panel */}
      {isVisible && (
        <div 
          ref={containerRef}
          className="fixed bottom-24 right-6 z-30 bg-black/90 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md"
        >
          <h3 className="text-2xl font-modern-negra text-yellow mb-4 text-center">
            Premium Ingredients
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="ingredient-card bg-white/5 rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-all duration-300 border border-white/10"
                onClick={() => handleIngredientClick(ingredient)}
              >
                <div className="text-center">
                  <div 
                    className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-2xl"
                    style={{ backgroundColor: ingredient.color + '40' }}
                  >
                    {ingredient.name.includes('Mint') ? '🌿' : 
                     ingredient.name.includes('Rum') ? '🥃' :
                     ingredient.name.includes('Lime') ? '🍋' : '💧'}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {ingredient.name}
                  </h4>
                  <p className="text-xs text-white/60 line-clamp-2">
                    {ingredient.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-white/50 text-center mt-4">
            Click on any ingredient to learn more
          </p>
        </div>
      )}

      {/* Modal */}
      {selectedIngredient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-8 max-w-lg w-full border border-white/20 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${selectedIngredient.color}40 0%, transparent 70%)`
              }}
            />

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              ✕
            </button>

            {/* Content */}
            <div className="relative z-10">
              <div className="text-center mb-6">
                <div 
                  className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl"
                  style={{ backgroundColor: selectedIngredient.color + '60' }}
                >
                  {selectedIngredient.name.includes('Mint') ? '🌿' : 
                   selectedIngredient.name.includes('Rum') ? '🥃' :
                   selectedIngredient.name.includes('Lime') ? '🍋' : '💧'}
                </div>
                <h3 className="text-3xl font-modern-negra text-yellow mb-2">
                  {selectedIngredient.name}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {selectedIngredient.description}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
                  Key Benefits
                </h4>
                <ul className="space-y-2">
                  {selectedIngredient.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/80">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: selectedIngredient.color }}
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20 text-center">
                <p className="text-sm text-white/60">
                  Sourced with care for the perfect cocktail experience
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IngredientsShowcase;