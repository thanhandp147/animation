import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

import { Easing, Extrapolation, interpolate, JumpingTransition, runOnJS, scrollTo, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import ImageColors from 'react-native-image-colors'
import IconBackArrow from '../../../SGV/backArrow.svg'
import IconPlayBlack from '../../../SGV/play_black.svg'
import IconBackBlack from '../../../SGV/backBlack.svg'
import IconFind from '../../../SGV/find_grey.svg'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Axios from 'axios'
import store from '../../../Redux/Store';
import * as ActionType from '../../../Redux/Constants/ActionType'
import { useSelector } from 'react-redux';
import IconResumeWhite from '../../../SGV/resume_white.svg'
import { _width } from '../../../Constants/Scale';

const StickyHeader = memo((props) => {
    return (
        <Animated.View style={[styles.header, shadow]}>
            <View style={{ marginTop: 8 * 6 }}>
                <View style={styles.header__title}>
                    <IconBackBlack
                        width={8 * 2.25}
                        height={8 * 2.25} />

                    <Text style={styles.header__title__text}>
                        Highlands Coffe
                    </Text>
                </View>

                
                {
                    props?.tabs?.map((item, index) => {

                    })
                }

            </View>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    header__title__text: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 8 * 2
    },
    header__title: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8 * 2
    },
    header: {
        width: _width,
        height: 8 * 15,
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white'
    }
})


const shadow = {
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    elevation: 3
}


export default StickyHeader;