# Transport Booking System

A full-stack web application for transport booking services, featuring a Django REST API backend and a modern React frontend with TypeScript and comprehensive UI component library.

## Project Structure

```
TRANSPORT-BOOKING/
├── backend/                    # Django REST API
│   ├── core/                  # Main Django project settings
│   │   ├── settings.py       # Django configuration
│   │   ├── urls.py           # Main URL routing
│   │   └── wsgi.py           # WSGI application
│   ├── booking/              # Booking management app
│   │   ├── models.py         # Booking data models
│   │   ├── views.py          # Booking API views
│   │   ├── serializers.py    # Booking serializers
│   │   └── urls.py           # Booking URL routing
│   ├── vehicles/             # Vehicle management app
│   │   ├── models.py         # Vehicle data models
│   │   ├── views.py          # Vehicle API views
│   │   ├── serializers.py    # Vehicle serializers
│   │   └── urls.py           # Vehicle URL routing
│   ├── wallet/               # Wallet & payment app
│   │   ├── models.py         # Wallet data models
│   │   ├── views.py          # Wallet API views
│   │   ├── serializers.py    # Wallet serializers
│   │   └── urls.py           # Wallet URL routing
│   ├── utils.py              # Shared utility functions
│   ├── requirements.txt      # Python dependencies
│   └── manage.py             # Django management script
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ui/          # Reusable UI components (Radix UI)
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── CustomerDashboard.tsx
│   │   │   ├── AvailableCars.tsx
│   │   │   ├── BookingSummary.tsx
│   │   │   ├── MyBookings.tsx
│   │   │   ├── Wallet.tsx
│   │   │   └── Login.tsx
│   │   ├── contexts/         # React context providers
│   │   │   └── UserContext.tsx
│   │   ├── styles/           # Global styles
│   │   │   └── globals.css
│   │   ├── App.tsx           # Main application component
│   │   └── main.tsx          # Application entry point
│   ├── package.json          # Node.js dependencies
│   ├── vite.config.ts        # Vite configuration
│   └── index.html            # Main HTML file
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## Features

### Customer Features
- **User Authentication**: Secure login and registration system
- **Vehicle Browsing**: Search and filter available vehicles
- **Booking Management**: Create, view, and manage bookings
- **Wallet System**: Digital wallet for payments and balance management
- **Booking History**: View past and current bookings
- **Real-time Availability**: Check vehicle availability in real-time

### Admin Features
- **Admin Dashboard**: Comprehensive admin interface
- **Vehicle Management**: Add, edit, and remove vehicles
- **Booking Oversight**: Monitor and manage all bookings
- **User Management**: View and manage customer accounts
- **Financial Reports**: Track payments and wallet transactions

### Technical Features
- **RESTful API**: Clean and well-documented API endpoints
- **Responsive Design**: Mobile-first design approach
- **Real-time Updates**: Dynamic data updates
- **Type Safety**: TypeScript for frontend type checking
- **Component Library**: Reusable UI components with Radix UI
- **CORS Enabled**: Cross-origin resource sharing configured

## Tech Stack

### Backend
- **Django 5.2.7**: High-level Python web framework
- **Django REST Framework 3.16.1**: Powerful toolkit for building Web APIs
- **PostgreSQL**: Production-grade relational database
- **psycopg2-binary 2.9.11**: PostgreSQL adapter for Python
- **django-cors-headers 4.9.0**: Handle Cross-Origin Resource Sharing
- **python-dotenv 1.1.1**: Environment variable management
- **pytest 8.4.2 & pytest-django 4.11.1**: Testing framework

### Frontend
- **React 18.3.1**: Modern UI library
- **TypeScript**: Type-safe JavaScript
- **Vite 6.3.5**: Next-generation frontend build tool
- **React Router DOM 7.9.4**: Client-side routing
- **Radix UI**: Accessible, unstyled UI components
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu
  - Navigation Menu, Popover, Select, Tabs, Tooltip, and more
- **Tailwind CSS**: Utility-first CSS framework (via globals.css)
- **Lucide React 0.487.0**: Beautiful icon library
- **React Hook Form 7.55.0**: Performant form handling
- **Recharts 2.15.2**: Composable charting library
- **React DatePicker 8.8.0**: Date selection component
- **Sonner 2.0.3**: Toast notifications
- **class-variance-authority 0.7.1**: CSS variant management
- **clsx & tailwind-merge**: Utility for constructing className strings

## Prerequisites

- **Python 3.8+** (Python 3.10+ recommended)
- **Node.js 16+** (Node.js 18+ recommended)
- **PostgreSQL 12+** (for production database)
- **npm or yarn** (npm comes with Node.js)
- **Git** (for version control)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TRANSPORT-BOOKING
```

### 2. Backend Setup

#### 2.1 Navigate to Backend Directory
```bash
cd backend
```

#### 2.2 Create Virtual Environment
```bash
# Windows
python -m venv venv

# macOS/Linux
python3 -m venv venv
```

#### 2.3 Activate Virtual Environment
```bash
# Windows (Command Prompt)
venv\Scripts\activate

# Windows (PowerShell)
venv\Scripts\Activate.ps1

# macOS/Linux
source venv/bin/activate
```

#### 2.4 Install Python Dependencies
```bash
pip install -r requirements.txt
```

#### 2.5 Configure PostgreSQL Database

1. Install PostgreSQL if not already installed
2. Create a new database:
```sql
CREATE DATABASE transport_booking;
CREATE USER postgres WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE transport_booking TO postgres;
```

3. Update database credentials in `backend/core/settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'transport_booking',
        'USER': 'postgres',
        'PASSWORD': 'your_password',  # Update this
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

#### 2.6 Run Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

#### 2.7 Create Superuser (Optional)
```bash
python manage.py createsuperuser
```

#### 2.8 Start Django Development Server
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### 3. Frontend Setup

#### 3.1 Navigate to Frontend Directory
```bash
cd ../frontend
```

#### 3.2 Install Node.js Dependencies
```bash
npm install
```

#### 3.3 Start Development Server
```bash
npm run dev
```

The frontend application will be available at `http://localhost:5173`

## Development

### Running Tests

#### Backend Tests
```bash
cd backend
python manage.py test

# Or using pytest
pytest
```

#### Frontend Tests
```bash
cd frontend
npm test
```

### Code Quality

#### Backend Linting
```bash
cd backend
# Install flake8 if needed
pip install flake8
flake8 .
```

#### Frontend Linting
```bash
cd frontend
npm run lint
```

### Building for Production

#### Backend
```bash
cd backend
# Collect static files
python manage.py collectstatic

# Set DEBUG=False in settings.py
# Configure allowed hosts
# Set up proper SECRET_KEY
```

#### Frontend
```bash
cd frontend
npm run build
# Build output will be in the 'dist' directory
```

## API Documentation

### Base URL
```
http://localhost:8000/api/
```

### Main Endpoints

#### Vehicles
- `GET /api/vehicles/` - List all vehicles
- `POST /api/vehicles/` - Create new vehicle (admin)
- `GET /api/vehicles/{id}/` - Get vehicle details
- `PUT /api/vehicles/{id}/` - Update vehicle (admin)
- `DELETE /api/vehicles/{id}/` - Delete vehicle (admin)
- `GET /api/vehicles/search/` - Search vehicles with filters

#### Bookings
- `GET /api/bookings/` - List user's bookings
- `POST /api/bookings/` - Create new booking
- `GET /api/bookings/{id}/` - Get booking details
- `PUT /api/bookings/{id}/` - Update booking
- `DELETE /api/bookings/{id}/` - Cancel booking

#### Wallet
- `GET /api/wallet/` - Get user's wallet
- `POST /api/wallet/` - Create wallet
- `POST /api/wallet/{id}/add_funds/` - Add funds to wallet
- `POST /api/wallet/{id}/deduct_funds/` - Deduct funds from wallet
- `GET /api/wallet/{id}/transactions/` - Get transaction history

### Authentication
The API uses session-based authentication. Include credentials in requests:
```javascript
fetch('http://localhost:8000/api/endpoint/', {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  }
})
```

## Environment Variables

### Backend (.env)
Create a `.env` file in the `backend` directory:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_NAME=transport_booking
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Frontend (.env)
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:8000/api
```

## Project Configuration

### CORS Configuration
The backend is configured to accept requests from:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:3001`

To add more origins, update `CORS_ALLOWED_ORIGINS` in `backend/core/settings.py`.

### Database Configuration
The project uses PostgreSQL by default. To switch to SQLite for development:

```python
# In backend/core/settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Backend (port 8000)
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8000 | xargs kill -9

# Frontend (port 5173)
# Change port in vite.config.ts or kill the process
```

#### Database Connection Error
- Verify PostgreSQL is running
- Check database credentials in settings.py
- Ensure database exists: `psql -U postgres -l`

#### Module Not Found
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

#### CORS Errors
- Verify frontend URL is in `CORS_ALLOWED_ORIGINS`
- Check that `django-cors-headers` is installed
- Ensure `corsheaders` middleware is properly configured

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

### Coding Standards
- Follow PEP 8 for Python code
- Use ESLint configuration for TypeScript/React
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Django and React
- UI components from Radix UI
- Icons from Lucide React
- Styled with Tailwind CSS
- Database powered by PostgreSQL

## Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

---

**Version**: 1.0.0  
**Last Updated**: 2025
