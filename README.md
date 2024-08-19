# @mk/react-native-theme

Package for managing theme in react-native

## Installation

```sh
npm install @mk/react-native-theme
```

## Usage

```js
import { themePrimary } from './primary-theme';
import { ThemeManagerCreator } from '@mk/react-native-theme';
import { type IThemeManagerSchema } from './types';

const theme = {
    primary: themePrimary,
};

export const ThemeManager = new ThemeManagerCreator('dark', {
    light: lightTheme,
    dark: darkTheme,
});

```

```js
import { Screen } from './screeen';
import { ThemeProvider } from '@mk/react-native-theme';
import { ThemeManager } from './styles';

export default function App() {
    return (
        <ThemeProvider themeManager={ThemeManager}>
            <Screen />
        </ThemeProvider>
    );
}
```

```js
import { ThemeManager } from '../styles';

export const useStyles = ThemeManager.createStyleSheet(({ theme, device }) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    text: theme.text.h1,
    content: {
        height: device.window.height,
    }
}));
```

```js
import { View, Text } from 'react-native';
import { useStyles } from './screen.styles';
import { ThemeManager } from '../../styles';

const { useTheme } = ThemeManager;

export const Screen = () => {
    const styles = useStyles();
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>TEST</Text>
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
