import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const Header = memo((props) => {
    return (
        <View style={styles.header}>

        </View>
    );
});

const styles = StyleSheet.create({
    header:{
        height:8*8,
        width:'100%',
        borderWidth:1
    }
})

export default Header;
