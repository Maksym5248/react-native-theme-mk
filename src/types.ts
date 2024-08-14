import { type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';

export type IStyle = ViewStyle | TextStyle | ImageStyle;
export type INamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
export type IStyleSheet<T> = { [k: string]: { [P in keyof T]: IStyle } };

export interface ITheme<T> {
    set(name: string): void;
    get(name: string): T;
    onChange(cb: (name: string) => void): () => void;
    removeAllListeners(): void;
    create<B extends INamedStyles<B>>(stylesCreator: (params: { theme: T }) => B): () => B;
    current: T;
}
