import { View, Text, TouchableOpacity } from 'react-native';
import { useStyles } from './screen.styles';

export const HomeScreen = () => {
    const styles = useStyles({ overrideAutoScale: false, overrideThemeName: 'light' });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Screen Override to Light Theme</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Button</Text>
            </TouchableOpacity>
        </View>
    );
};
