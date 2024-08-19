import EventEmitter from 'events';

import { StyleSheet } from 'react-native';

import { type IThemeManager, type INamedStyles, type OnChangeCallBack, type IDevice, type IDeviceInternal } from './types';
import { useStyles } from './use-styles';
import { createContext, useContext, useEffect, useState } from 'react';
import { Device } from './device';

enum Events {
    ChangeTheme = 'ChangeTheme',
}

export class ThemeManagerCreator<C extends Record<string, object>> implements IThemeManager<C> {
    name: keyof C;
    private themes: C;
    context: React.Context<C[keyof C]>;
    device: IDevice & IDeviceInternal;

    eventEmitter = new EventEmitter();

    constructor(name: keyof C, themes: C) {
        this.themes = themes;
        this.name = name;
        this.context = createContext({} as C[keyof C]);
        this.device = new Device();
    }

    get theme() {
        return this.get(this.name);
    }

    set(name: keyof C) {
        this.name = name;
        this.eventEmitter.emit(Events.ChangeTheme, name);
    }

    onChange(cb: OnChangeCallBack<keyof C>): () => void {
        this.eventEmitter.on(Events.ChangeTheme, cb);
        return () => this.eventEmitter.removeListener(Events.ChangeTheme, cb);
    }

    get(name: keyof C) {
        return this.themes[name];
    }

    removeAllListeners() {
        this.eventEmitter.removeAllListeners();
    }

    createStyleSheet<B extends INamedStyles<B>>(stylesCreator: (params: { theme: C[keyof C]; device: IDevice }) => B) {
        const createStyleSheet = ({ theme }: { theme: C[keyof C]; device: IDevice }) =>
            StyleSheet.create(stylesCreator({ theme, device: this.device }));

        return (overrideThemeName?: keyof C): B => useStyles<B, C>({ themeManager: this, overrideThemeName, createStyleSheet });
    }

    useTheme(overrideThemeName?: keyof C) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return overrideThemeName ? this.get(overrideThemeName) : useContext<C[keyof C]>(this.context);
    }

    useThemeName() {
        this.useTheme();
        return this.name;
    }

    useDevice() {
        return this.device;
    }

    ThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
        const [currentThemeName, setCurrentThemeName] = useState<keyof C>('');

        useEffect(() => {
            const unsubscribe = this.onChange((name) => {
                setCurrentThemeName(name);
            });
            return unsubscribe;
        }, []);

        if (!children) {
            return null;
        }

        return <this.context.Provider value={this.get(currentThemeName)}>{children}</this.context.Provider>;
    };
}
