import { ThemeManager } from '../../styles';

export const useStyles = ThemeManager.createStyleSheet(({ theme, device }) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        height: device.window.height,
    },
    text: theme.text.h1,
}));
