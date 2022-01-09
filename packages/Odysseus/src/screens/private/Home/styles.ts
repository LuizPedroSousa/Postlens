import styled from 'styled-components/native'

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
`

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 62px;
`
