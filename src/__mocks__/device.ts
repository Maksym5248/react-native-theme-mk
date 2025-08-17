import { Orientation, type IDevice } from '../types';

export class Device implements IDevice {
    screen = {
        width: 100,
        height: 200,
    };
    window = {
        width: 100,
        height: 200,
    };
    inset = {
        right: 0,
        top: 0,
        left: 0,
        bottom: 0,
    };
    insets = {
        right: 0,
        top: 0,
        left: 0,
        bottom: 0,
    };
    frame = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
    screenAspectRatio = 2;

    orientation = Orientation.Portrait;

    isAndroid = true;
    isIOS = false;
    isIphoneX = false;
    isLandscape = false;
    isPortrait = false;
    isShortScreen = false;
    isSmallScreen = false;
    isTablet = false;
    isMac = false;
    isWindows = false;
    isPad = false;
    isTV = false;
    isWeb = false;

    removeAllListeners = jest.fn();
}
