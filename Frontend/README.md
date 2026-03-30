# <img src="public/protecX.png" alt="ProtecX" height="35"> ProtecX Dashboard

The ProtecX Dashboard is a modern, high-performance web interface for managing your security projects, API keys, and authentication settings. Built with React and refined aesthetics, it provides an intuitive experience for developers to oversee their ProtecX infrastructure.

## 🚀 Features

- **📊 Project Insights**: Real-time overview of your projects and security metrics.
- **🔐 Auth Management**: Configure authentication providers, including Google OAuth and Email/Password.
- **🔑 Key Control**: Generate, rotate, and manage API keys and RS256 JWT keys.
- **📜 Live Logs**: Monitor incoming requests and system events with a dedicated logs viewer.
- **🌓 Adaptive Theme**: Fully responsive design with deep dark mode aesthetics.
- **⚡ Fast Performance**: Powered by Vite and optimized for speed.

## 🛠️ Tech Stack

- **React 19**: Utilizing the latest React features for a modern development experience.
- **TypeScript**: Ensuring type safety and better developer ergonomics.
- **Redux Toolkit**: Efficient state management across the dashboard.
- **React Router 7**: Sophisticated routing for a seamless Single Page Application experience.
- **Tailwind CSS**: Utility-first styling for rapid and consistent UI development.
- **Shadcn UI**: Premium, accessible components for a high-end look and feel.

## 📂 Folder Structure

```bash
src/
├── components/      # Reusable UI components (buttons, inputs, cards)
├── pages/           # Main page components (Overview, Settings, Logs)
├── store/           # Redux logic and slices
├── services/        # API communication logic (Axios)
├── schemas/         # Zod validation schemas
├── enums/           # Global enums for project-wide consistency
└── assets/          # Static images and icons
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- Backend service running (ProtecX Backend)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   Create a `.env` file in the root of the `Frontend` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

The dashboard will be available at [http://localhost:5173](http://localhost:5173).

## 🏗️ Build

To create a production-ready build:
```bash
npm run build
```

The output will be in the `dist/` directory.

---

<p align="center">
  Built with ❤️ by the <img src="public/X.png" alt="X" height="15"> ProtecX Team
</p>
