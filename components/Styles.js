import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    camera: {
        flex: 1,
    },
    toggleCam: {
        flex: 1,
    },
    actions: {
        flex: 1,
    },
    infoText: {
        textAlign: "center",
        paddingBottom: 10,
        fontSize: 20,
        color: "#333",
    },
    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
    },
    buttonContainer: {
        width: 200,
        height: 40,
        borderRadius: 1,
        fontSize: 20,
        alignSelf: 'center',
        overflow: "hidden",
    },
    prevContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopColor: 'black',
        borderTopWidth: 2,
    },
    prevImg: {
        width: 200,
        height: 200,
    },
    prevContent: {
        height: 200,
        borderLeftColor:'black',
        borderLeftWidth: 1.5,
    },
});