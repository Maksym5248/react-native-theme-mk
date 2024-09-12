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

/**
 * Interface representing device-specific properties and characteristics.
 */
export interface IDevice {
    /**
     * Indicates if the device is running Android.
     */
    isAndroid: boolean;

    /**
     * Indicates if the device is running iOS.
     */
    isIOS: boolean;

    /**
     * Indicates if the device is a tablet.
     */
    isTablet: boolean;

    /**
     * Indicates if the device is an iPhone X.
     */
    isIphoneX: boolean;

    /**
     * Dimensions of the device's window.
     */
    window: {
        /**
         * Width of the window.
         */
        width: number;

        /**
         * Height of the window.
         */
        height: number;
    };

    /**
     * Dimensions of the device's screen.
     */
    screen: {
        /**
         * Width of the screen.
         */
        width: number;

        /**
         * Height of the screen.
         */
        height: number;
    };

    /**
     * Current orientation of the device.
     */
    orientation: Orientation;

    /**     * Indicates if the device is in landscape mode.     */
    isLandscape: boolean;
    /**     * Indicates if the device is in portrait mode.     */
    isPortrait: boolean;

    /**
     * Insets of the device's screen.
     */
    inset: {
        /**
         * Right inset.
         */
        right: number;

        /**
         * Left inset.
         */
        left: number;

        /**
         * Top inset.
         */
        top: number;

        /**
         * Bottom inset.
         */
        bottom: number;
    };

    /**
     * Indicates if the device has a small screen.
     */
    isSmallScreen: boolean;

    /**
     * Indicates if the device has a short screen.
     */
    isShortScreen: boolean;

    /**
     * Aspect ratio of the device's screen.
     */
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

/**
 * Interface representing a Theme Manager.
 *
 * @template C - A record where keys are strings and values are objects.
 */
export interface IThemeManager<C extends Record<string, object>> {
    /**
     * The name of the current theme.
     */
    name: keyof C;

    /**
     * The current theme object.
     */
    theme: C[keyof C];

    /**
     * The React context for the current theme.
     */
    context: React.Context<C[keyof C]>;

    /**
     * Sets the current theme by name.
     *
     * @param name - The name of the theme to set.
     */
    set(name: keyof C): void;

    /**
     * Gets a theme by name.
     *
     * @param name - The name of the theme to get.
     * @returns The theme object.
     */
    get(name: keyof C): C[keyof C];

    /**
     * Registers a callback to be called when the theme name changes.
     *
     * @param cb - The callback function.
     * @returns A function to remove the listener.
     */
    onChangeName(cb: OnChangeCallBack<keyof C>): () => void;

    /**
     * Removes all registered listeners.
     */
    removeAllListeners(): void;

    /**
     * Creates a style sheet using the provided styles creator.
     *
     * @template B - A record of named styles.
     * @param stylesCreator - The function to create styles.
     * @returns A function that takes optional parameters and returns the created styles.
     */
    createStyleSheet<B extends INamedStyles<B>>(
        stylesCreator: IStyleCreator<C, B>,
    ): (params?: IUseCreateStyleSheet<C>) => B | INamedStyles<B>;

    /**
     * Hook to use the current theme.
     *
     * @param params - Optional parameters to override the theme name.
     * @returns The current theme object.
     */
    useTheme: (params?: Pick<IUseCreateStyleSheet<C>, 'overrideThemeName'>) => C[keyof C];

    /**
     * Hook to use the device information.
     *
     * @returns The device information.
     */
    useDevice: () => IDevice;

    /**
     * Hook to use the scale factor.
     *
     * @returns The scale factor.
     */
    useScale: () => number;

    /**
     * The device information.
     */
    device: IDevice;

    /**
     * The dimensions of the designed device.
     */
    dimensionsDesignedDevice: IDimensionDesignedDevice;
}

export interface IOptions {
    dimensionsDesignedDevice?: IDimensionDesignedDevice;
    autoScale?: boolean;
}
