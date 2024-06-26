import Form from '@/components/signin/Form'
import { FormValues } from '@/models/signin'

import { useCallback } from 'react'

function SigninPage() {
  const handleSubmit = useCallback((formValues: FormValues) => {
    console.log('온전한 값', formValues)
  }, [])

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SigninPage
