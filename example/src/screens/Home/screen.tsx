import { View, Text, TouchableOpacity } from 'react-native';
import { useStyles } from './screen.styles';
import { ThemeManager } from '../../styles';

const { useTheme } = ThemeManager;

export const HomeScreen = () => {
    const styles = useStyles({ overrideAutoScale: false, overrideThemeName: 'light' });
    const theme = useTheme();

    return (
        <View style={[styles.container]}>
            <Text style={[styles.text]}>Screen Light Theme</Text>
            <Text style={[styles.text, { color: theme.colors.accent }]}>Light/Dark Theme text</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Button</Text>
            </TouchableOpacity>
        </View>
    );
};
