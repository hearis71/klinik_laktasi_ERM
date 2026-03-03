import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Fetch dashboard statistics
export async function GET() {
  try {
    const totalPatients = await prisma.patient.count()
    const totalRecords = await prisma.medicalRecord.count()
    
    // Get today's appointments
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const todayAppointments = await prisma.appointment.count({
      where: {
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
    })

    // Get pending follow-ups (appointments with status SCHEDULED or CONFIRMED)
    const pendingFollowUps = await prisma.appointment.count({
      where: {
        status: {
          in: ['SCHEDULED', 'CONFIRMED'],
        },
      },
    })

    return NextResponse.json({
      totalPatients,
      todayAppointments,
      totalRecords,
      pendingFollowUps,
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({
      totalPatients: 0,
      todayAppointments: 0,
      totalRecords: 0,
      pendingFollowUps: 0,
    })
  }
}
