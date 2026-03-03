import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Fetch all appointments
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const patientId = searchParams.get('patientId')

    if (id) {
      const appointment = await prisma.appointment.findUnique({
        where: { id },
        include: {
          patient: true,
          user: true,
        },
      })

      if (!appointment) {
        return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
      }

      return NextResponse.json(appointment)
    }

    const where = {}
    if (patientId) {
      where.patientId = patientId
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: { date: 'desc' },
      include: {
        patient: true,
        user: true,
      },
    })

    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}

// POST - Create new appointment
export async function POST(request) {
  try {
    const body = await request.json()
    const {
      patientId,
      userId,
      date,
      time,
      status,
      notes,
    } = body

    if (!patientId || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        userId,
        date: new Date(date),
        time,
        status: status || 'SCHEDULED',
        notes,
      },
      include: {
        patient: true,
      },
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}

// DELETE - Delete appointment
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Appointment ID required' }, { status: 400 })
    }

    await prisma.appointment.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Appointment deleted successfully' })
  } catch (error) {
    console.error('Error deleting appointment:', error)
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 })
  }
}
