import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'

import { Link, useLocation } from 'react-router-dom'

import Button from './Button'
import Flex from './Flex'

function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signup', 'signin'].includes(location.pathname) === false

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">Home</Link>
      {showSignButton ? (
        <Link to="/signin">
          <Button>SignIn/SignUp</Button>
        </Link>
      ) : null}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`

export default Navbar
