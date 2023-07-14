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
import { _heightScale, _moderateScale, _width, _widthScale } from '../../Constants/Scale';
import ProgressBarTrack from './Components/ProgressBarTrack';


const clamp = (value, lowerBound, upperBound) => {
    'worklet';
    // return Math.min(Math.max(value, min), max);
    return Math.min(Math.max(lowerBound, value), upperBound)
};


const WIDTH_DEVICE = Dimensions.get('window').width;
const HEIGHT_DEVICE = Dimensions.get('window').height;
const HEIGHT_MINIMIZE = _widthScale(8 * 6.5);

const SIZE_IMAGE_MINIMIZE = _widthScale(8 * 4.5);
const SIZE_IMAGE_EXPANDED = _widthScale(8 * 40);

const HEIGHT_HEADER_EXPANDED = 8 * 10

const MIN_NAMESONG_SIZE = _moderateScale(14);
const MAX_NAMESONG_SIZE = _moderateScale(24)

const WIDTH_MINIMIZE = _width - _widthScale(8 * 2);
const BOTTOM_SPACE = getBottomSpace()

const MARGIN_IMAGE = _widthScale(8)

const MIN_WIDTH_BOX_NAME_SONG = _widthScale(8 * 33);
const MAX_WIDTH_BOX_NAME_SONG = _widthScale(8 * 44);

const MinimizePlay = memo((props) => {

    const [primaryColorTrack, setPrimaryColorTrack] = useState(null);

    const [widthContentNameSong, setWidthContentNameSong] = useState(null)
    const [heightContentNameSong, setHeightContentNameSong] = useState(null)


    const currPlayTrack = useSelector(state => state?.spotifyReducer?.currPlayTrack)

    const demo = useSharedValue(0);
    const [currColor, setCurrColor] = useState('#000')

    const [isExpanded, setIsExpanded] = useState(true)

    const heightContainer = useSharedValue(HEIGHT_MINIMIZE);



    const translateXContentNameSong = useSharedValue(0);

    useEffect(() => {

        switch (currPlayTrack?.status) {
            case 'play':
                // SoundPlayer.playUrl(currPlayTrack.track.preview_url)
                // _getInfoSound()
                break;
            case 'pause':
                SoundPlayer.pause()
                break;
            case 'resume':
                SoundPlayer.resume()
                // _getInfoSound()

                break;
            default:
                break;
        }

        if (currPlayTrack?.track) {
            _getPrimaryColor(currPlayTrack?.track?.album?.images[0]?.url)
            translateXContentNameSong.value = 8
        }
    }, [currPlayTrack])

    const _getInfoSound = async () => {
        try {
            const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
            console.log('getInfo', info) // {duration: 12.416, currentTime: 7.691}
        } catch (e) {
            console.log('There is no song playing', e)
        }
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

    useEffect(() => {
        if (isExpanded) {
            heightContainer.value = withTiming(HEIGHT_DEVICE, {
                duration: 500
            })
        } else {
            heightContainer.value = withTiming(HEIGHT_MINIMIZE, {
                duration: 500
            })
        }
    }, [isExpanded])

    useEffect(() => {
        if (widthContentNameSong) {
            if (widthContentNameSong > _widthScale(8 * 33)) {
                setTimeout(() => {
                    tranXRight()
                }, 2000);
            } else {
                translateXContentNameSong.value = 8
            }
        }
    }, [widthContentNameSong])

    const tranXRight = () => {
        console.log({ "TRANSLATE_RIGHT": "TRANSLATE_RIGHT" })
        translateXContentNameSong.value = withDelay(1500, withTiming(-(widthContentNameSong - _widthScale(8 * 32)), {
            duration: 4000
        }, (isFinished) => {
            if (isFinished) {
                runOnJS(tranXLeft)()
            }
        }))
    }
    const tranXLeft = () => {
        translateXContentNameSong.value = withDelay(1500, withTiming(8, {
            duration: 4000
        }, (isFinished) => {
            if (isFinished) {
                runOnJS(tranXRight)()
            }
        }))
    }

    const measureContainerView = useCallback(
        ({
            nativeEvent: {
                layout: { width, height },
            },
        }) => {
            // console.log({measureContainerView : width});

            if (heightContainer.value == HEIGHT_MINIMIZE || heightContainer.value == HEIGHT_DEVICE) {
                setWidthContentNameSong(width)
                setHeightContentNameSong(height)
            }
        }, []);

    const _getPrimaryColor = async (url) => {
        const result = await ImageColors.getColors(`${url}`, {
            fallback: '#228B22',
            cache: false,
            key: 'unique_key',
        })
        setPrimaryColorTrack(result?.primary)
    }

    const _playSound = () => {
        SoundPlayer.playUrl(currPlayTrack.track.preview_url)
        store.dispatch({
            type: ActionType.SET_STATUS_PLAYING_TRACK,
            payload: {
                flag: 'play'
            }
        })
    }
    const _pauseSound = () => {
        store.dispatch({
            type: ActionType.SET_STATUS_PLAYING_TRACK,
            payload: {
                flag: 'pause'
            }
        })
    }
    const _resumeSound = () => {
        store.dispatch({
            type: ActionType.SET_STATUS_PLAYING_TRACK,
            payload: {
                flag: 'resume'
            }
        })
    }

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

    const containerAnim = useAnimatedStyle(() => {

        const interpolateWith = interpolate(heightContainer.value,
            [HEIGHT_MINIMIZE, HEIGHT_DEVICE],
            [WIDTH_MINIMIZE, WIDTH_DEVICE]
        )
        const interpolateBottom = interpolate(heightContainer.value,
            [HEIGHT_MINIMIZE, HEIGHT_DEVICE],
            [BOTTOM_SPACE, 0]
        )

        return {
            height: heightContainer.value,
            bottom: interpolateBottom,
            width: interpolateWith
        }
    })

    const imageAnim = useAnimatedStyle(() => {

        const interpolateSizeImage = interpolate(heightContainer.value,
            [HEIGHT_MINIMIZE, HEIGHT_DEVICE],
            [SIZE_IMAGE_MINIMIZE, SIZE_IMAGE_EXPANDED]
        )

        return {
            width: interpolateSizeImage,
            height: interpolateSizeImage,
        }
    })

    const headerExpandedAnim = useAnimatedStyle(() => {

        const interpolateHeaderExpanded = interpolate(heightContainer.value,
            [HEIGHT_MINIMIZE, HEIGHT_DEVICE],
            [0, HEIGHT_HEADER_EXPANDED]
        )

        return {
            height: interpolateHeaderExpanded
        }
    })

    const widthBoxImageAnim = useAnimatedStyle(() => {

        const interpolateTranslate = interpolate(heightContainer.value,
            [HEIGHT_MINIMIZE, HEIGHT_DEVICE],
            [MARGIN_IMAGE, 0]
        )

        const interpolateHeaderExpanded = interpolate(heightContainer.value,
            [HEIGHT_MINIMIZE, HEIGHT_DEVICE],
            [SIZE_IMAGE_MINIMIZE, WIDTH_DEVICE]
        )
        return {
            width: interpolateHeaderExpanded,
            top: interpolateTranslate,
            left: interpolateTranslate,
        }
    })

    const nameSongAnim = useAnimatedStyle(() => {

        const interpolateTranslateX = interpolate(heightContainer.value,
            [HEIGHT_MINIMIZE, HEIGHT_DEVICE],
            [0, -((WIDTH_DEVICE - SIZE_IMAGE_EXPANDED) / 2 + 8)]
        )
        const interpolateTranslateY = interpolate(heightContainer.value,
            [HEIGHT_MINIMIZE, HEIGHT_DEVICE],
            [0, SIZE_IMAGE_EXPANDED + 8 * 3]
        )
        const interpolateWidth = interpolate(heightContainer.value,
            [HEIGHT_MINIMIZE, HEIGHT_DEVICE],
            [MIN_WIDTH_BOX_NAME_SONG, MAX_WIDTH_BOX_NAME_SONG]
        )


        return {
            transform: [
                {
                    translateX: interpolateTranslateX
                },
                {
                    translateY: interpolateTranslateY
                },

            ],
            width: interpolateWidth
        }
    })

    const contentNameSongAnim = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateXContentNameSong.value
                }
            ]
        }
    })

    const fosizeNameSongAnim = useAnimatedStyle(() => {
        const interpolateSize = interpolate(heightContainer.value,
            [HEIGHT_MINIMIZE, HEIGHT_DEVICE],
            [MIN_NAMESONG_SIZE, MAX_NAMESONG_SIZE]
        )
        return {
            fontSize: interpolateSize,
        }
    })

    const _renderStatusTrack = () => {
        switch (currPlayTrack?.status) {
            case 'ready':
                return (
                    <TouchableOpacity
                        onPress={_playSound}
                        style={{}}>
                        <IconPlayWhite
                            width={8 * 2.5}
                            height={8 * 2.5} />
                    </TouchableOpacity>
                )
            case 'play':
                return (
                    <TouchableOpacity
                        onPress={_pauseSound}
                        style={{}}>
                        <IconResumeWhite
                            width={8 * 2.5}
                            height={8 * 2.5} />
                    </TouchableOpacity>
                )
            case 'pause':
                return (
                    <TouchableOpacity
                        onPress={_resumeSound}
                        style={{}}>
                        <IconPlayWhite
                            width={8 * 2.5}
                            height={8 * 2.5} />
                    </TouchableOpacity>
                )
            case 'resume':
                return (
                    <TouchableOpacity
                        onPress={_pauseSound}
                        style={{}}>
                        <IconResumeWhite
                            width={8 * 2.5}
                            height={8 * 2.5} />
                    </TouchableOpacity>
                )


            default:
                break;
        }
    }

    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            ctx.startY = heightContainer.value;
            // console.log({ onStart: "onStart", event, ctx });
        },
        onActive: (event, ctx) => {
            // console.log({ onActive: "onActive", event, ctx });
            heightContainer.value = -event?.translationY + ctx.startY

            heightContainer.value = clamp(
                -event?.translationY + ctx.startY,
                HEIGHT_MINIMIZE,
                HEIGHT_DEVICE
            )
        },
        onEnd: (event, ctx) => {
            // console.log({ onEnd: "onEnd", event, ctx });
            if (event.translationY < 0) {

                if (event?.velocityY > -3000) {
                    heightContainer.value = withTiming(HEIGHT_DEVICE, {}, (isFinished) => {
                    })
                } else {
                    heightContainer.value = withDecay({
                        velocity: -event.velocityY,
                        clamp: [HEIGHT_MINIMIZE, HEIGHT_DEVICE], // optionally define boundaries for the animation
                    }, () => {
                        heightContainer.value = withTiming(HEIGHT_DEVICE, {}, (isFinished) => {
                        })
                    });
                }


            } else {

                if (event?.velocityY < 3000) {
                    heightContainer.value = withTiming(HEIGHT_MINIMIZE, { duration: 200 }, (isFinished) => {
                    })
                } else {
                    heightContainer.value = withDecay({
                        velocity: -event.velocityY,
                        clamp: [HEIGHT_MINIMIZE, HEIGHT_DEVICE], // optionally define boundaries for the animation
                    }, () => {
                        heightContainer.value = withTiming(HEIGHT_MINIMIZE, {}, (isFinished) => {
                            // runOnJS(_enbaleScroll)()
                        })
                    });
                }
            }
        },
    });

    const hex2rgba = (hex, alpha = 1) => {
        const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
        return `rgba(${r},${g},${b},${alpha})`;
    };

    return (
        <>


            <PanGestureHandler onGestureEvent={eventHandler}>
                <Animated.View style={[
                    styles.minimize,
                    colorAnim,
                    containerAnim,
                    shadow,
                    {
                        shadowColor: primaryColorTrack,
                    }
                ]}>

                    {/* VIEW HEADER EXPANDED */}
                    <Animated.View style={headerExpandedAnim} />

                    {/* <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPress={() => {
                        setIsExpanded(old => !old)
                    }}> */}

                    <View style={[{}]}>

                        <Animated.View style={[{
                            alignItems: 'center',
                            position: 'absolute',
                            left: _widthScale(8),
                            top: _widthScale(8)
                        }, widthBoxImageAnim]}>
                            <Animated.Image
                                style={[
                                    styles.minimize__image,
                                    imageAnim
                                ]}
                                source={{ uri: `${currPlayTrack?.track?.album?.images[0]?.url}` }} />
                        </Animated.View>

                        <Animated.View style={[styles.itemTrack__nameSong, nameSongAnim]}>
                            <View style={{ width: "100%" }}>

                                {
                                    primaryColorTrack ?
                                        <View style={{
                                            width: 50,
                                            height: heightContentNameSong,
                                            position: 'absolute',
                                            left: 0,
                                            zIndex: 100,
                                        }}>
                                            <LinearGradient
                                                style={[StyleSheet.absoluteFill, { zIndex: 10 }]}
                                                start={{ x: 0, y: 1 }}
                                                end={{ x: 1, y: 1 }}
                                                colors={[hex2rgba(primaryColorTrack), hex2rgba(primaryColorTrack, .1), hex2rgba(primaryColorTrack, .1), hex2rgba(primaryColorTrack, .1), hex2rgba(primaryColorTrack, .1)]}
                                            />
                                        </View>
                                        :
                                        <></>
                                }
                                <ScrollView scrollEnabled={false} horizontal style={{}}>
                                    <Animated.View
                                        style={contentNameSongAnim}
                                        onLayout={measureContainerView}>
                                        <Animated.Text style={[
                                            styles.itemTrack__nameSong__name,
                                            fosizeNameSongAnim
                                        ]}>
                                            {
                                                currPlayTrack?.track?.name
                                            }
                                        </Animated.Text>
                                    </Animated.View>
                                </ScrollView>
                                {
                                    primaryColorTrack ?
                                        <View style={{
                                            width: 50,
                                            height: heightContentNameSong,
                                            position: 'absolute',
                                            right: -1,
                                            zIndex: 100
                                        }}>
                                            <LinearGradient
                                                style={[StyleSheet.absoluteFill, { zIndex: 10 }]}
                                                start={{ x: 0, y: 1 }}
                                                end={{ x: 1, y: 1 }}
                                                colors={[hex2rgba(primaryColorTrack, .1), hex2rgba(primaryColorTrack, .1), hex2rgba(primaryColorTrack, .1), hex2rgba(primaryColorTrack, .1), hex2rgba(primaryColorTrack)]}
                                            />
                                        </View>
                                        :
                                        <></>
                                }


                            </View>

                            <Text style={styles.itemTrack__nameSong__artist}>
                                {currPlayTrack?.track?.artists[0]?.name}
                            </Text>
                        </Animated.View>

                        <View style={{ position: 'absolute', right: _widthScale(8), top: _widthScale(8 * 2) }}>
                            {
                                _renderStatusTrack()
                            }
                        </View>
                    </View>

                    <View style={{
                        position: 'absolute',
                        top: _heightScale(510),
                        width: '100%'
                    }}>
                        <ProgressBarTrack/>
                      

                    </View>


                    {/* </TouchableOpacity> */}
                </Animated.View>
            </PanGestureHandler>

        </>
    );
});

const styles = StyleSheet.create({
    itemTrack__nameSong__artist: {
        fontSize: 13,
        color: '#fff',
        marginTop: 4,
        fontWeight: '500',
        left: _widthScale(8 * 1)
    },
    itemTrack__nameSong__name: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
    },
    itemTrack__nameSong: {
        // marginLeft: 8,
        position: 'absolute',
        left: _widthScale(8 * 1) + SIZE_IMAGE_MINIMIZE,
        top: _widthScale(8),
        // width: _widthScale(8 * 33)
        // flex: 1
    },
    minimize__image: {
        // width: 8 * 5,
        // height: 8 * 5,
        borderRadius: 4,

    },
    minimize: {
        // flexDirection: 'row',
        // width: '100%',
        // width: WIDTH_MINIMIZE,
        alignSelf: 'center',
        // paddingHorizontal: 6,
        // paddingVertical: 6,
        borderRadius: 4,
        position: 'absolute',
        zIndex: 10
        // alignItems: 'center'
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

export default MinimizePlay;