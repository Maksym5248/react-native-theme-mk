import { PixelRatio } from 'react-native';
import { applyScale, applyScaleToValue } from '../scale';
import type { IScale, IDimensionDevice } from '../types';

describe('scale', () => {
    describe('applyScaleToValue', () => {
        const scale: IScale = {
            scaleW: 1.2,
            scaleH: 1.3,
            scaleFactor: 1.1,
        };

        const dimensionDevice: IDimensionDevice = {
            width: 400,
            height: 800,
        };

        it('should scale horizontal properties', () => {
            const result = applyScaleToValue(100, 'width', scale, dimensionDevice);
            expect(result).toEqual({ width: PixelRatio.roundToNearestPixel(120) });
        });

        it('should scale vertical properties', () => {
            const result = applyScaleToValue(100, 'height', scale, dimensionDevice);
            expect(result).toEqual({ height: PixelRatio.roundToNearestPixel(130) });
        });

        it('should limit width to the dimensionDevice width', () => {
            const result = applyScaleToValue(500, 'width', scale, dimensionDevice);
            expect(result).toEqual({ width: PixelRatio.roundToNearestPixel(400) });
        });

        it('should scale margin correctly', () => {
            const result = applyScaleToValue(50, 'margin', scale, dimensionDevice);
            expect(result).toEqual({
                marginVertical: PixelRatio.roundToNearestPixel(50 * scale.scaleH),
                marginHorizontal: PixelRatio.roundToNearestPixel(50 * scale.scaleW),
            });
        });

        it('should scale padding correctly', () => {
            const result = applyScaleToValue(30, 'padding', scale, dimensionDevice);
            expect(result).toEqual({
                paddingVertical: PixelRatio.roundToNearestPixel(30 * scale.scaleH),
                paddingHorizontal: PixelRatio.roundToNearestPixel(30 * scale.scaleW),
            });
        });
        it('should not scale non-scalable properties', () => {
            const nonScalableStyles = {
                container: {
                    backgroundColor: 'red',
                    zIndex: 2,
                },
            };

            const result = applyScale(nonScalableStyles, scale, dimensionDevice);

            expect(result.container).toEqual({
                backgroundColor: 'red',
                zIndex: 2,
            });
        });
    });

    describe('applyScale', () => {
        const scale: IScale = {
            scaleW: 1.2,
            scaleH: 1.3,
            scaleFactor: 1.1,
        };

        const dimensionDevice: IDimensionDevice = {
            width: 400,
            height: 800,
        };

        const styles = {
            container: {
                width: 200,
                height: 300,
                margin: 10,
                padding: 5,
                fontSize: 16,
            },
        };

        it('should scale all applicable properties correctly', () => {
            const result = applyScale(styles, scale, dimensionDevice);

            expect(result.container).toEqual({
                width: PixelRatio.roundToNearestPixel(240),
                height: PixelRatio.roundToNearestPixel(390),
                marginVertical: PixelRatio.roundToNearestPixel(10 * scale.scaleH),
                marginHorizontal: PixelRatio.roundToNearestPixel(10 * scale.scaleW),
                paddingVertical: PixelRatio.roundToNearestPixel(5 * scale.scaleH),
                paddingHorizontal: PixelRatio.roundToNearestPixel(5 * scale.scaleW),
                fontSize: PixelRatio.roundToNearestPixel(16 * scale.scaleFactor),
            });
        });

        it('should limit width to the device width', () => {
            const oversizedStyles = {
                container: {
                    width: 500,
                    height: 300,
                },
            };

            const result = applyScale(oversizedStyles, scale, dimensionDevice);

            expect(result.container.width).toEqual(PixelRatio.roundToNearestPixel(400));
        });
    });
});
