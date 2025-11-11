import { AppNavigator } from '@app/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
          <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
