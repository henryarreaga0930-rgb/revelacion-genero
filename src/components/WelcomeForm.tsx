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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.family && formData.prediction) {
      onSubmit(formData)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-cute text-pink-500 mb-2">
            👶 Revelación de Género
          </h1>
          <p className="text-gray-600">
            ¡Adivina el género de nuestro bebé!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tu nombre
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Escribe tu nombre"
              required
            />
          </div>

          {/* Familia */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿De qué familia eres?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({...formData, family: 'esposo'})}
                className={`py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.family === 'esposo'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                👨‍👩‍👦‍👦 Familia del esposo
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, family: 'esposa'})}
                className={`py-3 px-4 rounded-lg border-2 transition-all ${
                  formData.family === 'esposa'
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                👩‍👩‍👧‍👦 Familia de la esposa
              </button>
            </div>
          </div>

          {/* Predicción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué crees que será?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({...formData, prediction: 'niño'})}
                className={`py-6 px-4 rounded-lg border-2 transition-all ${
                  formData.prediction === 'niño'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-3xl mb-2">👦</div>
                <div className="font-semibold">Niño</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, prediction: 'niña'})}
                className={`py-6 px-4 rounded-lg border-2 transition-all ${
                  formData.prediction === 'niña'
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-3xl mb-2">👧</div>
                <div className="font-semibold">Niña</div>
              </button>
            </div>
          </div>

          {/* Botón Continuar */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:from-pink-500 hover:to-pink-600 transition-all"
            disabled={!formData.name || !formData.family || !formData.prediction}
          >
            Continuar
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
