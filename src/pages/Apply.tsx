import Apply from '@/components/apply'

import { useState } from 'react'

function ApplyPage() {
  const [step, setStep] = useState(2)

  const handleSubmit = () => {
    // 카드신청
  }

  return <Apply step={step} onSubmit={handleSubmit} />
}

export default ApplyPage
