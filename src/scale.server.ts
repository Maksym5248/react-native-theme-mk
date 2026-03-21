import type { IScale } from './types';

type NamedStylesLike = Record<string, any>;

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

export function applyScale<B extends NamedStylesLike>(styles: B, scale: IScale): B {
    const scaledStyles = {} as B;

    for (const key in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, key)) {
            const value = styles[key as keyof B];

            if (typeof value === 'object' && value !== null) {
                scaledStyles[key as keyof B] = applyScale(value as NamedStylesLike, scale) as B[keyof B];
            } else if (typeof value === 'number' && SCALABLE_PROPS.has(key)) {
                scaledStyles[key as keyof B] = (value * scale.symmetric) as B[keyof B];
            } else {
                scaledStyles[key as keyof B] = value;
            }
        }
    }

    return scaledStyles;
}
