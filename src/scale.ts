import { type ViewStyle, type TextStyle, type ImageStyle } from 'react-native';

type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

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
    'scale',
]);

export function applyScale<T extends NamedStyles<T>>(styles: T, scale: number): T {
    const scaledStyles = {} as T;

    for (const key in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, key)) {
            const value = styles[key as keyof T];

            if (typeof value === 'object' && value !== null) {
                scaledStyles[key as keyof T] = applyScale(value as NamedStyles<T>, scale) as T[keyof T];
            } else if (typeof value === 'number' && SCALABLE_PROPS.has(key)) {
                scaledStyles[key as keyof T] = (value * scale) as NamedStyles<T> as T[keyof T];
            } else {
                scaledStyles[key as keyof T] = value;
            }
        }
    }

    return scaledStyles;
}
