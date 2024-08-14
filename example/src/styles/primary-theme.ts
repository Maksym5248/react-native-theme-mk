import { createElementsStyles } from './elements';
import { fonts } from './font-family';
import { palette } from './palette';
import { shadow } from './shadow';
import { createTextStyles } from './text';
import { type IThemeSchema, type IBaseThemeSchema } from './types';

export const themeBase: IBaseThemeSchema = {
    radius: {
        M: 2,
    },
    colors: {
        white: palette.white,
        black: palette.black,
        primary: palette.black,
        secondary: palette.grey4E,
        thirdiary: palette.grey92,
        border: palette.grey92,
        button: palette.creamF5,
        background: palette.white,
        backgroundChat: palette.creamF5,
        backgroundModal: palette.transparent,
        textSecondary: palette.white,
        accent: palette.green78,
        accentLight: palette.greenF7,
        error: palette.redEF,
        transparent: palette.transparent,
    },
    fonts: {
        bold: fonts.AmericaBold,
        medium: fonts.AmericaMedium,
        regular: fonts.AmericaRegular,
        light: fonts.AmericaLight,
    },
    lineHeight: {
        H1: 36,
        H2: 32,
        H3: 28,
        H4: 26,
        H5: 24,
        H6: 20,
        P1: 26,
        P2: 24,
        P3: 18,
        P4: 18,
        P5: 16,
    },
    spacing: {
        XXS: 8,
        XS: 12,
        S: 16,
        M: 24,
        L: 32,
        XL: 40,
        XXL: 48,
    },
    fontSize: {
        H1: 28,
        H2: 24,
        H3: 20,
        H4: 18,
        H5: 16,
        H6: 12,
        P1: 18,
        P2: 18,
        P3: 16,
        P4: 14,
        P5: 12,
    },
};

export const themePrimary: IThemeSchema = {
    ...themeBase,
    palette,
    text: createTextStyles({ theme: themeBase }),
    element: createElementsStyles(),
    shadow,
};
