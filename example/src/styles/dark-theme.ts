import { createElementsStyles } from './elements';
import { palette } from './palette';
import { shadow } from './shadow';
import { createTextStyles } from './text';
import { type IThemeSchema, type IBaseThemeSchema } from './types';
import { baseTheme } from './base-theme';

export const themeBase: IBaseThemeSchema = {
    ...baseTheme,
    colors: {
        white: palette.white,
        black: palette.black,
        primary: palette.white,
        secondary: palette.grey4E,
        thirdiary: palette.grey92,
        border: palette.grey92,
        button: palette.creamF5,
        background: palette.black,
        backgroundChat: palette.creamF5,
        backgroundModal: palette.transparent,
        textSecondary: palette.white,
        accent: palette.green78,
        accentLight: palette.greenF7,
        error: palette.redEF,
        transparent: palette.transparent,
    },
};

export const darkTheme: IThemeSchema = {
    ...themeBase,
    palette,
    text: createTextStyles({ theme: themeBase }),
    element: createElementsStyles(),
    shadow,
};