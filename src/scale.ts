import { PixelRatio, type StyleSheet } from 'react-native';
import type { IDimensionDevice, IScale } from './types';

const SCALABLE_PROPS = new Set([
    'width',
    'height',
    'minWidth',
    'minHeight',
    'maxWidth',
    'maxHeight',
    'margin',
    'marginVertical',
    'marginHorizontal',
    'marginTop',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'padding',
    'paddingVertical',
    'paddingHorizontal',
    'paddingTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'borderWidth',
    'borderTopWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderRightWidth',
    'borderRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'fontSize',
    'lineHeight',
    'letterSpacing',
    'shadowRadius',
    'shadowOffset',
    'textShadowRadius',
    'top',
    'bottom',
    'left',
    'right',
    'translateX',
    'translateY',
]);

const HORIZONTAL_SCALABLE_PROPS = new Set([
    'paddingHorizontal',
    'paddingLeft',
    'paddingRight',
    'marginHorizontal',
    'marginLeft',
    'marginRight',
    'width',
    'minWidth',
    'maxWidth',
    'left',
    'right',
    'translateX',
]);
const VERTICAL_SCALABLE_PROPS = new Set([
    'marginVertical',
    'marginTop',
    'marginBottom',
    'paddingVertical',
    'paddingTop',
    'paddingBottom',
    'height',
    'minHeight',
    'maxHeight',
    'top',
    'bottom',
    'translateY',
]);
const MAX_WIDTH = new Set(['width', 'minWidth', 'maxWidth']);

export const applyScaleToValue = (value: number, key: string, scale: IScale, dimensionDevice: IDimensionDevice) => {
    if (HORIZONTAL_SCALABLE_PROPS.has(key)) {
        if (MAX_WIDTH.has(key)) {
            const newValue = value * scale.scaleW;
            const scaledValue = newValue > dimensionDevice.width ? dimensionDevice.width : newValue;

            return {
                [key]: PixelRatio.roundToNearestPixel(scaledValue),
            };
        }
        return {
            [key]: PixelRatio.roundToNearestPixel(value * scale.scaleW),
        };
    } else if (VERTICAL_SCALABLE_PROPS.has(key)) {
        return {
            [key]: PixelRatio.roundToNearestPixel(value * scale.scaleH),
        };
    } else if (key === 'margin') {
        return {
            ['marginVertical']: PixelRatio.roundToNearestPixel(value * scale.scaleH),
            ['marginHorizontal']: PixelRatio.roundToNearestPixel(value * scale.scaleW),
        };
    } else if (key === 'padding') {
        return {
            ['paddingVertical']: PixelRatio.roundToNearestPixel(value * scale.scaleH),
            ['paddingHorizontal']: PixelRatio.roundToNearestPixel(value * scale.scaleW),
        };
    } else {
        return {
            [key]: PixelRatio.roundToNearestPixel(value * scale.scaleFactor),
        };
    }
};

export function applyScale<B extends StyleSheet.NamedStyles<B> | StyleSheet.NamedStyles<any>>(
    styles: B,
    scale: IScale,
    dimensionDevice: IDimensionDevice,
): B {
    const scaledStyles = {} as B;

    for (const key in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, key)) {
            const value = styles[key as keyof B];

            if (typeof value === 'object' && value !== null) {
                scaledStyles[key as keyof B] = applyScale(value as StyleSheet.NamedStyles<B>, scale, dimensionDevice) as B[keyof B];
            } else if (typeof value === 'number' && SCALABLE_PROPS.has(key)) {
                const newScaledStyle = applyScaleToValue(value, key, scale, dimensionDevice);

                Object.assign(scaledStyles, newScaledStyle);
            } else {
                scaledStyles[key as keyof B] = value;
            }
        }
    }

    return scaledStyles;
}
