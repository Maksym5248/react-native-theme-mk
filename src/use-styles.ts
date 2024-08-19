import { useRef, useMemo } from 'react';

import { type IDevice, type IThemeManager } from './types';

interface IUseStylesParams<B, C extends Record<string, object>> {
    themeManager: IThemeManager<C>;
    overrideThemeName?: keyof C;
    createStyleSheet: (args: { theme: C[keyof C]; device: IDevice; overrideAutoScale?: boolean }) => B;
    overrideAutoScale?: boolean;
}

export function useStyles<B, C extends Record<string, object>>({
    themeManager,
    overrideThemeName,
    createStyleSheet,
    overrideAutoScale,
}: IUseStylesParams<B, C>): B {
    const name = themeManager.useThemeName();

    const cache = useRef<Record<keyof C, B>>({} as unknown as Record<keyof C, B>).current;

    const styles = useMemo(() => {
        const currentName = overrideThemeName || name;

        if (!cache[currentName]) {
            cache[currentName] = createStyleSheet({ theme: themeManager.get(currentName), device: themeManager.device, overrideAutoScale });
        }

        return cache?.[currentName];
    }, [name, cache, overrideThemeName, overrideAutoScale]);

    return styles;
}
