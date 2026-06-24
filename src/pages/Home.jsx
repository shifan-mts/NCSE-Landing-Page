import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, BookOpen, Mic2, Users, Zap } from 'lucide-react';
import Hero from '../components/Hero';
import CarouselSection from '../components/CarouselSection';
import { associationInfo, events, inauguralImages, pastEventImages } from '../data';

const statItems = [
    { label: 'Members', value: 200, suffix: '+' },
    { label: 'Events Conducted', value: 12, suffix: '+' },
    { label: 'Batches Active', value: "5+", suffix: '' },
    { label: 'Current Batch', value: 2025, suffix: '' },
];

const features = [
    {
        title: 'Hackathons & Competitions',
        description: 'Timed build challenges that turn classroom theory into working prototypes.',
        icon: Zap,
    },
    {
        title: 'Technical Workshops',
        description: 'Focused sessions on systems, software, tools, and practical engineering habits.',
        icon: BookOpen,
    },
    {
        title: 'Peer Mentorship',
        description: 'Students helping students through project reviews, guidance, and shared practice.',
        icon: Users,
    },
    {
        title: 'Industry Talks & Summits',
        description: 'Conversations with builders, faculty, alumni, and practitioners from the field.',
        icon: Mic2,
    },
];

const CountUpNumber = ({ value, suffix, active }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) return;

        const duration = 1300;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const counter = setInterval(() => {
            frame += 1;
            const progress = frame / totalFrames;
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(value * easedProgress));

            if (frame === totalFrames) {
                clearInterval(counter);
                setCount(value);
            }
        }, frameDuration);

        return () => clearInterval(counter);
    }, [active, value]);

    return <span>{count}{suffix}</span>;
};

const StatsStrip = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

    return (
        <section ref={ref} className="py-0 bg-surface border-y border-border">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4">
                    {statItems.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.06 }}
                            className="relative py-8 md:py-10 text-center"
                        >
                            {index !== 0 && <span className="hidden md:block absolute left-0 top-8 bottom-8 w-px bg-accent/50" />}
                            <p className="font-mono text-3xl md:text-4xl font-semibold text-accent mb-2">
                                <CountUpNumber value={item.value} suffix={item.suffix} active={inView} />
                            </p>
                            <p className="text-sm md:text-base text-foreground-muted">{item.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const WhatWeDo = () => (
    <section>
        <div className="container">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                className="mb-12"
            >
                <div className="flex items-center gap-5 mb-4">
                    <span className="amber-line" />
                    <h2 className="mb-0">What NCSE does</h2>
                </div>
                <p className="max-w-2xl">
                    A working chapter for students who want to build discipline, confidence, and useful technical work.
                </p>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.08 } },
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
                {features.map(({ title, description, icon: Icon }) => (
                    <motion.article
                        key={title}
                        variants={{
                            hidden: { opacity: 0, y: 24 },
                            show: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ y: -4 }}
                        className="glass rounded p-6 border-l-2 border-l-transparent hover:border-l-accent transition-colors min-h-[240px]"
                    >
                        <Icon className="text-accent mb-6" size={32} />
                        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
                        <p className="text-base text-foreground-muted">{description}</p>
                    </motion.article>
                ))}
            </motion.div>
        </div>
    </section>
);

const EventsPreview = () => {
    const latestBatch = events.find((batch) => batch.isCurrent) || events[0];
    const recentEvents = latestBatch.events.slice(0, 3);

    return (
        <section>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="mb-10"
                >
                    <span className="amber-line mb-5" />
                    <h2 className="mb-3">Recent Events</h2>
                    <p className="max-w-2xl">A quick look at the latest working sessions, ceremonies, and build-focused gatherings.</p>
                </motion.div>

                <div className="grid grid-cols-1 gap-5">
                    {recentEvents.map((event, index) => (
                        <motion.article
                            key={event.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.4, delay: index * 0.06 }}
                            whileHover={{ y: -4 }}
                            className="glass rounded overflow-hidden md:grid md:grid-cols-[260px_1fr] border border-border"
                        >
                            <img src={event.images[0]} alt={event.title} className="h-56 md:h-full w-full object-cover" />
                            <div className="p-6 flex flex-col">
                                <span className="font-mono text-sm bg-accent text-background px-3 py-1 rounded w-fit mb-4">
                                    {event.date}
                                </span>
                                <h3 className="text-2xl font-bold text-foreground mb-3">{event.title}</h3>
                                <p className="text-base text-foreground-muted mb-5 flex-grow">{event.description}</p>
                                <Link to="/events" className="font-mono text-accent hover:text-accent-hover no-underline inline-flex items-center gap-2">
                                    View All Events
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link to="/events" className="btn btn-secondary">
                        See All Events
                    </Link>
                </div>
            </div>
        </section>
    );
};

const JoinBand = () => (
    <section className="bg-surface border-y border-border grid-bg">
        <div className="container text-center">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                className="max-w-3xl mx-auto"
            >
                <span className="amber-line mx-auto mb-7" />
                <h2 className="mb-4">Ready to build something?</h2>
                <p className="mb-8">
                    Join {associationInfo.name} to learn in public, ship useful work, and grow with a focused technical community.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/contact" className="btn btn-primary accent-glow">Join NCSE</Link>
                    <Link to="/events" className="btn btn-secondary">Explore Events</Link>
                </div>
            </motion.div>
        </div>
    </section>
);

const Home = () => {
    return (
        <div>
            <Hero />
            <StatsStrip />
            <WhatWeDo />

            <div id="inauguration">
                <CarouselSection
                    label="Our Beginning"
                    title="Our Inauguration"
                    subtitle="A formal start to a student-led chapter built around technical excellence and shared responsibility."
                    images={inauguralImages}
                />
            </div>

            <EventsPreview />

          

            <JoinBand />
        </div>
    );
};

export default Home;
