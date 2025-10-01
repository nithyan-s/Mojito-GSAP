import gsap from 'gsap';
import { SplitText} from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react';

const About = () => {
 const gridItemsRef = useRef([]);

 useGSAP(() => {
	// Ensure images are visible first
	gsap.set('.top-grid img, .bottom-grid img', { 
		opacity: 1, 
		visibility: 'visible',
		display: 'block'
	});

	const initSplitText = () => {
		const titleSplit = SplitText.create('#about h2', {
		 type: 'words'
		});
		
		// Ensure grid items are visible initially
		gsap.set('.top-grid div, .bottom-grid div', { opacity: 1 });
		
		const scrollTimeline = gsap.timeline({
		 scrollTrigger: {
			trigger: '#about',
			start: 'top center'
		 }
		});
		
		scrollTimeline
		 .from(titleSplit.words, {
			opacity: 0, duration: 1, yPercent: 100, ease: 'expo.out', stagger: 0.02
		})
		 .from('.top-grid div, .bottom-grid div', {
			opacity: 0, 
			y: 30,
			duration: 1, 
			ease: 'power1.inOut', 
			stagger: 0.04,
		}, '-=0.5');
	};

	// Wait for fonts to load
	if (document.fonts && document.fonts.ready) {
		document.fonts.ready.then(() => {
			initSplitText();
		});
	} else {
		setTimeout(initSplitText, 100);
	}

	// Add interactive hover effects to grid items
	gridItemsRef.current.forEach((item, index) => {
		if (!item) return;
		
		const img = item.querySelector('img');
		const overlay = item.querySelector('.noisy');
		
		// Ensure image is visible
		if (img) {
			gsap.set(img, { opacity: 1, visibility: 'visible' });
		}
		
		const handleMouseEnter = () => {
			if (img) {
				gsap.to(img, {
					scale: 1.1,
					duration: 0.6,
					ease: 'power2.out'
				});
			}
			if (overlay) {
				gsap.to(overlay, {
					opacity: 0.3,
					duration: 0.4
				});
			}
			gsap.to(item, {
				y: -5,
				duration: 0.4,
				ease: 'power2.out'
			});
		};

		const handleMouseLeave = () => {
			if (img) {
				gsap.to(img, {
					scale: 1,
					duration: 0.6,
					ease: 'power2.out'
				});
			}
			if (overlay) {
				gsap.to(overlay, {
					opacity: 1,
					duration: 0.4
				});
			}
			gsap.to(item, {
				y: 0,
				duration: 0.4,
				ease: 'power2.out'
			});
		};

		item.addEventListener('mouseenter', handleMouseEnter);
		item.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			item.removeEventListener('mouseenter', handleMouseEnter);
			item.removeEventListener('mouseleave', handleMouseLeave);
		};
	});
 }, []);
 
 return (
	<div id="about">
	 <div className="mb-16 md:px-0 px-5">
		<div className="content">
		 <div className="md:col-span-8">
			<p className="badge">Best Cocktails</p>
			<h2>
			 Where every detail matters <span className="text-white">-</span>
				from muddle to garnish
			</h2>
		 </div>
		 
		 <div className="sub-content">
			<p>
			 Every cocktail we serve is a reflection of our obsession with detail — from the first muddle to the final garnish. That care is what turns a simple drink into something truly memorable.
			</p>
			
			<div>
			 <p className="md:text-3xl text-xl font-bold">
				<span>4.5</span>/5
			 </p>
			 <p className="text-sm text-white-100">
				More than +12000 customers
			 </p>
			</div>
		 </div>
		</div>
	 </div>
	 
 	 <div className="top-grid">
		<div 
			className="md:col-span-3 cursor-pointer transform transition-all duration-300"
			ref={el => gridItemsRef.current[0] = el}
		>
		 <div className="noisy" />
		 <img 
		 	src="/images/abt1.png" 
		 	alt="grid-img-1" 
		 	loading="lazy"
		 	onError={(e) => {
		 		console.error('Failed to load image:', e.target.src);
		 		e.target.style.backgroundColor = '#333';
		 		e.target.style.border = '1px solid #555';
		 	}}
		 />
		</div>
		
		<div 
			className="md:col-span-6 cursor-pointer transform transition-all duration-300"
			ref={el => gridItemsRef.current[1] = el}
		>
		 <div className="noisy" />
		 <img 
		 	src="/images/abt2.png" 
		 	alt="grid-img-2" 
		 	loading="lazy"
		 	onError={(e) => {
		 		console.error('Failed to load image:', e.target.src);
		 		e.target.style.backgroundColor = '#333';
		 		e.target.style.border = '1px solid #555';
		 	}}
		 />
		</div>
		
		<div 
			className="md:col-span-3 cursor-pointer transform transition-all duration-300"
			ref={el => gridItemsRef.current[2] = el}
		>
		 <div className="noisy" />
		 <img 
		 	src="/images/abt5.png" 
		 	alt="grid-img-5" 
		 	loading="lazy"
		 	onError={(e) => {
		 		console.error('Failed to load image:', e.target.src);
		 		e.target.style.backgroundColor = '#333';
		 		e.target.style.border = '1px solid #555';
		 	}}
		 />
		</div>
	 </div>
	 
	 <div className="bottom-grid">
		<div 
			className="md:col-span-8 cursor-pointer transform transition-all duration-300"
			ref={el => gridItemsRef.current[3] = el}
		>
		 <div className="noisy" />
		 <img 
		 	src="/images/abt3.png" 
		 	alt="grid-img-3" 
		 	loading="lazy"
		 	onError={(e) => {
		 		console.error('Failed to load image:', e.target.src);
		 		e.target.style.backgroundColor = '#333';
		 		e.target.style.border = '1px solid #555';
		 	}}
		 />
		</div>
		
		<div 
			className="md:col-span-4 cursor-pointer transform transition-all duration-300"
			ref={el => gridItemsRef.current[4] = el}
		>
		 <div className="noisy" />
		 <img 
		 	src="/images/abt4.png" 
		 	alt="grid-img-4" 
		 	loading="lazy"
		 	onError={(e) => {
		 		console.error('Failed to load image:', e.target.src);
		 		e.target.style.backgroundColor = '#333';
		 		e.target.style.border = '1px solid #555';
		 	}}
		 />
		</div>
	 </div>	</div>
 )
}
export default About