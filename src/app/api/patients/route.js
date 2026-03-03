import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Fetch all patients
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      // Fetch single patient
      const patient = await prisma.patient.findUnique({
        where: { id },
        include: {
          appointments: true,
          medicalRecords: true,
        },
      })

      if (!patient) {
        return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
      }

      return NextResponse.json(patient)
    }

    // Fetch all patients
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        appointments: true,
        medicalRecords: true,
      },
    })

    return NextResponse.json(patients)
  } catch (error) {
    console.error('Error fetching patients:', error)
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 })
  }
}

// POST - Create new patient
export async function POST(request) {
  try {
    const body = await request.json()
    const {
      medicalRecordId,
      motherName,
      motherAge,
      motherPhone,
      motherAddress,
      babyName,
      babyAge,
      babyGender,
      complaint,
      notes,
    } = body

    // Validate required fields
    if (!medicalRecordId || !motherName || !motherPhone || !babyName || !babyAge || !babyGender) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if medical record ID already exists
    const existing = await prisma.patient.findUnique({
      where: { medicalRecordId },
    })

    if (existing) {
      return NextResponse.json({ error: 'Medical record ID already exists' }, { status: 400 })
    }

    const patient = await prisma.patient.create({
      data: {
        medicalRecordId,
        motherName,
        motherAge: parseInt(motherAge),
        motherPhone,
        motherAddress,
        babyName,
        babyAge,
        babyGender,
        complaint,
        notes,
      },
    })

    return NextResponse.json(patient, { status: 201 })
  } catch (error) {
    console.error('Error creating patient:', error)
    return NextResponse.json({ error: 'Failed to create patient' }, { status: 500 })
  }
}

// DELETE - Delete patient
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Patient ID required' }, { status: 400 })
    }

    await prisma.patient.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Patient deleted successfully' })
  } catch (error) {
    console.error('Error deleting patient:', error)
    return NextResponse.json({ error: 'Failed to delete patient' }, { status: 500 })
  }
}
