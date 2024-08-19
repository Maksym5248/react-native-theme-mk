import { View, Text, TouchableOpacity } from 'react-native';
import { useStyles } from './screen.styles';

export const HomeScreen = () => {
    const styles = useStyles();

    return (
        <View style={[styles.container]}>
            <Text style={styles.text}>Home View</Text>
            <TouchableOpacity style={styles.button} />
        </View>
    );
};
