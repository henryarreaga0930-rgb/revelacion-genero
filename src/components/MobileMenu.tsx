'use client'

import { motion } from 'framer-motion'

interface MobileMenuProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function MobileMenu({ activeSection, setActiveSection }: MobileMenuProps) {
  const menuItems = [
    { id: 'bienvenida', label: '🏠 Bienvenida', icon: '🏠' },
    { id: 'grabar', label: '📹 Grabar Video', icon: '📹' },
    { id: 'galeria', label: '🖼️ Galería', icon: '🖼️' }
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around py-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
              activeSection === item.id
                ? 'text-pink-500 bg-pink-50'
                : 'text-gray-600 hover:text-pink-400'
            }`}
          >
            <div className="text-2xl mb-1">{item.icon}</div>
            <div className="text-xs font-medium">{item.label.split(' ')[1]}</div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
