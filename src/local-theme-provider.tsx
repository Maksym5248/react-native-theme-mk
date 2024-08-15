import React from 'react';
import { ThemeNameContext } from './theme-provider';

interface LocalThemeProviderProps extends React.PropsWithChildren {
    themeName: string;
}

export function LocalThemeProvider({ children, themeName }: LocalThemeProviderProps) {
    if (!themeName) {
        console.warn(`Theme "${themeName}" does not exist.`);
        return children;
    }

    return <ThemeNameContext.Provider value={themeName}>{children}</ThemeNameContext.Provider>;
}
