import { motion } from 'framer-motion';
import { submitLead } from '../lib/firebase';

const ContactUs: React.FC = () => {
    return (
        <div className="py-24 bg-background min-h-[80vh]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="flex-1">
                        <h2 className="text-google-blue font-bold text-sm uppercase tracking-widest mb-4">Contact</h2>
                        <h1 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 tracking-tight mb-8">
                            Start Your <br />
                            <span className="text-google-blue">Endeavor.</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed mb-12">
                            Ready to multiply your strategic power? Reach out to our technical team to schedule an initial infrastructure audit or discuss a customized growth framework.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-6 items-start">
                                <div className="size-12 rounded-xl bg-google-blue/10 flex items-center justify-center text-google-blue border border-google-blue/20">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Direct Inquiry</h4>
                                    <a href="mailto:devon@onlineverywhere.com" className="text-google-blue hover:underline">devon@onlineverywhere.com</a>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="size-12 rounded-xl bg-google-green/10 flex items-center justify-center text-google-green border border-google-green/20">
                                    <span className="material-symbols-outlined">location_on</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Base of Operations</h4>
                                    <p className="text-gray-500">Bridgetown, Barbados <br /> Targeting the Global Market</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="size-12 rounded-xl bg-google-red/10 flex items-center justify-center text-google-red border border-google-red/20">
                                    <span className="material-symbols-outlined">schedule</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Responsive Hours</h4>
                                    <p className="text-gray-500">Mon — Fri: 9am - 5pm AST<br /> Global Support: 24/7 Monitoring</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white border border-gray-100 rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <span className="material-symbols-outlined text-[10rem]">send</span>
                            </div>

                            <form className="space-y-6 relative z-10" onSubmit={async e => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const data = {
                                    name: formData.get('name'),
                                    email: formData.get('email'),
                                    service: formData.get('service'),
                                    message: formData.get('message'),
                                };
                                const res = await submitLead('contact', data);
                                if (res.success) {
                                    alert('Inquiry received. We will contact you shortly.');
                                    (e.target as HTMLFormElement).reset();
                                } else {
                                    alert('Error submitting inquiry. Please try again or email us directly.');
                                }
                            }}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Name</label>
                                        <input name="name" type="text" placeholder="Your Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:border-google-blue focus:ring-1 focus:ring-google-blue outline-none transition-all" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Email</label>
                                        <input name="email" type="email" placeholder="email@company.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:border-google-blue focus:ring-1 focus:ring-google-blue outline-none transition-all" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Service of Interest</label>
                                    <select name="service" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:border-google-blue focus:ring-1 focus:ring-google-blue outline-none transition-all appearance-none" required>
                                        <option value="">Select a service...</option>
                                        <option value="launchpad">Digital Launchpad (Setup)</option>
                                        <option value="catalyst">Conversion Catalyst (Growth)</option>
                                        <option value="partnership">Proactive Partnership (Ongoing)</option>
                                        <option value="audit">Infrastructure Audit (Free)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Message</label>
                                    <textarea name="message" rows={4} placeholder="How can we help multiply your growth?" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:border-google-blue focus:ring-1 focus:ring-google-blue outline-none transition-all resize-none" required></textarea>
                                </div>
                                <button type="submit" className="w-full bg-google-blue hover:bg-blue-600 text-white py-5 rounded-2xl font-bold transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3">
                                    <span className="material-symbols-outlined">rocket_launch</span>
                                    Submit Inquiry
                                </button>
                                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">Secured by Institutional Grade Protection</p>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
