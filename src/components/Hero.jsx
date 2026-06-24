import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { associationInfo } from '../data';

const lineVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
};

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-background grid-bg pt-28">
            <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(212,160,23,0.06),transparent_62%)] pointer-events-none" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-accent/20 pointer-events-none" />
            <div className="absolute left-1/2 top-[18%] h-[62%] w-px bg-border/40 pointer-events-none" />

            <div className="container relative z-10 text-center">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.1 } },
                    }}
                    className="max-w-5xl mx-auto"
                >
                    <motion.span
                        variants={lineVariants}
                        className="inline-flex font-mono text-accent text-sm tracking-widest border border-accent/40 px-3 py-1 rounded-sm mb-8"
                    >
                        Current Batch · {associationInfo.currentBatch}
                    </motion.span>

                    <motion.span variants={lineVariants} className="amber-line mx-auto mb-8" />

                    <motion.h1 variants={lineVariants} className="mb-5">
                        <span className="block text-foreground">NCSE</span>
                        <span className="block text-[0.46em] md:text-[0.42em] leading-tight text-foreground mt-2">
                            {associationInfo.fullName}
                        </span>
                        <span className="block text-[0.28em] md:text-[0.24em] leading-relaxed text-foreground-muted font-medium mt-3">
                            {associationInfo.department}
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={lineVariants}
                        className="max-w-2xl mx-auto mb-10 text-xl md:text-2xl text-foreground"
                    >
                        {associationInfo.tagline}
                    </motion.p>

                    <motion.div variants={lineVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/events" className="btn btn-primary accent-glow">
                            Explore Events
                            <ArrowRight size={18} />
                        </Link>
                        <Link to="/board" className="btn btn-secondary">
                            Meet the Board
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={lineVariants}
                        className="mt-10 flex flex-wrap items-center justify-center gap-3 font-mono text-sm text-foreground-muted"
                    >
                        <span><span className="text-accent">{associationInfo.memberCount}</span> Members</span>
                        <span className="text-accent">·</span>
                        <span><span className="text-accent">{associationInfo.eventCount}</span> Events</span>
                        <span className="text-accent">·</span>
                        <span>Founded <span className="text-accent">{associationInfo.founded}</span></span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
