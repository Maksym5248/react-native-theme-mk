import { useRef, useMemo } from 'react';

import { type ITheme } from './types';
import { useThemeName } from './use-theme-name';

type Args<T, B> = (args: { theme: T }) => B;

interface IUseStylesParams<T, B> {
    theme: ITheme<T>;
    createStyleSheet: Args<T, B>;
}

export function useStyles<T, B>({ theme, createStyleSheet }: IUseStylesParams<T, B>): B {
    const name = useThemeName();
    const cache = useRef<Record<string, B>>({}).current;

    const styles = useMemo(() => {
        if (!cache[name]) {
            cache[name] = createStyleSheet({ theme: theme.get(name) });
        }

        return cache?.[name];
    }, [name, cache]);

    return styles;
}
