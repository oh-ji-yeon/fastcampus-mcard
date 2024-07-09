import Apply from '@/components/apply'
import useAppliedCard from '@/components/apply/hooks/useAppliedCard'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import FullPageLoader from '@/components/shared/FullPageLoader'
import useUser from '@/hooks/auth/useUser'

import { useAlertContext } from '@/contexts/AlertContext'
import { APPLY_STATYS } from '@/models/apply'
import { updateApplyCard } from '@/remote/apply'

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const STATUS_MESSAGE = {
  [APPLY_STATYS.READY]: '카드 심사를 준비하고있습니다 ;)',
  [APPLY_STATYS.PROGRESS]: '심사중입니다. 잠시만 기다려주세요 ;)',
  [APPLY_STATYS.COMPLETE]: '카드 신청이 완료되었습니다 ;)',
}

function ApplyPage() {
  const navigate = useNavigate()
  const { open } = useAlertContext()

  const [readyToPoll, setReadyToPoll] = useState(false)

  const user = useUser()
  const { id } = useParams() as { id: string }

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return
        }

        if (applied.status === APPLY_STATYS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })

          return
        }
        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  const { data: status } = usePollApplyStatus({
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

  if (data != null && data.status === APPLY_STATYS.COMPLETE) {
    return null
  }

  if (readyToPoll || 카드를신청중인가) {
    return <FullPageLoader message={STATUS_MESSAGE[status ?? 'READY']} />
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
