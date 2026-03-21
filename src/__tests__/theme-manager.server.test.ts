import { ThemeManagerServer } from '../theme-manager.server';

describe('ThemeManagerServer', () => {
    const dark = { color: 'white' };
    const light = { color: 'black' };
    const themes = { dark, light };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should work without React hooks and return styles directly', () => {
        const manager = new ThemeManagerServer('dark', themes);
        const useStyles = manager.createStyleSheet(({ theme }) => ({
            container: {
                backgroundColor: theme.color,
            },
        }));

        const styles = useStyles();

        expect(styles.container.backgroundColor).toBe('white');
    });

    it('should support overrideThemeName in server mode', () => {
        const manager = new ThemeManagerServer('dark', themes);
        const useStyles = manager.createStyleSheet(({ theme }) => ({
            container: {
                backgroundColor: theme.color,
            },
        }));

        const styles = useStyles({ overrideThemeName: 'light' });

        expect(styles.container.backgroundColor).toBe('black');
    });
});
