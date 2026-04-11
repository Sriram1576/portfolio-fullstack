import React from 'react';

const StatsSection = () => {
  const stats = [
    { value: '10+', label: 'Projects Delivered' },
    { value: '4', label: 'Core Tech Stacks' },
    { value: '3', label: 'Internships & Training' },
    { value: '100%', label: 'Commitment to Quality' }
  ];

  return (
    <section className="stats-strip reveal-block">
      <div className="container stats-grid">
        {stats.map((item) => (
          <article className="stat-card hover-target" key={item.label}>
            <p>{item.value}</p>
            <span>{item.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
