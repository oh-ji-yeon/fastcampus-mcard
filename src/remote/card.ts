import { COLLECTIONS } from '@/constants'
import { Card } from '@/models/card'
import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'

export async function getCards() {
  const cardSnapshot = await getDocs(collection(store, COLLECTIONS.CARD))
  //   console.log('cardSnapshot', cardSnapshot)

  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
}
