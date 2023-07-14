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
import ListFoods from './Components/ListFoods';

const AnimatedBaemin = memo((props) => {

    

    return (
        <View style={styles.container}>
            {/* <View style={styles.header}/> */}
            <ListFoods/>
        </View>
    );
});

const styles = StyleSheet.create({
    header:{
        width:'100%',
        height:80,
        backgroundColor:'grey'
    },
    container: {
        flex: 1,
    }
})

export default AnimatedBaemin;