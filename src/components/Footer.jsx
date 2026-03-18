import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="glass border-t border-white/10 py-16 md:py-24">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <h3 className="gradient-text text-2xl font-bold mb-6">NCSE</h3>
                        <p className="text-base text-slate-400">
                            Empowering the next generation of computing students through technical excellence and innovation.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                        <ul className="list-none flex flex-col gap-3">
                            <li><a href="/" className="text-slate-400 no-underline hover:text-white transition-colors">Home</a></li>
                            <li><a href="/events" className="text-slate-400 no-underline hover:text-white transition-colors">Events</a></li>
                            <li><a href="/about" className="text-slate-400 no-underline hover:text-white transition-colors">About</a></li>
                            <li><a href="/contact" className="text-slate-400 no-underline hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Connect With Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 transition-all hover:text-white hover:border-primary hover:bg-blue-500/10 hover:-translate-y-1">
                                <Github size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 transition-all hover:text-white hover:border-primary hover:bg-blue-500/10 hover:-translate-y-1">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 transition-all hover:text-white hover:border-primary hover:bg-blue-500/10 hover:-translate-y-1">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 transition-all hover:text-white hover:border-primary hover:bg-blue-500/10 hover:-translate-y-1">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} NCSE. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
