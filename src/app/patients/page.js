'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PatientsPage() {
  const router = useRouter()
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/patients')
      if (response.ok) {
        const data = await response.json()
        setPatients(data)
      }
    } catch (error) {
      console.error('Error fetching patients:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pasien ini?')) return

    try {
      const response = await fetch(`/api/patients?id=${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchPatients()
      }
    } catch (error) {
      console.error('Error deleting patient:', error)
    }
  }

  const filteredPatients = patients.filter(patient =>
    patient.motherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.babyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.medicalRecordId?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-16 bg-primary-600">
          <h1 className="text-xl font-bold text-white">🤱 Klinik Laktasi</h1>
        </div>
        <nav className="mt-5 px-2">
          <Link href="/dashboard" className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            📊 Dashboard
          </Link>
          <Link href="/patients" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md bg-primary-50 text-primary-600">
            👥 Pasien
          </Link>
          <Link href="/appointments" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            📅 Janji Temu
          </Link>
          <Link href="/records" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            📋 Rekam Medis
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="pl-64">
        {/* Top Bar */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-2xl font-bold text-gray-800">Manajemen Pasien</h2>
            <Link href="/" className="text-primary-600 hover:text-primary-700">Logout</Link>
          </div>
        </header>

        <main className="p-6">
          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Cari pasien..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <Link
              href="/patients/new"
              className="ml-4 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            >
              + Pasien Baru
            </Link>
          </div>

          {/* Patients Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. RM</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Ibu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Bayi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usia Bayi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kelamin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Telepon</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">Memuat...</td>
                  </tr>
                ) : filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">Belum ada data pasien</td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.medicalRecordId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.motherName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.babyName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.babyAge}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.babyGender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.motherPhone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/patients/${patient.id}`} className="text-primary-600 hover:text-primary-900 mr-3">Lihat</Link>
                        <Link href={`/patients/edit/${patient.id}`} className="text-blue-600 hover:text-blue-900 mr-3">Edit</Link>
                        <button onClick={() => handleDelete(patient.id)} className="text-red-600 hover:text-red-900">Hapus</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
