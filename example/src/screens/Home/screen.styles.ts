import { ThemeManager } from '../../styles';

export const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    text: { marginTop: 50, ...theme.text.h1 },
    info: { marginTop: 50, ...theme.text.h6 },
    button: {
        margin: theme.lineHeight.H1,
        height: 50,
        backgroundColor: theme.colors.accent,
    },
    buttonText: theme.text.h1,
}));
