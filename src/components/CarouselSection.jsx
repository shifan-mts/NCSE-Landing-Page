import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselSection = ({ title, subtitle, images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <section>
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="gradient-text">{title}</h2>
                    {subtitle && <p>{subtitle}</p>}
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <div className="relative h-[300px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 w-full h-full"
                                style={{
                                    backgroundImage: `url(${images[currentIndex]})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                        </AnimatePresence>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-8">
                            <p className="text-white font-medium">Moment #{currentIndex + 1}</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <button
                        onClick={prev}
                        className="absolute top-1/2 -translate-y-1/2 left-[-20px] w-12 h-12 rounded-full glass text-white flex items-center justify-center cursor-pointer transition-all hover:bg-primary hover:border-primary hover:scale-110 z-10 hidden md:flex"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={next}
                        className="absolute top-1/2 -translate-y-1/2 right-[-20px] w-12 h-12 rounded-full glass text-white flex items-center justify-center cursor-pointer transition-all hover:bg-primary hover:border-primary hover:scale-110 z-10 hidden md:flex"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full border-none cursor-pointer transition-colors ${currentIndex === index ? 'bg-primary' : 'bg-white/20'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CarouselSection;
