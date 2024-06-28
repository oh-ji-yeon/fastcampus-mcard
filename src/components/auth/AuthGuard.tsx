import { userAtom } from '@/atoms/user'
import { auth } from '@/remote/firebase'

import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

// 인증처리
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false) // 인증처리 완료 여부 판단
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    // console.log('user', user)
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
    } else {
      setUser(null)
    }

    setInitialize(true)
  })

  if (initialize === false) {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
