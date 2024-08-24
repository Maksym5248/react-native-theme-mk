import { StyleSheet } from 'react-native';

import { ThemeManager } from '../theme-manager';
import type { IThemeManager } from '../types';

jest.mock('react-native', () => ({
    StyleSheet: {
        create: jest.fn(),
    },
    Dimensions: {
        get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
        addEventListener: jest.fn(),
    },
    NativeModules: {
        StatusBarManager: {
            HEIGHT: 20,
        },
    },
    Platform: {
        OS: 'ios',
        isPad: false,
        isTV: false,
    },
}));

jest.mock('../device');
jest.mock('../scale');

interface ITheme {
    color: string;
}

describe('Theme manager', () => {
    const dark: ITheme = { color: 'white' };
    const light: ITheme = { color: 'black' };
    const themes = { dark, light };

    let themeManager: IThemeManager<Record<'light' | 'dark', ITheme>>;
    let StyleSheetMock = jest.mocked(StyleSheet);

    beforeEach(() => {
        StyleSheetMock.create.mockImplementation((s) => s);
        themeManager = new ThemeManager('dark', themes);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return correct default theme', () => {
        expect(themeManager.theme).toStrictEqual(dark);
        expect(themeManager.name).toStrictEqual('dark');
    });

    it('should update current theme name', () => {
        themeManager.set('light');

        expect(themeManager.theme).toStrictEqual(light);
        expect(themeManager.name).toStrictEqual('light');
    });
});
