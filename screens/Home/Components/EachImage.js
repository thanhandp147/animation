import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


const EachImage = memo((props) => {

    const animTranslateXImage = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: props.translateXImage.value * props.index },
                { scaleY: props.scaleImage.value - 0.1 * props.index }
            ],
        };
    })

    return (
        <Animated.View style={[{ position: 'absolute', left: props?.index * 20, zIndex: -props?.index }, animTranslateXImage, shadow]}>
            <Image style={[styles.photo_main]} source={{ uri: props?.data.node.image.uri }} />
        </Animated.View>
    );
});


const styles = StyleSheet.create({
    photo_main: {
        width: 100,
        height: 160,
        borderRadius: 16,
        borderWidth: 5,
        borderColor: 'white',
    },
    photo: {


    }
})



const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 3
}


export default EachImage;