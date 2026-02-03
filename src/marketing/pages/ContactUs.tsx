import { motion } from 'framer-motion';
import { submitLead } from '../lib/firebase';
import { submitToGoogleForm } from '../lib/googleForms';

const ColorStripDivider: React.FC = () => (
    <div className="flex h-1.5 w-full">
        <div className="flex-1 bg-google-blue"></div>
        <div className="flex-1 bg-google-red"></div>
        <div className="flex-1 bg-google-yellow"></div>
        <div className="flex-1 bg-google-green"></div>
    </div>
);

const ContactUs: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <ColorStripDivider />

            {/* Contact Hero */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(66,133,244,0.05)_0%,transparent_50%)]"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-google-blue font-bold text-sm uppercase tracking-[0.2em] mb-4">Strategic Intake</h2>
                                <h1 className="text-5xl lg:text-8xl font-display font-bold text-navy-deep tracking-tight mb-8 leading-[0.9]">
                                    Start Your <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-google-red to-google-green">Endeavor.</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-xl">
                                    Ready to multiply your strategic power? Reach out to our technical team to schedule an initial infrastructure audit or discuss a customized growth framework.
                                </p>

                                <div className="space-y-10">
                                    <div className="flex gap-8 items-start group">
                                        <div className="size-14 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center text-google-blue group-hover:bg-google-blue group-hover:text-white transition-all duration-500">
                                            <span className="material-symbols-outlined text-2xl">mail</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-navy-deep text-lg mb-1">Direct Inquiry</h4>
                                            <a href="mailto:devon@onlineverywhere.com" className="text-google-blue font-medium hover:underline text-lg">devon@onlineverywhere.com</a>
                                        </div>
                                    </div>
                                    <div className="flex gap-8 items-start group">
                                        <div className="size-14 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center text-google-green group-hover:bg-google-green group-hover:text-white transition-all duration-500">
                                            <span className="material-symbols-outlined text-2xl">location_on</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-navy-deep text-lg mb-1">Base of Operations</h4>
                                            <p className="text-gray-500 text-lg">Bridgetown, Barbados <br /> <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Targeting the Global Market</span></p>
                                        </div>
                                    </div>
                                    <div className="flex gap-8 items-start group">
                                        <div className="size-14 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center text-google-red group-hover:bg-google-red group-hover:text-white transition-all duration-500">
                                            <span className="material-symbols-outlined text-2xl">schedule</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-navy-deep text-lg mb-1">Responsive Hours</h4>
                                            <p className="text-gray-500 text-lg">Mon — Fri: 9am - 5pm AST<br /> <span className="text-sm font-bold uppercase tracking-widest text-google-red">Global Support: 24/7 Monitoring</span></p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="flex-1 w-full lg:w-auto">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="bg-white border border-gray-100 rounded-[3rem] p-8 lg:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none">
                                    <span className="material-symbols-outlined text-[15rem]">rocket_launch</span>
                                </div>

                                <form className="space-y-8 relative z-10" onSubmit={async e => {
                                    e.preventDefault();
                                    const formData = new FormData(e.currentTarget);
                                    const data = {
                                        name: formData.get('name'),
                                        email: formData.get('email'),
                                        service: formData.get('service'),
                                        message: formData.get('message'),
                                    };
                                    const res = await submitLead('contact', data);

                                    // Also submit to Google Form
                                    await submitToGoogleForm({
                                        name: data.name as string,
                                        email: data.email as string,
                                        service: data.service as string,
                                        message: data.message as string
                                    });

                                    if (res.success) {
                                        alert('Request received. Our strategic team will contact you shortly.');
                                        (e.target as HTMLFormElement).reset();
                                    } else {
                                        alert('Error transmitting data. Please try again or email us directly.');
                                    }
                                }}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Identity</label>
                                            <input name="name" type="text" placeholder="Full Name" className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:bg-white focus:border-google-blue focus:ring-4 focus:ring-google-blue/10 outline-none transition-all" required />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Electronic Mail</label>
                                            <input name="email" type="email" placeholder="name@organization.com" className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:bg-white focus:border-google-blue focus:ring-4 focus:ring-google-blue/10 outline-none transition-all" required />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Objective</label>
                                        <div className="relative">
                                            <select name="service" className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:bg-white focus:border-google-blue focus:ring-4 focus:ring-google-blue/10 outline-none transition-all appearance-none cursor-pointer" required>
                                                <option value="">Select your objective...</option>
                                                <option value="launchpad">Digital Launchpad (Setup)</option>
                                                <option value="catalyst">Conversion Catalyst (Growth)</option>
                                                <option value="partnership">Proactive Partnership (Ongoing)</option>
                                                <option value="audit">Infrastructure Audit (Free)</option>
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <span className="material-symbols-outlined">expand_more</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Project Brief</label>
                                        <textarea name="message" rows={4} placeholder="How can we help multiply your strategic growth?" className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:bg-white focus:border-google-blue focus:ring-4 focus:ring-google-blue/10 outline-none transition-all resize-none" required></textarea>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full bg-navy-deep hover:bg-black text-white py-6 rounded-2xl font-bold transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] flex items-center justify-center gap-3 group"
                                    >
                                        <span className="material-symbols-outlined group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">send</span>
                                        Transmit Strategic Brief
                                    </motion.button>

                                    <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-50">
                                        <span className="material-symbols-outlined text-sm text-google-green">verified_user</span>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">End-to-End Encryption Enabled</p>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
