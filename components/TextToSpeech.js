import { View, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';
import useStore from '../store';

const TextToSpeech = () => {

    const store = useStore();
    const transcribed = store.transcript;

    const speak = () => {
        Speech.stop();
        
        if (transcribed === '') {
            return;
        }

        Speech.speak(thingToSay, {
            language: 'en-IN',
            rate: 0.8,
        });
    };

    return (
        <View style={styles.container}>
            <Button title="Press to hear some words" onPress={speak} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
});

export default TextToSpeech;