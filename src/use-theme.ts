import { useContext } from 'react';

import { ThemeNameContext } from './theme-provider';

export function useTheme() {
    const name = useContext(ThemeNameContext);
    return name;
}
