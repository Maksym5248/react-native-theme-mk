# react-native-theme-mk

Package for managing theme in react-native

A simple solution for theme management in react-native, with its help you can use any schemes, with type definitions, with the ability to dynamically update the theme, with access to device data (width, height)

## Installation

```sh
npm install react-native-safe-area-context react-native-theme-mk
```

## Usage

## Usage

### `ThemeManager`

#### `Constructor options`

| Option                    | Description                                      |
|---------------------------|--------------------------------------------------|
| `dimensionsDesignedDevice`| Dimensions of the designed device (optional).    |
| `autoScale`               | Enables auto-scaling (optional).                 |

#### `Methods and fields`

| Method/Field              | Description                                      |
|---------------------------|--------------------------------------------------|
| `name`                    | The name of the current theme.                   |
| `theme`                   | The current theme object.                        |
| `context`                 | The React context for the current theme.         |
| `set`                     | Sets the current theme by name.                  |
| `get`                     | Gets a theme by name.                            |
| `onChangeName`            | Registers a callback for theme name changes.     |
| `removeAllListeners`      | Removes all registered listeners.                |
| `createStyleSheet`        | Creates a style sheet using the provided styles creator. |
| `useTheme`                | Hook to use the current theme.                   |
| `useDevice`               | Hook to use the device information.              |
| `useScale`                | Hook to use the scale factor.                    |
| `device`                  | The device information.                          |
| `dimensionsDesignedDevice`| The dimensions of the designed device.           |


#### createStyleSheet

| Parameter | Type | Description |
|-----------|------|-------------|
| `params`  | object | An object containing the following properties: |
| `params.theme` | `C[keyof C]` | The current theme object. |
| `params.device` | `IDevice` | The device information. |
| `params.scale` | `number` | The scale factor. |

#### Device

| Property                  | Description                                      |
|---------------------------|--------------------------------------------------|
| `isAndroid`               | Indicates if the device is running Android.      |
| `isIOS`                   | Indicates if the device is running iOS.          |
| `isTablet`                | Indicates if the device is a tablet.             |
| `isIphoneX`               | Indicates if the device is an iPhone X.          |
| `window`                  | Dimensions of the device's window.               |
| `screen`                  | Dimensions of the device's screen.               |
| `orientation`             | Current orientation of the device.               |
| `isLandscape`             | Indicates if the device is in landscape mode.    |
| `isPortrait`              | Indicates if the device is in portrait mode.     |
| `inset`                   | Insets of the device's screen.                   |
| `isSmallScreen`           | Indicates if the device has a small screen.      |
| `isShortScreen`           | Indicates if the device has a short screen.      |
| `screenAspectRatio`       | Aspect ratio of the device's screen.             |


### `Example`

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
