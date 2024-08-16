import { View, Text } from 'react-native';
import { useStyles } from './screen.styles';

export const ShopScreen = () => {
    const styles = useStyles('dark');

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Shop View</Text>
        </View>
    );
};
