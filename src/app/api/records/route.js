import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Fetch all medical records
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const patientId = searchParams.get('patientId')

    if (id) {
      const record = await prisma.medicalRecord.findUnique({
        where: { id },
        include: {
          patient: true,
          user: true,
          lactationConsultation: true,
        },
      })

      if (!record) {
        return NextResponse.json({ error: 'Record not found' }, { status: 404 })
      }

      return NextResponse.json(record)
    }

    const where = {}
    if (patientId) {
      where.patientId = patientId
    }

    const records = await prisma.medicalRecord.findMany({
      where,
      orderBy: { visitDate: 'desc' },
      include: {
        patient: true,
        user: true,
        lactationConsultation: true,
      },
    })

    return NextResponse.json(records)
  } catch (error) {
    console.error('Error fetching medical records:', error)
    return NextResponse.json({ error: 'Failed to fetch medical records' }, { status: 500 })
  }
}

// POST - Create new medical record
export async function POST(request) {
  try {
    const body = await request.json()
    const {
      recordNumber,
      patientId,
      userId,
      chiefComplaint,
      history,
      assessment,
      plan,
      lactationIssue,
      intervention,
      followUpPlan,
      lactationConsultation,
    } = body

    if (!recordNumber || !patientId || !chiefComplaint) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create medical record with optional lactation consultation
    const record = await prisma.medicalRecord.create({
      data: {
        recordNumber,
        patientId,
        userId: userId || 'system',
        chiefComplaint,
        history,
        assessment,
        plan,
        lactationIssue,
        intervention,
        followUpPlan,
        lactationConsultation: lactationConsultation ? {
          create: lactationConsultation,
        } : undefined,
      },
      include: {
        patient: true,
        lactationConsultation: true,
      },
    })

    return NextResponse.json(record, { status: 201 })
  } catch (error) {
    console.error('Error creating medical record:', error)
    return NextResponse.json({ error: 'Failed to create medical record' }, { status: 500 })
  }
}

// DELETE - Delete medical record
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Record ID required' }, { status: 400 })
    }

    await prisma.medicalRecord.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Record deleted successfully' })
  } catch (error) {
    console.error('Error deleting medical record:', error)
    return NextResponse.json({ error: 'Failed to delete medical record' }, { status: 500 })
  }
}
