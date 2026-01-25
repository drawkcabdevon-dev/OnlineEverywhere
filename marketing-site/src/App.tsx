import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Typewriter = ({ terms }: { terms: string[] }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % terms.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [terms]);

    return (
        <span style={{ display: 'inline-block', minWidth: '300px', color: 'var(--accent)' }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ display: 'inline-block' }}
                >
                    {terms[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

const App: React.FC = () => {
    return (
        <div className="premium-gradient min-h-screen">
            {/* Navigation */}
            <nav style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 100,
                padding: '1.5rem 2rem',
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                    ONLINE<span style={{ color: 'var(--accent)' }}>EVERYWHERE</span>
                </div>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <a href="#app" className="nav-link">The App</a>
                    <a href="#services" className="nav-link">Services</a>
                    <a href="#about" className="nav-link">About</a>
                    <a href="https://app.onlineverywhere.com" className="btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>Launch App</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="hero" style={{
                paddingTop: '15rem',
                paddingBottom: '12rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Dynamic Background */}
                <motion.div
                    animate={{
                        background: [
                            'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)'
                        ]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: -1
                    }}
                />

                {/* Floating Elements (Interactivity) */}
                <motion.div
                    animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '10%',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                        zIndex: -1
                    }}
                />

                <span className="section-tag">Empowering the Team of One</span>
                <h1 className="section-title" style={{ fontSize: '5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                    Your AI-Native <br />
                    <Typewriter terms={["Marketing Department.", "Strategist.", "Copywriter.", "SEO Analyst.", "Researcher."]} />
                </h1>
                <p style={{
                    fontSize: '1.35rem',
                    color: 'var(--text-muted)',
                    maxWidth: '750px',
                    margin: '0 auto 3.5rem',
                    lineHeight: 1.6
                }}>
                    OLE (OnlineEverywhere) is the central brain for your business.
                    Bridge the gap from <strong>Click to Client</strong> with a unified ecosystem
                    designed to multiply your strategic power.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <a href="#services" className="btn-primary">View Solutions</a>
                    <a href="#app" className="glass-card" style={{ padding: '0.8rem 2rem', borderRadius: '50px', textDecoration: 'none', color: 'white' }}>Explore OLE</a>
                </div>
            </section>

            {/* The Central Brain (Core IP) */}
            <section id="brain">
                <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <span className="section-tag">Proprietary Architecture</span>
                        <h2 className="section-title">The "Central Brain" Strategy</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                            Unlike fragmented AI tools, OLE is built on a single source of truth.
                            Our <strong>Project Foundation</strong> module defines your brand voice,
                            target audience, and goals once.
                        </p>
                        <p style={{ color: 'var(--text-main)', fontWeight: 500 }}>
                            This intelligence then flows into every email, every strategy brief,
                            and every web component—ensuring perfect brand alignment across every channel.
                        </p>
                    </div>
                    <div style={{
                        background: 'linear-gradient(45deg, #3b82f622, #8b5cf622)',
                        height: '300px',
                        borderRadius: '16px',
                        border: '1px dashed var(--glass-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        color: 'var(--accent)'
                    }}>
                        [ Interactive Brain Visualization ]
                    </div>
                </div>
            </section>

            {/* The Ecosystem (Modules) */}
            <section id="app">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="section-tag">An End-to-End Ecosystem</span>
                    <h2 className="section-title">13 Specialized Modules</h2>
                    <p style={{ color: 'var(--text-muted)' }}>From research to execution, OLE is your complete marketing assembly line.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {[
                        { title: 'Foundation', desc: 'Define your Central Brain: Identity, Personas, and Goals.' },
                        { title: 'Market Radar', desc: 'Live competitor analysis and market opportunity tracking.' },
                        { title: 'PersonaLab', desc: 'In-depth audience profiling driven by real-time data.' },
                        { title: 'Page Performance Lab', desc: 'Deep SEO audits and conversion path optimization.' },
                        { title: 'Strategy Briefs', desc: 'High-level campaign plans synthesized from raw research.' },
                        { title: 'Website Builder', desc: 'Generative themed components for high-conversion sites.' }
                    ].map((item, i) => (
                        <div key={i} className="glass-card">
                            <h3 style={{ marginBottom: '0.5rem', color: 'var(--accent)' }}>{item.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Section */}
            <section id="services" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="section-tag">Comprehensive Digital Partnerships</span>
                    <h2 className="section-title">Strategic Solutions</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                        We don't just provide a tool; we provide the expertise to scale it.
                        The OLE app supports our services, but can also be used independently to
                        power your internal team.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {[
                        { name: 'Digital Launchpad', phase: 'Setup', desc: 'Brand assets, optimized website, and analytics (GA4/Search Console) setup.' },
                        { name: 'Conversion Catalyst', phase: 'Optimization', desc: 'Technical refinement, Core Web Vitals, and Structured Data implementation.' },
                        { name: 'Proactive Partnership', phase: 'Sustaining', desc: 'Long-term retainer for maintenance, content refreshes, and reporting.' },
                        { name: 'Paid Media Ignition', phase: 'Growth', desc: 'Integrated ad management combining creative design with deep tracking.' }
                    ].map((svc, i) => (
                        <div key={i} className="glass-card" style={{ borderTop: `4px solid var(--accent)` }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{svc.phase} PHASE</span>
                            <h3 style={{ margin: '0.5rem 0' }}>{svc.name}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{svc.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>ONLINEEVERYWHERE</div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your digital partner for the AI era.</p>
                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                    <a href="#" className="nav-link">Privacy Policy</a>
                    <a href="#" className="nav-link">Terms of Service</a>
                    <a href="mailto:contact@onlineverywhere.com" className="nav-link">Contact Us</a>
                </div>
                <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    © 2026 Online Everywhere. All rights reserved.
                </div>
            </footer>

            <style>{`
        .nav-link {
          text-decoration: none;
          color: var(--text-muted);
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: var(--text-main);
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
        </div>
    );
};

export default App;
