import { View, Text } from 'react-native';
import { useStyles } from './screen.styles';

export const Screen = () => {
    const styles = useStyles();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>TEST</Text>
        </View>
    );
};
