import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import 'react-native-gesture-handler'
import { ThemeProvider } from './contexts/theme/provider'
import { Routes } from './routes'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App
