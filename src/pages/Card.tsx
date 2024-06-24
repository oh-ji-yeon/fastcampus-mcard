import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import { getCard } from '@/remote/card'
import { css } from '@emotion/react'

import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

function CardPage() {
  const { id = '' } = useParams()
  // console.log('params', params)

  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '', // id가 빈값이 아니면 호출하겠다
  })
  // console.log('data', data)

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle =
    promotion != null ? removeHtlmTags(promotion.title) : tags.join(', ')

  return (
    <div>
      {/* 카드 정보 표현 */}
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      {/* 혜택 */}
      <ul>
        {benefit.map((text, index) => {
          return (
            <ListRow
              key={text}
              left={<IconCheck />}
              contents={
                <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
              }
            />
          )
        })}
      </ul>

      {/* 유의사항 */}
      {promotion != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtlmTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      {/* 신청하기 버튼 */}
      <FixedBottomButton label="신청하기" onClick={() => {}} />
    </div>
  )
}

function IconCheck() {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 48 48"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="white" fill-opacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        stroke="black"
        stroke-linejoin="round"
        stroke-width="4"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
      />
    </svg>
  )
}

// html 태그 제거
function removeHtlmTags(text: string) {
  // 값 누적
  let output = ''

  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j += 1) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }
  return output
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`

export default CardPage