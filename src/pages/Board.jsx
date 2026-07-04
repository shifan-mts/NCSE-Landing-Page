import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Twitter, Mail } from 'lucide-react';
import { boardMembers, facultyAdvisors } from '../data';
import BatchTabs from '../components/BatchTabs';

const socialIcons = {
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
    email: Mail,
};

const Board = () => {
    const batches = boardMembers.map(b => b.batch);
    const currentBatch = boardMembers.find(b => b.isCurrent)?.batch || batches[0];
    const [activeBatch, setActiveBatch] = useState(currentBatch);

    const activeBatchInfo = boardMembers.find(b => b.batch === activeBatch);
    const activeMembers = activeBatchInfo?.members || [];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.96, y: 20 },
        show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, scale: 0.96, transition: { duration: 0.3 } }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden bg-background grid-bg">
            <div className="container relative z-10">
                <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end md:justify-between gap-5"
                    >
                        <div>
                            <div className="flex items-center gap-5 mb-4">
                                <span className="amber-line" />
                                <h1 className="mb-0">Meet the Board</h1>
                            </div>
                            <p className="max-w-2xl">
                                The student leaders who keep the chapter organized, technical, and moving.
                            </p>
                        </div>
                        {activeBatchInfo?.isCurrent && (
                            <span className="font-mono text-accent text-sm tracking-widest border border-accent/40 px-3 py-1 rounded-sm w-fit">
                                CURRENT BOARD
                            </span>
                        )}
                    </motion.div>
                </div>

                {/* Faculty Advisors Section */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-5 mb-4">
                            <span className="amber-line" />
                            <h2 className="mb-0 text-2xl md:text-3xl">Faculty Advisors</h2>
                        </div>
                        <p className="max-w-2xl text-foreground-muted">
                            The mentors who guide, support, and oversee the activities of the student chapter.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                        {(facultyAdvisors[activeBatch] || []).map((advisor) => (
                            <motion.article
                                key={advisor.id}
                                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                whileHover={{ y: -4 }}
                                className="glass p-6 rounded flex flex-col sm:flex-row items-center sm:items-start gap-6 border-l-2 border-l-accent group relative overflow-hidden"
                            >
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-border group-hover:ring-2 group-hover:ring-accent transition-all shrink-0">
                                    <img src={advisor.photo} alt={advisor.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col text-center sm:text-left h-full">
                                    <span className="font-mono text-accent text-xs md:text-sm mb-1 tracking-wider uppercase font-semibold">
                                        {advisor.role}
                                    </span>
                                    <h3 className="text-xl font-bold text-foreground mb-1">{advisor.name}</h3>
                                    <p className="text-xs text-foreground-muted mb-3 font-medium">{advisor.designation}</p>
                                    <p className="text-sm text-foreground-muted mb-4 leading-relaxed">{advisor.bio}</p>

                                    {advisor.socials.email && (
                                        <div className="mt-auto flex justify-center sm:justify-start gap-4">
                                            <motion.a
                                                whileHover={{ scale: 1.16 }}
                                                whileTap={{ scale: 0.94 }}
                                                href={`mailto:${advisor.socials.email}`}
                                                aria-label={`${advisor.name} email`}
                                                className="text-foreground-dim hover:text-accent transition-colors flex items-center gap-2 text-sm"
                                            >
                                                <Mail size={17} />
                                                <span className="font-mono text-xs">{advisor.socials.email}</span>
                                            </motion.a>
                                        </div>
                                    )}
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>

                <div className="w-full h-px bg-border/60 my-16" />

                <BatchTabs batches={batches} activeBatch={activeBatch} setActiveBatch={setActiveBatch} />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeBatch}
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8"
                    >
                        {activeMembers.map((member) => (
                            <motion.article
                                key={member.id}
                                variants={itemVariants}
                                whileHover={{ y: -4 }}
                                className="glass p-4 md:p-6 rounded text-center flex flex-col min-h-[330px] group"
                            >
                                <div className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-5 rounded-full overflow-hidden border border-border group-hover:ring-2 group-hover:ring-accent transition-all">
                                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">{member.name}</h3>
                                <p className="font-mono text-accent text-xs md:text-sm mb-3">{member.role}</p>
                                <p className="hidden md:block text-sm text-foreground-muted mb-5">{member.bio}</p>

                                <div className="mt-auto flex justify-center gap-4">
                                    {Object.entries(member.socials).map(([key, value]) => {
                                        const Icon = socialIcons[key];
                                        if (!Icon || !value) return null;
                                        const href = key === 'email' ? `mailto:${value}` : value;

                                        return (
                                            <motion.a
                                                key={key}
                                                whileHover={{ scale: 1.16 }}
                                                whileTap={{ scale: 0.94 }}
                                                href={href}
                                                aria-label={`${member.name} ${key}`}
                                                target={key === 'email' ? undefined : '_blank'}
                                                rel={key === 'email' ? undefined : 'noreferrer'}
                                                className="text-foreground-dim hover:text-accent transition-colors"
                                            >
                                                <Icon size={19} />
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {activeMembers.length === 0 && (
                    <div className="py-12 text-center text-foreground-muted">
                        No board members found for this batch.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Board;
