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
jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaFrame: jest.fn(() => ({ width: 375, height: 812, x: 0, y: 0 })),
    useSafeAreaInsets: jest.fn(() => ({ right: 0, top: 0, left: 0, bottom: 0 })),
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

    it('should update current theme name and call onChangeName listener', () => {
        const listener = jest.fn();
        themeManager.onChangeName(listener);
        themeManager.set('light');
        expect(themeManager.theme).toStrictEqual(light);
        expect(themeManager.name).toStrictEqual('light');
        expect(listener).toHaveBeenCalledWith('light');
    });

    it('should update themes with update() and call onUpdatedTheme listener', () => {
        const listener = jest.fn();
        themeManager.onUpdatedTheme(listener);
        themeManager.update({ light: { color: 'gray' } });
        expect(themeManager.get('light')).toStrictEqual({ color: 'gray' });
        expect(listener).toHaveBeenCalledWith(expect.objectContaining({ light: { color: 'gray' } }));
    });

    it('should expose device and dimensionsDesignedDevice properties', () => {
        expect(themeManager.device).toBeDefined();
        expect(themeManager.dimensionsDesignedDevice).toBeDefined();
    });

    it('should return scale object from useScale', () => {
        const scale = themeManager.useScale();
        expect(scale).toHaveProperty('horizontal');
        expect(scale).toHaveProperty('vertical');
        expect(scale).toHaveProperty('symmetric');
    });
});
