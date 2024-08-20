import EventEmitter from 'events';

import { StyleSheet } from 'react-native';

import {
    type IThemeManager,
    type IDimensionDesignedDevice,
    type INamedStyles,
    type OnChangeCallBack,
    type IDevice,
    type IDeviceInternal,
    type IOptions,
} from './types';
import { useStyles } from './use-styles';
import { createContext, useContext, useEffect, useState } from 'react';
import { Device } from './device';
import { dimensionsDesignedDeviceConfig } from './config';
import { applyScale } from './scale';

enum Events {
    ChangeTheme = 'ChangeTheme',
}

export class ThemeManager<C extends Record<string, object>> implements IThemeManager<C> {
    name: keyof C;
    private themes: C;
    context: React.Context<C[keyof C]>;
    device: IDevice & IDeviceInternal;
    autoScale?: boolean;
    dimensionsDesignedDevice: IDimensionDesignedDevice;

    eventEmitter = new EventEmitter();

    constructor(name: keyof C, themes: C, { autoScale, dimensionsDesignedDevice }: IOptions) {
        this.themes = themes;
        this.name = name;
        this.context = createContext({} as C[keyof C]);
        this.device = new Device();
        this.autoScale = autoScale;
        this.dimensionsDesignedDevice = dimensionsDesignedDevice || dimensionsDesignedDeviceConfig;
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

    useScale() {
        const { width, height } = this.dimensionsDesignedDevice;
        const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = this.device.screen;

        const scale = DEVICE_WIDTH / width < DEVICE_HEIGHT / height ? DEVICE_WIDTH / width : DEVICE_HEIGHT / height;

        return scale;
    }
    setAutoScale(value: boolean) {
        this.autoScale = value;
    }

    createStyleSheet<B extends INamedStyles<B>>(stylesCreator: (params: { theme: C[keyof C]; device: IDevice; scale: number }) => B) {
        const scale = this.useScale();

        const createStyleSheet = ({ theme, overrideAutoScale }: { theme: C[keyof C]; device: IDevice; overrideAutoScale?: boolean }) => {
            const shouldScale = overrideAutoScale !== undefined ? overrideAutoScale : this.autoScale;

            const modifiedStyles = shouldScale
                ? applyScale(stylesCreator({ theme, device: this.device, scale }), scale)
                : stylesCreator({ theme, device: this.device, scale });

            return StyleSheet.create(modifiedStyles);
        };

        return ({ overrideThemeName, overrideAutoScale }: { overrideThemeName?: keyof C; overrideAutoScale?: boolean } = {}): B =>
            useStyles<B, C>({
                themeManager: this,
                overrideThemeName,
                createStyleSheet,
                overrideAutoScale,
            });
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
