import { APPLY_STATYS } from '@/models/apply'
import { useQuery } from 'react-query'

interface usePollApplyStatusProps {
  onSuccess: () => void
  onError: () => void
  enabled: boolean
}

function usePollApplyStatus({
  enabled,
  onSuccess,
  onError,
}: usePollApplyStatusProps) {
  return useQuery(
    ['applyStatus'],
    () =>
      // polling api
      getApplyStatus(),
    {
      enabled,
      refetchInterval: 2_000,
      staleTime: 0,
      onSuccess: (status) => {
        console.log('status', status)
        if (status === APPLY_STATYS.COMPLETE) {
          onSuccess()
        }
      },
      onError: () => {
        onError()
      },
    },
  )
}

// 카드사를 대신해주는 mocking 함수
function getApplyStatus() {
  const values = [
    APPLY_STATYS.READY,
    APPLY_STATYS.PROGRESS,
    APPLY_STATYS.COMPLETE,
    APPLY_STATYS.REJECT,
  ]

  const status = values[Math.floor(Math.random() * values.length)]

  if (status === APPLY_STATYS.REJECT) {
    throw new Error('카드 발급에 실패했습니다 :(')
  }

  return status
}

export default usePollApplyStatus
