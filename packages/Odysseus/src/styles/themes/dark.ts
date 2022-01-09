import { ITheme } from 'styled-components'

const dark: ITheme = {
  title: 'dark',
  colors: {
    white: '#fff',
    green: {
      100: '#dbf9e0',
      200: '#b7f4c1',
      300: '#94eea2',
      400: '#70e983',
      500: '#4ce364',
      600: '#3db650',
      700: '#2e883c',
      800: '#1e5b28',
      900: '#0f2d14',
    },
    gray: {
      100: '#d3d3de',
      200: '#a7a6bd',
      300: '#7a7a9d',
      400: '#4e4d7c',
      500: '#22215b',
      600: '#1b1a49',
      700: '#141437',
      800: '#0e0d24',
      900: '#070712',
    },
  },
  typography: {
    light: 'Poppins-Light',
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },
}

export { dark }
