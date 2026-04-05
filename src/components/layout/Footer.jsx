import { Instagram, Linkedin, Mail } from 'lucide-react';
import logo from "../../assets/logo.png";

// Custom X Icon
const XIcon = ({ size = 20 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M18.244 2H21.5l-7.5 8.57L22 22h-6.828l-5.35-6.98L3.5 22H.244l8.02-9.165L0 2h6.828l4.84 6.32L18.244 2Zm-2.4 18h1.8L6.3 4h-1.8l11.344 16Z"/>
    </svg>
);

const Footer = () => {
return (
    <footer className="glass border-t border-white/10 py-16 md:py-24">
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                
                {/* Logo Section */}
                <div className="bg-transparent">
                    <img 
                        src={logo} 
                        alt="NCSE Logo" 
                        className="w-24 mb-6 mix-blend-screen brightness-150"
                    />
                    <p className="text-base text-slate-400">
                        Empowering the next generation of computing students through technical excellence and innovation.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                    <ul className="list-none flex flex-col gap-3">
                        <li><a href="/" className="text-slate-400 no-underline hover:text-white transition-colors">Home</a></li>
                        <li><a href="/about" className="text-slate-400 no-underline hover:text-white transition-colors">About</a></li>
                        <li><a href="/contact" className="text-slate-400 no-underline hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>

                {/* Social Section */}
                <div>
                    <h4 className="text-white font-semibold mb-6">Connect With Us</h4>
                    <div className="flex gap-4">
                        
                        <a href="https://www.instagram.com/ncse_2k25/" target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 transition-all hover:text-white hover:border-primary hover:bg-blue-500/10 hover:-translate-y-1">
                            <Instagram size={20} />
                        </a>

                        <a href="https://www.jerusalemengg.ac.in" target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 transition-all hover:text-white hover:border-primary hover:bg-blue-500/10 hover:-translate-y-1">
                            <XIcon size={20} />
                        </a>

                        <a href="https://www.jerusalemengg.ac.in" target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 transition-all hover:text-white hover:border-primary hover:bg-blue-500/10 hover:-translate-y-1">
                            <Linkedin size={20} />
                        </a>

                        <a href="https://www.jerusalemengg.ac.in" target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 transition-all hover:text-white hover:border-primary hover:bg-blue-500/10 hover:-translate-y-1">
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