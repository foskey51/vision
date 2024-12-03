import * as Speech from 'expo-speech';

export const TextToSpeech = (arg) => {

    Speech.stop();
    Speech.speak(arg);

}