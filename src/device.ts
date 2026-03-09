import { Dimensions, Platform, type EmitterSubscription } from 'react-native';
import { initialWindowMetrics, type EdgeInsets, type Rect } from 'react-native-safe-area-context';
import { type IDevice, type IDeviceInternal, Orientation, type ScreenSize } from './types';

function getOrientation(height: number, width: number) {
    return width < height ? Orientation.Portrait : Orientation.Landscape;
}

const SCREEN_SIZE_ORDER: ScreenSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

function getScreenSize(width: number): ScreenSize {
    if (width <= 359) {
        return 'xs';
    }

    if (width <= 479) {
        return 'sm';
    }

    if (width <= 767) {
        return 'md';
    }

    if (width <= 1023) {
        return 'lg';
    }

    if (width <= 1439) {
        return 'xl';
    }

    return 'xxl';
}

export class Device implements IDevice, IDeviceInternal {
    dimentsionSubscription: EmitterSubscription | null = null;

    maxWidth?: number;

    window = Dimensions.get('window');

    screen = Dimensions.get('screen');

    insets = {
        right: initialWindowMetrics?.insets.right || 0,
        left: initialWindowMetrics?.insets.left || 0,
        top: initialWindowMetrics?.insets.top || 0,
        bottom: initialWindowMetrics?.insets.bottom || 0,
    };

    frame = {
        height: initialWindowMetrics?.frame.height || 0,
        width: initialWindowMetrics?.frame.width || 0,
        x: initialWindowMetrics?.frame.x || 0,
        y: initialWindowMetrics?.frame.y || 0,
    };

    constructor(maxWidth?: number) {
        this.maxWidth = maxWidth;
        this.window = this.applyMaxWidth(Dimensions.get('window'));
        this.screen = this.applyMaxWidth(Dimensions.get('screen'));
    }

    private applyMaxWidth<T extends { width: number }>(dimension: T): T {
        if (!this.maxWidth) {
            return dimension;
        }

        return {
            ...dimension,
            width: Math.min(dimension.width, this.maxWidth),
        };
    }

    updateSafeAreaInsets({ insets, frame }: { insets: EdgeInsets; frame: Rect }) {
        this.insets = {
            right: insets.right || 0,
            left: insets.left || 0,
            top: insets.top || 0,
            bottom: insets.bottom || 0,
        };

        this.frame = {
            height: frame.height || 0,
            width: frame.width || 0,
            x: frame.x || 0,
            y: frame.y || 0,
        };
    }

    get isAndroid() {
        return Platform.OS === 'android';
    }

    get isIOS() {
        return Platform.OS === 'ios';
    }

    get isWeb() {
        return Platform.OS === 'web';
    }

    get isMac() {
        return Platform.OS === 'macos';
    }

    get isWindows() {
        return Platform.OS === 'windows';
    }

    get isPad() {
        // @ts-ignore
        return !!Platform?.isPad;
    }

    get isTV() {
        return !!Platform?.isTV;
    }

    get isTablet() {
        return this.isPad || (this.screenAspectRatio < 1.6 && Math.max(this.window.width, this.window.height) >= 900);
    }

    get isIphoneX() {
        return this.isIOS && !this.isPad && !Platform.isTV && (this.window.height >= 812 || this.window.width >= 812);
    }

    get orientation() {
        return getOrientation(this.window.height, this.window.width);
    }

    get isLandscape() {
        return this.orientation === Orientation.Landscape;
    }

    get isPortrait() {
        return this.orientation === Orientation.Portrait;
    }

    get inset() {
        return {
            right: initialWindowMetrics?.insets.right || 0,
            left: initialWindowMetrics?.insets.left || 0,
            top: initialWindowMetrics?.insets.top || 0,
            bottom: initialWindowMetrics?.insets.bottom || 0,
        };
    }

    get isSmallScreen() {
        return this.window.width <= 340;
    }

    get screenSize(): ScreenSize {
        return getScreenSize(this.window.width);
    }

    get isXsScreen() {
        return this.screenSize === 'xs';
    }

    get isSmScreen() {
        return this.screenSize === 'sm';
    }

    get isMdScreen() {
        return this.screenSize === 'md';
    }

    get isLgScreen() {
        return this.screenSize === 'lg';
    }

    get isXlScreen() {
        return this.screenSize === 'xl';
    }

    get isXxlScreen() {
        return this.screenSize === 'xxl';
    }

    isAtLeast(size: ScreenSize) {
        return SCREEN_SIZE_ORDER.indexOf(this.screenSize) >= SCREEN_SIZE_ORDER.indexOf(size);
    }

    isBetween(min: ScreenSize, max: ScreenSize) {
        const current = SCREEN_SIZE_ORDER.indexOf(this.screenSize);
        const minIndex = SCREEN_SIZE_ORDER.indexOf(min);
        const maxIndex = SCREEN_SIZE_ORDER.indexOf(max);

        return current >= minIndex && current <= maxIndex;
    }

    get isShortScreen() {
        return this.window.height <= 600;
    }

    get screenAspectRatio() {
        return this.isPortrait ? this.window.height / this.window.width : this.window.width / this.window.height;
    }

    get key() {
        return JSON.stringify({
            window: this.window,
            screen: this.screen,
            insets: this.insets,
            frame: this.frame,
        });
    }

    init(callback?: () => void) {
        this.window = this.applyMaxWidth(Dimensions.get('window'));
        this.screen = this.applyMaxWidth(Dimensions.get('screen'));

        this.dimentsionSubscription = Dimensions.addEventListener('change', ({ window, screen }) => {
            this.window = this.applyMaxWidth({ ...window });
            this.screen = this.applyMaxWidth({ ...screen });
            callback?.();
        });
    }

    removeListeners() {
        this.dimentsionSubscription?.remove();
    }
}
