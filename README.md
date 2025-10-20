# Transport Booking System

A full-stack web application for transport booking services, featuring a Django REST API backend and a modern React frontend with a comprehensive UI component library.

## Project Structure

```
TRANSPORT-BOOKING/
├── backend/                 # Django REST API
│   ├── core/               # Main Django project
│   ├── wallet/             # Wallet app for payment handling
│   ├── requirements.txt    # Python dependencies
│   └── manage.py          # Django management script
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ui/        # Reusable UI components (Radix UI)
│   │   │   ├── Wallet.tsx
│   │   │   ├── CustomerDashboard.tsx
│   │   │   ├── AvailableCars.tsx
│   │   │   └── Login.tsx
│   │   ├── styles/        # Global styles
│   │   └── App.tsx        # Main application component
│   ├── package.json       # Node.js dependencies
│   ├── vite.config.ts     # Vite configuration
│   └── index.html         # Main HTML file
├── .gitignore             # Git ignore rules
└── README.md             # This file
```

## Features

- **Customer Dashboard**: User interface for managing bookings and account
- **Available Cars**: Browse and search available vehicles
- **Wallet Integration**: Payment and wallet management system
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI components
- **REST API**: Django REST Framework backend for data management

## Tech Stack

### Backend
- **Django 5.2.7**: Web framework
- **Django REST Framework 3.16.1**: API framework
- **SQLite**: Database (development)
- **PostgreSQL**: Database (production-ready with psycopg2-binary)

### Frontend
- **React 18.3.1**: UI library
- **Vite**: Build tool and development server
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible UI components
- **React Router**: Client-side routing
- **React Hook Form**: Form handling
- **Recharts**: Data visualization

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run database migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will be available at `http://localhost:5173`

## Development

### Running Tests

Backend tests:
```bash
cd backend
python manage.py test
```

### Building for Production

Frontend build:
```bash
cd frontend
npm run build
```

### API Endpoints

The Django REST API provides endpoints for:
- User authentication
- Vehicle management
- Booking operations
- Wallet transactions

Base URL: `http://localhost:8000/api/`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## Acknowledgments

- Built with modern web technologies and best practices
