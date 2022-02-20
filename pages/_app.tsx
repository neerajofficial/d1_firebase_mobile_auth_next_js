import '../styles/globals.css'
import './../configs/firebase-config'
import { AuthContextProvider } from './../store/auth-context'
import AuthState from './../routes/auth-state';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AuthState>
        <Component {...pageProps} />
      </AuthState>
    </AuthContextProvider>
  )
}
export default MyApp
