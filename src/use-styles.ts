import { useRef, useMemo } from 'react';

import { type ITheme } from './types';
import { useThemeName } from './use-theme-name';

type Args<T, B> = (args: { theme: T }) => B;

interface IUseStylesParams<T, B> {
    theme: ITheme<T>;
    overrideThemeName?: string;
    createStyleSheet: Args<T, B>;
}

export function useStyles<T, B>({ theme, overrideThemeName, createStyleSheet }: IUseStylesParams<T, B>): B {
    const name = useThemeName();
    const cache = useRef<Record<string, B>>({}).current;

    const styles = useMemo(() => {
        const currentName = overrideThemeName || name;

        if (!cache[currentName]) {
            cache[currentName] = createStyleSheet({ theme: theme.get(currentName) });
        }

        return cache?.[currentName];
    }, [name, cache, overrideThemeName]);

    return styles;
}
