import AdBanners from '@/components/home/AdBanners'
import CardList from '@/components/home/CardList'
import Top from '@shared/Top'

function HomePage() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드 ;)"
        subTitle="회원님을 위해 혜택 좋은 카드를 모아봤어요!"
      />
      <AdBanners />
      <CardList />
    </div>
  )
}

export default HomePage
