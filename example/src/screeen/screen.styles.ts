import { Theme } from '../styles';

export const useStyles = Theme.create(({ theme }) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    text: theme.text.h1,
}));
