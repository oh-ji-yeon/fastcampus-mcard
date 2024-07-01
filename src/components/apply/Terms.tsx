import { TermsList } from '@/constants/apply'

import Agreement from '@shared/Agreement'
import FixedBottomButton from '@shared/FixedBottomButton'

import { MouseEvent, useCallback, useState } from 'react'

function Terms({ onNext }: { onNext: (terms: string[]) => void }) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return TermsList.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })
  // console.log('termsAgreements', termsAgreements)

  // 전체 토글링 - title에서 사용
  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      // console.log('checked', checked)
      setTermsAgreements((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )

  // 모든 약관이 동의되었는가
  const termsAllAgreed = Object.values(termsAgreements).every(
    (agreeOrnot) => agreeOrnot,
  )

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={termsAllAgreed} onChange={handleAllAgreement}>
          약관에 모두 동의
        </Agreement.Title>
        {TermsList.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            Link={link}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={termsAllAgreed === false}
        onClick={() => {
          onNext(Object.keys(termsAgreements))
        }}
      />
    </div>
  )
}

export default Terms
