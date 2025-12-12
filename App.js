import { useFonts } from 'expo-font';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'MontserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <ProfileScreen />;
}

