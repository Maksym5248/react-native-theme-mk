import React, { useState, useEffect, createContext } from 'react';

import { type ITheme } from './types';

export const ThemeNameContext = createContext('');

interface ThemeProviderProps<T> extends React.PropsWithChildren {
    theme: ITheme<T>;
}

export function ThemeProvider<T>({ children, theme }: ThemeProviderProps<T>) {
    const [currentThemeName, setCurrentThemeName] = useState<string>('');

    useEffect(() => {
        const unsubscribe = theme.onChange((name) => {
            setCurrentThemeName(name);
        });
        return unsubscribe;
    }, []);

    return <ThemeNameContext.Provider value={currentThemeName}>{children}</ThemeNameContext.Provider>;
}
