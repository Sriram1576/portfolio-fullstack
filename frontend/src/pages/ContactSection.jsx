import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xojpobop';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Collaboration',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-anim',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    try {
      setStatus('loading');
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: 'Collaboration',
        message: ''
      });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative z-10 py-20 px-4 max-w-6xl mx-auto" ref={sectionRef}>
      <div className="mb-10">
        <h2 className="text-sm font-bold tracking-widest text-tech-accent uppercase mb-3 contact-anim">Let's Connect</h2>
        <p className="text-4xl md:text-5xl font-bold tracking-tighter text-white contact-anim">Have a project<br/>in mind?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" style={{ perspective: '1000px' }}>
        
        {/* Left Info Panel (Spans 5 cols) */}
        <div className="lg:col-span-5 floating-glass p-8 flex flex-col justify-between contact-anim relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-tech-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-tech-accent/20 transition-colors duration-700 pointer-events-none" />
          
          <div>
            <p className="text-lg text-zinc-300 mb-8 font-medium leading-relaxed">
              I am open to full-stack roles, internships, and freelance collaborations. Let's build it together.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-black/50 border border-tech-border/50 text-tech-accent float-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-mono mb-1 uppercase tracking-wider">Email</p>
                  <a href="mailto:subhamsadangi1576@gmail.com" className="text-base font-bold text-white hover:text-tech-accent transition-colors hover-target">
                    subhamsadangi1576@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-black/50 border border-tech-border/50 text-tech-accent float-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-mono mb-1 uppercase tracking-wider">Location</p>
                  <p className="text-base font-bold text-white">Odisha, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-3">
            <a href="#" className="p-3 rounded-full bg-black/40 border border-tech-border/50 text-zinc-400 hover:text-white hover:border-tech-accent hover:bg-tech-accent/10 transition-all hover-target micro-spring">
              <Github size={20} />
            </a>
            <a href="#" className="p-3 rounded-full bg-black/40 border border-tech-border/50 text-zinc-400 hover:text-white hover:border-tech-accent hover:bg-tech-accent/10 transition-all hover-target micro-spring">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-3 rounded-full bg-black/40 border border-tech-border/50 text-zinc-400 hover:text-white hover:border-tech-accent hover:bg-tech-accent/10 transition-all hover-target micro-spring">
              <Twitter size={20} />
            </a>
          </div>
        </div>
        
        {/* Right Form Panel (Spans 7 cols) */}
        <div className="lg:col-span-7 floating-glass p-8 contact-anim">
          <form className="space-y-5 h-full flex flex-col" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5 relative">
                <label className="text-[11px] font-mono tracking-widest uppercase text-zinc-500 ml-2">Name</label>
                <input name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-black/40 border border-tech-border/50 rounded-xl px-5 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-tech-accent transition-all hover-target focus-glow" placeholder="Your full name" required />
              </div>
              <div className="space-y-1.5 relative">
                <label className="text-[11px] font-mono tracking-widest uppercase text-zinc-500 ml-2">Email</label>
                <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-black/40 border border-tech-border/50 rounded-xl px-5 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-tech-accent transition-all hover-target focus-glow" placeholder="you@example.com" required />
              </div>
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-[11px] font-mono tracking-widest uppercase text-zinc-500 ml-2">Subject</label>
              <select name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-black/40 border border-tech-border/50 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:border-tech-accent transition-all hover-target focus-glow appearance-none">
                <option value="Collaboration">Collaboration</option>
                <option value="Internship Opportunity">Internship Opportunity</option>
                <option value="Freelance Project">Freelance Project</option>
              </select>
            </div>
            
            <div className="space-y-1.5 relative flex-grow">
              <label className="text-[11px] font-mono tracking-widest uppercase text-zinc-500 ml-2">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} className="w-full h-[100px] bg-black/40 border border-tech-border/50 rounded-xl px-5 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-tech-accent transition-all hover-target focus-glow resize-none" placeholder="Share your idea, timeline, and goals..." required></textarea>
            </div>

            {status === 'success' && <p className="text-green-400 text-sm font-medium px-2">Message sent successfully!</p>}
            {status === 'error' && <p className="text-red-400 text-sm font-medium px-2">Failed to send message. Please try again.</p>}
            
            <MagneticButton className="w-full mt-2">
              <button type="submit" disabled={status === 'loading'} className={`w-full bg-white text-black font-bold text-base py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors hover-target micro-press overflow-hidden relative group ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-zinc-200'}`}>
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'loading' ? 'Sending...' : 'Send message'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </MagneticButton>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
