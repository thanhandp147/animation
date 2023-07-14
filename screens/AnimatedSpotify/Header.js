import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

import { Easing, Extrapolation, interpolate, interpolateColor, interpolateColors, JumpingTransition, measure, runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useSelector } from 'react-redux';
import ImageColors from 'react-native-image-colors';

const DISTANCE_SHOW_HEADER = 140

const Header = memo((props) => {
    const currPlayTrack = useSelector(state => state?.spotifyReducer?.currPlayTrack)


    const scaleHeader = useSharedValue(0);
    const opacityHeader = useSharedValue(0);

    const translateYTitle = useSharedValue(16);

    const demo = useSharedValue(0);
    const [currColor, setCurrColor] = useState('#000')
    const [primaryColorTrack, setPrimaryColorTrack] = useState(null);


    useEffect(() => {

        if (currPlayTrack?.track) {
            _getPrimaryColor(currPlayTrack?.track?.album?.images[0]?.url)
        }
    }, [currPlayTrack])

    const _getPrimaryColor = async (url) => {
        const result = await ImageColors.getColors(`${url}`, {
            fallback: '#228B22',
            cache: false,
            key: 'unique_key',
        })
        setPrimaryColorTrack(result?.primary)
    }
    const _changeCurrColor = (color) => {
        setCurrColor(color)
    }

    useEffect(() => {
        if (primaryColorTrack) {

            demo.value = 0;
            demo.value = withTiming(1, {
                duration: 400
            }, (isFinished) => {
                if (isFinished) {
                    runOnJS(_changeCurrColor)(primaryColorTrack)
                }
            })
        }
    }, [primaryColorTrack])

    const colorAnim = useAnimatedStyle(() => {
        if (primaryColorTrack) {
            const animtedColor = interpolateColor(
                demo.value,
                [0, 1],
                [currColor, primaryColorTrack],
            );
            return {
                backgroundColor: animtedColor
            }
        } else {
            return {}
        }
    })

    const headerAnim = useAnimatedStyle(() => {
        if (props.scrollY.value > DISTANCE_SHOW_HEADER) {

            const interpolateScale = interpolate(props.scrollY.value, [DISTANCE_SHOW_HEADER, DISTANCE_SHOW_HEADER + 1], [0, 1], { extrapolateRight: Extrapolation.CLAMP });
            const interpolateOpacity = interpolate(props.scrollY.value, [DISTANCE_SHOW_HEADER, 200], [0, 1], { extrapolateLeft: Extrapolation.CLAMP });
            return {
                transform: [
                    {
                        scale: interpolateScale
                    },
                ],
                opacity: interpolateOpacity
            };
        } else {
            return {
                transform: [
                    {
                        scale: 0
                    },
                ],
                opacity: 0
            }
        }
    })

    const titleAnim = useAnimatedStyle(() => {

        const interpolateTranslate = interpolate(props.scrollY.value, [DISTANCE_SHOW_HEADER, 200], [8, 0], { extrapolateRight: Extrapolation.CLAMP });


        return {
            transform: [
                {
                    translateY: interpolateTranslate
                }
            ]
        }
    })

    return (
        <Animated.View style={[{
            width: '100%',
            position: 'absolute',
            zIndex: 1,
            opacity: 0
        },
            colorAnim,
            headerAnim
        ]}>
            <View style={{
                height: getStatusBarHeight()
            }} />

            <View style={{ justifyContent: 'center' }}>
                {/* <TouchableOpacity style={{ position: 'absolute', left: 8 * 2 ,zIndex:2}}>
                    <IconBackArrow
                        width={8 * 2.5}
                        height={8 * 2.5} />
                </TouchableOpacity> */}

                <View style={{
                    width: '100%',
                    height: 8 * 7,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Animated.View style={[{
                        top: 2
                    }, titleAnim]}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>PlayList</Text>
                    </Animated.View>
                </View>
            </View>

        </Animated.View>
    );
});



export default Header;