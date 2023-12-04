import { StatusBar } from 'expo-status-bar';

// React navigation stack
import RootStack from './navigators/RootStack';
import Login from './screens/Login';

export default function App() {
  return <RootStack />;
}
