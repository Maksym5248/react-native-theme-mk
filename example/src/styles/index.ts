import { lightTheme } from './light-theme';
import { darkTheme } from './dark-theme';
import { ThemeManagerCreator } from '../../../src';

export const ThemeManager = new ThemeManagerCreator('dark', {
    light: lightTheme,
    dark: darkTheme,
});
