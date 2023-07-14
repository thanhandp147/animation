import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Platform,
    Keyboard
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, Extrapolation, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { SvgUri } from 'react-native-svg';
import StarGrey from '../../../SGV/star_grey.svg'
import StickerGrey from '../../../SGV/sticker_grey.svg'
import GIFGrey from '../../../SGV/gif_grey.svg'
import SoundGrey from '../../../SGV/sound_grey.svg'

const StickersOption = memo((props) => {

    const [choice, setChoice] = useState('sticker')

    const mainHeight = useSharedValue(0);

    useEffect(() => {
        if (props?.show) {
            mainHeight.value = withTiming(8 * 6, {
                duration: 200
            })
        } else {
            mainHeight.value = withTiming(0, {
                duration: 200
            })
        }
    }, [props?.show])

    const animatedMainHeight = useAnimatedStyle(() => {
        return {
            height: mainHeight.value
        };
    })


    return (
        <Animated.View style={[styles.boxOptions, animatedMainHeight]}>
            <TouchableOpacity
                onPress={() => {
                    setChoice('recent')
                }}
                style={[styles.boxOptions__child, choice == 'recent' && { backgroundColor: '#dedcdc' }]}>
                <StarGrey width={8 * 3} height={8 * 3} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setChoice('sticker')
            }}
            style={[styles.boxOptions__child, choice == 'sticker' && { backgroundColor: '#dedcdc' }]}>
                <StickerGrey width={8 * 2.75} height={8 * 2.75} />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => {
                setChoice('gif')
            }}
            style={[styles.boxOptions__child, choice == 'gif' && { backgroundColor: '#dedcdc' }]}>
                <GIFGrey width={8 * 3} height={8 * 3} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setChoice('sound')
            }}
            style={[styles.boxOptions__child, choice == 'sound' && { backgroundColor: '#dedcdc' }]}>
                <SoundGrey width={8 * 3} height={8 * 3} />
            </TouchableOpacity>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    boxOptions__child: {
        width: 8 * 7,
        height: 8 * 4,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxOptions: {
        // height: 8 * 6,
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        overflow: 'hidden'
    },
    options: {
        width: 25,
        height: 25,
        borderWidth: 0.5
    }
})

export default StickersOption;