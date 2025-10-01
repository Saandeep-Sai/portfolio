# 🚀 Saandeep's Portfolio Website - Frontend

A modern, responsive portfolio website built with Next.js showcasing AI and backend development projects.

![Portfolio Preview](public/images/Hero1.png)

## ✨ Features

### 🎨 Frontend
- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: 3D flip cards, hover effects, and scroll animations
- **Dark/Light Mode**: Theme toggle with persistent preferences
- **Dynamic Portfolio**: Real-time project filtering and display

### 📱 Mobile Experience
- **Hamburger Menu**: Collapsible navigation for mobile devices
- **Touch Optimized**: Smooth interactions on touch devices
- **Performance**: Optimized loading and caching

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS3 with CSS Variables
- **Animations**: Custom CSS animations and transitions

## 📁 Project Structure

```
app/
├── components/              # Reusable components
│   ├── Navbar.tsx          # Navigation component
│   ├── ProjectCard.tsx     # Project card component
│   ├── Analytics.tsx       # Analytics tracking
│   └── Chatbot.tsx         # AI chatbot integration
├── about/                  # About page
├── contact/                # Contact page
├── project/                # Projects page
├── resume/                 # Resume page
├── service/                # Services page
├── globals.css             # Global styles
├── layout.tsx              # Root layout
└── page.tsx                # Home page
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saandeep-Sai/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Styling
- Modify CSS variables in `globals.css` for theme colors
- Component-specific styles are in respective component files
- Responsive breakpoints: 768px (tablet), 480px (mobile)

### Content Management
- Update personal information in component files
- Modify hero section content in `app/page.tsx`
- Add new sections by creating components

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables:
   - `NEXT_PUBLIC_BACKEND_URL`: Your backend API URL
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Connect GitHub and deploy
- **Railway**: Full-stack deployment option

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Size**: Optimized with tree shaking
- **Caching**: Efficient caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨💻 Author

**Saandeep Sai**
- Portfolio: [Live Demo](https://your-portfolio-url.vercel.app)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- GitHub: [Saandeep-Sai](https://github.com/Saandeep-Sai)
- Email: saandeepsaiturpu@gmail.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⭐ **Star this repository if you found it helpful!**