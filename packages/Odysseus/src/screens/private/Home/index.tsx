import React from 'react'
import { View } from 'react-native'

import * as S from './styles'

const Home: React.FC = () => {
  return (
    <S.Wrapper>
      <S.Text testID="text">Hello World</S.Text>
    </S.Wrapper>
  )
}

export { Home }
