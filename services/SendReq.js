import { ToastAndroid } from "react-native";
import useStore from "../store";
import * as Speech from 'expo-speech';


export const sendReq = async (base64Image, prompt, updateLastAssistantMessage, msgData) => {
    const { setLoading } = useStore.getState();

    if ((base64Image || prompt) == null) {
        console.log("Null object passed in sendReq");
        return;
    }

    try {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://owl-sought-conversely.ngrok-free.app/api/generate', true);
        xhr.timeout = 130000;
        xhr.setRequestHeader('Content-Type', 'application/json');

        setLoading(true);


        xhr.prevLen = 0;

        xhr.ontimeout = function () {
            console.error('Request timed out!');
            Alert.alert('Error', 'Request timed out!');
            setLoading(false);
        };

        xhr.onprogress = function () {
            const responseText = xhr.responseText;
            const chunk = responseText.slice(xhr.prevLen);
            xhr.prevLen = responseText.length;

            chunk.split("\n").forEach((line) => {
                line = line.trim();
                if (line) {
                    try {
                        const json = JSON.parse(line);
                        //console.log(json);

                        if (!json.done && json.response) {
                            updateLastAssistantMessage(json.response);
                            setLoading(false);
                        }

                        if (json.done) {
                            Speech.stop();
                            Speech.speak('Response generated, long press to hear the message');
                        }

                    } catch (error) {
                        console.error("Error parsing JSON:", error, "Line:", line);
                    }
                }
            });
        };

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('Request completed successfully!');
            } else {
                console.error('Request failed with status:', xhr.status);
                ToastAndroid.show('Request failed', ToastAndroid.LONG);
                setLoading(false);
                return;
            }
        };

        xhr.onerror = function () {
            console.error('Request encountered an error.');
            setLoading(false);
        };

        // JSON payload for the POST request
        const requestData = JSON.stringify({
            "model": "llava",
            "prompt": prompt,
            "images": [
                base64Image
            ]
        });

        xhr.send(requestData);

    } catch (error) {
        console.log(error);
        ToastAndroid.CENTER(error);
        setLoading(false);
    };
};