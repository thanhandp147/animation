import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

import { Easing, Extrapolation, interpolate, JumpingTransition, runOnJS, scrollTo, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import ImageColors from 'react-native-image-colors'
import IconBackArrow from '../../SGV/backArrow.svg'
import IconPlayBlack from '../../SGV/play_black.svg'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Axios from 'axios'
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import { useSelector } from 'react-redux';
import IconResumeWhite from '../../SGV/resume_white.svg'


const clamp = (value, lowerBound, upperBound) => {
    'worklet';
    // return Math.min(Math.max(value, min), max);
    return Math.min(Math.max(lowerBound, value), upperBound)
};

const BeforeAfter = memo((props) => {

    const translateX = useSharedValue(150);


    useEffect(() => {
        // translateX.value = withTiming(300,{
        //     duration:2000
        // })
    })


    const widthImageAnim = useAnimatedStyle(() => {

        const interpolateWidth = interpolate(translateX.value,
            [0, 300],
            [0, 300]
        )
        return {
            width: interpolateWidth
        }
    })

    const translateXVerticalBarAnim = useAnimatedStyle(() => {
        const interpolateX = interpolate(translateX.value,
            [0, 300],
            [0, 300]
        )
        return {
            transform: [
                {
                    translateX: interpolateX
                }
            ],
        }
    })

    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            ctx.startX = translateX.value;
        },
        onActive: (event, ctx) => {
            // console.log({ onActive: "onActive", event, ctx });
            // translateX.value = event.translationX + ctx.startX

            translateX.value = clamp(
                event.translationX + ctx.startX,
                0,
                300
            )
        },
        onEnd: (event, ctx) => {
        },
    });

    return (
        <View style={styles.container}>


            <View style={{ width: 300, height: 300 }}>
                <Image
                    resizeMode='repeat'
                    // resizeMethod='resize'
                    style={styles.image}
                    source={require('../../Image/Untitled-1.png')} />


                <PanGestureHandler onGestureEvent={eventHandler}>
                    <Animated.View
                        style={[styles.verticalBar, translateXVerticalBarAnim]} >
                            <View style={{
                                width:30,
                                height:30,
                                borderRadius:15,
                                backgroundColor:"red",
                                top:250
                            }}/>
                    </Animated.View>
                </PanGestureHandler>

                <Animated.Image
                    resizeMode='repeat'
                    // resizeMethod='resize'
                    style={[{
                        position: 'absolute',
                        zIndex: 1,
                        height: 300
                    }, widthImageAnim]}
                    source={require('../../Image/Untitled-2.png')}/>
            </View>

        </View>
    );
});

const styles = StyleSheet.create({
    verticalBar: {
        width: 3,
        height: 300,
        backgroundColor: 'red',
        position: 'absolute',
        zIndex: 2,
        // justifyContent:'center',
        alignItems:'center'
    },
    image: {
        width: 300,
        height: 300,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }
})


export default BeforeAfter;