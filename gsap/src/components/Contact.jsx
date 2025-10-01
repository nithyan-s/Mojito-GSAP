import { openingHours, socials } from '../../constants/index.js'
import { useGSAP } from '@gsap/react'
import { SplitText} from 'gsap/all';
import gsap from 'gsap';

const Contact = () => {
 	useGSAP(() => {
		const initSplitText = () => {
			const titleSplit = SplitText.create('#contact h2', { type: 'words' });
			
			// Set initial visibility for all cards
			gsap.set('.contact-card', { opacity: 1, y: 0 });
			gsap.set('#contact .content > div:last-child', { opacity: 1, y: 0 });
			
			const timeline = gsap.timeline({
			 scrollTrigger: {
				trigger: '#contact',
				start: 'top center',
			 },
			 ease: "power1.inOut"
			});
		 
		 	timeline
			.from(titleSplit.words, {
			 opacity: 0, yPercent: 100, stagger: 0.02
		 	})
			.from('.contact-card', {
				opacity: 0, 
				y: 50, 
				stagger: 0.1,
				duration: 0.8,
				ease: 'power2.out'
		 	}, '-=0.5')
			.from('#contact .content > div:last-child', {
				opacity: 0, 
				y: 30, 
				duration: 0.6
		 	}, '-=0.3')
			.to('#f-right-leaf', {
			 y: '-50', duration: 1, ease: 'power1.inOut'
		 	}, '-=1')
			.to('#f-left-leaf', {
			 y: '-50', duration: 1, ease: 'power1.inOut'
		 	}, '<');
		};

		// Wait for fonts to load
		if (document.fonts && document.fonts.ready) {
			document.fonts.ready.then(() => {
				initSplitText();
			});
		} else {
			setTimeout(initSplitText, 100);
		}
	});
 
 return (
	<footer id="contact" className="relative" style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
	 <img src="/images/footer-right-leaf.png" alt="leaf-right" id="f-right-leaf" style={{ zIndex: 1, opacity: 0.3 }} />
	 <img src="/images/footer-left-leaf.png" alt="leaf-left" id="f-left-leaf" style={{ zIndex: 1, opacity: 0.3 }} />
	 
	 {/* Enhanced background overlay for better contrast */}
	 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 backdrop-blur-sm z-0"></div>
	 
	 <div className="content relative z-10" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
		<h2 className="text-white drop-shadow-2xl text-shadow-lg mb-8" style={{ position: 'relative', zIndex: 20 }}>Where to Find Us</h2>
		
		<div className="contact-card bg-black/90 backdrop-blur-lg rounded-2xl p-8 border-2 border-yellow/50 shadow-2xl hover:bg-black/95 transition-all duration-300 mb-6" style={{ position: 'relative', zIndex: 15, maxWidth: '600px', margin: '0 auto 1.5rem auto', visibility: 'visible', opacity: 1 }}>
		 <h3 className="text-yellow font-semibold text-xl mb-3">Visit Our Bar</h3>
		 <p className="text-white font-medium text-lg">456, Raq Blvd. #404, Los Angeles, CA 90210</p>
		</div>
		
		<div className="contact-card bg-black/90 backdrop-blur-lg rounded-2xl p-8 border-2 border-yellow/50 shadow-2xl hover:bg-black/95 transition-all duration-300 mb-6" style={{ position: 'relative', zIndex: 15, maxWidth: '600px', margin: '0 auto 1.5rem auto', visibility: 'visible', opacity: 1 }}>
		 <h3 className="text-yellow font-semibold text-xl mb-3">Contact Us</h3>
		 <p className="text-white font-medium text-lg">(91) 701931122X</p>
		 <p className="text-white font-medium text-lg">nitz@mocktailz.com</p>
		</div>
		
		<div className="contact-card bg-black/90 backdrop-blur-lg rounded-2xl p-8 border-2 border-yellow/50 shadow-2xl hover:bg-black/95 transition-all duration-300 mb-6" style={{ position: 'relative', zIndex: 15, maxWidth: '600px', margin: '0 auto 1.5rem auto', visibility: 'visible', opacity: 1 }}>
		 <h3 className="text-yellow font-semibold text-xl mb-4">Open Every Day</h3>
		 {openingHours && openingHours.length > 0 ? (
			openingHours.map((time) => (
				<p key={time.day} className="text-white font-medium mb-2 text-lg">
				 <span className="text-yellow font-semibold">{time.day}</span> : {time.time}
				</p>
			))
		 ) : (
			<>
				<p className="text-white font-medium mb-2 text-lg">
					<span className="text-yellow font-semibold">Mon–Thu</span> : 11:00am – 12am
				</p>
				<p className="text-white font-medium mb-2 text-lg">
					<span className="text-yellow font-semibold">Fri</span> : 11:00am – 2am
				</p>
				<p className="text-white font-medium mb-2 text-lg">
					<span className="text-yellow font-semibold">Sat</span> : 9:00am – 2am
				</p>
				<p className="text-white font-medium mb-2 text-lg">
					<span className="text-yellow font-semibold">Sun</span> : 9:00am – 1am
				</p>
			</>
		 )}
		</div>
		
		<div className="contact-card bg-black/90 backdrop-blur-lg rounded-2xl p-8 border-2 border-yellow/50 shadow-2xl hover:bg-black/95 transition-all duration-300 mb-6" style={{ position: 'relative', zIndex: 15, maxWidth: '600px', margin: '0 auto 1.5rem auto', visibility: 'visible', opacity: 1 }}>
		 <h3 className="text-yellow font-semibold text-xl mb-6">Follow Us</h3>
		 
		 <div className="flex-center gap-6">
			{socials && socials.length > 0 ? (
				socials.map((social) => (
				 <a
				 	key={social.name}
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={social.name}
					className="bg-white/30 hover:bg-yellow/30 p-5 rounded-full transition-all duration-300 hover:scale-110 border border-white/50 shadow-lg hover:shadow-yellow/30"
				 >
					<img src={social.icon} className="w-7 h-7 filter brightness-125" alt={social.name} />
				 </a>
				))
			) : (
				<>
					<a href="#" className="bg-white/30 hover:bg-yellow/30 p-5 rounded-full transition-all duration-300 hover:scale-110 border border-white/50 shadow-lg hover:shadow-yellow/30">
						<img src="/images/insta.png" className="w-7 h-7 filter brightness-125" alt="Instagram" />
					</a>
					<a href="#" className="bg-white/30 hover:bg-yellow/30 p-5 rounded-full transition-all duration-300 hover:scale-110 border border-white/50 shadow-lg hover:shadow-yellow/30">
						<img src="/images/x.png" className="w-7 h-7 filter brightness-125" alt="X" />
					</a>
					<a href="#" className="bg-white/30 hover:bg-yellow/30 p-5 rounded-full transition-all duration-300 hover:scale-110 border border-white/50 shadow-lg hover:shadow-yellow/30">
						<img src="/images/fb.png" className="w-7 h-7 filter brightness-125" alt="Facebook" />
					</a>
				</>
			)}
		 </div>
		</div>
		
		{/* Enhanced footer text */}
		<div className="mt-8 pt-6 border-t border-white/30" style={{ position: 'relative', zIndex: 15, maxWidth: '600px', margin: '2rem auto 0 auto' }}>
			<p className="text-white/80 text-sm font-medium text-center">
				© 2025 Mojito Bar. Crafted with passion, served with love.
			</p>
		</div>
	 </div>
	</footer>
 )
}

export default Contact