# mk-react-native-theme

Package for managing theme in react-native

## Installation

```sh
npm install mk-react-native-theme
```

## Usage

```js
import { themePrimary } from './primary-theme';
import { ThemeCreator } from 'mk-react-native-theme';
import { type IThemeSchema } from './types';

const theme: Record<string, IThemeSchema> = {
    primary: themePrimary,
};

export const Theme = new ThemeCreator<IThemeSchema>(theme);

```

```js
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
```

```js
import { Theme } from '../styles';

export const useStyles = Theme.create(({ theme }) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    text: theme.text.h1,
}));
```

```js
import { View, Text } from 'react-native';
import { useStyles } from './screen.styles';

export const Screen = () => {
    const styles = useStyles();

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
