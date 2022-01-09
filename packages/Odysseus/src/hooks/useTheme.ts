import { ThemeContextData, ThemeContext } from '#/contexts/theme/context'
import { useContext } from 'react'

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

export { useTheme }
