import { getCards } from '@/remote/card'
import ListRow from '@shared/ListRow'

import { useInfiniteQuery } from 'react-query'
import { flatten } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCallback } from 'react'

function CardList() {
  //   const { data } = useQuery(['cards'], () => getCards())
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
        console.log('snapshot', snapshot)

        return snapshot.lastVisible
      },
    },
  )

  // console.log('data', data)
  // console.log('hasNextPage', hasNextPage)
  // console.log(flatten(data?.pages.map(({ items }) => items)))

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
      {/* <button
        onClick={() => {
          fetchNextPage()
        }}
      >
        Load Data
      </button> */}
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
      >
        {cards.map((card, index) => {
          return (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={card.payback != null ? <div>{card.payback}</div> : null}
              withArrow={true}
            />
          )
        })}
      </InfiniteScroll>
    </div>
  )
}

export default CardList
