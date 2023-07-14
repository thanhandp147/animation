import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, processColor, Alert } from 'react-native';

import { Easing, Extrapolation, interpolate, interpolateColor, JumpingTransition, measure, runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withDecay, withDelay, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { Gesture, GestureDetector, PanGestureHandler } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Lottie from 'lottie-react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import ImageColors from 'react-native-image-colors';
import IconPlayWhite from '../../../SGV/play_white.svg'
import IconResumeWhite from '../../../SGV/resume_white.svg'
import { useSelector } from 'react-redux';
import SoundPlayer from 'react-native-sound-player'
import store from '../../../Redux/Store';
import * as ActionType from '../../../Redux/Constants/ActionType'
import { _moderateScale, _width, _widthScale } from '../../../Constants/Scale';


const WIDTH_PROGESS_BAR = _width - _widthScale(8 * 4);

const ProgressBarTrack = memo((props) => {

    const currPlayTrack = useSelector(state => state?.spotifyReducer?.currPlayTrack)

    const refDurationTimeTrack = useRef(null);

    const [currTimeTrack, setCurrTimeTrack] = useState(null)
    const [durationTimeTrack, setDurationTimeTrack] = useState(null)

    const progessBarValue = useSharedValue(0);
    const translateXDotValue = useSharedValue(0);


    useEffect(() => {

        switch (currPlayTrack?.status) {
            case 'play':
                console.log("a");
                _getInfoSound()
                break;
            case 'pause':
                _pause()
                break;
            case 'resume':
                _resume()
                break;
            default:
                break;
        }
    }, [currPlayTrack])

    const _getInfoSound = async () => {
        try {
            const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
            console.log({ info }) // {duration: 12.416, currentTime: 7.691}
            setDurationTimeTrack(info.duration)
        } catch (e) {
            console.log('There is no song playing', e)
        }
    }
    const _pause = async () => {
        try {
            const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
            console.log({ info }) // {duration: 12.416, currentTime: 7.691}
            setCurrTimeTrack(info.currentTime)
            // progessBarValue.value = info.currentTime * 1000
            translateXDotValue.value = translateXDotValue.value
        } catch (e) {
            console.log('There is no song playing', e)
        }
    }
    const _resume = () => {

        const timeLeft = (durationTimeTrack - currTimeTrack) * 1000

        translateXDotValue.value = withTiming(WIDTH_PROGESS_BAR, {
            duration: timeLeft
        }, (isFinished) => {
            console.log({ isFinished });
        })
    }

    useEffect(() => {
        if (durationTimeTrack) {
            console.log({ durationTimeTrack });
            const x = durationTimeTrack * 1000

            refDurationTimeTrack.current = durationTimeTrack;

            translateXDotValue.value = withTiming(WIDTH_PROGESS_BAR, {
                duration: x
            }, (isFinished) => {
                console.log({ isFinished });
            })
        }
    }, [durationTimeTrack])

    const progressBarAnim = useAnimatedStyle(() => {

        const interpolateProgressBa = interpolate(translateXDotValue.value,
            [0, WIDTH_PROGESS_BAR],
            [0, WIDTH_PROGESS_BAR]
        )

        return {
            width: interpolateProgressBa
        }
    })
    const progressDotAnim = useAnimatedStyle(() => {
        // const interpolateDot = interpolate(progessBarValue.value,
        //     [0, WIDTH_PROGESS_BAR],
        //     [0, WIDTH_PROGESS_BAR]
        // )
        return {
            transform: [
                {
                    translateX: translateXDotValue.value
                }
            ]
        }
    })

    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            ctx.startX = translateXDotValue.value;
        },
        onActive: (event, ctx) => {
            console.log({ onActive: "onActive", event, ctx });
            translateXDotValue.value = event.translationX + ctx.startX
        },
        onEnd: (event, ctx) => {
            console.log({ onEnd: "onEnd", event, ctx });
            console.log({ x: event.absoluteX, y: refDurationTimeTrack.current, z: WIDTH_PROGESS_BAR });
            let x = event.absoluteX * refDurationTimeTrack.current / WIDTH_PROGESS_BAR;
            console.log({ x });
            SoundPlayer.seek(x)

            // _onEnd(event.absoluteX)

        },
    });

    const _onEnd = (absoluteX) => {
        alert(durationTimeTrack)
    }

    return (
        <View style={{
            width: WIDTH_PROGESS_BAR,
            height: _moderateScale(4),
            backgroundColor: 'grey',
            alignSelf: 'center',
            justifyContent: 'center'
        }}>
            <Animated.View style={[{
                height: _moderateScale(4),
                backgroundColor: 'white'
            }, progressBarAnim]} />

            <PanGestureHandler onGestureEvent={eventHandler}>
                <Animated.View style={[{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'white',
                    position: 'absolute',
                }, progressDotAnim]} />
            </PanGestureHandler>

        </View>
    );
});



export default ProgressBarTrack;