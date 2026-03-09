import { Dimensions as DimensionsMock, Platform as PlatformMock } from 'react-native';
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

jest.mock(
    'react-native-safe-area-context',
    () => ({
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
    }),
    { virtual: true },
);

describe('Device', () => {
    let device: Device;
    const Platform = jest.mocked(PlatformMock);
    const Dimensions = jest.mocked(DimensionsMock);

    beforeEach(() => {
        Dimensions.get.mockReturnValue({ width: 375, height: 812, scale: 1, fontScale: 1 });
        device = new Device();
    });

    afterEach(() => {
        jest.clearAllMocks();
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

    describe('maxWidth option', () => {
        it('should cap window width by provided maxWidth', () => {
            Dimensions.get.mockReturnValue({ width: 1200, height: 812, scale: 1, fontScale: 1 });

            const webDevice = new Device(640);

            expect(webDevice.window.width).toBe(640);
            expect(webDevice.screen.width).toBe(640);
        });
    });

    describe('screen size flags', () => {
        it('should expose sm screen bucket for width 375', () => {
            expect(device.isSmallScreen).toBe(false);
            expect(device.screenSize).toBe('sm');
            expect(device.isSmScreen).toBe(true);
            expect(device.isMdScreen).toBe(false);
        });

        it('should expose xs screen bucket for width 340', () => {
            Dimensions.get.mockReturnValue({ width: 340, height: 812, scale: 1, fontScale: 1 });
            const xsDevice = new Device();

            expect(xsDevice.isSmallScreen).toBe(true);
            expect(xsDevice.screenSize).toBe('xs');
            expect(xsDevice.isXsScreen).toBe(true);
        });

        it('should expose xl and xxl buckets for larger widths', () => {
            Dimensions.get.mockReturnValue({ width: 1200, height: 812, scale: 1, fontScale: 1 });
            const xlDevice = new Device();
            expect(xlDevice.screenSize).toBe('xl');
            expect(xlDevice.isXlScreen).toBe(true);

            Dimensions.get.mockReturnValue({ width: 1600, height: 812, scale: 1, fontScale: 1 });
            const xxlDevice = new Device();
            expect(xxlDevice.screenSize).toBe('xxl');
            expect(xxlDevice.isXxlScreen).toBe(true);
        });

        it('should support isAtLeast and isBetween helpers', () => {
            expect(device.isAtLeast('xs')).toBe(true);
            expect(device.isAtLeast('md')).toBe(false);
            expect(device.isBetween('xs', 'md')).toBe(true);
            expect(device.isBetween('md', 'xl')).toBe(false);
        });
    });
});
