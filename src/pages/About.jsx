import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Award, Lightbulb, Rocket, Target } from 'lucide-react';
import { associationInfo, events } from '../data';

const stats = [
    { label: 'Life Members', value: 200, suffix: '+' },
    { label: 'Events Hosted', value: 12, suffix: '+' },
    { label: 'Past Batches', value: 4, suffix: '' },
    { label: 'Years Active', value: 3, suffix: '+' },
];

const values = [
    {
        number: '01',
        label: 'Build',
        body: 'Ship practical work, learn from the process, and make technical ambition visible.',
    },
    {
        number: '02',
        label: 'Learn',
        body: 'Turn curiosity into repeatable engineering habits through workshops and peer review.',
    },
    {
        number: '03',
        label: 'Lead',
        body: 'Create space for students to organize, mentor, present, and make decisions.',
    },
    {
        number: '04',
        label: 'Share',
        body: 'Keep knowledge moving through talks, documentation, demos, and collaborative events.',
    },
];

const storyByBatch = {
    "2021-2022": {
        title: "The Foundation Year",
        description: "NCSE opened with its inaugural function and quickly shaped its identity through coding, poster making, debate, and team-based quiz events. The first calendar made the association more than a ceremony; it became a place for students to compete, speak, design, and collaborate.",
    },
    "2022-2023": {
        title: "From Coding to Communication",
        description: "The next batch sharpened the technical track with Code Infinity, Web Mania, and Brain Teaser while Presentilia added paper presentation and discussion. This year connected programming logic with frontend creativity and the confidence to explain technology clearly.",
    },
    "2023-2024": {
        title: "A Complete Student-Tech Calendar",
        description: "NCSE matured into a balanced event season: BIWIZARD QUIZZITCH for technical agility, FRONTEND MASTERS for UI craft, STORYBOARD for creative technology themes, CROSSME for logic, and MINI PROJECT EXHIBITION for real-world problem solving. The valedictory closed the loop by celebrating participation and outcomes.",
    },
};

const createStoryTimeline = (eventBatches) => eventBatches
    .slice()
    .sort((a, b) => Number(a.batch.slice(0, 4)) - Number(b.batch.slice(0, 4)))
    .map((batch) => {
        const categories = [...new Set(batch.events.map((event) => event.category))];
        const story = storyByBatch[batch.batch] || {
            title: "An Expanding Event Season",
            description: `NCSE hosted ${batch.events.length} events across ${categories.join(', ')}, continuing its focus on student participation and technical growth.`,
        };

        return {
            year: batch.batch,
            eventCount: batch.events.length,
            categories,
            ...story,
        };
    });

const timeline = createStoryTimeline(events);

const CountUpNumber = ({ value, suffix, active }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) return;

        const duration = 1200;
        const frames = 60;
        let frame = 0;
        const interval = setInterval(() => {
            frame += 1;
            const progress = frame / frames;
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(value * eased));

            if (frame >= frames) {
                clearInterval(interval);
                setCount(value);
            }
        }, duration / frames);

        return () => clearInterval(interval);
    }, [active, value]);

    return <>{count}{suffix}</>;
};

const StatCard = ({ label, value, suffix }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-6 md:p-8 rounded text-center border-l-2 border-l-accent"
        >
            <h3 className="font-mono text-4xl md:text-5xl font-semibold text-accent mb-2">
                <CountUpNumber value={value} suffix={suffix} active={inView} />
            </h3>
            <p className="text-foreground-muted font-medium">{label}</p>
        </motion.div>
    );
};

const TimelineNode = ({ year, title, description, eventCount, categories, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -36 : 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative md:grid md:grid-cols-2 md:gap-12 mb-10"
        >
            <div className={isEven ? 'md:col-start-1' : 'md:col-start-2'}>
                <div className="glass rounded p-6 border-l-2 border-l-accent">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <h4 className="text-foreground text-xl font-semibold">{title}</h4>
                        <span className="font-mono text-accent text-sm shrink-0">{year}</span>
                    </div>
                    <p className="text-foreground-muted text-sm">{description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <span className="font-mono text-xs bg-accent text-background px-2.5 py-1 rounded">
                            {eventCount} events
                        </span>
                        {categories.slice(0, 4).map((category) => (
                            <span key={category} className="font-mono text-xs text-accent border border-accent/40 px-2.5 py-1 rounded">
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <span className="absolute left-[-25px] md:left-1/2 md:-translate-x-1/2 top-6 w-2.5 h-2.5 bg-accent rounded-full shadow-[0_0_16px_rgba(212,160,23,0.35)]" />
        </motion.div>
    );
};

const About = () => {
    return (
        <div className="bg-background min-h-screen pb-20 pt-32 overflow-hidden relative grid-bg">
            <div className="container relative z-10 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-surface/70 border border-border rounded p-8 md:p-12"
                >
                    <span className="amber-line mb-7" />
                    <p className="font-mono text-accent text-sm tracking-widest mb-4">ABOUT THE CHAPTER</p>
                    <h1 className="mb-5">About NCSE</h1>
                    <p className="text-lg md:text-xl text-foreground-muted max-w-3xl">
                        {associationInfo.tagline} We are a student-led technical association built around practical learning, shared leadership, and real project culture.
                    </p>
                </motion.div>
            </div>

            <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                    className="glass p-8 md:p-10 rounded border-l-2 border-l-accent"
                >
                    <Target className="text-accent mb-6" size={42} />
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p>{associationInfo.mission}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 }}
                    whileHover={{ y: -4 }}
                    className="glass p-8 md:p-10 rounded border-l-2 border-l-accent"
                >
                    <Lightbulb className="text-accent mb-6" size={42} />
                    <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                    <p>
                        To build an ecosystem where computing students bridge academic theory and industry practice through guided, hands-on work.
                    </p>
                </motion.div>
            </div>

            <div className="container relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-24">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <div className="container relative z-10 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-5 mb-4">
                        <span className="amber-line" />
                        <h2 className="mb-0">Values</h2>
                    </div>
                    <p className="max-w-2xl">The operating principles behind how the chapter learns, teaches, and organizes.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {values.map((value, index) => (
                        <motion.article
                            key={value.label}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ delay: index * 0.06 }}
                            whileHover={{ y: -4 }}
                            className="glass rounded p-6"
                        >
                            <p className="font-mono text-4xl text-accent mb-5">{value.number}</p>
                            <h3 className="text-2xl text-foreground font-bold mb-3">{value.label}</h3>
                            <p className="text-base">{value.body}</p>
                        </motion.article>
                    ))}
                </div>
            </div>

            <div className="container relative z-10 mb-24">
                <div className="text-center mb-16">
                    <span className="amber-line mx-auto mb-5" />
                    <h2>Our Story</h2>
                    <p className="max-w-2xl mx-auto mt-4">
                        Built from the NCSE event archive, this timeline shows how the association grew from inauguration-led beginnings into a full technical, creative, and project-focused calendar.
                    </p>
                </div>
                <div className="relative max-w-5xl mx-auto pl-8 md:pl-0">
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-0.5 bg-accent/70 rounded-full" />
                    {timeline.map((item, i) => (
                        <TimelineNode key={item.year} index={i} {...item} />
                    ))}
                </div>
            </div>

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-surface border border-border rounded p-10 md:p-14 text-center grid-bg relative overflow-hidden"
                >
                    <Rocket size={110} className="absolute right-8 top-8 text-accent/10 pointer-events-none" />
                    <Award size={90} className="absolute left-8 bottom-8 text-accent/10 pointer-events-none" />
                    <span className="amber-line mx-auto mb-7" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-5 relative z-10">Want to be part of NCSE?</h2>
                    <p className="mb-8 max-w-2xl mx-auto relative z-10">
                        Join our events, meet student builders, and help shape the technical culture on campus.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                        <Link to="/events" className="btn btn-primary accent-glow">View Events</Link>
                        <Link to="/board" className="btn btn-secondary">Meet the Board</Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
