import { type IBaseThemeSchema, type IThemeManagerTextStyle } from './types';

export const createTextStyles = ({ theme }: { theme: IBaseThemeSchema }): Record<string, IThemeManagerTextStyle> => ({
    h1: {
        color: theme.colors.text,
        fontFamily: theme.fonts.medium,
        fontSize: theme.fontSize.H1,
        lineHeight: theme.lineHeight.H1,
    },
    h2: {
        color: theme.colors.text,
        fontFamily: theme.fonts.medium,
        fontSize: theme.fontSize.H2,
        lineHeight: theme.lineHeight.H2,
    },
    h3: {
        color: theme.colors.text,
        fontFamily: theme.fonts.medium,
        fontSize: theme.fontSize.H3,
        lineHeight: theme.lineHeight.H3,
    },
    h4: {
        color: theme.colors.text,
        fontFamily: theme.fonts.medium,
        fontSize: theme.fontSize.H4,
        lineHeight: theme.lineHeight.H4,
    },
    h5: {
        color: theme.colors.text,
        fontFamily: theme.fonts.medium,
        fontSize: theme.fontSize.H5,
        lineHeight: theme.lineHeight.H5,
    },
    h6: {
        color: theme.colors.text,
        fontFamily: theme.fonts.medium,
        fontSize: theme.fontSize.H6,
        lineHeight: theme.lineHeight.H6,
    },
    p1: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
        fontSize: theme.fontSize.P1,
        lineHeight: theme.lineHeight.P1,
    },
    p2: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
        fontSize: theme.fontSize.P2,
        lineHeight: theme.lineHeight.P2,
    },
    p3: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
        fontSize: theme.fontSize.P3,
        lineHeight: theme.lineHeight.P3,
    },
    p4: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
        fontSize: theme.fontSize.P4,
        lineHeight: theme.lineHeight.P4,
    },
    p5: {
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
        fontSize: theme.fontSize.P5,
        lineHeight: theme.lineHeight.P5,
    },
});
