'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryProps {
  isRevealed: boolean
  setIsRevealed: (revealed: boolean) => void
}

export default function Gallery({ isRevealed, setIsRevealed }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Sample ultrasound images - en producción vendrían de una base de datos
  const ultrasoundImages = [
    { id: 1, thumbnail: '/api/placeholder/300/300', full: '/api/placeholder/800/600', title: 'Semana 12', description: '¡Nuestro bebé ya tiene manitas!' },
    { id: 2, thumbnail: '/api/placeholder/300/300', full: '/api/placeholder/800/600', title: 'Semana 16', description: 'Mirando hacia la cámara' },
    { id: 3, thumbnail: '/api/placeholder/300/300', full: '/api/placeholder/800/600', title: 'Semana 20', description: 'El perfilcito del papá' },
    { id: 4, thumbnail: '/api/placeholder/300/300', full: '/api/placeholder/800/600', title: 'Semana 24', description: '¡Ya baila en la pancita!' },
  ]

  const handleReveal = () => {
    setIsRevealed(true)
    // Aquí podría ir una animación especial o confeti
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8"
      >
        <h2 className="text-3xl font-cute text-center mb-6 text-purple-500">
          🖼️ Galería de Ecografías
        </h2>

        {/* Reveal Section */}
        {!isRevealed ? (
          <div className="text-center py-12">
            <div className="mb-8">
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-2xl font-cute text-pink-500 mb-4">
                ¿Listos para conocer el secreto?
              </h3>
              <p className="text-gray-600 mb-8">
                El gran misterio está por ser revelado...
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReveal}
              className="btn-primary text-xl px-8 py-4"
            >
              🎉 ¡REVELAR GÉNERO! 🎉
            </motion.button>
            
            <div className="mt-8 text-sm text-gray-500">
              <p>¿Estás seguro de que quieres saberlo?</p>
              <p>No hay vuelta atrás... 😉</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mb-8"
            >
              <div className="text-8xl mb-4">🎊</div>
              <h3 className="text-4xl font-cute bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-4">
                ¡ES UNA... 
              </h3>
              <div className="text-6xl mb-4">
                👧 ¡NIÑA! 👧
              </div>
              <p className="text-xl text-gray-700">
                ¡Viene una princesa a la familia! 👑💖
              </p>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Gallery Grid */}
      {isRevealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {ultrasoundImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(image.id)}
                className="cursor-pointer"
              >
                <div className="relative group">
                  <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={image.thumbnail}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-lg font-semibold">{image.title}</div>
                      <div className="text-sm">{image.description}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Special Reveal Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="card text-center"
          >
            <h3 className="text-2xl font-cute text-pink-500 mb-4">
              🌟 La imagen que lo dice todo 🌟
            </h3>
            <div className="relative inline-block">
              <div className="w-64 h-64 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg flex items-center justify-center mx-auto">
                <div className="text-center">
                  <div className="text-6xl mb-2">👧</div>
                  <div className="text-2xl font-bold text-pink-700">¡NIÑA!</div>
                  <div className="text-sm text-pink-600 mt-2">100% confirmado</div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 text-4xl animate-bounce">✨</div>
              <div className="absolute -bottom-2 -left-2 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>💖</div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">
                    {ultrasoundImages.find(img => img.id === selectedImage)?.title}
                  </h3>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <img
                  src={ultrasoundImages.find(img => img.id === selectedImage)?.full}
                  alt=""
                  className="w-full h-auto rounded-lg"
                />
                <p className="mt-4 text-gray-600">
                  {ultrasoundImages.find(img => img.id === selectedImage)?.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
