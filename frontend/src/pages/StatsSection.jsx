import React from 'react';

const StatsSection = () => {
  const stats = [
    { value: '10+', label: 'Projects Delivered' },
    { value: '4', label: 'Core Tech Stacks' },
    { value: '3', label: 'Internships & Training' },
    { value: '100%', label: 'Commitment to Quality' }
  ];

  return (
    <section className="relative z-10 py-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item) => (
          <article className="glass-panel p-8 text-center hover-target" key={item.label}>
            <p className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-neon-purple to-neon-rose bg-clip-text text-transparent mb-2">
              {item.value}
            </p>
            <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">{item.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
