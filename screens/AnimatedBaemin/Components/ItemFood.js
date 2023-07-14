import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

import { Easing, Extrapolation, interpolate, JumpingTransition, runOnJS, scrollTo, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import ImageColors from 'react-native-image-colors'
import IconBackArrow from '../../../SGV/backArrow.svg'
import IconPlayBlack from '../../../SGV/play_black.svg'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Axios from 'axios'
import store from '../../../Redux/Store';
import * as ActionType from '../../../Redux/Constants/ActionType'
import { useSelector } from 'react-redux';
import IconResumeWhite from '../../../SGV/resume_white.svg'

const ItemFood = memo((props) => {

    const _onClickBtn = (e, data) => {
        props?.choiceFood({e, data})
    }

    return (
        <View style={{ marginVertical: 8, marginHorizontal: 8 }}>
            <View style={styles.food}>

                <View style={styles.food__avatar} />

                <View style={{ flex: 1 }}>
                    <Text>
                        {props?.data?.content}
                    </Text>

                    <View style={{ flex: 1 }} />

                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            hitSlop={{
                                top:12, left:12, right:12, bottom:12
                            }}
                            onPress={(e) => {
                                _onClickBtn(e, props?.data)
                            }}
                            style={styles.food__btnAdd}>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    food__btnAdd: {
        width: 8 * 3,
        height: 8 * 3,
        borderWidth: 1,
        right: 8
    },
    food__avatar: {
        width: 8 * 10,
        height: 8 * 10,
        borderWidth: .5
    },
    food: {
        flexDirection: 'row'
    }
})

export default ItemFood;