import { StyleSheet, type EmitterSubscription, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';

export interface IDeviceInternal {
    dimentsionSubscription: EmitterSubscription | null;
    addDimensionsEventListener(callback: any): void;
    removeListeners(): void;
}

export interface IDimensionDesignedDevice {
    width: number;
    height: number;
}

export enum Orientation {
    Portrait = 'portrait',
    Landscape = 'landscape',
}

export interface IDevice {
    isAndroid: boolean;
    isIOS: boolean;
    isTablet: boolean;
    isIphoneX: boolean;
    window: { width: number; height: number };
    screen: { width: number; height: number };
    orientation: Orientation;
    isLandscape: boolean;
    isPortrait: boolean;
    inset: { right: number; left: number; top: number; bottom: number };
    isSmallScreen: boolean;
    isShortScreen: boolean;
    screenAspectRatio: number;
}

export type IStyle = ViewStyle & TextStyle & ImageStyle;
export type INamedStyles<T> = StyleSheet.NamedStyles<T>;
export type OnChangeCallBack<N> = (name: N) => void;

export interface IUseCreateStyleSheet<C> {
    overrideThemeName?: keyof C;
    overrideAutoScale?: boolean;
}

export type IStyleCreator<C, B extends INamedStyles<B> | INamedStyles<any>> = (params: {
    theme: C[keyof C];
    device: IDevice;
    scale: number;
}) => B & INamedStyles<any>;

export interface IThemeManager<C extends Record<string, object>> {
    name: keyof C;
    theme: C[keyof C];
    context: React.Context<C[keyof C]>;
    set(name: keyof C): void;
    get(name: keyof C): C[keyof C];
    onChangeName(cb: OnChangeCallBack<keyof C>): () => void;
    removeAllListeners(): void;
    createStyleSheet<B extends INamedStyles<B>>(
        stylesCreator: IStyleCreator<C, B>,
    ): (params?: IUseCreateStyleSheet<C>) => B | INamedStyles<B>;
    useTheme: (params?: Pick<IUseCreateStyleSheet<C>, 'overrideThemeName'>) => C[keyof C];
    useDevice: () => IDevice;
    useScale: () => number;
    device: IDevice;
    dimensionsDesignedDevice: IDimensionDesignedDevice;
}

export interface IOptions {
    dimensionsDesignedDevice?: IDimensionDesignedDevice;
    autoScale?: boolean;
}
