# Shield - Auth as a Service Dashboard

A modern, dashboard UI for managing backend services. Shield provides a beautiful and intuitive interface for outsourcing backend functionality.

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


{
    "success": true,
    "message": "User created successfully",
    "data": {
        "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYmUM2NkLTQ4ZTAxMTk3Yzc0YSIsImV4cCI6MTc3MzA2MzY5NiwiaWF0IjoxNzczMDYyNzk2fQ.WpfjncFiYxw",
        "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYmU5NTgxNC03NWVjLTQ2ZDUtODNjZC00OGUwMTE5N2M3NGEiLCJlbWFpbCI6IiIsInJvbGUiyQw",
        "user": {
            "id": "dbe95814-75ec-46d5-83cd-48e01197c74a",
            "name": "test1",
            "email": "test1@gmail.com",
            "role": "MEMBER",
            "isVerified": false,
            "lastLoginAt": "2026-03-09T18:56:35.5530662+05:30"
        }
    }
}


{
    "success": true,
    "message": "Login successful",
    "data": {
        "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ12C6gqDBl_-VqjXct4UNE7T4EmbVB3ZvT7KMj2jbS5f0fCVC6asI6RNdb9otxge6QLes483Hex7d7853WA9YKuQF2_A",
        "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.e_usmt5e1xheRFfNiJphLuFnvwepHwzlxs_v7Q1vCsf3xF4kA7r8LNoYeyCIPRB0Sze_r2wh_fGsD1s-0kmPgPFJQ",
        "user": {
            "id": "e72f8ddf-dd3a-498c-94bc-c7ce034c3c68",
            "name": "t1",
            "email": "t1@gmail.com",
            "role": "MEMBER",
            "isVerified": false,
            "lastLoginAt": "2026-03-09T18:59:56.5752875+05:30"
        }
    }
}

{"success":true,"message":"Logout successful","data":{}}


{
    "success": true,
    "message": "Profile retrieved successfully",
    "data": {
        "user": {
            "id": "e72f8ddf-dd3a-498c-94bc-c7ce034c3c68",
            "name": "t1",
            "email": "t1@gmail.com",
            "role": "MEMBER",
            "isVerified": false,
            "lastLoginAt": "2026-03-09T13:30:55.637Z"
        }
    }
}

{
    "success": true,
    "message": "Session refreshed",
    "data": {
        "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlNzJmOhLTQ5OGMtOTRiYy1jN2NlMDM0YzNjNjgiLCJleHAiOjE3NzMwNjMzMTgsImlhdCI6MTc3MzA2MzMxM30.qYPGaXA20jXA8t1NV3c0GT0_kfkWl0J5uPe5BBPkhDRAr4AGBl2r30dYZckZNrqhnrIyXDqbIgM74V5ZnAeZVNLd",
        "refreshToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlNzJmOGRkZi1kZDNhLTQ5OGMtOTRiYy1jN2NlMDM0YzNjNjgiLCJlbWFpbCI6IiIsInJvbGUiOi4KMU3VZGQ"
    }
}