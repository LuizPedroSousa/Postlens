import React, { useEffect } from 'react'
import { light } from '#/styles/themes/light'
import { useState } from 'react'
import { ThemeContext } from './context'
import { ITheme, ThemeProvider as StyledComponentsProvider } from 'styled-components'
import { dark } from '#/styles/themes/dark'

import AsyncStorage from '@react-native-async-storage/async-storage'

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ITheme>(light)

  useEffect(() => {
    async function loadTheme() {
      const storaged = await AsyncStorage.getItem('@Flimed:theme')
      if (storaged) {
        const parsedTheme = JSON.parse(storaged)
        setTheme(parsedTheme)
      }
    }

    loadTheme()
  }, [])

  const toggleTheme = async () => {
    await AsyncStorage.setItem(
      '@Flimed:theme',
      JSON.stringify(theme.title === 'light' ? dark : light),
    )

    setTheme(theme.title === 'light' ? dark : light)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledComponentsProvider theme={theme}>{children}</StyledComponentsProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeProvider }
