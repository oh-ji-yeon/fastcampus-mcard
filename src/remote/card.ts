import { COLLECTIONS } from '@/constants'
import { Card } from '@/models/card'

import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
} from 'firebase/firestore'
import { store } from './firebase'

// 전체 카드 리스트 가져오기
export async function getCards(pageParam?: QuerySnapshot<Card>) {
  // pageParam: 지금 보이고 있는 맨 마지막 요소 - cursor로 활용.
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(10))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(10),
        )

  const cardSnapshot = await getDocs(cardQuery)

  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1] // 지금 불러온 snapShot에 맨 마지막 문서 -> 커서로 판단

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}

// 하나의 카드 조회
export async function getCard(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.CARD, id))

  return {
    id,
    ...(snapshot.data() as Card),
  }
}
