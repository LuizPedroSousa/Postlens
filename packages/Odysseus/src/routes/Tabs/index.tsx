import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { isAndroid } from '#/utils/native'
import { Home } from '#/screens/private/Home'
import { StatusBar } from 'react-native'

import FeatherIcon from 'react-native-vector-icons/Feather'

import { useTheme } from '#/hooks/useTheme'
import * as S from './styles'

const Tab = createBottomTabNavigator()

const Tabs: React.FC = () => {
  const { theme } = useTheme()

  const optionsTab = (icon: string, title: string) => ({
    headerShown: false,
    tabBarIcon: (props: any) => (
      <S.ContainerIcon>
        <FeatherIcon name={icon} size={24} color={props.color} />
      </S.ContainerIcon>
    ),
    tabBarActiveTintColor: theme.colors.green[500],
    tabBarInactiveTintColor: theme.colors.gray[500],
    title,
    tabBarLabelStyle: {
      fontFamily: theme.typography.bold,
      fontSize: 12,
      marginBottom: 4,
    },
    tabBarStyle: {
      backgroundColor: theme.colors.white,
      borderTopColor: theme.colors.white,
    },
  })

  return (
    <Tab.Navigator
      key="Tab"
      screenListeners={() => ({
        tabPress: e => {
          StatusBar.setBarStyle('dark-content', true)
          isAndroid() && StatusBar.setBackgroundColor(theme.colors.gray[400])
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={optionsTab('home', 'Início')}
        listeners={() => ({
          tabPress: () => {
            StatusBar.setBarStyle('light-content', true)
            isAndroid() && StatusBar.setBackgroundColor(theme.colors.green[500])
          },
        })}
      />
    </Tab.Navigator>
  )
}

export { Tabs }
