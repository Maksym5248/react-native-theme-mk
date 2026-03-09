# react-native-theme-mk

⚡ Powerful and simple theming system for React Native\
with auto-scaling, device awareness, and full TypeScript support.

> Build scalable, responsive, and maintainable themes\
> with light/dark mode and dynamic updates --- without boilerplate.

------------------------------------------------------------------------

## ✨ Features

-   ✅ Light / Dark / Custom themes
-   ✅ Automatic screen scaling
-   ✅ Device & orientation detection
-   ✅ Safe area support
-   ✅ Type-safe themes (TypeScript)
-   ✅ Runtime theme updates
-   ✅ React Hooks API
-   ✅ Zero config setup
-   ✅ Production-tested

------------------------------------------------------------------------

## 📦 Installation

``` bash
npm install react-native-theme-mk react-native-safe-area-context
```

or

``` bash
yarn add react-native-theme-mk react-native-safe-area-context
```

## Usage

### `ThemeManager`

#### `Constructor options`

| Option                     | Description                                   |
| -------------------------- | --------------------------------------------- |
| `dimensionsDesignedDevice` | Dimensions of the designed device (optional). |
| `autoScale`                | Enables auto-scaling (optional).              |
| `maxWidth`                 | Caps device width (`window.width` / `screen.width`) to this value (optional). |

#### `Methods and fields`

| Method/Field               | Description                                              |
| -------------------------- | -------------------------------------------------------- |
| `name`                     | The name of the current theme.                           |
| `theme`                    | The current theme object.                                |
| `context`                  | The React context for the current theme.                 |
| `set`                      | Sets the current theme by name.                          |
| `get`                      | Gets a theme by name.                                    |
| `update`                   | Performs a deep merge to update/extend themes.           |
| `onChangeName`             | Registers a callback for theme name changes.             |
| `removeAllListeners`       | Removes all registered listeners.                        |
| `createStyleSheet`         | Creates a style sheet using the provided styles creator. |
| `useTheme`                 | Hook to use the current theme.                           |
| `useDevice`                | Hook to use the device information.                      |
| `useScale`                 | Hook to use the scale factor.                            |
| `device`                   | The device information.                                  |
| `dimensionsDesignedDevice` | The dimensions of the designed device.                   |

#### createStyleSheet

| Parameter       | Type         | Description                                    |
| --------------- | ------------ | ---------------------------------------------- |
| `params`        | object       | An object containing the following properties: |
| `params.theme`  | `C[keyof C]` | The current theme object.                      |
| `params.device` | `IDevice`    | The device information.                        |
| `params.scale`  | `number`     | The scale factor.                              |


#### Device

| Property            | Type      | Description                                   |
|---------------------|-----------|-----------------------------------------------|
| `isAndroid`         | boolean   | True if the device is running Android.        |
| `isIOS`             | boolean   | True if the device is running iOS.            |
| `isTablet`          | boolean   | True if the device is a tablet.               |
| `isIphoneX`         | boolean   | True if the device is an iPhone X.            |
| `window`            | object    | Dimensions of the device's window `{ width, height }`. |
| `maxWidth`          | number    | Configured max width cap from `ThemeManager` options. |
| `screen`            | object    | Dimensions of the device's screen `{ width, height }`. |
| `orientation`       | enum      | Current orientation (`Portrait` or `Landscape`). |
| `isLandscape`       | boolean   | True if the device is in landscape mode.      |
| `isPortrait`        | boolean   | True if the device is in portrait mode.       |
| `insets`             | object    | Insets of the device's screen `{ top, right, bottom, left }`. |
| `frame`             | object    | Insets of the device's screen `{ width, height, x, y }`. |
| `isSmallScreen`     | boolean   | True if the device has a small screen.        |
| `screenSize`        | string    | Current width bucket: `xs` / `sm` / `md` / `lg` / `xl` / `xxl`. |
| `isXsScreen`        | boolean   | True when `screenSize` is `xs`.               |
| `isSmScreen`        | boolean   | True when `screenSize` is `sm`.               |
| `isMdScreen`        | boolean   | True when `screenSize` is `md`.               |
| `isLgScreen`        | boolean   | True when `screenSize` is `lg`.               |
| `isXlScreen`        | boolean   | True when `screenSize` is `xl`.               |
| `isXxlScreen`       | boolean   | True when `screenSize` is `xxl`.              |
| `isAtLeast(size)`   | function  | Checks whether current `screenSize` is >= `size`. |
| `isBetween(min,max)`| function  | Checks whether current `screenSize` is in range (inclusive). |
| `isShortScreen`     | boolean   | Deprecated: use `screenSize` and size-bucket helpers. |
| `screenAspectRatio` | number    | Aspect ratio of the device's screen.          |
| `key`               | string    | Unique key for the device dimensions.         |

### `Example`

```js
import { themePrimary } from './primary-theme';
import { ThemeManager as ThemeManagerCreator } from 'react-native-theme-mk';
import { type IThemeManagerSchema } from './types';

## ⚡ Quick Start (30 seconds)

### 1️⃣ Create Theme Manager

``` ts
import { ThemeManager as ThemeManagerCreator } from 'react-native-theme-mk';

export const ThemeManager = new ThemeManagerCreator(
  'dark',
  {
    light: {
      colors: {
        background: '#ffffff',
        text: '#000000',
        accent: '#ff9800',
      },
    },
    {
        autoScale: true,
        maxWidth: 480,
        //@default designed device dimensions
        dimensionsDesignedDevice: {
            width: 375,
            height: 812,
        }
    },
  },
  {
    autoScale: true,
  }
);
```

------------------------------------------------------------------------

### 2️⃣ Wrap Application

``` tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeManager } from './theme';

const { ThemeProvider } = ThemeManager;

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

------------------------------------------------------------------------

### 3️⃣ Create Typed Styles

``` ts
export const useStyles = ThemeManager.createStyleSheet(({ theme, scale }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: scale(16),
  },

  text: {
    color: theme.colors.text,
    fontSize: scale(16),
  },

  button: {
    height: scale(48),
    borderRadius: scale(12),
    backgroundColor: theme.colors.accent,
  },
}));
```

------------------------------------------------------------------------

### 4️⃣ Use in Component

``` tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { useStyles } from './styles';

export function HomeScreen() {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Theme 👋</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Button</Text>
      </TouchableOpacity>
    </View>
  );
}
```

------------------------------------------------------------------------

## 🎨 Switch Theme

``` ts
ThemeManager.set('light');
ThemeManager.set('dark');
```

------------------------------------------------------------------------

## 🔄 Update Theme Dynamically

``` ts
ThemeManager.update({
  light: {
    colors: {
      success: '#4CAF50',
    },
  },

  dark: {
    colors: {
      success: '#81C784',
    },
  },
});
```

------------------------------------------------------------------------

## 📱 Device & Scale API

``` ts
const { useDevice, useScale, useTheme } = ThemeManager;

const device = useDevice();
const scale = useScale();
const theme = useTheme();
```

------------------------------------------------------------------------

## ⚙️ ThemeManager Options

  ------------------------------------------------------------------------
  Option                     Type      Description
  -------------------------- --------- -----------------------------------
  autoScale                  boolean   Enable automatic scaling

  dimensionsDesignedDevice   object    Reference device size for scaling
  ------------------------------------------------------------------------

------------------------------------------------------------------------

## 🚀 Used in Production

This library is actively used in real-world React Native applications.

------------------------------------------------------------------------

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

------------------------------------------------------------------------

## ⭐ Support

If this library saved you time, consider giving it a star ⭐

------------------------------------------------------------------------

## 📄 License

MIT
