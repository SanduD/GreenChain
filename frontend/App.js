import { StatusBar } from 'expo-status-bar';

// React navigation stack
import RootStack from './navigators/RootStack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';

export default function App() {
  return <RootStack />;
}
