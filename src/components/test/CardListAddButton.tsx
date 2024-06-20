import { COLLECTIONS } from '@/constants'
import { card_list } from '@/mock/data'
import { store } from '@/remote/firebase'
import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'

function CardListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store) // store - 앱에 대한 정보 알려주기

    card_list.forEach((card) => {
      // 카드 리스트 루프를 돌며 batch에 값 누적, 누적된 값을 저장.
      // 어떻게 저장하지? - collection(서비스)에 접근.
      const docRef = doc(collection(store, COLLECTIONS.CARD)) // 'CARD' - 상수로 따리 분리해 관리하는게 好.
      // 쌓을 데이터와 doc을 matching
      batch.set(docRef, card) // docRef 문서에 리스트를 돌면서 나온 카드 데이터를 매칭해서 저장.
    })
    await batch.commit() // 실제 값 반영. commit - 비동기

    alert('카드 리스트 추가 완료!')
  }

  return <Button onClick={handleButtonClick}>Add CardList</Button>
}

export default CardListAddButton
