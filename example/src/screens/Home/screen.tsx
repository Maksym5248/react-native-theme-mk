import { View, Text, TouchableOpacity } from 'react-native';
import { useStyles } from './screen.styles';
import { useDevice, useTheme } from '../../styles';

export const HomeScreen = () => {
    const styles = useStyles({ overrideAutoScale: false, overrideThemeName: 'light' });
    const device = useDevice();
    const theme = useTheme();

    return (
        <View style={[styles.container, { width: device.window.width, backgroundColor: theme.colors.background }]}>
            <Text style={styles.text}>Screen Override to Light Theme</Text>
            <Text style={styles.info}>Insets: {JSON.stringify(device.insets)}</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Button</Text>
            </TouchableOpacity>
        </View>
    );
};
