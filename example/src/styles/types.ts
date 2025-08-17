import { type IStyle } from '../../../src';

export type IPalette = 'black' | 'grey4E' | 'grey92' | 'creamF5' | 'white' | 'green78' | 'redEF' | 'transparent' | 'greenF7';
export type IColor =
    | 'white'
    | 'black'
    | 'text'
    | 'primary'
    | 'secondary'
    | 'thirdiary'
    | 'border'
    | 'button'
    | 'background'
    | 'backgroundChat'
    | 'backgroundModal'
    | 'textSecondary'
    | 'accent'
    | 'accentLight'
    | 'error'
    | 'transparent';

export interface IThemeManagerTextStyle {
    color: string;
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
}

export type IShadow =
    | {
          shadowColor: string;
          shadowOffset: {
              width: number;
              height: number;
          };
          shadowRadius: number;
          shadowOpacity: number;
          elevation?: undefined;
      }
    | {
          elevation: number;
          shadowColor?: undefined;
          shadowOffset?: undefined;
          shadowRadius?: undefined;
          shadowOpacity?: undefined;
      }
    | undefined;

export interface IBaseThemeSchema {
    radius: Record<'M', number>;
    colors: Record<IColor, string>;
    fonts: Record<'bold' | 'medium' | 'regular' | 'light', string>;
    lineHeight: Record<'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5', number>;
    spacing: Record<'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL', number>;
    fontSize: Record<'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5', number>;
}

export interface IThemeManagerSchema extends IBaseThemeSchema {
    palette: Record<IPalette, string>;
    element: Record<'header', IStyle>;
    text: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5', IThemeManagerTextStyle>;
    shadow: Record<'light', IShadow>;
}
