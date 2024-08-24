# react-native-theme-mk

Package for managing theme in react-native

## Installation

```sh
npm install react-native-safe-area-context react-native-theme-mk
```

## Usage

```js
import { themePrimary } from './primary-theme';
import { ThemeManager as ThemeManagerCreator } from 'react-native-theme-mk';
import { type IThemeManagerSchema } from './types';

const theme = {
    primary: themePrimary,
};

export const ThemeManager = new ThemeManagerCreator(
    'dark',
    {
        light: lightTheme,
        dark: darkTheme,
    },
    {
        autoScale: true,
        //@default designed device dimensions
        dimensionsDesignedDevice: {
            width: 375,
            height: 812,
        }
    },
);

```

```js
import { HomeScreen } from './screens/Home';
import { ThemeManager } from './styles';

const { ThemeProvider } = ThemeManager;

export default function App() {
    return (
        <ThemeProvider>
            <HomeScreen />
        </ThemeProvider>
    );
}
```

```js
import { ThemeManager } from '../../styles';

export const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    text: theme.text.h1,
    button: {
        margin: theme.lineHeight.H1,
        height: 50,
        backgroundColor: theme.colors.accent,
    },
}));

```

```js
import { View, Text, TouchableOpacity } from 'react-native';
import { useStyles } from './screen.styles';
import { ThemeManager } from '../../styles';

const { useTheme } = ThemeManager;

export const HomeScreen = () => {
    const styles = useStyles({ overrideAutoScale: false, overrideThemeName: 'light' });
    const theme = useTheme();

    return (
        <View style={[styles.container]}>
            <Text style={[styles.text]}>Screen Light Theme</Text>
            <Text style={[styles.text, { color: theme.colors.accent }]}>Light/Dark Theme text</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Button</Text>
            </TouchableOpacity>
        </View>
    );
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
