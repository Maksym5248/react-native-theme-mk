import React, { useState, useEffect } from 'react';

import { type IThemeManager } from './types';

interface ThemeProviderProps<C extends Record<string, T>, T extends object> extends React.PropsWithChildren {
    themeManager: IThemeManager<C>;
}

export function ThemeProvider<C extends Record<string, T>, T extends object>({ children, themeManager }: ThemeProviderProps<C, T>) {
    const [currentThemeName, setCurrentThemeName] = useState<keyof C>('');

    useEffect(() => {
        const unsubscribe = themeManager.onChange((name) => {
            setCurrentThemeName(name);
        });
        return unsubscribe;
    }, []);

    if (!children) {
        return null;
    }

    return <themeManager.context.Provider value={themeManager.get(currentThemeName)}>{children}</themeManager.context.Provider>;
}
