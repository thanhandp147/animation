import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, processColor, Alert } from 'react-native';

import { Easing, Extrapolation, interpolate, interpolateColor, JumpingTransition, measure, runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withDecay, withDelay, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { Gesture, GestureDetector, PanGestureHandler } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Searching from './Searching';
import Lottie from 'lottie-react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import ImageColors from 'react-native-image-colors';
import IconPlayWhite from '../../SGV/play_white.svg'
import IconResumeWhite from '../../SGV/resume_white.svg'
import { useSelector } from 'react-redux';
import SoundPlayer from 'react-native-sound-player'
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import { _moderateScale, _width, _widthScale } from '../../Constants/Scale';
import { BlurView } from '@react-native-community/blur';

const BOTTOM_SPACE = getBottomSpace()
const HEIGHT_MINIMIZE = _widthScale(8 * 6.5);


const BlurViewBottom = memo((props) => {
    return (
        <View style={styles.container}>
            <BlurView
                style={StyleSheet.absoluteFillObject}
                blurType="dark"
                blurAmount={1}
                reducedTransparencyFallbackColor="white"
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        width: _width,
        height: BOTTOM_SPACE + HEIGHT_MINIMIZE + 8,
        bottom:0,
        position:'absolute'
    }
})

export default BlurViewBottom;