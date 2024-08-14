import { Platform } from 'react-native';

import { type IShadow } from './types';

const light = Platform.select({
    ios: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 8,
        shadowOpacity: 1,
    },
    android: {
        elevation: 1,
    },
});

export const shadow: Record<'light', IShadow> = {
    light,
};
