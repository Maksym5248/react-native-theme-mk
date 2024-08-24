import { Dimensions, Platform, type EmitterSubscription } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { type IDevice, type IDeviceInternal, Orientation } from './types';

function getOrientation(height: number, width: number) {
    return width < height ? Orientation.Portrait : Orientation.Landscape;
}

// @ts-ignore
const isPad = () => !!Platform?.isPad;

export class Device implements IDevice, IDeviceInternal {
    dimentsionSubscription: EmitterSubscription | null = null;

    get isAndroid() {
        return Platform.OS === 'android';
    }
    get isIOS() {
        return Platform.OS === 'ios';
    }

    get isTablet() {
        return isPad() || (this.screenAspectRatio < 1.6 && Math.max(this.window.width, this.window.height) >= 900);
    }

    get isIphoneX() {
        return this.isIOS && isPad() && !Platform.isTV && (this.window.height >= 812 || this.window.width >= 812);
    }

    get window() {
        return Dimensions.get('window');
    }

    get screen() {
        return Dimensions.get('screen');
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
    get isShortScreen() {
        return this.window.height <= 600;
    }
    get screenAspectRatio() {
        return this.isPortrait ? this.window.height / this.window.width : this.window.width / this.window.height;
    }

    addDimensionsEventListener(callback: any) {
        this.dimentsionSubscription = Dimensions.addEventListener('change', callback);
    }

    removeListeners() {
        this.dimentsionSubscription?.remove();
    }
}
