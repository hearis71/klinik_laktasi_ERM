import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary-50 to-primary-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">🤱 Klinik Laktasi ERM</h1>
            <nav className="flex space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link href="/register" className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium">
                Register
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Sistem Manajemen Klinik Laktasi
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Electronic Medical Record (ERM) untuk pengelolaan rekam medis pasien klinik laktasi secara digital dan terintegrasi
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/dashboard" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10">
                Mulai Sekarang
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/about" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Pelajari Lebih
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Fitur</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Manajemen Klinik Laktasi Lengkap
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  📋
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Rekam Medis Elektronik</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Pengelolaan rekam medis pasien secara digital dengan akses cepat dan aman
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  📅
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Janji Temu</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Sistem pengaturan jadwal appointment dengan pasien yang terintegrasi
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  👶
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Konsultasi Laktasi</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Pencatatan detail konsultasi laktasi dengan asesmen komprehensif
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-400 text-sm">
            © 2026 Klinik Laktasi ERM. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
