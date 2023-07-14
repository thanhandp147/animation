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

const MovingDot = memo((props) => {

    const translateX = useSharedValue(150);

    const enemyX = useSharedValue(20);
    const enemyY = useSharedValue(20);


    const positionX = useSharedValue(150);
    const positionY = useSharedValue(150);


    useEffect(() => {
        enemyX.value = withTiming(positionX.value, {
            duration: 2000
        })
        enemyY.value = withTiming(positionY.value, {
            duration: 2000
        })
    })



    const translateXY = useAnimatedStyle(() => {
        return {
            top: positionY.value,
            left: positionX.value
        }
    })

    const translateEnemy = useAnimatedStyle(() => {

        // const interpolateX = interpolate(positionX.value,
        //     [],
        //     []
        // )
        // const interpolateY = interpolate(positionY.value,
        //     [],
        //     []
        // )

        // enemyX.value = withTiming(positionX.value, {
        //     duration: 2000
        // })
        // enemyY.value = withTiming(positionY.value, {
        //     duration: 2000
        // })

        return {
            top: enemyY.value,
            left: enemyX.value
        }
    })

    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            // console.log({ onActive: "onStart", event, ctx });
            ctx.startX = positionX.value;
            ctx.startY = positionY.value;
        },
        onActive: (event, ctx) => {
            // console.log({ onActive: "onActive", event, ctx });
            // positionX.value = event.absoluteX 
            // positionY.value = event.absoluteY
            positionX.value = event.translationX + ctx.startX
            positionY.value = event.translationY + ctx.startY

            // enemyX.value = withDecay({
            //     velocity: event.velocityX,
            // });
            // enemyY.value = withDecay({
            //     velocity: event.velocityY,
            // });

            // translateX.value = clamp(
            //     event.translationX + ctx.startX,
            //     0,
            //     300
            // )
        },
        onEnd: (event, ctx) => {

            // enemyX.value = withDecay({
            //     velocity: event.velocityX,
            // });
            // enemyY.value = withDecay({
            //     velocity: event.velocityY,
            // });

            console.log(positionX.value, positionY.value);


        },
    });

    return (
        <View style={styles.container}>

            <Animated.View style={[{
                width: 30,
                height: 30,
                backgroundColor: 'grey',
                position: 'absolute'
            }, translateEnemy]} />

            <PanGestureHandler onGestureEvent={eventHandler}>
                <Animated.View
                    style={[{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        backgroundColor: "red",
                    }, translateXY]} >
                </Animated.View>
            </PanGestureHandler>

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
        alignItems: 'center'
    },
    image: {
        width: 300,
        height: 300,
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'

    }
})


export default MovingDot;