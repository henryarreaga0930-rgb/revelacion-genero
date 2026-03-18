'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FamilyMember {
  id: string
  name: string
  family: 'paterna' | 'materna'
  side: 'novio' | 'novia'
  prediction: 'niño' | 'niña'
  message?: string
}

export default function FamilySection() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: '1', name: 'Abuela Rosa', family: 'paterna', side: 'novio', prediction: 'niño', message: '¡Será un campeón!' },
    { id: '2', name: 'Tía Carmen', family: 'materna', side: 'novia', prediction: 'niña', message: 'Viene una princesa' },
    { id: '3', name: 'Primo Juan', family: 'paterna', side: 'novio', prediction: 'niño', message: '¡Seguro niño!' },
  ])

  const [filter, setFilter] = useState<'todos' | 'paterna' | 'materna'>('todos')
  const [sideFilter, setSideFilter] = useState<'todos' | 'novio' | 'novia'>('todos')

  const filteredMembers = familyMembers.filter(member => {
    const familyMatch = filter === 'todos' || member.family === filter
    const sideMatch = sideFilter === 'todos' || member.side === sideFilter
    return familyMatch && sideMatch
  })

  const predictionStats = {
    niño: filteredMembers.filter(m => m.prediction === 'niño').length,
    niña: filteredMembers.filter(m => m.prediction === 'niña').length,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12"
    >
      <div className="card">
        <h2 className="text-3xl font-cute text-center mb-6 text-blue-500">
          👨‍👩‍👧‍👦 Predicciones Familiares
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">👦</div>
            <div className="text-2xl font-bold text-blue-600">{predictionStats.niño}</div>
            <div className="text-sm text-gray-600">Creen que es niño</div>
          </div>
          <div className="bg-pink-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">👧</div>
            <div className="text-2xl font-bold text-pink-600">{predictionStats.niña}</div>
            <div className="text-sm text-gray-600">Creen que es niña</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          >
            <option value="todos">Todas las familias</option>
            <option value="paterna">Familia Paterna</option>
            <option value="materna">Familia Materna</option>
          </select>

          <select
            value={sideFilter}
            onChange={(e) => setSideFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          >
            <option value="todos">Ambos lados</option>
            <option value="novio">Lado del Novio</option>
            <option value="novia">Lado de la Novia</option>
          </select>
        </div>

        {/* Family Members List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{member.name}</h3>
                <div className="text-2xl">
                  {member.prediction === 'niño' ? '👦' : '👧'}
                </div>
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Familia:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    member.family === 'paterna' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-pink-100 text-pink-700'
                  }`}>
                    {member.family === 'paterna' ? 'Paterna' : 'Materna'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Lado:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    member.side === 'novio' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {member.side === 'novio' ? 'Novio' : 'Novia'}
                  </span>
                </div>
                
                {member.message && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-gray-700 italic">
                    "{member.message}"
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay miembros que coincidan con los filtros seleccionados
          </div>
        )}
      </div>
    </motion.div>
  )
}
