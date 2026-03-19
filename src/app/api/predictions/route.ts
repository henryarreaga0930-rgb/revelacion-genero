import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

interface Prediction {
  id: string
  name: string
  family: string
  prediction: string
  timestamp: string
}

// Inicializar Redis con variables de entorno
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

// GET - Obtener todas las predicciones
export async function GET() {
  try {
    console.log('GET: Iniciando obtención de predicciones')
    console.log('Redis URL:', process.env.UPSTASH_REDIS_REST_URL ? 'Configurada' : 'No configurada')
    
    const predictions = await redis.get<Prediction[]>('predictions') || []
    console.log('GET: Predicciones obtenidas:', predictions.length)
    
    return NextResponse.json(predictions)
  } catch (error) {
    console.error('GET Error detallado:', error)
    return NextResponse.json({ 
      error: 'Failed to get predictions',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// POST - Agregar una nueva predicción
export async function POST(request: NextRequest) {
  try {
    console.log('POST: Iniciando guardado de predicción')
    
    const newPrediction: Prediction = await request.json()
    console.log('POST: Nueva predicción recibida:', newPrediction)
    
    // Obtener predicciones existentes
    const existing = await redis.get<Prediction[]>('predictions') || []
    console.log('POST: Predicciones existentes:', existing.length)
    
    // Agregar nueva predicción
    const updated = [...existing, newPrediction]
    console.log('POST: Total después de agregar:', updated.length)
    
    // Guardar en Redis
    const result = await redis.set('predictions', updated)
    console.log('POST: Guardado en Redis:', result)
    
    return NextResponse.json({ 
      success: true,
      message: 'Prediction saved successfully',
      total: updated.length
    })
  } catch (error) {
    console.error('POST Error detallado:', error)
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack available')
    return NextResponse.json({ 
      error: 'Failed to add prediction',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack available'
    }, { status: 500 })
  }
}

// DELETE - Limpiar todas las predicciones (para producción)
export async function DELETE() {
  try {
    console.log('DELETE: Limpiando todas las predicciones')
    
    const result = await redis.set('predictions', [])
    console.log('DELETE: Predicciones limpiadas:', result)
    
    return NextResponse.json({ 
      success: true,
      message: 'All predictions cleared'
    })
  } catch (error) {
    console.error('DELETE Error:', error)
    return NextResponse.json({ 
      error: 'Failed to clear predictions',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
