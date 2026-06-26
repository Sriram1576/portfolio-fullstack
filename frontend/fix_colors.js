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

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = content.replace(/neon-purple/g, 'tech-accent');
    content = content.replace(/neon-rose/g, 'tech-accent');
    content = content.replace(/neon-blue/g, 'tech-accent');
    content = content.replace(/purple-300/g, 'tech-accent');
    content = content.replace(/purple-400/g, 'tech-accent');
    
    fs.writeFileSync(filePath, content);
  }
});
console.log("Fixed remaining neon/purple colors");
