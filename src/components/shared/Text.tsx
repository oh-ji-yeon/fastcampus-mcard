import styled from '@emotion/styled'
import { colors, Colors } from '@styles/colorPalette'
import { Typography, typographyMap } from '@styles/typography'
import { CSSProperties } from 'react'

interface TextPorps {
  typography?: Typography
  color?: Colors
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeight?: CSSProperties['fontWeight']
  bold?: boolean
}

const Text = styled.span<TextPorps>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color], // var(--red)
    display,
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
  }),
  ({ typography = 't5' }) => typographyMap[typography],
)

export default Text
