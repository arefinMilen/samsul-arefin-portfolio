# 🚀 Samsul Arefin — Software Engineer Portfolio

![Next.js](https://img.shields.io/badge/Next.js%2014-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React%2018-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)

Welcome to the official repository for **Samsul Arefin's** Personal Developer Portfolio. Built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, this portfolio showcases full-stack web development projects, custom AI agent integrations, technical skills, professional experience, and community leadership.

---

## ✨ Key Features

- 🎨 **Modern Dark Aesthetic & Glassmorphism**: Tailored HSL color palette with smooth glowing borders, glass panel backgrounds, and high-contrast typography.
- ⚡ **Next.js 14 App Router**: Server-side rendering, optimized page loads, and fast client navigation.
- 🧠 **Categorized Technical Stack**: Interactive skill grid featuring official technology brand icons (`react-icons` & `lucide-react`) across AI Workflows, Languages, DBMS, Frameworks, and DevOps.
- 📁 **Interactive Project Showcase**:
  - Filter projects by category (*Full-Stack*, *Frontend*, *Interactive Tools*).
  - Detailed project modal viewer with key features, technical metrics, and solved engineering challenges.
  - Quick action buttons for Live Demos and GitHub repositories.
- 💼 **Work & Education Timeline**: Interactive tab switcher for professional experience and academic background.
- 📜 **Certifications & Leadership**: Dedicated sections highlighting national certifications (NSDA Level-3) and community fundraiser initiatives.
- 📬 **Interactive Contact Form**: Integrated with `@emailjs/browser` for instant email dispatch and direct Google Calendar appointment booking.
- 📱 **Mobile-First Responsive Layout**: Optimized for all screen dimensions from mobile smartphones to ultra-wide displays.

---

## 🛠️ Technology Stack

### **Frontend & UI**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, Custom Utility Animations, Glassmorphism
- **Animations**: Framer Motion
- **Icons**: `react-icons` (Simple Icons, Font Awesome), `lucide-react`
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`), `react-redux`

### **Backend & APIs (Integrated Projects)**
- **Runtime / Frameworks**: Node.js, Express.js, Django REST Framework
- **Databases**: MongoDB, PostgreSQL
- **Security & Validation**: Edge Middleware RBAC, Zod, JWT Refresh Interceptors
- **DevOps & Infrastructure**: Docker, Containerized Nginx, Vercel

---

## 📂 Project Structure

```text
Portfolio/
├── public/                     # Static assets, project images & badges
│   └── Images/                 # Portfolio showcase images & profile avatar
├── src/
│   ├── app/                    # Next.js App Router pages & layouts
│   │   ├── layout.tsx          # Main root layout & provider wrapping
│   │   ├── page.tsx            # Home page aggregating portfolio sections
│   │   └── globals.css         # Global styles & Tailwind directives
│   ├── components/
│   │   ├── common/             # Reusable UI elements (SkillIcon, Modal, etc.)
│   │   ├── layout/             # Navbar, Footer & Navigation components
│   │   └── sections/           # Portfolio sections (Hero, Skills, Projects, Services, Experience, Contact)
│   ├── data/
│   │   └── portfolioData.ts    # Centralized data model (Projects, Skills, Experience, Certifications)
│   ├── store/                  # Redux Toolkit store & UI state slices
│   └── types/                  # TypeScript interface definitions
├── package.json                # Project dependencies & scripts
├── tailwind.config.ts          # Tailwind CSS theme configuration & custom colors
├── tsconfig.json               # TypeScript compiler rules
└── README.md                   # Project documentation
```

---

## 🌟 Featured Projects Highlighted

1. **Roni Agro Fiber**: Responsive B2B e-commerce platform showcasing Pineapple Leaf Fiber (PALF) products, processing pipeline, and export catalog across Desktop PC, Tablet, and Mobile devices (Next.js, React.js, TypeScript, Tailwind CSS, Redux, Node.js, MongoDB).
2. **TechnovaMartBD**: Full-Stack Gadget E-Commerce platform built with Next.js 14, Django REST Framework, PostgreSQL, and bKash/Nagad payment gateways with Dockerized Nginx deployment.
3. **SirajTech**: Enterprise multi-role e-commerce portal with Next.js Edge Middleware for 3-role RBAC security, TanStack Query, and Zod validations.
4. **Koolaai (LLM Chat App)**: Multi-model LLM chat platform unifying OpenAI ChatGPT and Google Gemini APIs with local MFS payment integration.
5. **The WK IT Company Site**: Corporate tech agency platform showcasing booking systems, founder team spotlight, and Framer Motion animations.

---

## ⚙️ Getting Started

Follow these instructions to run the portfolio locally on your machine.

### **Prerequisites**
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher

### **1. Clone the Repository**
```bash
git clone https://github.com/arefinMilen/Portfolio-2.git
cd Portfolio-2
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Variables Setup**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### **4. Run Development Server**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### **5. Production Build**
```bash
npm run build
npm run start
```

---

## 📬 Contact & Connect

- 👤 **Developer**: Samsul Arefin
- 📍 **Location**: Dhaka, Bangladesh
- 📧 **Email**: [samsularefinmilen@gmail.com](mailto:samsularefinmilen@gmail.com)
- 💼 **LinkedIn**: [Samsul Arefin](https://www.linkedin.com/in/samsul-arefin-3a7804228/)
- 💻 **GitHub**: [@arefinMilen](https://github.com/arefinMilen)
- 📅 **Schedule a Call**: [Google Calendar Appointment](https://calendar.app.google/RUKbCrCxPHgh2qYd7)

---

⭐ *If you find this portfolio inspiring, feel free to give the repository a star!*
