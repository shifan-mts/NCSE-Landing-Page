import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { associationInfo } from '../data';
import { Link } from 'react-router-dom';

const socialLinks = [
    { key: 'github', label: 'GitHub', icon: Github, href: associationInfo.socials.github },
    { key: 'twitter', label: 'Twitter', icon: Twitter, href: associationInfo.socials.twitter },
    { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, href: associationInfo.socials.linkedin },
    { key: 'email', label: 'Email', icon: Mail, href: `mailto:${associationInfo.socials.email}` },
];

const Footer = () => {
    return (
        <footer className="bg-[#080D18] border-t border-border pt-16 pb-8 md:pt-20 md:pb-10 mt-auto">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-14">
                    <div>
                        <h3 className="font-mono text-accent text-3xl font-bold mb-5 tracking-widest">{associationInfo.name}</h3>
                        <p className="text-base text-foreground-muted leading-relaxed mb-5">
                            {associationInfo.mission}
                        </p>
                        <p className="font-mono text-sm text-foreground-dim">{associationInfo.department}</p>
                        <a 
                            href={`mailto:${associationInfo.socials.email}`} 
                            className="hover:text-accent transition-colors duration-200 inline-block mt-2"
                        >
                            <p className="font-mono text-sm text-foreground-dim">{associationInfo.socials.email}</p>
                        </a>
                    </div>

                    <div>
                        <h4 className="text-foreground font-mono uppercase tracking-widest mb-6 text-sm">Quick Links</h4>
                        <ul className="list-none flex flex-col gap-4 p-0 m-0">
                            <li><Link to="/" className="text-foreground-muted no-underline hover:text-accent">Home</Link></li>
                            <li><Link to="/events" className="text-foreground-muted no-underline hover:text-accent">Events</Link></li>
                            <li><Link to="/board" className="text-foreground-muted no-underline hover:text-accent">Board</Link></li>
                            <li><Link to="/about" className="text-foreground-muted no-underline hover:text-accent">About</Link></li>
                            <li><Link to="/contact" className="text-foreground-muted no-underline hover:text-accent">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-foreground font-mono uppercase tracking-widest mb-6 text-sm">Connect</h4>
                        <p className="text-foreground-muted text-base mb-6">
                            Follow updates, projects, workshops, and chapter announcements.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.filter((link) => link.href).map(({ key, label, icon: Icon, href }) => (
                                <a
                                    key={key}
                                    href={href}
                                    aria-label={label}
                                    target={key === 'email' ? undefined : '_blank'}
                                    rel={key === 'email' ? undefined : 'noreferrer'}
                                    className="w-11 h-11 rounded border border-border bg-surface/60 flex items-center justify-center text-foreground-dim transition-all hover:text-accent hover:border-accent hover:-translate-y-1"
                                >
                                    <Icon size={19} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/70 pt-7 text-center font-mono text-foreground-dim text-sm">
                    <span>&copy; {new Date().getFullYear()} {associationInfo.name}</span>
                    <span className="text-accent mx-2">·</span>
                    <span>{associationInfo.college}</span>
                    <span className="text-accent mx-2">·</span>
                    <span>All rights reserved</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
