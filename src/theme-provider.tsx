import React, { useState, useEffect, createContext } from 'react';

import { type ITheme } from './types';

export const ThemeNameContext = createContext('');

interface ThemeProviderProps<T> extends React.PropsWithChildren {
    theme: ITheme<T>;
    initialThemeName: string;
}

export function ThemeProvider<T>({ children, theme, initialThemeName }: ThemeProviderProps<T>) {
    const [currentThemeName, setCurrentThemeName] = useState<string>(initialThemeName);

    useEffect(() => {
        const unsubscribe = theme.onChange((name) => {
            setCurrentThemeName(name);
        });
        return unsubscribe;
    }, []);

    if (!children) {
        return null;
    }

    return <ThemeNameContext.Provider value={currentThemeName}>{children}</ThemeNameContext.Provider>;
}
