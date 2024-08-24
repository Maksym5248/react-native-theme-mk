import { View, Text, Button } from 'react-native';
import { useStyles } from './screen.styles';
import { ThemeManager } from '../../styles';

export const ShopScreen = () => {
    const styles = useStyles();

    const onToggleTheme = () => {
        ThemeManager.set(ThemeManager.name === 'dark' ? 'light' : 'dark');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Screen Light/Dark Theme</Text>
            <Button onPress={onToggleTheme} title="Toggle theme" />
        </View>
    );
};
