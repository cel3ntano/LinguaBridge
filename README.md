# LinguaBridge - Find Your Perfect Language Teacher

![LinguaBridge Banner](https://repository-images.githubusercontent.com/912566758/f5da7bad-44ed-46bd-8adb-4b3260a2e718)

LinguaBridge is a modern web application that connects language learners with experienced teachers worldwide. Built with Next.js and TypeScript, it provides a seamless platform for browsing teachers, viewing their profiles and reviews, and booking trial lessons.

**Note:** The teachers' data used in this project is mock data created for demonstration purposes and stored in Cloud Firestore. In a production environment, this would be replaced with real teacher profiles and information.

## Features

- **Teacher Discovery**: Browse through a curated list of qualified language teachers
- **Advanced Filtering**: Filter teachers by:
  - Language
  - Proficiency level
  - Price range
- **Authentication**: Secure user authentication powered by Firebase
- **Favorites System**: Authenticated users can save teachers to their favorites list
- **Booking System**: Easy-to-use trial lesson booking system
- **Responsive Design**: Fully responsive layout that works seamlessly on both mobile devices and desktop (max-width 1440px)

## Tech Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Backend Services**:
  - [Firebase Authentication](https://firebase.google.com/products/auth)
  - [Cloud Firestore](https://firebase.google.com/products/firestore) (database)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Form Validation**: [Yup](https://github.com/jquense/yup)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

## Getting Started

### Prerequisites

- Node.js (version specified in package.json)
- npm or yarn
- Firebase account and project setup

### Installation

1. Clone the repository:

```bash
git clone https://github.com/cel3ntano/LinguaBridge.git
```

2. Navigate to the project directory:

```bash
cd LinguaBridge
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env.local` file in the root directory with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

5. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
LinguaBridge/
├─ src/
│  ├─ app/                # Next.js pages and layouts
│  ├─ components/         # React components
│  │  ├─ common/          # Reusable UI components
│  │  ├─ features/        # Feature-specific components
│  │  ├─ home/            # Homepage components
│  │  ├─ layout/          # Layout components
│  │  └─ ui/              # Base UI components
│  ├─ store/              # Redux store configuration
│  ├─ lib/                # Utility functions and configurations
│  ├─ types/              # TypeScript type definitions
│  └─ styles/             # Global styles and theme
```

## Features in Detail

### Authentication

- User registration with email and password
- Secure login system powered by Firebase
- Basic user identification for favorites functionality
- Protected routes for authenticated users

### Teacher Search and Filtering

- Filter teachers by language, level, and price
- Lazy loading with "Load more" pagination (4 cards at a time)
- Skeleton loaders during data fetching
- Responsive teacher cards with expandable details

### Booking Trial Lesson

- Interactive booking modal with form
- Form validation using React Hook Form & Yup
- UI confirmation feedback
- Note: Currently implements UI/UX flow without backend integration

### Favorites System

- Add/remove teachers from favorites
- Persistent storage in Firebase
- Protected functionality for authenticated users only
- Dedicated favorites page for saved teachers

## Author

Developed by Andrii Zhygalko
