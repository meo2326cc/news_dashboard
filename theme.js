// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const breakpoints = {
    base: '0em',
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  }
  
const size = {
    container:{
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
    }
}

// 3. extend the theme
const theme = extendTheme({ config , breakpoints , size })

export default theme