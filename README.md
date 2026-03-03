# Klinik Laktasi ERM - Electronic Medical Record

Sistem Manajemen Rekam Medis Elektronik untuk Klinik Laktasi

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Deployment**: Vercel

## 📋 Features

- **Dashboard**: Overview of clinic statistics
- **Patient Management**: CRUD operations for patient records
- **Appointment Scheduling**: Manage clinic appointments
- **Medical Records**: Electronic medical records with lactation consultation details
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/hearis71/klinik_laktasi_ERM.git
cd klinik_laktasi_ERM
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project at [Supabase](https://supabase.com)
2. Get your project credentials:
   - Project URL
   - Anon/Public Key
   - Service Role Key
   - Database URL

### 4. Configure environment variables

Create a `.env` file in the root directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=your_supabase_database_url
NEXT_PUBLIC_APP_NAME="Klinik Laktasi ERM"
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 5. Set up Prisma

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
klinik_laktasi_ERM/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication endpoints
│   │   │   ├── patients/   # Patient endpoints
│   │   │   ├── appointments/ # Appointment endpoints
│   │   │   ├── records/    # Medical record endpoints
│   │   │   └── dashboard/  # Dashboard stats endpoint
│   │   ├── dashboard/      # Dashboard page
│   │   ├── patients/       # Patient management pages
│   │   ├── appointments/   # Appointment management pages
│   │   ├── records/        # Medical records pages
│   │   ├── login/          # Login page
│   │   ├── register/       # Register page
│   │   ├── layout.js       # Root layout
│   │   └── page.js         # Home page
│   ├── components/         # Reusable components
│   ├── lib/
│   │   ├── prisma.js       # Prisma client
│   │   └── supabase.js     # Supabase client
│   └── utils/              # Utility functions
├── .env.example            # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json
```

## 🗄️ Database Schema

The application uses the following main entities:

- **User**: Staff/healthcare providers
- **Patient**: Mother and baby information
- **Appointment**: Clinic appointments
- **MedicalRecord**: Electronic medical records
- **LactationConsultation**: Detailed lactation consultation data
- **Visit**: Visit tracking

## 🚢 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/hearis71/klinik_laktasi_ERM.git
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DATABASE_URL`
4. Add build command: `npx prisma generate && next build`
5. Deploy!

## 📝 API Endpoints

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients?id={id}` - Get single patient
- `POST /api/patients` - Create patient
- `DELETE /api/patients?id={id}` - Delete patient

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create appointment
- `DELETE /api/appointments?id={id}` - Delete appointment

### Medical Records
- `GET /api/records` - Get all records
- `GET /api/records?id={id}` - Get single record
- `POST /api/records` - Create record
- `DELETE /api/records?id={id}` - Delete record

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Auth
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register

## 🔐 Authentication

Currently using demo mode for development. For production:
1. Enable Supabase Auth
2. Update `/src/app/api/auth` endpoints
3. Implement session management with `@supabase/ssr`

## 📄 License

MIT License

## 👨‍💻 Author

Developed for Klinik Laktasi IKMI

---

For questions or support, please contact the development team.
