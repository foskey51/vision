import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import GestureRecognizer from "react-native-swipe-gestures";
import React, { memo, useRef, useState } from "react";
import * as Haptics from 'expo-haptics';
import { Alert, Button, FlatList, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { useMessageContext } from "../context/MessageContext";
import useStore from "../store";
import { sendReq } from "../services/SendReq";
import SpeechToText from "../components/SpeechToText";
import * as Speech from 'expo-speech';
import { SafeAreaView } from "react-native-safe-area-context";
import MessageView from "../components/MessageView";
import { TextToSpeech } from "../components/TextToSpeech";
import { styles } from "../components/Styles";

const Home = () => {

    const store = useStore.getState();
    const [facing, setFacing] = useState("back");
    const [image, setImage] = useState("https://www.creativefabrica.com/wp-content/uploads/2021/08/07/Image-Gallery-Icon-Graphics-15590538-1-1-580x386.jpg");
    const [cameraPermission, setCameraPermission] = useCameraPermissions();
    const [micPermission, setMicPermission] = useMicrophonePermissions();
    const cameraRef = useRef(null);
    const { setBase64Image, setPrompt, loading, setLoading } = store;
    const { msgData, addMessage, clearMessages, updateLastAssistantMessage } = useMessageContext();


    const requestPermissions = async () => {
        const micResponse = await setMicPermission();
        const camResponse = await setCameraPermission();

        if (
            !micResponse.granted &&
            !micResponse.canAskAgain &&
            !camResponse.granted &&
            !camResponse.canAskAgain
        ) {
            Alert.alert(
                "Permission Denied",
                "Camera and microphone permissions are denied. Please enable them in the app settings."
            );
        }
    };

    if (!cameraPermission || !micPermission) {
        return <View />;
    }

    if (!micPermission.granted || !cameraPermission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.infoText}>
                    We need your permission to access the camera and microphone.
                </Text>

                <View style={styles.buttonContainer}>
                    <Button title="Grant Permissions" color="red" onPress={requestPermissions} />
                </View>
            </View>
        );
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                setBase64Image(null);
                const picture = await cameraRef.current.takePictureAsync({
                    quality: 0.1,
                    base64: true,
                });
                setImage(picture.uri);
                setBase64Image(picture.base64);
                setPrompt('Describe this image');
                TextToSpeech('Image captured, long press to know more about it');
            } catch (e) {
                Alert.alert("Error occurred!");
                console.log("Error:", e);
            }
        }
    };

    console.log(msgData[0], msgData[1], loading);

    const toggleCameraFacing = () => {
        setFacing((current) => {
            const nextFacing = current === "back" ? "front" : "back";
            const arg = 'camera is facing' + nextFacing;
            TextToSpeech(arg);
            return nextFacing;
        });
    };


    const handleSendReq = async () => {

        const { base64Image, prompt, transcript } = useStore.getState();
        clearMessages();
        setLoading(true);

        if (base64Image == null) {
            console.log("Null object passed in sendReq");
            ToastAndroid.show("Image not capture...", ToastAndroid.LONG);
            Speech.speak('Image not captured ');
            return;
        }

        if (transcript && transcript.trim() !== "") {
            setPrompt(transcript);
            const userMsg = { type: "user", text: transcript };
            const assistantMsg = { type: "assistant", text: " " };
            addMessage(userMsg, assistantMsg);
        }
        else {
            const userMsg = { type: "user", text: prompt };
            const assistantMsg = { type: "assistant", text: " " };
            addMessage(userMsg, assistantMsg);
        }

        try {
            await sendReq(base64Image, prompt, updateLastAssistantMessage, msgData);
            ToastAndroid.show("Image sent for processing", ToastAndroid.CENTER);
            TextToSpeech('Request sent successfully, please wait for the response to be generated');
            console.log("Request sent successfully");
        } catch (error) {
            setLoading(false);
            TextToSpeech('Error occurred, please try again');
            console.error("Error sending request:", error);
        }
    }

    const RenderItem = memo(({ item, loading }) => {
        return MessageView(item, loading);
    });

    return (
        <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
            <View style={styles.container}>
                <CameraView style={styles.camera} facing={facing} ref={cameraRef} >
                    <GestureRecognizer style={{ flex: 1 }}
                        onSwipeLeft={toggleCameraFacing}
                        onSwipeRight={() => { Speech.stop() }}>
                        <TouchableOpacity style={{ flex: 1 }}
                            onPress={takePicture}
                            onLongPress={() => {
                                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                                handleSendReq();
                            }}>
                        </TouchableOpacity>
                    </GestureRecognizer>
                </CameraView>
                <View style={styles.prevContainer}>
                    <Image source={{ uri: image }} style={styles.prevImg} />
                    {msgData == '' ? (
                        <View style={styles.prevContent}>
                            <Image source={{uri: "https://t4.ftcdn.net/jpg/03/08/43/19/360_F_308431972_g5fuiXwgOZpDCMFQougq13hgSaQVHVro.jpg"}} style={styles.prevImg}/>
                        </View>
                    ) : (
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={msgData}
                            style={styles.prevContent}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <RenderItem item={item} loading={loading} />}
                        />)}

                </View>
            </View>
            <>
                <SpeechToText />
            </>
        </SafeAreaView>
    );
};

export default Home;
