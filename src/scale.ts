import { PixelRatio, type StyleSheet } from 'react-native';
import type { IScale } from './types';

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

export const applyScaleToValue = (value: number, key: string, scale: IScale) => {
    return {
        [key]: PixelRatio.roundToNearestPixel(value * scale.symmetric),
    };
};

export function applyScale<B extends StyleSheet.NamedStyles<B> | StyleSheet.NamedStyles<any>>(styles: B, scale: IScale): B {
    const scaledStyles = {} as B;

    for (const key in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, key)) {
            const value = styles[key as keyof B];

            if (typeof value === 'object' && value !== null) {
                scaledStyles[key as keyof B] = applyScale(value as StyleSheet.NamedStyles<B>, scale) as B[keyof B];
            } else if (typeof value === 'number' && SCALABLE_PROPS.has(key)) {
                const modifiedValue = PixelRatio.roundToNearestPixel(value * scale.symmetric);
                scaledStyles[key as keyof B] = modifiedValue as StyleSheet.NamedStyles<B> as B[keyof B];
            } else {
                scaledStyles[key as keyof B] = value;
            }
        }
    }

    return scaledStyles;
}
