import { getCards } from '@/remote/card'
import ListRow from '@shared/ListRow'

import { useInfiniteQuery } from 'react-query'
import { flatten } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCallback } from 'react'

import Badge from '@shared/Badge'

import { useNavigate } from 'react-router-dom'

function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      // console.log('pageParam', pageParam)
      return getCards(pageParam)
    },
    {
      getNextPageParam: (snapshot) => {
        // console.log('snapshot', snapshot)
        return snapshot.lastVisible
      },
    },
  )

  const navigate = useNavigate()

  // 지금 fetch중이라면 아무런 일도 하지 않음. (다음 페이지를 부를 수 없어도)
  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  if (data == null) {
    return null
  }

  const cards = flatten(data?.pages.map(({ items }) => items))

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, index) => {
            return (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.Texts
                    title={`${index + 1}위`}
                    subTitle={card.name}
                  />
                }
                right={
                  card.payback != null ? <Badge label={card.payback} /> : null
                }
                withArrow={true}
                onClick={() => {
                  navigate(`/card/${card.id}`)
                }}
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default CardList
