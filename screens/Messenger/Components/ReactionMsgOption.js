import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    FlatList
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import Lottie from 'lottie-react-native';


const ReactionMsgOption = memo((props) => {

    const scaleAnimated = useSharedValue(0)
    const opacityAnimated = useSharedValue(0)


    useEffect(() => {
        scaleAnimated.value = withTiming(1, {
            duration: 300,
        }, (isFinished) => {
            if (isFinished) {
            }
        });
        opacityAnimated.value = withTiming(1, {
            duration: 300,
        }, (isFinished) => {
            if (isFinished) {
            }
        });
    })

    const animatedScale = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: scaleAnimated.value
                }
            ],
            opacity: opacityAnimated.value
        };
    });

    const _hide = () => {
        scaleAnimated.value = withTiming(0, {
            duration: 200,
        }, (isFinished) => {
            if (isFinished) {
                runOnJS(runOnJSHide)()
            }
        });
        opacityAnimated.value = withTiming(0, {
            duration: 200,
        }, (isFinished) => {
            if (isFinished) {
            }
        });
    }
    const runOnJSHide = () => {
        props?.hide()
    }

    const _handlePressReaction = () => {
        props?.handlePressReaction(props?.data)
        _hide()
    }

    return (
        <View style={[{ width: '100%', height: '100%', position: 'absolute', zIndex: 1 }]}>
            <TouchableOpacity
                onPress={() => {
                    _hide()
                    // setShowReactionOption({
                    //     idMsg: null,
                    //     pageY: null,
                    //     show: false
                    // })
                }}
                style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1 }}>
            </TouchableOpacity>
            <Animated.View style={[
                styles.box,
                { top: props?.data?.pageY - (getStatusBarHeight() + 8 * 8) - 90, },
                shadow,
                animatedScale
            ]} >
                <TouchableOpacity onPress={_handlePressReaction}>
                    <Image
                        style={{ resizeMode: 'contain', width: 35, height: 32 }}
                        source={{
                            uri: `https://static.xx.fbcdn.net/images/emoji.php/v9/tf9/1.5/32/2764.png`
                        }} />
                </TouchableOpacity>
                <Image
                    style={{ width: 35, height: 35 }}
                    source={{
                        uri: `https://static.xx.fbcdn.net/images/emoji.php/v9/te7/1.5/32/1f606.png`
                    }} />
                <Image
                    style={{ width: 35, height: 35 }}
                    source={{
                        uri: `https://static.xx.fbcdn.net/images/emoji.php/v9/td4/1.5/32/1f62e.png`
                    }} />
                <Image
                    style={{ width: 35, height: 35 }}
                    source={{
                        uri: `https://static.xx.fbcdn.net/images/emoji.php/v9/t21/1.5/32/1f622.png`
                    }} />
                <Image
                    style={{ width: 35, height: 35 }}
                    source={{
                        uri: `https://static.xx.fbcdn.net/images/emoji.php/v9/t1f/1.5/32/1f620.png`
                    }} />
                <Image
                    style={{ width: 35, height: 35 }}
                    source={{
                        uri: `https://static.xx.fbcdn.net/images/emoji.php/v9/tf/1.5/32/1f44d.png`
                    }} />

            </Animated.View>
        </View>
    );
});


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,

    elevation: 3
}

const styles = StyleSheet.create({
    box: {
        width: 330,
        height: 55,
        borderRadius: 32,
        position: 'absolute',
        zIndex: 10,
        left: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    }
})

export default ReactionMsgOption;