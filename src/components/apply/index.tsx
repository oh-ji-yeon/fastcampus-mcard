import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'

import useUser from '@/hooks/auth/useUser'

import ProgressBar from '@shared/ProgressBar'

import { ApplyValues, APPLY_STATYS } from '@/models/apply'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const LAST_STEP = 3

function Apply({ onSubmit }: { onSubmit: (applyValues: ApplyValues) => void }) {
  const user = useUser()
  const { id } = useParams() as { id: string }

  const storageKey = `applied-${user?.uid}-${id}`

  // const [step, setStep] = useState(0)
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey)

    if (applied == null) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0,
      }
    }

    return JSON.parse(applied)
  })

  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(storageKey)

      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATYS.READY,
      } as ApplyValues)
    } else {
      console.log('저장', applyValues)
      localStorage.setItem(storageKey, JSON.stringify(applyValues))
    }
  }, [applyValues, onSubmit, storageKey])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    // console.log('terms', terms)
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
      step: (prevValues.step as number) + 1,
    }))
    // setStep((prevStep) => prevStep + 1)
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    // console.log('infoValues', infoValues)
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infoValues,
      step: (prevValues.step as number) + 1,
    }))
    // setStep((prevStep) => prevStep + 1)
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isMaster' | 'isRf' | 'isHipass'>,
  ) => {
    // console.log('cardInfoValues', cardInfoValues)
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
      step: (prevValues.step as number) + 1,
    }))
    // setStep((prevStep) => prevStep + 1)
  }

  return (
    <div>
      <ProgressBar progress={(applyValues.step as number) / LAST_STEP} />
      {applyValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {applyValues.step === 1 ? (
        <BasicInfo onNext={handleBasicInfoChange} />
      ) : null}
      {applyValues.step === 2 ? (
        <CardInfo onNext={handleCardInfoChange} />
      ) : null}
    </div>
  )
}

export default Apply
