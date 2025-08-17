import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './screens/Home';
import { ShopScreen } from './screens/Shop';
import { ThemeProvider } from './styles';

export default function App() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <HomeScreen />
                <ShopScreen />
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
