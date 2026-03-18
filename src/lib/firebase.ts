// Configuración de Firebase - Reemplaza con tus datos
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Interfaces
export interface Prediction {
  id?: string
  name: string
  family: string
  prediction: string
  timestamp: any
  createdAt: Date
}

// Funciones para interactuar con Firestore
export const predictionsCollection = collection(db, 'predictions')

export async function addPrediction(prediction: Omit<Prediction, 'id' | 'timestamp' | 'createdAt'>) {
  try {
    const docRef = await addDoc(predictionsCollection, {
      ...prediction,
      timestamp: serverTimestamp(),
      createdAt: new Date()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding prediction:', error)
    throw error
  }
}

export async function getPredictions(): Promise<Prediction[]> {
  try {
    const q = query(predictionsCollection, orderBy('timestamp', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().timestamp?.toDate() || new Date()
    })) as Prediction[]
  } catch (error) {
    console.error('Error getting predictions:', error)
    return []
  }
}
