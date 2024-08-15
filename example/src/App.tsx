import { Screen } from './screeen';
import { ThemeProvider, LocalThemeProvider } from 'mk-react-native-theme';
import { Theme } from './styles';

export default function App() {
    return (
        <ThemeProvider theme={Theme} initialThemeName="light">
            <Screen />
            <LocalThemeProvider themeName="dark">
                <Screen />
            </LocalThemeProvider>
        </ThemeProvider>
    );
}
