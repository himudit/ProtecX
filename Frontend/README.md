# Shield - Backend as a Service Dashboard

A modern, Supabase-inspired dashboard UI for managing backend services. Shield provides a beautiful and intuitive interface for outsourcing backend functionality.

## Features

- 🎨 **Modern UI Design** - Clean, dark-themed interface inspired by Supabase
- 📊 **Dashboard Overview** - Comprehensive overview of projects and resources
- 🗄️ **Database Management** - View and manage database tables
- 🔐 **Authentication** - Configure authentication providers
- 💾 **Storage** - Manage file storage buckets
- ⚡ **Edge Functions** - Deploy and monitor serverless functions
- ⚙️ **Settings** - Comprehensive settings management

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library
- **CSS3** - Custom styling with CSS variables

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Sidebar.tsx       # Navigation sidebar
│       ├── Header.tsx        # Top header bar
│       └── Layout.tsx        # Main layout wrapper
├── pages/
│   ├── Overview.tsx         # Dashboard overview
│   ├── Projects.tsx         # Projects management
│   ├── Database.tsx         # Database tables
│   ├── Auth.tsx             # Authentication
│   ├── Storage.tsx          # File storage
│   ├── Functions.tsx        # Edge functions
│   └── Settings.tsx         # Settings
├── App.tsx                  # Main app component with routing
└── main.tsx                 # Entry point
```

## Design System

The UI uses a consistent design system with CSS variables:

- **Colors**: Dark theme with accent colors
- **Typography**: System fonts for optimal performance
- **Spacing**: Consistent padding and margins
- **Components**: Reusable card-based components

## Features Overview

### Overview Page
- Statistics cards showing key metrics
- Recent activity feed
- Quick action buttons

### Projects Page
- Grid view of all projects
- Project status indicators
- Resource usage information

### Database Page
- Table management interface
- Search and filter functionality
- Schema viewing capabilities
