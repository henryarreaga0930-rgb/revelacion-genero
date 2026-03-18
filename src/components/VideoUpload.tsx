'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface VideoUploadProps {}

export default function VideoUpload({}: VideoUploadProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [videoURL, setVideoURL] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    family: '',
    side: '',
    prediction: '',
    message: ''
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setVideoURL(url)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el video y los datos
    alert('¡Video subido exitosamente! Gracias por participar.')
    // Reset form
    setFormData({
      name: '',
      family: '',
      side: '',
      prediction: '',
      message: ''
    })
    setVideoURL('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8"
      >
        <h2 className="text-3xl font-cute text-center mb-6 text-pink-500">
          📹 Sube tu video de predicción
        </h2>
        
        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">📝 Instrucciones para tu video:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Comienza diciendo tu nombre completo</li>
            <li>Menciona a qué familia perteneces (paterna o materna)</li>
            <li>Indica si eres del lado del novio o la novia</li>
            <li>Di qué crees que será el bebé (niño 👦 o niña 👧)</li>
            <li>Agrega un mensaje especial y divertido (máximo 30 segundos)</li>
            <li>Sé creativo y diviértete mucho</li>
          </ol>
        </div>

        {/* Upload Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecciona tu video
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {videoURL && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <video
                src={videoURL}
                controls
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tu nombre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Ej: María García"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Familia *
                </label>
                <select
                  required
                  value={formData.family}
                  onChange={(e) => setFormData({...formData, family: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Selecciona...</option>
                  <option value="paterna">Familia Paterna</option>
                  <option value="materna">Familia Materna</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lado *
                </label>
                <select
                  required
                  value={formData.side}
                  onChange={(e) => setFormData({...formData, side: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Selecciona...</option>
                  <option value="novio">Lado del Novio</option>
                  <option value="novia">Lado de la Novia</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ¿Qué crees que será? *
                </label>
                <select
                  required
                  value={formData.prediction}
                  onChange={(e) => setFormData({...formData, prediction: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Selecciona...</option>
                  <option value="niño">👦 Niño</option>
                  <option value="niña">👧 Niña</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje especial (opcional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                rows={3}
                placeholder="Déja un mensaje especial para los futuros papás..."
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary"
              disabled={!videoURL}
            >
              📤 Subir video y participar
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
