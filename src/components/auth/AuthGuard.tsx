import { auth } from '@/remote/firebase'

import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'

// 인증처리
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false) // 인증처리 완료 여부 판단

  onAuthStateChanged(auth, (user) => {
    console.log('user', user)

    setInitialize(true)
  })

  if (initialize === false) {
    return <div>인증 처리중.. 로딩중...</div>
  }

  return <>{children}</>
}

export default AuthGuard
