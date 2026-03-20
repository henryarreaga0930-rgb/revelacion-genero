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
  const [showCountdown, setShowCountdown] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [showArrow, setShowArrow] = useState(false) // Renombrado de showPredictions a showArrow
  
  // Fotos reales del bebé
  const babyPhotos = [
    '/images/bebe-1.jpeg',
    '/images/bebe-2.jpeg', 
    '/images/bebe-3.jpeg',
    '/images/bebe-4.jpeg',
    '/images/bebe-5.jpeg',
    '/images/bebe-6.jpeg'
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
    setShowCountdown(true)
    
    // Countdown de 5 a 1
    for (let i = 5; i >= 0; i--) {
      setTimeout(() => {
        setCountdown(i)
        if (i === 0) {
          setTimeout(() => {
            setShowCountdown(false)
            setIsRevealed(true)
            // Mostrar flechas de scroll después de un momento
            setTimeout(() => {
              setShowArrow(true)
            }, 2000)
          }, 500)
        }
      }, (5 - i) * 1000)
    }
  }

  const scrollToPredictions = () => {
    const element = document.getElementById('predictions-section')
    element?.scrollIntoView({ behavior: 'smooth' })
    // La flecha desaparecerá inmediatamente después del primer toque, pero la sección de predicciones sigue visible
    setTimeout(() => {
      setShowArrow(false)
    }, 100)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center flex flex-col items-center"
        >
          <div className="relative mb-8">
            <div className="w-16 h-16 border-4 border-purple-200 rounded-full"></div>
            <motion.div
              className="w-16 h-16 border-4 border-purple-500 rounded-full border-t-transparent absolute top-0 left-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            ></motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Preparando la revelación...
            </h2>
            <p className="text-gray-600">
              {userData.name}, estamos listos para mostrarte el misterio...
            </p>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-3xl">🎉</span>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Revelación de Género
            </h1>
            <span className="text-3xl">🎉</span>
          </div>
          <p className="text-gray-600 text-lg">
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
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md mx-auto border border-purple-100">
              <div className="text-6xl mb-6">🎁</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                ¿Listo para conocer el secreto?
              </h2>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
                <p className="text-gray-700 font-medium">
                  Tu predicción: 
                </p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <span className="text-2xl">
                    {userData.prediction === 'niño' ? '👦' : '👧'}
                  </span>
                  <span className="text-xl font-bold text-purple-600">
                    {userData.prediction === 'niño' ? 'Niño' : 'Niña'}
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReveal}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all"
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
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md mx-auto border border-pink-100">
                <div className="text-8xl mb-4">👧</div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  ¡ES UNA NIÑA!
                </h2>
                <p className="text-xl text-gray-700 mb-4">
                  🎊 ¡Viene una princesa a la familia! 🎊
                </p>
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
                  <div className="text-lg font-bold text-purple-600">
                    {userData.prediction === 'niña' ? '✅ ¡Acertaste!' : '❌ Casi...'}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Galería de Fotos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
                📸 Galería de Fotos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {babyPhotos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden rounded-2xl shadow-xl"
                  >
                    <img
                      src={photo}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
                        Foto {index + 1}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Flecha animada para scroll */}
            <AnimatePresence>
              {showArrow && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
                >
                  <motion.button
                    onClick={scrollToPredictions}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-4 shadow-2xl hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Sección de Predicciones */}
      {isRevealed && (
        <motion.div
          id="predictions-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-sm py-16"
        >
            <div className="max-w-4xl mx-auto px-4">
              <h3 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-12">
                 Predicciones de la Familia
              </h3>
              
              {/* Estadísticas */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="text-center bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl mb-3">👧</div>
                  <div className="text-3xl font-bold text-pink-600">
                    {predictions.filter(p => p.prediction === 'niña').length}
                  </div>
                  <div className="text-gray-600 font-medium">Creen que es niña</div>
                </div>
                <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl mb-3">👦</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {predictions.filter(p => p.prediction === 'niño').length}
                  </div>
                  <div className="text-gray-600 font-medium">Creen que es niño</div>
                </div>
                <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl mb-3">👨‍👩‍👧‍👦</div>
                  <div className="text-3xl font-bold text-purple-600">
                    {predictions.length}
                  </div>
                  <div className="text-gray-600 font-medium">Total participantes</div>
                </div>
              </div>

              {/* Lista de participantes */}
              <div className="space-y-4">
                {predictions.map((prediction, index) => (
                  <motion.div
                    key={prediction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">
                          {prediction.prediction === 'niña' ? '👧' : '👦'}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800 text-lg">
                            {prediction.name}
                          </div>
                          <div className="text-gray-600">
                            {prediction.family === 'esposo' ? 'Familia del esposo' : 'Familia de la esposa'} • 
                            {prediction.prediction === 'niña' ? ' Niña' : ' Niño'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">
                          {prediction.timestamp}
                        </div>
                        <div className={`text-lg font-bold ${
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
                <div className="text-center py-12 text-gray-500 text-lg">
                  Aún no hay predicciones guardadas
                </div>
              )}
            </div>
          </motion.div>
        )}

      {/* Popup de Countdown */}
      <AnimatePresence>
        {showCountdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              key={countdown}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-center"
            >
              {countdown > 0 ? (
                <div className="text-white">
                  <div className="text-9xl font-bold mb-4">{countdown}</div>
                  <div className="text-2xl">Prepárate...</div>
                </div>
              ) : (
                <div className="text-white">
                  <div className="text-6xl mb-4">🎊</div>
                  <div className="text-3xl font-bold">¡ES UNA NIÑA!</div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
