import EventEmitter from 'events';

import { StyleSheet } from 'react-native';

import {
    type IThemeManager,
    type IDimensionDesignedDevice,
    type OnChangeCallBack,
    type IDevice,
    type IDeviceInternal,
    type IOptions,
    type IUseCreateStyleSheet,
    type IStyleCreator,
    type INamedStyles,
    type IScale,
} from './types';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
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

    constructor(name: keyof C, themes: C, options?: IOptions) {
        const { autoScale, dimensionsDesignedDevice } = options ?? {};

        this.themes = themes;
        this.name = name;
        this.context = createContext({} as C[keyof C]);
        this.device = new Device();
        this.autoScale = !!autoScale;
        this.dimensionsDesignedDevice = dimensionsDesignedDevice || dimensionsDesignedDeviceConfig;
    }

    get theme() {
        return this.get(this.name);
    }

    set(name: keyof C) {
        this.name = name;
        this.eventEmitter.emit(Events.ChangeTheme, name);
    }

    get(name: keyof C) {
        return this.themes[name];
    }

    onChangeName(cb: OnChangeCallBack<keyof C>): () => void {
        this.eventEmitter.on(Events.ChangeTheme, cb);
        return () => this.eventEmitter.removeListener(Events.ChangeTheme, cb);
    }

    removeAllListeners() {
        this.eventEmitter.removeAllListeners();
    }

    get scale(): IScale {
        const { width: DESIGN_WIDTH, height: DESIGN_HEIGHT } = this.dimensionsDesignedDevice;
        const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = this.device.screen;

        const scaleW = DEVICE_WIDTH / DESIGN_WIDTH;
        const scaleH = DEVICE_HEIGHT / DESIGN_HEIGHT;
        const scaleFactor = (scaleW + scaleH) / 2;

        return {
            scaleW,
            scaleH,
            scaleFactor,
        };
    }

    setAutoScale(value: boolean) {
        this.autoScale = value;
    }

    createStyleSheet<B extends INamedStyles<B> & INamedStyles<any>>(stylesCreator: IStyleCreator<C, B>) {
        const createStyleSheet = ({ theme, overrideAutoScale }: { theme: C[keyof C]; device: IDevice; overrideAutoScale?: boolean }) => {
            const shouldScale = overrideAutoScale !== undefined ? overrideAutoScale : this.autoScale;

            const modifiedStyles = shouldScale
                ? applyScale(stylesCreator({ theme, device: this.device, scale: this.scale }), this.scale, this.device.screen)
                : stylesCreator({ theme, device: this.device, scale: this.scale });

            return StyleSheet.create<B>(modifiedStyles);
        };

        return ({ overrideThemeName, overrideAutoScale }: IUseCreateStyleSheet<C> = {}): B => {
            const theme = this.useTheme({ overrideThemeName });
            const cache = useRef<Record<keyof C, B>>({} as unknown as Record<keyof C, B>).current;

            const styles = useMemo(() => {
                const currentName = overrideThemeName || this.name;

                if (!cache[currentName]) {
                    cache[currentName] = createStyleSheet({
                        theme,
                        device: this.device,
                        overrideAutoScale,
                    });
                }

                return cache?.[currentName];
            }, [theme, cache, overrideThemeName, overrideAutoScale]);

            return styles;
        };
    }

    ThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
        const [currentThemeName, setCurrentThemeName] = useState<keyof C>(this.name);

        useEffect(() => {
            const unsubscribe = this.onChangeName((name) => {
                setCurrentThemeName(name);
            });
            return unsubscribe;
        }, []);

        if (!children) {
            return null;
        }

        const { Provider } = this.context;

        return <Provider value={this.get(currentThemeName)}>{children}</Provider>;
    };

    useTheme = (params?: Pick<IUseCreateStyleSheet<C>, 'overrideThemeName'>) => {
        const { overrideThemeName } = params ?? {};

        const theme = useContext<C[keyof C]>(this.context);

        return overrideThemeName ? this.get(overrideThemeName) : theme;
    };

    useDevice = () => {
        return this.device;
    };

    useScale = () => {
        return this.scale;
    };
}
