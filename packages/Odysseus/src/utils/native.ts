import { Dimensions, Platform } from 'react-native'

export const isIOS = (): boolean => Platform.OS === 'ios'

export const isAndroid = (): boolean => Platform.OS === 'android'

export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height
