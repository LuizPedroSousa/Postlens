import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { Tabs } from './Tabs'

const Stack = createStackNavigator()

const Routes: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={'Tab'}>
      <Stack.Screen
        name="Tab"
        component={Tabs}
        options={{
          headerShown: false,
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  )
}

export { Routes }
