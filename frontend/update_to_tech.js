const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/pages/HeroSection.jsx',
  'src/pages/ProjectsSection.jsx',
  'src/pages/SkillsSection.jsx',
  'src/pages/ContactSection.jsx',
  'src/pages/ExperienceSection.jsx',
  'src/pages/StatsSection.jsx',
  'src/components/Navbar.jsx',
  'src/components/Footer.jsx',
  'src/components/CustomCursor.jsx'
];

const replacements = {
  // Colors replacements
  'text-neon-purple': 'text-tech-accent',
  'text-neon-rose': 'text-tech-accent',
  'text-neon-blue': 'text-tech-accent',
  'text-neon-green': 'text-tech-accent',
  'border-neon-purple': 'border-tech-accent',
  'border-neon-rose': 'border-tech-accent',
  'border-neon-blue': 'border-tech-accent',
  'border-neon-green': 'border-tech-accent',
  'from-neon-purple': 'from-tech-accent/80',
  'to-neon-rose': 'to-tech-accent/40',
  'bg-neon-purple/10': 'bg-tech-accent/10',
  'border-neon-purple/20': 'border-tech-accent/20',

  'text-purple-400': 'text-tech-accent',
  'text-rose-400': 'text-tech-accent',
  'text-cyan-400': 'text-tech-accent',
  'bg-purple-400/10': 'bg-tech-accent/10',
  'bg-purple-400/20': 'bg-tech-accent/20',
  'border-purple-400/20': 'border-tech-accent/20',
  'from-purple-400': 'from-tech-accent',
  'to-rose-400': 'to-cyan-200',

  'text-zinc-400': 'text-zinc-400',
  'text-zinc-300': 'text-zinc-300',
  'bg-white/5': 'bg-tech-surface',
  'border-white/10': 'border-tech-border',
  
  // Custom Cursor
  "'#c084fc'": "'#06b6d4'", // Cursor dot color
  "rgba(168, 85, 247, 0.5)": "rgba(6, 182, 212, 0.5)", // Cursor ring color
};

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Process replacements
    for (const [oldStr, newStr] of Object.entries(replacements)) {
      const regex = new RegExp(oldStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
      content = content.replace(regex, newStr);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
