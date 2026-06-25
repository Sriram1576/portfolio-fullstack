import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/50 py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="text-white font-medium">Subham Sadangi © {new Date().getFullYear()}</p>
        <p className="text-sm text-gray-500">Designed and built with React, Three.js, and a focus on immersive craft.</p>
      </div>
    </footer>
  );
};

export default Footer;
