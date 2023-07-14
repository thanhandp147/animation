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
    Platform
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import Header from './Header';
import ListMessage from './ListMessage';
import InputBottom from './InputBottom'

const Messenger = memo((props) => {
    return (
        <View style={styles.container}>
            <View style={{height:getStatusBarHeight()}}/>
            <Header/>
            <ListMessage/>
            <InputBottom/>
            <View style={{height:getBottomSpace()}}/>
        </View>
    );
});

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

export default Messenger;