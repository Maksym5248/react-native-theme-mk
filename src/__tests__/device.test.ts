import { Platform as PlatformMock } from 'react-native';
import { Device } from '../device';

jest.mock('react-native', () => ({
    Dimensions: {
        get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
        addEventListener: jest.fn(),
    },
    NativeModules: {
        StatusBarManager: {
            HEIGHT: 20,
        },
    },
    Platform: {
        OS: 'ios',
        isPad: false,
        isTV: false,
    },
}));

jest.mock('react-native-safe-area-context', () => ({
    initialWindowMetrics: {
        frame: {
            x: 0,
            y: 0,
            width: 375,
            height: 812,
        },
        insets: {
            top: 44,
            left: 0,
            right: 0,
            bottom: 34,
        },
    },
}));

describe('Device', () => {
    let device: Device;
    const Platform = jest.mocked(PlatformMock);

    beforeEach(() => {
        device = new Device();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('statusBar', () => {
        it('should return the correct height for iOS', () => {
            expect(device.statusBar.height).toBe(20);
        });

        it('should return the correct height for Android', () => {
            Platform.OS = 'android';
            expect(device.statusBar.height).toBe(20);
        });
    });

    describe('isAndroid', () => {
        it('should return true if the platform is Android', () => {
            Platform.OS = 'android';
            expect(device.isAndroid).toBe(true);
        });

        it('should return false if the platform is not Android', () => {
            Platform.OS = 'ios';

            expect(device.isAndroid).toBe(false);
        });
    });

    describe('isIOS', () => {
        it('should return true if the platform is iOS', () => {
            expect(device.isIOS).toBe(true);
        });

        it('should return false if the platform is not iOS', () => {
            Platform.OS = 'android';

            expect(device.isIOS).toBe(false);
        });
    });

    describe('isTablet', () => {
        it('should return true if the device is a tablet', () => {
            // @ts-ignore
            Platform.isPad = true;

            expect(device.isTablet).toBe(true);
        });
    });
});
