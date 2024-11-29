import React, { useState } from "react";
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Speech from 'expo-speech';
import useStore from "../store";

const SpeechToText = () => {
    const [recognizing, setRecognizing] = useState(false);
    const transcript = useStore.getState().transcript;
    const setTranscript = (newTranscript) => {
        useStore.setState({ transcript: newTranscript });
    };

    const speak = () => {
        Speech.stop();

        Speech.speak(transcript, {
            language: 'en-IN',
            rate: 0.8,
        });
    };

    useSpeechRecognitionEvent("start", () => setRecognizing(true));
    useSpeechRecognitionEvent("end", () => {
        setRecognizing(false)
        Speech.speak(transcript);
    });
    useSpeechRecognitionEvent("result", (event) => {
        setTranscript(event.results[0]?.transcript);
    });
    useSpeechRecognitionEvent("error", (event) => {
        console.log("error code:", event.error, "error message:", event.message);
        //ToastAndroid.show(event.message,100);
    });

    const handleStart = async () => {
        setTranscript('');
        const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!result.granted) {
            console.warn("Permissions not granted", result);
            return;
        }
        // Start speech recognition
        ExpoSpeechRecognitionModule.start({
            lang: "en-US",
            interimResults: true,
            maxAlternatives: 1,
            continuous: false,
            requiresOnDeviceRecognition: false,
            addsPunctuation: false,
        });
    };

    return (
        <>
            <View style={styles.line} />
            <View style={styles.container}>
                <View style={styles.row}>
                    {!recognizing ? (
                        <FontAwesome name="microphone-slash" size={30} color="black" style={styles.mic}
                            onPress={handleStart}
                        />
                    ) : (

                        <FontAwesome name="microphone" size={30} color="black" style={styles.mic}
                            onPress={() => ExpoSpeechRecognitionModule.stop()}
                        />
                    )}
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.touch} onPress={speak}>
                            <Text style={styles.transcript} > {transcript}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </>
    );
}

const styles = StyleSheet.create({
    line:{
        borderColor:'black',
        borderWidth: 1.3,
    },
    container: {
        justifyContent: 'center',
        padding: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mic: {
        alignSelf: 'flex-start',
        padding: 13,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    transcript: {
        paddingLeft: 8,
        fontSize: 22,
        minWidth: '90%',
        maxWidth: '90%',
        flexWrap: 'wrap',
    },
    touch: {
        padding: 0,
    },
});

export default SpeechToText;