import { light } from '#/styles/themes/light'

declare module 'styled-components' {
  export type ITheme = typeof light
  export interface DefaultTheme extends ITheme {}
}


