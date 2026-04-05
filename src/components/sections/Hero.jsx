import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import Container from '../ui/Container';
import GradientText from '../ui/GradientText';
import { EventHorizonButton, RevealMoreButton } from '../ui/Button';

export default function Hero() {
  return (
    <Section className="min-h-screen flex items-center" overlay>

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: [
          'radial-gradient(ellipse at 8%  10%,  rgba(59,130,246,0.08) 0, transparent 50%)',
          'radial-gradient(ellipse at 92% 90%,  rgba(139,92,246,0.08) 0, transparent 50%)',
        ].join(','),
      }} />

      <Container className="text-center" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.45 }}
            className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-semibold text-sm mb-6"
          >
            Welcome to NCSE
          </motion.span>

          <h1 className="mb-6">
            <GradientText tag="span">NCSE</GradientText><br />
            <span className="text-[0.8em] text-slate-100">College Name</span>
          </h1>

          <p className="max-w-2xl mx-auto mb-12 text-xl md:text-2xl text-slate-400">
            "Innovating for a tech-driven tomorrow, one student at a time."
          </p>

          <div className="flex flex-wrap gap-20 justify-center items-center">

            {/* PRIMARY — Ignite Events → now Event Horizon */}
            <Link to="/events" style={{ textDecoration: 'none' }}>
              <EventHorizonButton label="Ignite Events" />
            </Link>

            {/* SECONDARY — Reveal More */}
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <RevealMoreButton label="Reveal More" />
            </Link>

          </div>
        </motion.div>
      </Container>
    </Section>
  );
}