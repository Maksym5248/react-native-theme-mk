import { lightTheme } from './light-theme';
import { darkTheme } from './dark-theme';
import { ThemeCreator } from 'mk-react-native-theme';
import { type IThemeSchema } from './types';

const theme: Record<string, IThemeSchema> = {
    light: lightTheme,
    dark: darkTheme,
};

export const Theme = new ThemeCreator<IThemeSchema>(theme);
