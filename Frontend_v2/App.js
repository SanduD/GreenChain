// React navigation stack
import RootStack from './src/navigators/RootStack'
import { AuthContextProvider } from './src/context/AuthContext'

export default function App() {
  return (
    <AuthContextProvider>
      <RootStack />
    </AuthContextProvider>
  )
}
