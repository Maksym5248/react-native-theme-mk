import EventEmitter from 'events';

import { createContext } from 'react';
import merge from 'lodash/merge';

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
import { DeviceServer } from './device.server';
import { dimensionsDesignedDeviceConfig } from './config';
import { applyScale } from './scale.server';
import { hexToRgba } from './utils';

enum Events {
    ChangeTheme = 'ChangeTheme',
    UpdateTheme = 'UpdateTheme',
}

export class ThemeManagerServer<C extends Record<string, object>> implements IThemeManager<C> {
    name: keyof C;
    private themes: C;
    context: React.Context<C[keyof C]>;
    contextDevice: React.Context<string>;
    device: IDevice & IDeviceInternal;
    autoScale?: boolean;
    dimensionsDesignedDevice: IDimensionDesignedDevice;

    eventEmitter = new EventEmitter();

    constructor(name: keyof C, themes: C, options?: IOptions) {
        const { autoScale, dimensionsDesignedDevice, maxWidth } = options ?? {};

        this.themes = themes;
        this.name = name;
        this.context = createContext({} as C[keyof C]);
        this.contextDevice = createContext('');
        this.device = new DeviceServer(maxWidth);
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

        if (DEVICE_WIDTH <= 0 || DEVICE_HEIGHT <= 0) {
            return {
                horizontal: 1,
                vertical: 1,
                symmetric: 1,
            };
        }

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
        const shouldScale = overrideAutoScale !== undefined ? overrideAutoScale : this.autoScale;
        const scaleKey = shouldScale ? JSON.stringify(this.scale) : 'noscale';

        return `${scaleKey}_${deviceKey}_${hash}`;
    }

    createStyleSheet<B extends INamedStyles<B> & INamedStyles<any>>(stylesCreator: IStyleCreator<C, B>) {
        const cache = {} as Record<string, { hash: string; sheet: B }>;

        return ({ overrideThemeName, overrideAutoScale }: IUseCreateStyleSheet<C> = {}): B => {
            const currentName = String(overrideThemeName || this.name);
            const theme = overrideThemeName ? this.get(overrideThemeName) : this.theme;
            const shouldScale = overrideAutoScale !== undefined ? overrideAutoScale : this.autoScale;

            const params = {
                theme,
                device: this.device,
                scale: this.scale,
                utils: {
                    hexToRgba,
                },
            };

            const styles = stylesCreator(params);

            if (shouldScale) {
                applyScale(styles, this.scale);
            }

            const hash = this.generateHash({
                overrideAutoScale,
                stylesObject: styles,
                deviceKey: this.device.key,
            });

            if (!cache[currentName] || cache[currentName].hash !== hash) {
                cache[currentName] = {
                    hash,
                    sheet: styles,
                };
            }

            return cache[currentName].sheet;
        };
    }

    ThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
        if (!children) {
            return null;
        }

        return children;
    };

    useTheme = (params?: Pick<IUseCreateStyleSheet<C>, 'overrideThemeName'>) => {
        const { overrideThemeName } = params ?? {};

        return overrideThemeName ? this.get(overrideThemeName) : this.theme;
    };

    useDevice = () => {
        return this.device;
    };

    useScale = () => {
        return this.scale;
    };
}
