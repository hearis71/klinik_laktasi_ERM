import { NextResponse } from 'next/server'

// POST - Login (Demo mode - accepts any credentials)
export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // In production, validate against Supabase Auth
    // For demo, accept any credentials
    if (email && password) {
      return NextResponse.json({
        message: 'Login successful',
        user: {
          email,
          name: email.split('@')[0],
          role: 'STAFF',
        },
      })
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
