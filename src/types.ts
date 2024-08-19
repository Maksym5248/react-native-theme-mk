import { type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';

export type IStyle = ViewStyle | TextStyle | ImageStyle;
export type INamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
export type IStyleSheet<T> = { [k: string]: { [P in keyof T]: IStyle } };
export type OnChangeCallBack<N> = (name: N) => void;

export interface IThemeManager<C extends Record<string, object>> {
    name: keyof C;
    theme: C[keyof C];
    context: React.Context<C[keyof C]>;
    set(name: keyof C): void;
    get(name: keyof C): C[keyof C];
    onChange(cb: OnChangeCallBack<keyof C>): () => void;
    removeAllListeners(): void;
    createStyleSheet<B extends INamedStyles<B>>(stylesCreator: (params: { theme: C[keyof C] }) => B): () => B;
    useTheme(): C[keyof C];
    useThemeName(): keyof C;
}
