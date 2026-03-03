'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewPatientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    medicalRecordId: '',
    motherName: '',
    motherAge: '',
    motherPhone: '',
    motherAddress: '',
    babyName: '',
    babyAge: '',
    babyGender: 'PEREMPUAN',
    complaint: '',
    notes: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/patients')
      } else {
        const data = await response.json()
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.error('Error creating patient:', error)
      alert('Failed to create patient')
    } finally {
      setLoading(false)
    }
  }

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
            <h2 className="text-2xl font-bold text-gray-800">Tambah Pasien Baru</h2>
            <Link href="/patients" className="text-primary-600 hover:text-primary-700">Kembali</Link>
          </div>
        </header>

        <main className="p-6">
          <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 max-w-4xl">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Pasien</h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Medical Record ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700">No. Rekam Medis</label>
                <input
                  type="text"
                  name="medicalRecordId"
                  value={formData.medicalRecordId}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                  placeholder="RM-2026-001"
                />
              </div>

              {/* Mother Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Ibu</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              {/* Mother Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Usia Ibu (tahun)</label>
                <input
                  type="number"
                  name="motherAge"
                  value={formData.motherAge}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              {/* Mother Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">No. Telepon</label>
                <input
                  type="tel"
                  name="motherPhone"
                  value={formData.motherPhone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              {/* Mother Address */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Alamat</label>
                <textarea
                  name="motherAddress"
                  value={formData.motherAddress}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              {/* Baby Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Bayi</label>
                <input
                  type="text"
                  name="babyName"
                  value={formData.babyName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              {/* Baby Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Usia Bayi</label>
                <input
                  type="text"
                  name="babyAge"
                  value={formData.babyAge}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                  placeholder="e.g., 3 bulan, 2 minggu"
                />
              </div>

              {/* Baby Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Jenis Kelamin Bayi</label>
                <select
                  name="babyGender"
                  value={formData.babyGender}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                >
                  <option value="LAKI_LAKI">Laki-laki</option>
                  <option value="PEREMPUAN">Perempuan</option>
                </select>
              </div>

              {/* Complaint */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Keluhan Utama</label>
                <textarea
                  name="complaint"
                  value={formData.complaint}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              {/* Notes */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Catatan</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <Link
                href="/patients"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
              >
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
