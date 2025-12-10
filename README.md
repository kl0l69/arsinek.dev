# ⚡ Arsinek Portfolio (A.DEV)

> A highly interactive, GitHub-inspired personal portfolio featuring a neural network particle background, a responsive AI avatar, and real-time GitHub data integration.

[![Live Demo](https://img.shields.io/badge/Live_Demo-arsinek.dev.netlify.app-2ea44f?style=for-the-badge&logo=netlify)](https://arsinek.dev.netlify.app)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🎨 Overview

This project is a modern reimagining of a developer portfolio. It moves away from static layouts to offer an immersive experience that feels alive. 

**Key Highlights:**
*   **Interactive AI Avatar:** A custom-built SVG robot that tracks your mouse movements and floats naturally.
*   **Neural Particle Background:** A canvas-based animation that reacts to mouse proximity, creating a "living" network effect.
*   **GitHub Integration:** Fetches real contribution data and visualizes it in a GitHub-style activity graph.
*   **Holographic Contact Menu:** A unique 3D-style overlay menu for social links.
*   **Code Love:** Syntax-highlighted code snippets expressing emotions in Python, C++, and TypeScript.

## ✨ Features

- **Responsive Design:** Flawless experience across Mobile, Tablet, and Desktop.
- **Dark/Light Mode:** Fully themed UI matching GitHub's design system.
- **Repo-Style Cards:** Project showcases designed to look like GitHub repositories.
- **Real-time Contributions:** Activity graph powered by `github-contributions-api`.
- **SEO Optimized:** Full meta tags, Open Graph support, and semantic HTML.
- **Syntax Highlighting:** Integrated Prism.js for beautiful code blocks.

## 🛠️ Tech Stack

*   **Frontend:** React 18, TypeScript, Vite
*   **Styling:** Tailwind CSS, CSS Animations
*   **Icons:** Custom SVG Icons
*   **Animation:** HTML5 Canvas (Background), CSS Keyframes (Avatar)
*   **Deployment:** Netlify

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/kl0l69/arsinek.dev.git
    cd arsinek-portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```bash
├── src/
│   ├── components/      # UI Components (Avatar, ProjectCard, Sections...)
│   ├── constants.ts     # Data (Projects, Skills, Social Links)
│   ├── types.ts         # TypeScript Interfaces
│   ├── App.tsx          # Main Layout
│   └── index.css        # Tailwind & Global Styles
├── public/              # Static assets
└── index.html           # Entry point
```

## 🤳 Mobile Responsiveness

The site is engineered with a mobile-first approach:
- **Collapsible Navigation:** Hamburger menu for smaller screens.
- **Touch-Friendly:** Interactive elements work smoothly on touch devices.
- **Adaptive Layouts:** Grids transform into stacks for vertical readability.

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/kl0l69">Arsinek (Mohamed Hussein)</a>
</p>
