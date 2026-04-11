# 🚀 Portfolio Full Stack Setup Guide

## Prerequisites Checklist
- ✅ Node.js installed
- ✅ npm/yarn installed
- ⏳ MongoDB Atlas account (or local MongoDB)
- ⏳ Gmail account with App Password

---

## Step 1: Set Up MongoDB Atlas (Cloud Database)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Create an account"
3. Sign up with email
4. Verify email

### 1.2 Create a Cluster
1. Click "Create a Deployment"
2. Choose "FREE" tier
3. Select your region (closest to you)
4. Click "Create Deployment"
5. Wait 5-10 minutes for cluster creation

### 1.3 Get Connection String
1. In Atlas, go to "Database" → "Clusters"
2. Click "Connect" button
3. Choose "Drivers" → "Node.js"
4. Copy the connection string
5. It will look like:
   ```
   mongodb+srv://username:password@cluster0.xyz.mongodb.net/database?retryWrites=true&w=majority
   ```

### 1.4 Update Backend .env
Replace in `.env`:
```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/portfolio?retryWrites=true&w=majority
```

**Example:**
```
MONGODB_URI=mongodb+srv://subham:MyPassword123@cluster0.abcde.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## Step 2: Set Up Gmail App Password

### 2.1 Enable 2-Factor Authentication
1. Go to https://myaccount.google.com/security
2. Click "2-Step Verification"
3. Follow the steps

### 2.2 Create App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Click "Generate"
4. Copy the 16-character password

### 2.3 Update Backend .env
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

**Example:**
```
EMAIL_USER=subhamsadangi1576@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

---

## Step 3: Frontend Setup

### 3.1 Create .env file
Create `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3.2 Install Dependencies
```bash
cd frontend
npm install
```

---

## Step 4: Backend Setup

### 4.1 Install Dependencies
```bash
cd backend
npm install
```

### 4.2 Verify .env file
Check `backend/.env` has all required fields:
- MONGODB_URI
- PORT
- JWT_SECRET
- EMAIL_USER
- EMAIL_PASS
- FRONTEND_URL

---

## Step 5: Run the Application

### Terminal 1 - Start Backend
```bash
cd backend
npm run dev
```

Expected output:
```
🚀 Server running on port 5000
📍 Environment: development
✅ MongoDB connected successfully
```

### Terminal 2 - Start Frontend
```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!

You can now view portfolio-frontend in the browser.
  Local:            http://localhost:3000
```

---

## Step 6: Test the Application

### 6.1 Test Backend API
Open in browser: `http://localhost:5000/api/health`

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-04-10T..."
}
```

### 6.2 Test Frontend
Open in browser: `http://localhost:3000`

You should see your portfolio loading with animations!

### 6.3 Test Contact Form
1. Scroll to Contact section
2. Fill in the form
3. Submit
4. Check your email for confirmation

---

## Step 7: Adding Content to Database

### 7.1 Add Projects via API
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Stock Price Predictor",
    "description": "AI model predicting stock prices",
    "shortDescription": "Stock prediction using ML",
    "technologies": ["Python", "TensorFlow"],
    "category": "AI",
    "status": "LIVE"
  }'
```

### 7.2 Add Skills via API
```bash
curl -X POST http://localhost:5000/api/skills \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Python",
    "proficiency": 90,
    "category": "Programming",
    "yearsOfExperience": 2
  }'
```

### 7.3 Add Experience via API
```bash
curl -X POST http://localhost:5000/api/experience \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Full Stack Developer",
    "company": "Tech Company",
    "type": "Full-time",
    "startDate": "2024-01-01",
    "currentlyWorking": true,
    "technologies": ["React", "Node.js"]
  }'
```

---

## Troubleshooting

### Problem: Cannot connect to MongoDB
**Solution:**
- Check your MONGODB_URI is correct
- Make sure IP is whitelisted in MongoDB Atlas
- In Atlas, go to Security → Network Access
- Click "Add IP Address" → "Allow Access from Anywhere"

### Problem: Email not sending
**Solution:**
- Verify Gmail 2-FA is enabled
- Check App Password is correct (16 chars)
- Allow "Less secure apps" if needed

### Problem: Frontend not connecting to backend
**Solution:**
- Make sure backend is running on port 5000
- Check REACT_APP_API_URL in frontend/.env
- Clear browser cache (Ctrl+Shift+Delete)

### Problem: npm install fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## Environment Variables Summary

### Backend (.env)
```
MONGODB_URI=mongodb+srv://...
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Next Steps After Setup

1. ✅ Add your projects via API or MongoDB directly
2. ✅ Customize colors in CSS files
3. ✅ Update contact information
4. ✅ Add your GitHub/LinkedIn links
5. ✅ Deploy to production (Vercel/Heroku)

---

## Useful Commands

### Backend
```bash
npm run dev          # Start with nodemon
npm start           # Start production
npm test            # Run tests
```

### Frontend
```bash
npm start           # Start dev server
npm run build       # Build for production
npm run eject       # Expose config (irreversible!)
```

### Database
```bash
# View data in MongoDB Atlas
# Go to: Collections → Click database → Browse documents
```

---

## Support

If you face any issues:
1. Check the console logs for error messages
2. Verify all environment variables are set
3. Make sure ports 3000 & 5000 are available
4. Restart both servers

Happy coding! 🚀
