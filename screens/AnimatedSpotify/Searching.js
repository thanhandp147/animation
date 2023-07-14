import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

import { Easing, Extrapolation, interpolate, JumpingTransition, measure, runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import IconFindWhite from '../../SGV/find_white.svg'

const DISTANCE_SHOW_HEADER = 140

const Searching = memo((props) => {

    const translateYSearching = useSharedValue(0);

    const translateYSearchingAnim = useAnimatedStyle(() => {

        if (props.scrollY.value < 0) {

            return {
                transform: [
                    {
                        translateY: (props.scrollY.value)
                    }
                ],
                opacity: 1
            };
        } else {
            const interpolateOpacity = interpolate(props.scrollY.value, [0, 50], [1, 0], { extrapolateLeft: Extrapolation.CLAMP });
            return {
                opacity: interpolateOpacity
            }
        }
    })


    return (
        <Animated.View style={[styles.container,translateYSearchingAnim]}>
            <View style={{
                flex: 1,
                height: 8 * 4,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: 4,
                alignItems: 'center',
                paddingLeft: 8,
                flexDirection: 'row'
            }}>
                <IconFindWhite
                    width={8 * 2}
                    height={8 * 2} />

                <Text style={{
                    marginLeft: 8,
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 'bold'
                }}>
                    Find in playlist
                </Text>
            </View>
            <View style={{ width: 8 }} />
            <View style={styles.btnSort}>
                <Text style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: 'white'
                }}>
                    Sort
                </Text>
            </View>

        </Animated.View>
    );
});

const styles = StyleSheet.create({
    btnSort: {
        width: 8 * 6,
        height: 8 * 4,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flexDirection: 'row',
        paddingHorizontal: 8 * 2,
        position: 'absolute',
        top: 8 * 11
    }
})

export default Searching;