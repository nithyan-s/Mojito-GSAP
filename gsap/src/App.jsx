import React, { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cocktails from "./components/Cocktails";
import About from "./components/About";
import Art from "./components/Art";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import ParticleSystem from "./components/ParticleSystem";
import CustomCursor from "./components/CustomCursor";
import SoundManager from "./components/SoundManager";
import LoadingScreen from "./components/LoadingScreen";
import IngredientsShowcase from "./components/IngredientsShowcase";
import ScrollProgress from "./components/ScrollProgress";
import ErrorBoundary from "./components/ErrorBoundary";
import AmbientSoundscape from "./components/AmbientSoundscape";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
            
            {!isLoading && (
                <>
                    <ErrorBoundary>
                        <CustomCursor />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <ParticleSystem />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <SoundManager />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <IngredientsShowcase />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <ScrollProgress />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <AmbientSoundscape />
                    </ErrorBoundary>
                    
                    <main>
                        <Navbar />
                        <Hero />
                        <Cocktails />
                        <About />
                        <Art />
                        <Menu />
                        <Contact />
                    </main>
                </>
            )}
        </>
    );
};

export default App;