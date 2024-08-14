import { useContext } from 'react';

import { ThemeNameContext } from './theme-provider';

export function useThemeName() {
    const theme = useContext(ThemeNameContext);
    return theme;
}
