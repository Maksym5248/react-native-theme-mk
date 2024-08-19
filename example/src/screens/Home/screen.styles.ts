import { ThemeManager } from '../../styles';

export const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    text: theme.text.h1,
    button: {
        margin: theme.lineHeight.H1,
        height: 50,
        backgroundColor: theme.colors.error,
    },
}));
