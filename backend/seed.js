const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed Projects
    const projects = await Project.create([
      {
        title: 'STOCK_TREND_PREDICTOR',
        description: 'AI-powered tool for predicting next-day stock price direction using OHLCV data and technical indicators.',
        shortDescription: 'Stock prediction using ML',
        image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&q=80',
        technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
        category: 'Finance',
        status: 'LIVE',
        featured: true,
        orderIndex: 1,
        link: 'https://stock-predictor.demo.com',
        githubLink: 'https://github.com/yourusername/stock-predictor'
      },
      {
        title: 'UNIVERSAL_RECOMMENDATION',
        description: 'Generalized recommendation engine adaptable across multiple domains using collaborative filtering.',
        shortDescription: 'Recommendation engine with ML',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        technologies: ['Python', 'Machine Learning', 'Data Analysis'],
        category: 'AI',
        status: 'ACTIVE',
        featured: true,
        orderIndex: 2,
        link: 'https://recommendation-engine.demo.com',
        githubLink: 'https://github.com/yourusername/recommendation-engine'
      }
    ]);
    console.log('✅ Seeded 2 projects');

    // Seed Skills
    const skills = await Skill.create([
      {
        name: 'Python / AI Runtimes',
        proficiency: 90,
        category: 'Programming',
        yearsOfExperience: 2,
        orderIndex: 1
      },
      {
        name: 'Java / OOP',
        proficiency: 85,
        category: 'Programming',
        yearsOfExperience: 1.5,
        orderIndex: 2
      },
      {
        name: 'MERN Stack',
        proficiency: 75,
        category: 'Frontend',
        yearsOfExperience: 1,
        orderIndex: 3
      },
      {
        name: 'Machine Learning',
        proficiency: 85,
        category: 'Tools',
        yearsOfExperience: 2,
        orderIndex: 4
      },
      {
        name: 'Pandas / NumPy',
        proficiency: 88,
        category: 'Tools',
        yearsOfExperience: 1.5,
        orderIndex: 5
      },
      {
        name: 'Stock Analysis',
        proficiency: 92,
        category: 'Other',
        yearsOfExperience: 1,
        orderIndex: 6
      },
      {
        name: 'React.js',
        proficiency: 80,
        category: 'Frontend',
        yearsOfExperience: 1,
        orderIndex: 7
      },
      {
        name: 'Node.js',
        proficiency: 85,
        category: 'Backend',
        yearsOfExperience: 1,
        orderIndex: 8
      }
    ]);
    console.log('✅ Seeded 8 skills');

    // Seed Experience
    const experiences = await Experience.create([
      {
        title: 'MERN_FULL_STACK_TRAINEE',
        company: 'IIT Ropar',
        description: 'Intensive full-stack training covering MongoDB, Express.js, React, and Node.js. Building scalable web applications.',
        type: 'Training',
        startDate: new Date('2024-01-01'),
        currentlyWorking: true,
        technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
        keyAchievements: [
          'Completed full MERN stack bootcamp',
          'Built 5+ production-ready applications',
          'Mastered RESTful API design'
        ],
        orderIndex: 1
      },
      {
        title: 'STOCK_MARKET_ANALYST',
        company: 'Launched Global',
        description: 'Equity research and market trend analysis. Applied technical analysis tools to real market data. SEBI certified.',
        type: 'Certification',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-08-31'),
        technologies: ['Technical Analysis', 'Financial Data'],
        keyAchievements: [
          'SEBI certified stock market analyst',
          'Analyzed 100+ stocks for investment potential',
          'Achieved 75% prediction accuracy'
        ],
        orderIndex: 2
      },
      {
        title: 'RPA_DEVELOPER_ASSOCIATE',
        company: 'EduSkill (UiPath)',
        description: 'Hands-on RPA training using UiPath Studio. Developed automated workflows for business process optimization.',
        type: 'Certification',
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-05-31'),
        technologies: ['UiPath', 'Automation', 'Business Process'],
        keyAchievements: [
          'UiPath Certified Associate Developer',
          'Automated 10+ business processes',
          'Saved 100+ hours of manual work'
        ],
        orderIndex: 3
      }
    ]);
    console.log('✅ Seeded 3 experiences');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSeeded Data Summary:');
    console.log('- Projects: 2');
    console.log('- Skills: 8');
    console.log('- Experiences: 3');

    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

// Run seeder
seedData();
