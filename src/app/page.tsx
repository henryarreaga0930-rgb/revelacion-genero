'use client'

import { useState } from 'react'
import WelcomeForm from '@/components/WelcomeForm'
import RevealScreen from '@/components/RevealScreen'

export default function Home() {
  const [userData, setUserData] = useState<{ name: string; family: string; prediction: string } | null>(null)

  const handleFormSubmit = (data: { name: string; family: string; prediction: string }) => {
    setUserData(data)
  }

  const handleBack = () => {
    setUserData(null)
  }

  return (
    <div>
      {userData ? (
        <RevealScreen userData={userData} />
      ) : (
        <WelcomeForm onSubmit={handleFormSubmit} />
      )}
    </div>
  )
}
