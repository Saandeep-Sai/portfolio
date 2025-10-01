# 🚀 Saandeep's Portfolio Website

A modern, responsive portfolio website built with Next.js showcasing AI and backend development projects with dynamic content management.

![Portfolio Preview](public/images/Hero1.png)

## ✨ Features

### 🎨 Frontend
- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: 3D flip cards, hover effects, and scroll animations
- **Dark/Light Mode**: Theme toggle with persistent preferences
- **Dynamic Portfolio**: Real-time project filtering and display

### 🔧 Backend
- **Firebase Integration**: Real-time database for project management
- **RESTful API**: Express.js backend with comprehensive endpoints
- **Admin Dashboard**: Content management system for projects
- **Analytics**: Visitor tracking and engagement metrics
- **Contact System**: Form handling with email notifications

### 📱 Mobile Experience
- **Hamburger Menu**: Collapsible navigation for mobile devices
- **Touch Optimized**: Smooth interactions on touch devices
- **Performance**: Optimized loading and caching

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS3 with CSS Variables
- **Animations**: Custom CSS animations and transitions

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Caching**: Redis (optional)

### DevOps
- **Version Control**: Git
- **Package Manager**: npm
- **Environment**: Development and Production configs

## 📁 Project Structure

```
Saandeep_Portfolio/
├── app/                          # Next.js app directory
│   ├── components/              # Reusable components
│   │   ├── Navbar.tsx          # Navigation component
│   │   ├── ProjectCard.tsx     # Project card component
│   │   ├── Analytics.tsx       # Analytics tracking
│   │   └── Chatbot.tsx         # AI chatbot integration
│   ├── about/                  # About page
│   ├── contact/                # Contact page
│   ├── project/                # Projects page
│   ├── resume/                 # Resume page
│   ├── service/                # Services page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── backend/                     # Express.js backend
│   ├── config/                 # Configuration files
│   │   ├── database.js         # Database connection
│   │   └── firebase.js         # Firebase config
│   ├── models/                 # Data models
│   ├── routes/                 # API routes
│   │   ├── projects.js         # Projects CRUD
│   │   ├── contact.js          # Contact form
│   │   └── analytics.js        # Analytics endpoints
│   ├── scripts/                # Utility scripts
│   │   └── seedProjects.js     # Database seeding
│   └── server.js               # Express server
├── public/                     # Static assets
│   └── images/                 # Project images
└── README.md                   # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/saandeep-portfolio.git
   cd saandeep-portfolio
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the backend directory:
   ```env
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY=your_private_key
   FIREBASE_CLIENT_EMAIL=your_client_email
   FIREBASE_CLIENT_ID=your_client_id
   PORT=5000
   ```

5. **Seed the database**
   ```bash
   cd backend
   npm run seed
   ```

6. **Start the development servers**
   
   Backend:
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend (new terminal):
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Contact
- `POST /api/contact` - Submit contact form

### Analytics
- `POST /api/analytics/visit` - Track page visit
- `GET /api/analytics/stats` - Get analytics data (admin)

## 🎨 Customization

### Adding New Projects
1. Use the admin dashboard or API endpoints
2. Add project images to `public/images/`
3. Projects support categories: `ai`, `fullstack`, `python`, `cloud`

### Styling
- Modify CSS variables in `globals.css` for theme colors
- Component-specific styles are in respective component files
- Responsive breakpoints: 768px (tablet), 480px (mobile)

### Content Management
- Update personal information in component files
- Modify hero section content in `app/page.tsx`
- Add new sections by creating components

## 🔧 Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server
- `npm run seed` - Seed database with sample projects

## 📱 Mobile Features

- **Responsive Navigation**: Hamburger menu for mobile devices
- **Touch Interactions**: Optimized for touch screens
- **Performance**: Lazy loading and optimized images
- **Accessibility**: ARIA labels and keyboard navigation

## 🔒 Security Features

- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS**: Configured for secure cross-origin requests
- **Environment Variables**: Sensitive data in environment files

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Backend (Railway/Heroku)
1. Create new app on your platform
2. Configure environment variables
3. Connect to GitHub repository
4. Deploy

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Image Optimization**: Next.js automatic image optimization
- **Caching**: API response caching for better performance
- **Bundle Size**: Optimized with tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Saandeep Sai**
- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]
- Email: saandeepsaiturpu@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Firebase for backend services
- Vercel for hosting platform
- Open source community for inspiration

---

⭐ **Star this repository if you found it helpful!**