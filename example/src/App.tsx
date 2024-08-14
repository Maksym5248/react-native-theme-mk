import { Screen } from './screeen';
import { ThemeProvider } from 'mk-react-native-theme';
import { Theme } from './styles';

export default function App() {
    return (
        <ThemeProvider theme={Theme}>
            <Screen />
        </ThemeProvider>
    );
}
