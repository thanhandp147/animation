import React, { memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolation, interpolate, interpolateColor, processColor, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useToggle } from '../Hooks/UseHook';
import { PanGestureHandler } from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';


const widthDevice = Dimensions.get('window').width
const heightDevice = Dimensions.get('window').height

const SPRING_CONFIG = {
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
}

const BackDrop = (props) => {

    useEffect(() => {

    }, [])

    const x = useDerivedValue(() => {
        const formatedValue = props.translateY.value
        return formatedValue;
    })


    const styleBackDropColor = useAnimatedStyle(() => {
        const animtedColor = interpolateColor(
            x.value,
            [0, -heightDevice / 2],
            ['rgba(0,0,0,.0)', 'rgba(0,0,0,.5)'],
        );
        return {
            backgroundColor: animtedColor,
        };
    })

    return (
        <Animated.View style={[{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            // backgroundColor: 'rgba(0,0,0,.4)',
            position: 'absolute'
        },
            styleBackDropColor
        ]}>
            <TouchableOpacity onPress={() => {
                
            }} style={{ flex: 1 }} />
        </Animated.View>
    )
}

const BottomSheet = memo((props) => {

    const [showBottomSheet, setShowBottomSheet] = useToggle(false)
    const [showBackDrop, setShowBackDrop] = useToggle(false)

    const translateY = useSharedValue(0)

    useEffect(() => {
        if (showBottomSheet) {
            translateY.value = withSpring(-heightDevice / 2, {})
        } else {
            translateY.value = withTiming(0, SPRING_CONFIG)
        }
    }, [showBottomSheet])

    useEffect(() => {
        // alert(showBackDrop)
        // console.log(showBottomSheet );
    }, [showBackDrop])

    const _setBackDrop = () => {
        setShowBackDrop()
        setShowBottomSheet()
    }

    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            ctx.startY = translateY.value;
        },
        onActive: (event, ctx) => {
            // console.log(event?.translationY);
            if (event?.translationY < 0) {
                translateY.value = ctx.startY + event.translationY / 5;
            } else {
                translateY.value = ctx.startY + event.translationY;
            }
        },
        onEnd: (event, ctx) => {
            // console.log({event, ctx });
            if (event.translationY > heightDevice / 4) {
                translateY.value = withTiming(0, {}, (isFinished) => {
                    if (isFinished) {
                        runOnJS(_setBackDrop)()
                    }
                })
                // setShowBottomSheet()
            } else {
                translateY.value = withSpring(-heightDevice / 2, {})
            }

        },
    });




    const styleTopPosSheet = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateY.value },
            ],
        };
    })

    const _onPress = useCallback(() => {
        ReactNativeHapticFeedback.trigger("impactLight", {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false
        });
        setShowBackDrop()
        setShowBottomSheet()
    }, [])


    return (
        <View style={styles.container}>

            <TouchableOpacity
                hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                onPress={_onPress}>
                <Text>
                    Press
                </Text>
            </TouchableOpacity>
            {
                showBackDrop ? <BackDrop translateY={translateY} /> : <></>
            }
            {/* <Animated.View style={[{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                // backgroundColor: 'rgba(0,0,0,.4)',
                position: 'absolute'
            }, styleBackDropColor
            ]}>
            </Animated.View> */}

            <PanGestureHandler onGestureEvent={eventHandler}>
                <Animated.View style={[
                    styles.bottomSheet,
                    styleTopPosSheet
                ]}>

                </Animated.View>
            </PanGestureHandler>
        </View >
    );
});

const styles = StyleSheet.create({
    bottomSheet: {
        width: widthDevice,
        height: heightDevice,
        borderWidth: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: heightDevice
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        // justifyContent: 'center'
        paddingTop: 200
    }
})

export default BottomSheet;