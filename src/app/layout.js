import './globals.css'

export const metadata = {
  title: 'Klinik Laktasi ERM - Electronic Medical Record',
  description: 'Sistem Manajemen Rekam Medis Elektronik untuk Klinik Laktasi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
