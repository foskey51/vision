import React from "react";
import { StyleSheet, View, Text } from "react-native";
import SkeletonLoader from "./SkeletonLoader";

const MessageView = (item, loading) => {

    return item.type === 'user' ? (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
            }}
        >
            <Text
                style={{
                    backgroundColor: '#d1e7dd',
                    color: '#0f5132',
                    paddingHorizontal: 20,
                    paddingTop: 10,
                    paddingBottom: 6,
                    borderRadius: 10,
                    maxWidth: '80%',
                    textAlign: 'center',
                }}
            >
                {item.text}
            </Text>
        </View>
    ) : !loading ? (
        <View
            style={{
                marginTop: 10,
                marginLeft: 5,
                marginRight: 5,
            }}
        >
            <Text
                style={{
                    color:'black',
                    textAlign: 'justify',
                    lineHeight: 20,
                }}
            >
                {item.text}
            </Text>
        </View>
    ) : (
        <View>
            <SkeletonLoader />
        </View>
    );
};

export default MessageView;