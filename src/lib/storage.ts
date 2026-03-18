// Sistema de almacenamiento usando Upstash Redis
// Funciona siempre con base de datos, tanto en desarrollo como en producción

interface Prediction {
  id: string
  name: string
  family: string
  prediction: string
  timestamp: string
}

export async function addPrediction(prediction: Omit<Prediction, 'id' | 'timestamp'>): Promise<void> {
  const newPrediction: Prediction = {
    ...prediction,
    id: Date.now().toString(),
    timestamp: new Date().toLocaleString('es-ES')
  }

  try {
    console.log('Enviando predicción a la API:', newPrediction)
    
    const response = await fetch('/api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPrediction),
    })
    
    console.log('Respuesta de la API:', response.status, response.statusText)
    
    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error de la API:', errorData)
      throw new Error(errorData.error || 'Failed to save prediction')
    }
    
    const successData = await response.json()
    console.log('Éxito guardando predicción:', successData)
  } catch (error) {
    console.error('Error completo al guardar predicción:', error)
    throw error
  }
}

export async function getPredictions(): Promise<Prediction[]> {
  try {
    console.log('Obteniendo predicciones desde la API')
    
    const response = await fetch('/api/predictions')
    console.log('Respuesta de API GET:', response.status)
    
    if (response.ok) {
      const predictions = await response.json()
      console.log('Predicciones obtenidas:', predictions.length)
      return predictions
    } else {
      const errorData = await response.json()
      console.error('Error obteniendo predicciones:', errorData)
      return []
    }
  } catch (error) {
    console.error('Error completo obteniendo predicciones:', error)
    return []
  }
}
