import { css } from '@emotion/react'

import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import Spacing from '@shared/Spacing'

function Form() {
  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField label="Email" placeholder="abc@naver.com" />
      <Spacing size={16} />
      <TextField label="Password" type="password" />
      <Spacing size={16} />
      <TextField label="Confirm Password" type="password" />
      <Spacing size={16} />
      <TextField label="Name" placeholder="홍길동" />

      <FixedBottomButton label="Sign Up!" disabled={true} onClick={() => {}} />
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`

export default Form
