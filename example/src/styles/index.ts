import { lightTheme } from './light-theme';
import { darkTheme } from './dark-theme';
import { ThemeManager as ThemeManagerCreator } from '../../../src';

export const ThemeManager = new ThemeManagerCreator(
    'dark',
    {
        light: lightTheme,
        dark: darkTheme,
    },
    {
        autoScale: true,
    },
);
ThemeManager;
