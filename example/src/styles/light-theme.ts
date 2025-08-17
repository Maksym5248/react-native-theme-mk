import { baseTheme } from './base-theme';
import { createElementsStyles } from './elements';
import { palette } from './palette';
import { shadow } from './shadow';
import { createTextStyles } from './text';
import { type IThemeManagerSchema, type IBaseThemeSchema } from './types';

export const themeBase: IBaseThemeSchema = {
    ...baseTheme,
    colors: {
        white: palette.white,
        black: palette.black,
        text: palette.black,
        primary: palette.black,
        secondary: palette.grey4E,
        thirdiary: palette.grey92,
        border: palette.grey92,
        button: palette.creamF5,
        background: palette.white,
        backgroundChat: palette.creamF5,
        backgroundModal: palette.transparent,
        textSecondary: palette.white,
        accent: palette.creamF5,
        accentLight: palette.greenF7,
        error: palette.redEF,
        transparent: palette.transparent,
    },
};

export const lightTheme: IThemeManagerSchema = {
    ...themeBase,
    palette,
    text: createTextStyles({ theme: themeBase }),
    element: createElementsStyles(),
    shadow,
};
