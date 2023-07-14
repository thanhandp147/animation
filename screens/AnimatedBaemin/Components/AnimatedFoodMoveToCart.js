import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

import { Easing, Extrapolation, interpolate, JumpingTransition, runOnJS, scrollTo, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDecay, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import ImageColors from 'react-native-image-colors'
import IconBackArrow from '../../../SGV/backArrow.svg'
import IconPlayBlack from '../../../SGV/play_black.svg'
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import Axios from 'axios'
import store from '../../../Redux/Store';
import * as ActionType from '../../../Redux/Constants/ActionType'
import { useSelector } from 'react-redux';
import IconResumeWhite from '../../../SGV/resume_white.svg'

const HEIGHT_DEVICE = Dimensions.get('window').height;


const AnimatedFoodMoveToCart = memo((props) => {

    const absoluteX = useSharedValue(props.data.pageX);
    const absoluteY = useSharedValue(props.data.pageY);

    useEffect(() => {
        console.log({ x: props?.data });

        if (props?.data?.show) {
            // absoluteX.value = props.data.pageX;
            // absoluteY.value = props.data.pageY;

            absoluteX.value = withTiming(30, {
                duration: 450
            })

            absoluteY.value = withSequence(
                withTiming(props.data.pageY - 20, {
                    duration: 150
                }),
                withTiming(HEIGHT_DEVICE - getBottomSpace(), {
                    duration: 300
                }),
            )



            // absoluteY.value = withTiming(HEIGHT_DEVICE - getBottomSpace(), {
            //     duration: 500
            // });


        }

    }, [[props?.data]])

    const animBtn = useAnimatedStyle(() => {
        return {
            top: absoluteY.value,
            left: absoluteX.value
        }
    })



    return (
        <Animated.View style={[{
            width: 8*8,
            height: 8*8,
            borderRadius: 8*4,
            // backgroundColor: 'grey',
            position: 'absolute',
        }, animBtn]} >

            <Image style={{
                width:'100%',
                height:'100%'
            }} source={{uri:`${props?.data?.data?.photos[0].value}`}}/>

        </Animated.View>
    );
});



export default AnimatedFoodMoveToCart;