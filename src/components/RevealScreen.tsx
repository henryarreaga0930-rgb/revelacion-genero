'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { addPrediction, getPredictions } from '@/lib/storage'

interface RevealScreenProps {
  userData: { name: string; family: string; prediction: string }
}

interface Prediction {
  id: string
  name: string
  family: string
  prediction: string
  timestamp: string
}

export default function RevealScreen({ userData }: RevealScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isRevealed, setIsRevealed] = useState(false)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [showPredictions, setShowPredictions] = useState(false)
  
  // Fotos de ejemplo - reemplazar con fotos reales
  const babyPhotos = [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=3',
    'https://picsum.photos/400/300?random=4',
    'https://picsum.photos/400/300?random=5',
    'https://picsum.photos/400/300?random=6'
  ]

  // Cargar predicciones guardadas
  useEffect(() => {
    const loadPredictions = async () => {
      try {
        const savedPredictions = await getPredictions()
        setPredictions(savedPredictions)
      } catch (error) {
        console.error('Error loading predictions:', error)
      }
    }
    loadPredictions()
  }, [])

  // Guardar la predicción actual
  useEffect(() => {
    if (userData.name) {
      const savePrediction = async () => {
        try {
          await addPrediction({
            name: userData.name,
            family: userData.family,
            prediction: userData.prediction
          })
          
          // Recargar predicciones después de guardar
          const updatedPredictions = await getPredictions()
          setPredictions(updatedPredictions)
        } catch (error) {
          console.error('Error saving prediction:', error)
        }
      }
      savePrediction()
    }
  }, [userData])

  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleReveal = () => {
    setIsRevealed(true)
    // Mostrar flechas de scroll después de un momento
    setTimeout(() => {
      setShowPredictions(true)
    }, 2000)
  }

  const scrollToPredictions = () => {
    const element = document.getElementById('predictions-section')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-24 h-24 border-4 border-pink-200 rounded-full"></div>
            <motion.div
              className="w-24 h-24 border-4 border-pink-500 rounded-full border-t-transparent absolute top-0 left-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            ></motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-lg font-medium text-gray-600"
          >
            Preparando la revelación...
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-2 text-sm text-gray-500"
          >
            {userData.name}, estamos listos para mostrarte el misterio...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-cute text-pink-500 mb-2">
            👶 Revelación de Género
          </h1>
          <p className="text-gray-600">
            {userData.name} • {userData.family === 'esposo' ? 'Familia del esposo' : 'Familia de la esposa'}
          </p>
        </motion.div>

        {/* Sección de Revelación */}
        {!isRevealed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">🎁</div>
              <h2 className="text-2xl font-cute text-pink-500 mb-4">
                ¿Listo para conocer el secreto?
              </h2>
              <p className="text-gray-600 mb-6">
                Tu predicción: {userData.prediction === 'niño' ? '👦 Niño' : '👧 Niña'}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReveal}
                className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:from-pink-500 hover:to-pink-600 transition-all"
              >
                🎉 REVELAR
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Revelación del Género */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="text-center mb-12"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
                <div className="text-8xl mb-4">👧</div>
                <h2 className="text-4xl font-cute text-pink-500 mb-2">
                  ¡ES UNA NIÑA!
                </h2>
                <p className="text-xl text-gray-600">
                  ¡Viene una princesa a la familia! 👑💖
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  {userData.prediction === 'niña' ? '✅ ¡Acertaste!' : '❌ Casi...'}
                </div>
              </div>
            </motion.div>

            {/* Galería de Fotos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-cute text-center text-blue-500 mb-6">
                📸 Galería de Fotos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {babyPhotos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden rounded-lg shadow-lg"
                  >
                    <img
                      src={photo}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-2 left-2 text-white text-sm">
                        Foto {index + 1}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Flecha animada para scroll */}
            <AnimatePresence>
              {showPredictions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center mb-8"
                >
                  <motion.button
                    onClick={scrollToPredictions}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-pink-500 hover:text-pink-600 transition-colors"
                  >
                    <div className="text-2xl">⬇️</div>
                    <p className="text-sm font-medium">Ver predicciones de todos</p>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Sección de Predicciones */}
      <AnimatePresence>
        {isRevealed && showPredictions && (
          <motion.div
            id="predictions-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm py-12"
          >
            <div className="max-w-4xl mx-auto px-4">
              <h3 className="text-3xl font-cute text-center text-pink-500 mb-8">
                📊 Predicciones de la Familia
              </h3>
              
              {/* Estadísticas */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center bg-pink-50 rounded-lg p-4">
                  <div className="text-3xl mb-2">👧</div>
                  <div className="text-2xl font-bold text-pink-600">
                    {predictions.filter(p => p.prediction === 'niña').length}
                  </div>
                  <div className="text-sm text-gray-600">Creen que es niña</div>
                </div>
                <div className="text-center bg-blue-50 rounded-lg p-4">
                  <div className="text-3xl mb-2">👦</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {predictions.filter(p => p.prediction === 'niño').length}
                  </div>
                  <div className="text-sm text-gray-600">Creen que es niño</div>
                </div>
                <div className="text-center bg-purple-50 rounded-lg p-4">
                  <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {predictions.length}
                  </div>
                  <div className="text-sm text-gray-600">Total participantes</div>
                </div>
              </div>

              {/* Lista de participantes */}
              <div className="space-y-3">
                {predictions.map((prediction, index) => (
                  <motion.div
                    key={prediction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-4 shadow-md border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">
                          {prediction.prediction === 'niña' ? '👧' : '👦'}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">
                            {prediction.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {prediction.family === 'esposo' ? 'Familia del esposo' : 'Familia de la esposa'} • 
                            {prediction.prediction === 'niña' ? ' Niña' : ' Niño'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">
                          {prediction.timestamp}
                        </div>
                        <div className={`text-sm font-medium ${
                          prediction.prediction === 'niña' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {prediction.prediction === 'niña' ? '✅ ¡Correcto!' : '❌ Incorrecto'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {predictions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Aún no hay predicciones guardadas
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
