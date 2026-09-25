import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    permission: false
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax translation for background text
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    if (status.error) setStatus((prev) => ({ ...prev, error: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.permission) {
      setStatus({ loading: false, success: false, error: 'Please accept the contact permission agreement.' });
      return;
    }

    setStatus({ loading: true, success: false, error: '' });

    // Simulate async network request (replace with EmailJS or backend API fetch call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ firstName: '', lastName: '', email: '', message: '', permission: false });
    } catch {
      setStatus({ loading: false, success: false, error: 'Failed to dispatch message. Please try again.' });
    }
  };

  return (
    <section ref={ref} id="contact" className="bg-[#0b0b0b] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 border-t border-white/10 select-none">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Background Watermark Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12 opacity-10"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black text-red-600 uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          CONTACT
        </h1>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#141414]/95 backdrop-blur-2xl border-t border-l border-white/15 w-full md:w-[90%] lg:w-[82%] p-8 md:p-16 text-white flex flex-col justify-between rounded-tl-[3rem] shadow-[0_-25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden"
        >
          {/* Top Highlight Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-90" />

          <div className="flex items-center justify-between mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-red-600/10 border border-red-600/30 text-xs font-mono uppercase tracking-widest text-red-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
              <span>EPISODE 04 // GET IN TOUCH</span>
            </div>
            <span className="text-xs font-mono text-white/40 tracking-wider hidden md:block">
              // LET'S BUILD SOMETHING CINEMATIC
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-12 md:gap-16 w-full">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              
              {/* Inputs Left Column */}
              <div className="flex-1 flex flex-col gap-10">
                
                {/* First Name */}
                <div className="relative group">
                  <label htmlFor="firstName" className="sr-only">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name" 
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium rounded-none text-white peer"
                  />
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-600 transition-all duration-300 peer-focus:w-full" />
                </div>

                {/* Last Name */}
                <div className="relative group">
                  <label htmlFor="lastName" className="sr-only">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name" 
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium rounded-none text-white peer"
                  />
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-600 transition-all duration-300 peer-focus:w-full" />
                </div>

                {/* Email Address */}
                <div className="relative group">
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address" 
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium rounded-none text-white peer"
                  />
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-600 transition-all duration-300 peer-focus:w-full" />
                </div>
              </div>

              {/* Message Input Right Column */}
              <div className="flex-1 flex flex-col">
                <div className="relative h-full flex flex-col group">
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea 
                    id="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here..." 
                    required
                    className="w-full h-full min-h-[140px] bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-red-600 transition-colors placeholder-white/40 font-medium resize-none rounded-none text-white peer"
                  />
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-600 transition-all duration-300 peer-focus:w-full" />
                </div>
              </div>
            </div>

            {/* Form Footer */}
            <div className="flex flex-col md:flex-row gap-12 mt-4 pt-6 border-t border-white/10">
              
              {/* Permission Checkbox */}
              <div className="flex-1 flex items-start gap-4 text-sm font-light text-white/70">
                <input 
                  type="checkbox" 
                  id="permission" 
                  checked={formData.permission}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded-sm border-white/30 bg-transparent text-red-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#E50914]" 
                />
                <label htmlFor="permission" className="cursor-pointer max-w-[280px] leading-snug">
                  I give permission to contact me at this email address.
                </label>
              </div>

              {/* Submission Status Banners & Actions */}
              <div className="flex-1 flex flex-col gap-6 text-xs text-white/50 font-light">
                {status.error && (
                  <p className="text-red-500 font-mono text-xs bg-red-950/40 border border-red-800/50 p-2.5 rounded">
                    {status.error}
                  </p>
                )}
                {status.success && (
                  <p className="text-emerald-400 font-mono text-xs bg-emerald-950/40 border border-emerald-800/50 p-2.5 rounded">
                    Message transmitted successfully. I will get back to you shortly!
                  </p>
                )}

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                  <p className="max-w-[250px] leading-relaxed">
                    Ready to start a project or collaboration? Send a direct signal.
                  </p>
                  
                  <button 
                    type="submit" 
                    disabled={status.loading}
                    className="px-8 py-3.5 rounded bg-red-600 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-red-700 transition-all duration-300 group whitespace-nowrap shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status.loading ? 'Transmitting...' : 'Send Message'}
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;