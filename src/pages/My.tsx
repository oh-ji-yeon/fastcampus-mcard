import useUser from '@hooks/auth/useUser'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'

import MyImage from '@components/my/MyImage'

import { auth } from '@remote/firebase'

import { useCallback } from 'react'

import { signOut } from 'firebase/auth'

function MyPage() {
  const user = useUser()

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  return (
    <Flex direction="column" align="center">
      <Spacing size={40} />
      <MyImage size={80} mode="upload" />
      <Spacing size={20} />
      <Text bold={true}>{user?.displayName}</Text>

      <Spacing size={20} />
      <Button onClick={handleLogout}>LogOut</Button>
    </Flex>
  )
}

export default MyPage
