import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

import { Easing, Extrapolation, interpolate, interpolateColor, JumpingTransition, measure, runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Lottie from 'lottie-react-native';
import { useSelector } from 'react-redux';
import ImageColors from 'react-native-image-colors';
import { usePrevious } from '../../../Hooks/UseHook';
import { _width } from '../../../Constants/Scale';


const BANNER_HEIGHT = 600;
const DISTANCE_FIXED_BANNER_IMAGE = 76;

const Banner = memo((props) => {



    const scaleAnim = useAnimatedStyle(() => {
        const interpolateScale = interpolate(props.scrollY.value, [0, -50], [1, 1.2], { extrapolateLeft: Extrapolation.CLAMP });
        const translateY = interpolate(props.scrollY.value,[0,-50],[0,-20])
        return {
            transform: [
                {
                    scale: interpolateScale
                },
                {
                    translateY: translateY
                }
            ],
        };
    })

    return (
        <>
            <Animated.View style={[styles.container,
            { backgroundColor: '#3AC5C9' },
                scaleAnim,
                // colorAnim,
            ]}>
                <LinearGradient
                    style={StyleSheet.absoluteFill}
                    // start={[0, 0.3]}
                    // end={[0, 1]}
                    start={{ x: 0, y: 0.3 }}
                    end={{ x: 0, y: 1 }}
                    colors={["transparent", "rgba(0, 0, 0, 0.2)", "white"]}
                />
                <Animated.Image
                    style={[{
                        width: '100%',
                        height: '100%',
                    },
                    ]}
                    source={{
                        uri: `https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/280853330_5277483882332413_6517997190738978782_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=0fJa7fPhT-UAX9PnPwm&_nc_ht=scontent.fhan3-4.fna&oh=00_AfCMBPl6NvWjZqFitVH5EXkRrLsNLeqQZj58hDVfjq7JCA&oe=63962574`
                    }} />
            </Animated.View>




        </>
    );
});

const styles = StyleSheet.create({
    container: {
        height: _width,
    }
})

export default Banner;