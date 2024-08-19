import { HomeScreen } from './screens/Home';
import { ShopScreen } from './screens/Shop';
import { ThemeManager } from './styles';

const { ThemeProvider } = ThemeManager;

export default function App() {
    return (
        <ThemeProvider>
            <HomeScreen />
            <ShopScreen />
        </ThemeProvider>
    );
}
