'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewRecordPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [patients, setPatients] = useState([])
  const [formData, setFormData] = useState({
    recordNumber: '',
    patientId: '',
    chiefComplaint: '',
    history: '',
    assessment: '',
    plan: '',
    lactationIssue: '',
    intervention: '',
    followUpPlan: '',
    lactationConsultation: {
      breastfeedingFreq: '',
      breastfeedingDuration: '',
      latchQuality: 'NOT_ASSESSED',
      milkSupply: 'NOT_ASSESSED',
      nippleCondition: '',
      breastCondition: '',
      babyWeight: '',
      babyLength: '',
      headCircumference: '',
      feedingMethod: 'EXCLUSIVE_BREASTFEEDING',
      supplementUse: false,
      supplementType: '',
      educationGiven: '',
    },
  })

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
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleConsultationChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      lactationConsultation: {
        ...formData.lactationConsultation,
        [name]: type === 'checkbox' ? checked : value,
      },
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/records')
      } else {
        const data = await response.json()
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.error('Error creating record:', error)
      alert('Failed to create medical record')
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
          <Link href="/patients" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            👥 Pasien
          </Link>
          <Link href="/appointments" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            📅 Janji Temu
          </Link>
          <Link href="/records" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md bg-primary-50 text-primary-600">
            📋 Rekam Medis
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="pl-64">
        {/* Top Bar */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-2xl font-bold text-gray-800">Rekam Medis Baru</h2>
            <Link href="/records" className="text-primary-600 hover:text-primary-700">Kembali</Link>
          </div>
        </header>

        <main className="p-6">
          <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 max-w-4xl">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Kunjungan</h3>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Record Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">No. Rekam Medis</label>
                <input
                  type="text"
                  name="recordNumber"
                  value={formData.recordNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                  placeholder="RM-2026-001"
                />
              </div>

              {/* Patient Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Pasien</label>
                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                >
                  <option value="">Pilih Pasien</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.motherName} - {patient.babyName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chief Complaint */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Keluhan Utama</label>
                <textarea
                  name="chiefComplaint"
                  value={formData.chiefComplaint}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              {/* History */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Riwayat Penyakit</label>
                <textarea
                  name="history"
                  value={formData.history}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              {/* Assessment */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Asesmen</label>
                <textarea
                  name="assessment"
                  value={formData.assessment}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              {/* Plan */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Rencana Tindakan</label>
                <textarea
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              {/* Lactation Issue */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Masalah Laktasi</label>
                <textarea
                  name="lactationIssue"
                  value={formData.lactationIssue}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              {/* Intervention */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Intervensi</label>
                <textarea
                  name="intervention"
                  value={formData.intervention}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              {/* Follow Up Plan */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Rencana Tindak Lanjut</label>
                <textarea
                  name="followUpPlan"
                  value={formData.followUpPlan}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>
            </div>

            {/* Lactation Consultation Details */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Detail Konsultasi Laktasi</h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Breastfeeding Frequency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Frekuensi Menyusu</label>
                  <input
                    type="text"
                    name="breastfeedingFreq"
                    value={formData.lactationConsultation.breastfeedingFreq}
                    onChange={handleConsultationChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                    placeholder="e.g., 8-12 kali/hari"
                  />
                </div>

                {/* Breastfeeding Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Durasi Menyusu</label>
                  <input
                    type="text"
                    name="breastfeedingDuration"
                    value={formData.lactationConsultation.breastfeedingDuration}
                    onChange={handleConsultationChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                    placeholder="e.g., 15-20 menit"
                  />
                </div>

                {/* Latch Quality */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kualitas Latch</label>
                  <select
                    name="latchQuality"
                    value={formData.lactationConsultation.latchQuality}
                    onChange={handleConsultationChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                  >
                    <option value="GOOD">Baik</option>
                    <option value="FAIR">Cukup</option>
                    <option value="POOR">Kurang</option>
                    <option value="NOT_ASSESSED">Tidak Dinilai</option>
                  </select>
                </div>

                {/* Milk Supply */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Produksi ASI</label>
                  <select
                    name="milkSupply"
                    value={formData.lactationConsultation.milkSupply}
                    onChange={handleConsultationChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                  >
                    <option value="ABUNDANT">Berlimpah</option>
                    <option value="ADEQUATE">Cukup</option>
                    <option value="LOW">Kurang</option>
                    <option value="VERY_LOW">Sangat Kurang</option>
                    <option value="NOT_ASSESSED">Tidak Dinilai</option>
                  </select>
                </div>

                {/* Baby Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Berat Bayi (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="babyWeight"
                    value={formData.lactationConsultation.babyWeight}
                    onChange={handleConsultationChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                  />
                </div>

                {/* Baby Length */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Panjang Bayi (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="babyLength"
                    value={formData.lactationConsultation.babyLength}
                    onChange={handleConsultationChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                  />
                </div>

                {/* Head Circumference */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Lingkar Kepala (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="headCircumference"
                    value={formData.lactationConsultation.headCircumference}
                    onChange={handleConsultationChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                  />
                </div>

                {/* Feeding Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Metode Pemberian Makan</label>
                  <select
                    name="feedingMethod"
                    value={formData.lactationConsultation.feedingMethod}
                    onChange={handleConsultationChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                  >
                    <option value="EXCLUSIVE_BREASTFEEDING">ASI Eksklusif</option>
                    <option value="MIXED_FEEDING">Campuran</option>
                    <option value="FORMULA_FEEDING">Susu Formula</option>
                    <option value="EXPRESSED_BREASTMILK">ASI Perah</option>
                  </select>
                </div>

                {/* Supplement Use */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="supplementUse"
                    checked={formData.lactationConsultation.supplementUse}
                    onChange={handleConsultationChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Menggunakan Suplemen</label>
                </div>

                {/* Supplement Type */}
                {formData.lactationConsultation.supplementUse && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Jenis Suplemen</label>
                    <input
                      type="text"
                      name="supplementType"
                      value={formData.lactationConsultation.supplementType}
                      onChange={handleConsultationChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                )}

                {/* Education Given */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Edukasi yang Diberikan</label>
                  <textarea
                    name="educationGiven"
                    value={formData.lactationConsultation.educationGiven}
                    onChange={handleConsultationChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <Link
                href="/records"
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
