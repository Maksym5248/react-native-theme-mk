import { type IDevice, type IDeviceInternal, Orientation, type ScreenSize } from './types';

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

export class DeviceServer implements IDevice, IDeviceInternal {
    maxWidth?: number;

    window = {
        width: 0,
        height: 0,
    };

    screen = {
        width: 0,
        height: 0,
    };

    inset = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
    };

    insets = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
    };

    frame = {
        height: 0,
        width: 0,
        x: 0,
        y: 0,
    };

    constructor(maxWidth?: number) {
        this.maxWidth = maxWidth;

        if (typeof maxWidth === 'number') {
            this.window.width = Math.min(this.window.width, maxWidth);
            this.screen.width = Math.min(this.screen.width, maxWidth);
        }
    }

    updateSafeAreaInsets() {
        // no-op on server
    }

    get isAndroid() {
        return false;
    }

    get isIOS() {
        return false;
    }

    get isWeb() {
        return false;
    }

    get isMac() {
        return false;
    }

    get isWindows() {
        return false;
    }

    get isPad() {
        return false;
    }

    get isTV() {
        return false;
    }

    get isTablet() {
        return false;
    }

    get isIphoneX() {
        return false;
    }

    get orientation() {
        return Orientation.Portrait;
    }

    get isLandscape() {
        return false;
    }

    get isPortrait() {
        return true;
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
        return 1;
    }

    get key() {
        return JSON.stringify({
            window: this.window,
            screen: this.screen,
            insets: this.insets,
            frame: this.frame,
        });
    }

    init() {
        // no-op on server
    }

    removeListeners() {
        // no-op on server
    }
}
