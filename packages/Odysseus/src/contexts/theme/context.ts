import React, { createContext } from 'react'
import { ITheme } from 'styled-components'

export interface ThemeContextData {
  theme: ITheme
  toggleTheme: () => void
}

const ThemeContext: React.Context<ThemeContextData> = createContext({} as ThemeContextData)

export { ThemeContext }
