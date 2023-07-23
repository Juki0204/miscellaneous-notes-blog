// import '../styles/globals.css'
import '/styles/highlight_fix.css';

import { ChakraProvider } from '@chakra-ui/react';

export default function MyApp({ Component, pageProps }) {
  return(
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}