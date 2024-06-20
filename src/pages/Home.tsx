import { getAdBanners } from '@/remote/adBanner'
import { getCards } from '@/remote/card'
import Top from '@shared/Top'
import { useEffect } from 'react'

function HomePage() {
  useEffect(() => {
    getCards().then((response) => {
      console.log('response', response)
    })

    getAdBanners().then((response) => {
      console.log('response', response)
    })
  }, [])

  return (
    <div>
      <Top
        title="혜택 좋은 카드 ;)"
        subTitle="회원님을 위해 혜택 좋은 카드를 모아봤어요!"
      />
    </div>
  )
}

export default HomePage
