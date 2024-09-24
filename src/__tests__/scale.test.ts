import { PixelRatio } from 'react-native';
import { applyScale, applyScaleToValue } from '../scale';
import type { IScale } from '../types';

describe('scale', () => {
    describe('applyScaleToValue', () => {
        const scale: IScale = {
            horizontal: 1.2,
            vertical: 1.1,
            symmetric: 1.1,
        };

        it('should scale value correctly based on symmetric scale', () => {
            const result = applyScaleToValue(100, 'width', scale);
            expect(result).toEqual({
                width: PixelRatio.roundToNearestPixel(100 * scale.symmetric),
            });
        });

        it('should scale value with PixelRatio rounding', () => {
            const result = applyScaleToValue(50.7, 'height', scale);
            expect(result).toEqual({
                height: PixelRatio.roundToNearestPixel(50.7 * scale.symmetric),
            });
        });
    });

    describe('applyScale', () => {
        const scale: IScale = {
            horizontal: 1.2,
            vertical: 1.1,
            symmetric: 1.1,
        };

        const styles = {
            container: {
                width: 100,
                height: 200,
                margin: 10,
                padding: 5,
                fontSize: 16,
            },
        };

        it('should scale all applicable properties based on symmetric scale', () => {
            const result = applyScale(styles, scale);

            expect(result).toEqual({
                container: {
                    width: PixelRatio.roundToNearestPixel(100 * scale.symmetric),
                    height: PixelRatio.roundToNearestPixel(200 * scale.symmetric),
                    margin: PixelRatio.roundToNearestPixel(10 * scale.symmetric),
                    padding: PixelRatio.roundToNearestPixel(5 * scale.symmetric),
                    fontSize: PixelRatio.roundToNearestPixel(16 * scale.symmetric),
                },
            });
        });

        it('should not scale non-scalable properties', () => {
            const nonScalableStyles = {
                container: {
                    backgroundColor: 'red',
                    zIndex: 10,
                },
            };

            const result = applyScale(nonScalableStyles, scale);

            expect(result).toEqual(nonScalableStyles);
        });

        it('should scale nested objects correctly', () => {
            const nestedStyles = {
                container: {
                    width: 150,
                    padding: 10,
                },
                text: {
                    fontSize: 20,
                },
            };

            const result = applyScale(nestedStyles, scale);

            expect(result).toEqual({
                container: {
                    width: PixelRatio.roundToNearestPixel(150 * scale.symmetric),
                    padding: PixelRatio.roundToNearestPixel(10 * scale.symmetric),
                },
                text: {
                    fontSize: PixelRatio.roundToNearestPixel(20 * scale.symmetric),
                },
            });
        });
    });
});
