export const useStyles = jest.fn((args) =>
    args?.createStyleSheet({
        theme: args.themeManager.theme,
        overrideThemeName: args.overrideThemeName,
        overrideAutoScale: args.overrideAutoScale,
    }),
);
