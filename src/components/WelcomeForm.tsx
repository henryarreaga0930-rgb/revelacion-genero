'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface WelcomeFormProps {
  onSubmit: (data: { name: string; family: string; prediction: string }) => void
}

export default function WelcomeForm({ onSubmit }: WelcomeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    family: '',
    prediction: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    family: '',
    prediction: ''
  })

  const validateForm = () => {
    const newErrors = {
      name: '',
      family: '',
      prediction: ''
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Por favor ingresa tu nombre'
    }

    if (!formData.family) {
      newErrors.family = 'Por favor selecciona tu familia'
    }

    if (!formData.prediction) {
      newErrors.prediction = 'Por favor haz tu predicción'
    }

    setErrors(newErrors)
    return !newErrors.name && !newErrors.family && !newErrors.prediction
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-purple-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <span className="text-4xl">🎉</span>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Revelación de Género
              </h1>
              <span className="text-4xl">🎉</span>
            </div>
            <p className="text-gray-600 text-lg">
              ¡Únete a la emoción de descubrir el misterio!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                👤 Tu Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                  errors.name 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-purple-200 focus:border-purple-500 focus:bg-purple-50'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
                placeholder="Escribe tu nombre"
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </div>

            {/* Familia */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                👨‍👩‍👧‍👦 ¿De qué familia eres?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('family', 'esposo')}
                  className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                    formData.family === 'esposo'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-lg'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  👨‍👩‍👦‍👦 Familia del esposo
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('family', 'esposa')}
                  className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                    formData.family === 'esposa'
                      ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white border-pink-500 shadow-lg'
                      : 'bg-white border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                  }`}
                >
                  👩‍👩‍👧‍ Familia de la esposa
                </button>
              </div>
              {errors.family && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.family}
                </motion.p>
              )}
            </div>

            {/* Predicción */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                🔮 ¿Qué crees que será?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('prediction', 'niño')}
                  className={`py-4 px-4 rounded-xl border-2 font-medium transition-all ${
                    formData.prediction === 'niño'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-lg'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="text-3xl mb-1">👦</div>
                  <div>Niño</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('prediction', 'niña')}
                  className={`py-4 px-4 rounded-xl border-2 font-medium transition-all ${
                    formData.prediction === 'niña'
                      ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white border-pink-500 shadow-lg'
                      : 'bg-white border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                  }`}
                >
                  <div className="text-3xl mb-1">👧</div>
                  <div>Niña</div>
                </button>
              </div>
              {errors.prediction && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.prediction}
                </motion.p>
              )}
            </div>

            {/* Botón de Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!formData.name || !formData.family || !formData.prediction}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all ${
                formData.name && formData.family && formData.prediction
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {formData.name && formData.family && formData.prediction ? (
                <span className="flex items-center justify-center space-x-2">
                  <span>🎉</span>
                  <span>Continuar a la Revelación</span>
                  <span>🎉</span>
                </span>
              ) : (
                <span>Completa todos los campos</span>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              🤫 Tu predicción quedará guardada hasta la gran revelación...
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
