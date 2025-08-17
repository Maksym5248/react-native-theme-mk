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
    type DeepPartial,
} from './types';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Device } from './device';
import { dimensionsDesignedDeviceConfig } from './config';
import { applyScale } from './scale';
import { hexToRgba } from './utils';
import merge from 'lodash/merge';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';

enum Events {
    ChangeTheme = 'ChangeTheme',
    UpdateTheme = 'UpdateTheme',
}
export class ThemeManager<C extends Record<string, object>> implements IThemeManager<C> {
    name: keyof C;
    private themes: C;
    context: React.Context<C[keyof C]>;
    contextDevice: React.Context<string>;
    device: IDevice & IDeviceInternal;
    autoScale?: boolean;
    dimensionsDesignedDevice: IDimensionDesignedDevice;

    eventEmitter = new EventEmitter();

    constructor(name: keyof C, themes: C, options?: IOptions) {
        const { autoScale, dimensionsDesignedDevice } = options ?? {};

        this.themes = themes;
        this.name = name;
        this.context = createContext({} as C[keyof C]);
        this.contextDevice = createContext('');
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

    update(extendedThemes: DeepPartial<C>) {
        this.themes = merge({}, this.themes, extendedThemes);
        this.eventEmitter.emit(Events.UpdateTheme);
    }

    onChangeName(cb: OnChangeCallBack<keyof C>): () => void {
        this.eventEmitter.on(Events.ChangeTheme, cb);
        return () => this.eventEmitter.removeListener(Events.ChangeTheme, cb);
    }

    onUpdatedTheme(cb: OnChangeCallBack<C>): () => void {
        this.eventEmitter.on(Events.UpdateTheme, () => cb(this.themes));
        return () => this.eventEmitter.removeListener(Events.UpdateTheme, cb);
    }

    removeAllListeners() {
        this.eventEmitter.removeAllListeners();
        this.device.removeListeners();
    }

    get scale(): IScale {
        const { width: DESIGN_WIDTH, height: DESIGN_HEIGHT } = this.dimensionsDesignedDevice;
        const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = this.device.screen;

        const horizontal = DEVICE_WIDTH / DESIGN_WIDTH;
        const vertical = DEVICE_HEIGHT / DESIGN_HEIGHT;
        const symmetric = Math.min(horizontal, vertical);

        return {
            horizontal,
            vertical,
            symmetric,
        };
    }

    setAutoScale(value: boolean) {
        this.autoScale = value;
    }

    private generateHash({
        overrideAutoScale,
        stylesObject,
        deviceKey,
    }: {
        overrideAutoScale?: boolean;
        stylesObject: object;
        deviceKey: string;
    }): string {
        const hash = JSON.stringify(stylesObject);
        const scaleKey = overrideAutoScale || this.scale;

        return `${scaleKey}_${deviceKey}_${hash}`;
    }

    createStyleSheet<B extends INamedStyles<B> & INamedStyles<any>>(stylesCreator: IStyleCreator<C, B>) {
        const createStyleSheet = ({ theme, overrideAutoScale }: { theme: C[keyof C]; device: IDevice; overrideAutoScale?: boolean }) => {
            const shouldScale = overrideAutoScale !== undefined ? overrideAutoScale : this.autoScale;

            const params = {
                theme,
                device: this.device,
                scale: this.scale,
                utils: {
                    hexToRgba,
                },
            };

            let styles = stylesCreator(params);

            if (shouldScale) {
                applyScale(styles, this.scale);
            }

            const sheet = StyleSheet.create<B>(styles);

            return {
                rawStyles: styles,
                sheet,
            };
        };

        return ({ overrideThemeName, overrideAutoScale }: IUseCreateStyleSheet<C> = {}): B => {
            const theme = this.useTheme({ overrideThemeName });
            const cache = useRef<Record<keyof C, { hash: string; sheet: B }>>({} as Record<keyof C, { hash: string; sheet: B }>).current;
            const deviceKey = this.useContextDevice();

            const styles = useMemo(() => {
                const currentName = overrideThemeName || this.name;

                const { rawStyles, sheet } = createStyleSheet({
                    theme,
                    device: this.device,
                    overrideAutoScale,
                });

                const hash = this.generateHash({
                    overrideAutoScale,
                    stylesObject: rawStyles,
                    deviceKey,
                });

                if (!cache[currentName] || cache[currentName].hash !== hash) {
                    cache[currentName] = { hash, sheet };
                }

                return cache[currentName].sheet;
            }, [theme, overrideThemeName, overrideAutoScale, stylesCreator, deviceKey]);

            return styles;
        };
    }

    ThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
        const [currentThemeName, setCurrentThemeName] = useState<keyof C>(this.name);
        const [deviceKey, setDeviceKey] = useState<string>('');
        const [, setForce] = useState<number>(0);
        const insets = useSafeAreaInsets();
        const frame = useSafeAreaFrame();

        useEffect(() => {
            const unsubscribeChange = this.onChangeName((name) => {
                setCurrentThemeName(name);
            });

            const unsubscribeUpdate = this.onUpdatedTheme(() => {
                setForce((prev) => prev + 1);
            });

            this.device.init();

            return () => {
                unsubscribeChange();
                unsubscribeUpdate();
                this.removeAllListeners();
            };
        }, []);

        useMemo(() => {
            this.device.updateSafeAreaInsets({ insets, frame });
            setDeviceKey(this.device.key);
        }, [insets, frame]);

        if (!children) {
            return null;
        }

        const { Provider } = this.context;
        const { Provider: DeviceProvider } = this.contextDevice;

        return (
            <Provider value={this.get(currentThemeName)}>
                <DeviceProvider value={deviceKey}>{children}</DeviceProvider>
            </Provider>
        );
    };

    useTheme = (params?: Pick<IUseCreateStyleSheet<C>, 'overrideThemeName'>) => {
        const { overrideThemeName } = params ?? {};

        const theme = useContext<C[keyof C]>(this.context);

        return overrideThemeName ? this.get(overrideThemeName) : theme;
    };

    useDevice = () => {
        this.useContextDevice();
        return this.device;
    };

    private useContextDevice = () => {
        return useContext<string>(this.contextDevice);
    };

    useScale = () => {
        return this.scale;
    };
}
