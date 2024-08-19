import { View, Text } from 'react-native';
import { useStyles } from './screen.styles';
import { ThemeManager } from '../../styles';

const { useTheme } = ThemeManager;

export const HomeScreen = () => {
    const styles = useStyles();
    const theme = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.accent }]}>
            <Text style={styles.text}>Home View</Text>
        </View>
    );
};
