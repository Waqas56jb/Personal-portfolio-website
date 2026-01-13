# Waqas Naveed - Data Science & AI Portfolio (React + Tailwind)

A modern, responsive portfolio website built with React and Tailwind CSS, showcasing expertise in Data Science, Artificial Intelligence, and Machine Learning.

## 🚀 Features

- **React-based**: Modern component architecture
- **Tailwind CSS**: Utility-first styling with dark mode support
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Animations**: Smooth scroll animations using AOS (Animate On Scroll)
- **Particles Background**: Interactive particle effects
- **Dark Mode**: Theme toggle with persistent preference
- **All Original Content**: Every section, detail, and record preserved exactly as original

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
Personal-portfolio-website/
├── public/
│   ├── index.html          # HTML template
│   └── profile2.png        # Profile image (add your image here)
├── src/
│   ├── components/         # React components
│   │   ├── About.js
│   │   ├── BackToTop.js
│   │   ├── Certifications.js
│   │   ├── Contact.js
│   │   ├── Experience.js
│   │   ├── Footer.js
│   │   ├── Hero.js
│   │   ├── Navbar.js
│   │   ├── ParticlesBackground.js
│   │   ├── Preloader.js
│   │   ├── Projects.js
│   │   ├── Services.js
│   │   ├── Skills.js
│   │   └── Testimonials.js
│   ├── App.js              # Main App component
│   ├── index.js            # React entry point
│   └── index.css           # Global styles with Tailwind
├── package.json
├── tailwind.config.js      # Tailwind configuration
└── postcss.config.js       # PostCSS configuration
```

## 🎨 Customization

### Update Profile Image
Place your profile image in the `public/` folder and name it `profile2.png`, or update the path in `src/components/About.js`.

### Update Content
All content is preserved exactly as the original. To update:
- Personal information: Edit `src/components/Hero.js`, `src/components/Contact.js`
- Projects: Edit `src/components/Projects.js`
- Skills: Edit `src/components/Skills.js`
- Experience: Edit `src/components/Experience.js`
- And so on for each section

### Styling
All styles use Tailwind CSS classes. Custom colors and themes are defined in `tailwind.config.js`.

## 📦 Technologies Used

- **React 18**: UI library
- **Tailwind CSS 3**: Utility-first CSS framework
- **AOS**: Animate On Scroll library
- **Particles.js**: Background particle effects
- **Font Awesome**: Icons
- **Google Fonts**: Poppins & Playfair Display

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
3. Deploy: `npm run deploy`

## 📝 Notes

- All original content, records, and details are preserved
- Responsive design matches the original exactly
- Dark mode functionality included
- All animations and interactions maintained
- CV download link preserved (ensure CV file is in `public/assets/` folder)

## 📧 Contact

- **Email**: waqas56jb@gmail.com
- **LinkedIn**: [Waqas Naveed](https://www.linkedin.com/in/waqas-naveed-630297247/)
- **GitHub**: [Waqas56jb](https://github.com/Waqas56jb)
- **Medium**: [@waqas56jb](https://medium.com/@waqas56jb)

---

*Built with React and Tailwind CSS - 2025*
