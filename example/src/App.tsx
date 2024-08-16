import { HomeScreen } from './screens/Home';
import { ShopScreen } from './screens/Shop';
import { ThemeProvider } from 'mk-react-native-theme';
import { Theme } from './styles';

export default function App() {
    return (
        <ThemeProvider theme={Theme} initialThemeName="light">
            <HomeScreen />
            <ShopScreen />
        </ThemeProvider>
    );
}
