import { AppNavigator } from '@app/navigation/AppNavigator';
import { QueryProvider } from '@app/providers/QueryProvider';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <QueryProvider>
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
      </QueryProvider>
    </SafeAreaProvider>
  );
}

export default App;
