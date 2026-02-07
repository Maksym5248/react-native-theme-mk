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

------------------------------------------------------------------------

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

    dark: {
      colors: {
        background: '#000000',
        text: '#ffffff',
        accent: '#ff9800',
      },
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
