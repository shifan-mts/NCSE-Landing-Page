import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-radial-at-tl bg-gradient-radial-at-br">
            {/* Background decoration */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[100px] z-0" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[100px] z-0" />

            <div className="container relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-semibold text-sm mb-6">
                        Welcome to NCSE
                    </span>
                    <h1 className="mb-6">
                        <span className="gradient-text">Association Name</span><br />
                        <span className="text-[0.8em] text-slate-100">College Name</span>
                    </h1>
                    <p className="max-w-2xl mx-auto mb-10 text-xl md:text-2xl">
                        "Innovating for a tech-driven tomorrow, one student at a time."
                    </p>

                    <div className="flex flex-wrap gap-6 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary"
                        >
                            Explore Events
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-secondary"
                        >
                            Learn More
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            <style>{`
        .bg-gradient-radial-at-tl {
          background-image: radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.05) 0px, transparent 50%);
        }
        .bg-gradient-radial-at-br {
          background-image: radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.05) 0px, transparent 50%);
        }
      `}</style>
        </section>
    );
};

export default Hero;
