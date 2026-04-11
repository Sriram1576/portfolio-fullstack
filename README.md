# Portfolio MERN Full Stack Application

A modern, fully-featured portfolio website built with MERN (MongoDB, Express, React, Node.js) stack featuring a cyber-tech aesthetic with advanced animations and interactions.

## 📋 Project Structure

```
portfolio-fullstack/
├── backend/                    # Node.js/Express Backend
│   ├── models/                # MongoDB Schemas
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   ├── Experience.js
│   │   └── Contact.js
│   ├── controllers/           # Route Handlers
│   │   ├── projectController.js
│   │   ├── skillController.js
│   │   ├── experienceController.js
│   │   └── contactController.js
│   ├── routes/               # API Routes
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── experience.js
│   │   ├── contact.js
│   │   └── stats.js
│   ├── middleware/           # Custom Middleware
│   ├── server.js            # Express Server
│   ├── package.json
│   └── .env.example
│
├── frontend/                  # React Application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/       # Reusable Components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── CursorTrail.jsx
│   │   │   ├── ParallaxBackground.jsx
│   │   │   ├── ScrollProgress.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/           # Page Components
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   ├── SkillsSection.jsx
│   │   │   ├── ExperienceSection.jsx
│   │   │   └── ContactSection.jsx
│   │   ├── services/        # API Services
│   │   │   └── api.js
│   │   ├── styles/          # CSS Files
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Update .env with your configurations:**
   ```
   MONGODB_URI=mongodb://localhost:27017/portfolio
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start the backend:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   touch .env
   ```

4. **Add environment variable:**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the frontend:**
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## 📡 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/grouped/category` - Get skills by category
- `GET /api/skills/:id` - Get single skill
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Experience
- `GET /api/experience` - Get all experiences
- `GET /api/experience/:id` - Get single experience
- `POST /api/experience` - Create new experience
- `PUT /api/experience/:id` - Update experience
- `DELETE /api/experience/:id` - Delete experience

### Contact
- `GET /api/contact` - Get all contacts (paginated)
- `GET /api/contact/stats/summary` - Get contact statistics
- `GET /api/contact/:id` - Get single contact
- `POST /api/contact` - Submit contact form
- `PUT /api/contact/:id` - Update contact status
- `DELETE /api/contact/:id` - Delete contact

### Stats
- `GET /api/stats/summary` - Get portfolio statistics

## 🎨 Features

### Frontend
- ✨ **Custom Cursor with Trail Effect** - Interactive cursor animation
- 🌊 **Parallax Background** - Multi-layered animated background
- 📊 **Scroll Progress Bar** - Visual scroll indicator
- 🎯 **Smooth Scroll Navigation** - Anchor links with smooth scrolling
- 🎬 **GSAP Animations** - Advanced scroll and entrance animations
- 📱 **Responsive Design** - Mobile, tablet, and desktop optimization
- 🎨 **Gradient Effects** - Modern gradient text and backgrounds
- 🔗 **Dynamic Forms** - Real-time form validation and submission

### Backend
- 🗄️ **MongoDB Integration** - NoSQL database with Mongoose ODM
- 🔐 **CORS Configuration** - Cross-origin request handling
- 📧 **Email Notifications** - Automated emails via Nodemailer
- ✅ **Data Validation** - Input validation and sanitization
- 🎯 **RESTful API** - Clean and organized API structure
- 📍 **Error Handling** - Comprehensive error management

## 🛠️ Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Nodemailer** - Email service
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - CORS middleware
- **dotenv** - Environment variables

### Frontend
- **React 18** - UI library
- **React Router** - Routing
- **Axios** - HTTP client
- **GSAP** - Animation library
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling
- **CSS3** - Advanced styling

## 📝 Data Models

### Project
```javascript
{
  title: String,
  description: String,
  shortDescription: String,
  image: String,
  technologies: [String],
  category: String,
  status: String,
  link: String,
  githubLink: String,
  featured: Boolean
}
```

### Skill
```javascript
{
  name: String,
  proficiency: Number (0-100),
  category: String,
  subcategory: String,
  yearsOfExperience: Number
}
```

### Experience
```javascript
{
  title: String,
  company: String,
  description: String,
  startDate: Date,
  endDate: Date,
  currentlyWorking: Boolean,
  type: String,
  technologies: [String],
  keyAchievements: [String]
}
```

### Contact
```javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  status: String,
  priority: String,
  ipAddress: String
}
```

## 🔐 Security Features

- Environment variable management
- Input validation and sanitization
- CORS configuration
- MongoDB injection prevention
- XSS protection
- Rate limiting ready
- Email verification

## 📦 Deployment

### Backend Deployment (Heroku)
```bash
cd backend
git push heroku main
```

### Frontend Deployment (Vercel)
```bash
cd frontend
npm run build
vercel deploy
```

## 🎯 Future Enhancements

- [ ] User authentication
- [ ] Admin dashboard
- [ ] Portfolio analytics
- [ ] Dark/Light theme toggle
- [ ] Blog section
- [ ] Project filtering
- [ ] Advanced search
- [ ] Social media integration

## 📄 License

MIT License - Feel free to use this project for your own purposes.

## 👤 Author

Subham Sadangi
- Email: subhamsadangi1576@gmail.com
- Phone: +91 8339966406

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!
