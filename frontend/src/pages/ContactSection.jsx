import React from 'react';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const ContactSection = () => {
  return (
    <section id="contact" className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
      <div className="glass-panel p-8 md:p-16">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-neon-purple uppercase mb-4">Let's Connect</h2>
            <p className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-8">Got a project<br/>in mind?</p>
            
            <div className="space-y-6">
              <a href="mailto:subhamsadangi1576@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group hover-target">
                <div className="p-4 rounded-full bg-white/5 group-hover:bg-neon-purple/20 transition-colors">
                  <Mail className="text-neon-purple" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-lg font-medium">subhamsadangi1576@gmail.com</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4 text-gray-300">
                <div className="p-4 rounded-full bg-white/5">
                  <MapPin className="text-neon-rose" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="text-lg font-medium">Odisha, India</p>
                </div>
              </div>
            </div>
          </div>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Name</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple transition-colors hover-target focus-glow" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Email</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple transition-colors hover-target focus-glow" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Message</label>
              <textarea rows="4" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple transition-colors hover-target focus-glow" placeholder="Tell me about your project..."></textarea>
            </div>
            <MagneticButton className="w-full">
              <button className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors hover-target micro-press">
                Send Message <ArrowRight size={20} />
              </button>
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
