import Apply from '@/components/apply'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import useUser from '@/hooks/auth/useUser'

import { APPLY_STATYS } from '@/models/apply'
import { updateApplyCard } from '@/remote/apply'

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ApplyPage() {
  const navigate = useNavigate()

  const [readyToPoll, setReadyToPoll] = useState(false)

  const user = useUser()
  const { id } = useParams() as { id: string }

  usePollApplyStatus({
    onSuccess: async () => {
      // console.log('성공>_<')
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATYS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', {
        replace: true,
      })
    },
    onError: async () => {
      // console.log('실패ㅠ_ㅠ')
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATYS.REJECT,
        },
      })
      navigate('/apply/done?success=false', {
        replace: true,
      })
    },
    enabled: readyToPoll,
  })

  const { mutate, isLoading: 카드를신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      // console.log('카드추가 !!!')
      // 값이 추가 되었을 때 -> polling 시작
      setReadyToPoll(true)
    },
    onError: () => {
      // 실패 했을 때 -> polling 시작
      window.history.back() // 상세페이지로 돌아가기
    },
  })

  if (readyToPoll || 카드를신청중인가) {
    return <div>Loading...</div>
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
