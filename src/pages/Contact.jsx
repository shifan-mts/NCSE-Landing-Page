import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import clsx from 'clsx';
import { associationInfo } from '../data';

const inputClass = (hasError) => clsx(
    'w-full bg-surface border rounded px-4 py-3.5 text-foreground placeholder-foreground-dim transition-all',
    'focus:outline focus:outline-2 focus:outline-accent focus:border-accent',
    hasError ? 'border-accent' : 'border-border'
);

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setTimeout(() => setIsSubmitted(true), 800);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
    };

    return (
        <div className="bg-background min-h-screen pt-32 pb-20 relative overflow-hidden grid-bg">
            <div className="container relative z-10">
                <div className="mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-5 mb-4">
                            <span className="amber-line" />
                            <h1 className="mb-0">Get In Touch</h1>
                        </div>
                        <p className="text-lg max-w-2xl">
                            Have a question, collaboration idea, membership request, or event proposal? Send it to the NCSE board.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="flex flex-col gap-5"
                    >
                        <h2 className="text-2xl font-bold mb-1">Contact Information</h2>
                        <p className="mb-3">Reach the chapter through official channels or visit the department office.</p>

                        <a href={`mailto:${associationInfo.socials.email}`} className="glass p-5 md:p-6 rounded flex items-center gap-5 hover:border-accent transition-all group no-underline">
                            <div className="w-12 h-12 rounded bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-colors">
                                <Mail size={23} />
                            </div>
                            <div>
                                <h4 className="text-foreground font-semibold text-lg">Email Us</h4>
                                <p className="text-foreground-muted text-base">{associationInfo.socials.email}</p>
                            </div>
                        </a>

                        <a href={associationInfo.socials.linkedin} target="_blank" rel="noreferrer" className="glass p-5 md:p-6 rounded flex items-center gap-5 hover:border-accent transition-all group no-underline">
                            <div className="w-12 h-12 rounded bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-colors">
                                <Linkedin size={23} />
                            </div>
                            <div>
                                <h4 className="text-foreground font-semibold text-lg">LinkedIn</h4>
                                <p className="text-foreground-muted text-base">Connect with our professional network</p>
                            </div>
                        </a>

                       

                        <a href="https://maps.app.goo.gl/ePLThBMmAFJsmm328"  target="_blank" rel="noreferrer"><div className="glass p-5 md:p-6 rounded flex items-center gap-5">
                            <div className="w-12 h-12 rounded bg-accent/10 text-accent flex items-center justify-center">
                                <MapPin size={23} />
                            </div>
                            <div>
                                <h4 className="text-foreground font-semibold text-lg">Location</h4>
                                <p className="text-foreground-muted text-base">{associationInfo.college}</p>
                            </div>
                        </div></a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        className="glass p-6 md:p-10 rounded shadow-xl"
                    >
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-10"
                                >
                                    <CheckCircle size={78} className="text-accent mb-6" />
                                    <h3 className="text-3xl font-bold text-foreground mb-4">Message Sent</h3>
                                    <p className="text-foreground-muted text-lg mb-8">
                                        Thanks for reaching out. The NCSE board has received your message and will respond soon.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                                        }}
                                        className="btn btn-primary"
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <form key="form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                                    <h2 className="text-2xl font-bold mb-0">Send a Message</h2>

                                    <div>
                                        <label htmlFor="name" className="block font-mono text-foreground-muted text-sm mb-2">Your Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={inputClass(errors.name)}
                                            placeholder="John Doe"
                                            aria-invalid={Boolean(errors.name)}
                                            aria-describedby={errors.name ? 'name-error' : undefined}
                                        />
                                        {errors.name && (
                                            <p id="name-error" className="font-mono text-accent text-xs mt-2 flex items-center gap-1">
                                                <AlertCircle size={14} /> {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block font-mono text-foreground-muted text-sm mb-2">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={inputClass(errors.email)}
                                            placeholder="john@example.com"
                                            aria-invalid={Boolean(errors.email)}
                                            aria-describedby={errors.email ? 'email-error' : undefined}
                                        />
                                        {errors.email && (
                                            <p id="email-error" className="font-mono text-accent text-xs mt-2 flex items-center gap-1">
                                                <AlertCircle size={14} /> {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block font-mono text-foreground-muted text-sm mb-2">Subject</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={inputClass(false)}
                                        >
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Join as Member">Join as Member</option>
                                            <option value="Event Collaboration">Event Collaboration</option>
                                            <option value="Sponsorship">Sponsorship</option>
                                            <option value="Feedback">Feedback</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block font-mono text-foreground-muted text-sm mb-2">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="5"
                                            className={clsx(inputClass(errors.message), 'resize-none')}
                                            placeholder="How can we help?"
                                            aria-invalid={Boolean(errors.message)}
                                            aria-describedby={errors.message ? 'message-error' : undefined}
                                        />
                                        {errors.message && (
                                            <p id="message-error" className="font-mono text-accent text-xs mt-2 flex items-center gap-1">
                                                <AlertCircle size={14} /> {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    <motion.button
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="btn btn-primary w-full py-4 text-base"
                                    >
                                        Send Message
                                    </motion.button>
                                </form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
