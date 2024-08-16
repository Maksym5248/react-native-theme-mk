import EventEmitter from 'events';

import { StyleSheet } from 'react-native';

import { type ITheme, type INamedStyles } from './types';
import { useStyles } from './use-styles';

enum Events {
    ChangeTheme = 'ChangeTheme',
}

const eventEmitter = new EventEmitter();

type OnChangeCallBack = (name: string) => void;

export class ThemeCreator<T> implements ITheme<T> {
    private name = '';

    private themes: Record<string, T> = {};

    constructor(themes: Record<string, T>) {
        this.themes = themes;
    }

    get current() {
        return this.get(this.name);
    }

    set(name: string) {
        this.name = name;
        eventEmitter.emit(Events.ChangeTheme, name);
    }

    onChange(cb: OnChangeCallBack): () => void {
        eventEmitter.on(Events.ChangeTheme, cb);
        return () => eventEmitter.removeListener(Events.ChangeTheme, cb);
    }

    get(name: string) {
        return this.themes[name] as T;
    }

    removeAllListeners() {
        eventEmitter.removeAllListeners();
    }

    create<B extends INamedStyles<B>>(stylesCreator: (params: { theme: T }) => B) {
        const createStyleSheet = ({ theme }: { theme: T }) => StyleSheet.create(stylesCreator({ theme }));

        return (overrideThemeName?: string): B => useStyles<T, B>({ theme: this, overrideThemeName, createStyleSheet });
    }
}
