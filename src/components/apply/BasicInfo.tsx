import {
  creditScoreOption,
  paymentDateOption,
  salaryOption,
} from '@/constants/apply'
import { ApplyValues } from '@/models/apply'

import Select from '@shared/Select'
import FixedBottomButton from '@shared/FixedBottomButton'

import { ChangeEvent, useCallback, useState } from 'react'

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>

function BasicInfo({ onNext }: { onNext: (infoValues: InfoValues) => void }) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.name)
    // console.log(e.target.value)
    setInfoValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }))
  }, [])
  // console.log('infoValues', infoValues)

  const 모든정보가선택되었는가 = Object.values(infoValues).every(
    (value) => value,
  )
  // console.log(모든정보가선택되었는가)

  return (
    <div>
      <Select
        name="salary"
        label="연소득"
        options={salaryOption}
        placeholder={salaryOption[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={creditScoreOption}
        placeholder={creditScoreOption[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="결제일"
        options={paymentDateOption}
        placeholder={paymentDateOption[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />

      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(infoValues)
        }}
        disabled={모든정보가선택되었는가 === false}
      />
    </div>
  )
}

export default BasicInfo
