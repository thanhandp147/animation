import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

import { Easing, Extrapolation, interpolate, interpolateColor, JumpingTransition, measure, runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Searching from './Searching';
import Lottie from 'lottie-react-native';
import IconPlayBlack from '../../SGV/play_black.svg'
import { useSelector } from 'react-redux';
import ImageColors from 'react-native-image-colors';
import { usePrevious } from '../../Hooks/UseHook';


const BANNER_HEIGHT = 600;
const DISTANCE_FIXED_BANNER_IMAGE = 76;

const Banner = memo((props) => {

    const currPlayTrack = useSelector(state => state?.spotifyReducer?.currPlayTrack)

    const scaleBanner = useSharedValue(1);
    const aref = useAnimatedRef();

    const translateYBannerImage = useSharedValue(0);
    const scaleBannerImage = useSharedValue(1);

    const demo = useSharedValue(0);
    const [currColor, setCurrColor] = useState('#000')
    const [primaryColorTrack, setPrimaryColorTrack] = useState(null);

    const [currCoverPhoto, setCurrCoverPhoto] = useState('')
    const prevCoverPhoto = usePrevious(currCoverPhoto);

    useEffect(() => {

        if (currPlayTrack?.track) {
            _getPrimaryColor(currPlayTrack?.track?.album?.images[0]?.url)
        }
    }, [currPlayTrack])

    useEffect(() => {
        // setCurrCoverPhoto(currPlayTrack?.track?.album?.images[0]?.url) 

    }, [])



    useEffect(() => {
        if (primaryColorTrack) {

            // demo.value = 0;
            demo.value = withTiming(1, {
                duration: 1000
            }, (isFinished) => {
                if (isFinished) {
                    runOnJS(_changeCurrColor)(primaryColorTrack)
                    runOnJS(_changeCurrCoverPhoto)()
                }
            })
        }
    }, [primaryColorTrack])


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
    const _changeCurrCoverPhoto = () => {
        demo.value = 0;
        setCurrCoverPhoto(currPlayTrack?.track?.album?.images[0]?.url)
    }


    const scaleAnim = useAnimatedStyle(() => {
        const interpolateScale = interpolate(props.scrollY.value, [0, -100], [1, 1.5], { extrapolateLeft: Extrapolation.CLAMP });
        return {
            transform: [
                {
                    scale: interpolateScale
                }
            ],
        };
    })

    const translateYBannerImageAnim = useAnimatedStyle(() => {

        if (props.scrollY.value > DISTANCE_FIXED_BANNER_IMAGE) {
            const interpolateScale = interpolate(props.scrollY.value, [DISTANCE_FIXED_BANNER_IMAGE, 100, 140], [1, 0.7, 0], { extrapolateRight: Extrapolation.CLAMP });
            const interpolateOpacity = interpolate(props.scrollY.value, [DISTANCE_FIXED_BANNER_IMAGE, 220], [1, 0], { extrapolateLeft: Extrapolation.CLAMP });
            return {
                transform: [
                    {
                        translateY: (props.scrollY.value - DISTANCE_FIXED_BANNER_IMAGE)
                    }
                ],
                opacity: interpolateOpacity
            };
        } else {
            return {
                transform: [
                    {
                        translateY: 0
                    }
                ],
                opacity: 1
            }
        }
    })

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

    const fadedPrevCoverPhoto = useAnimatedStyle(() => {

        if (props.scrollY.value < 0) {
            const interpolateSizeImage = interpolate(props.scrollY.value,
                [0, -100],
                [280, 330]
            )
            return {
                transform: [
                    {
                        translateY: (props.scrollY.value -  ((280 - interpolateSizeImage)))
                    }
                ],
                width: interpolateSizeImage,
                height: interpolateSizeImage
            };
        }

        if (props.scrollY.value > DISTANCE_FIXED_BANNER_IMAGE) {
            const interpolateOpacity = interpolate(props.scrollY.value, [DISTANCE_FIXED_BANNER_IMAGE, 220], [1, 0], { extrapolateLeft: Extrapolation.CLAMP });
            const animtedColor = interpolate(
                demo.value,
                [0, 1],
                [interpolateOpacity, 0],
            );
            const interpolateSizeImage = interpolate(props.scrollY.value,
                [DISTANCE_FIXED_BANNER_IMAGE, 220],
                [280, 200]
            )
            return {
                transform: [
                    {
                        translateY: (props.scrollY.value - DISTANCE_FIXED_BANNER_IMAGE - ((280 - interpolateSizeImage) / 2))
                    }
                ],
                opacity: animtedColor,
                width: interpolateSizeImage,
                height: interpolateSizeImage
            };
        } else {
            const interpolateOpacity = interpolate(props.scrollY.value, [DISTANCE_FIXED_BANNER_IMAGE, 220], [1, 0], { extrapolateLeft: Extrapolation.CLAMP });
            const animtedColor = interpolate(
                demo.value,
                [0, 1],
                [interpolateOpacity, 0],
            );
            return {
                transform: [
                    {
                        translateY: 0
                    }
                ],
                opacity: animtedColor,
                width: 280,
                height: 280
                // opacity: 1
            }
        }


    })
    const backImageAnim = useAnimatedStyle(() => {

        if (props.scrollY.value < 0) {
            const interpolateSizeImage = interpolate(props.scrollY.value,
                [0, -100],
                [280, 330]
            )
            return {
                transform: [
                    {
                        translateY: (props.scrollY.value -  ((280 - interpolateSizeImage)))
                    }
                ],
                width: interpolateSizeImage,
                height: interpolateSizeImage
            };
        }

        if (props.scrollY.value > DISTANCE_FIXED_BANNER_IMAGE) {
            const interpolateOpacity = interpolate(props.scrollY.value, [DISTANCE_FIXED_BANNER_IMAGE, 220], [1, 0], { extrapolateLeft: Extrapolation.CLAMP });
            const interpolateSizeImage = interpolate(props.scrollY.value,
                [DISTANCE_FIXED_BANNER_IMAGE, 220],
                [280, 200]
            )
            return {
                transform: [
                    {
                        translateY: (props.scrollY.value - DISTANCE_FIXED_BANNER_IMAGE - ((280 - interpolateSizeImage) / 2))
                    }
                ],
                opacity: interpolateOpacity,
                width: interpolateSizeImage,
                height: interpolateSizeImage
            };
        } else {
            return {
                transform: [
                    {
                        translateY: 0
                    }
                ],
                opacity: 1
            }
        }
    })

    return (
        <>
            <Animated.View style={[styles.container,
                // { backgroundColor: props?.primaryColor },
                scaleAnim,
                colorAnim,
            ]}>
                <LinearGradient
                    style={StyleSheet.absoluteFill}
                    // start={[0, 0.3]}
                    // end={[0, 1]}
                    start={{ x: 0, y: 0.3 }}
                    end={{ x: 0, y: 1 }}
                    colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
                />
            </Animated.View>
            <View
                style={{
                    height: BANNER_HEIGHT,
                    width: '100%',
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                <Searching scrollY={props?.scrollY} />
                <Animated.Image
                    style={[{
                        width: 280,
                        height: 280,
                        borderRadius: 8,
                        position: 'absolute',
                        zIndex: -1
                    },
                        backImageAnim
                    ]}
                    source={{
                        uri: currPlayTrack?.track?.album?.images[0]?.url
                    }} />

                <Animated.Image
                    style={[{
                        width: 280,
                        height: 280,
                        borderRadius: 8,
                    },
                        // translateYBannerImageAnim,
                        fadedPrevCoverPhoto
                    ]}
                    source={{
                        uri: `${currCoverPhoto}`
                    }} />

                <View style={{ bottom: 8 * 2, position: 'absolute', paddingHorizontal: 8 }}>
                    <View>
                        <Text style={{
                            color: 'white',
                            fontSize: 13,
                            fontWeight: '500'
                        }}>
                            Những ca khúc hay nhất từ dòng nhạc rất đa dạng. Bước qua mùa cô đơn.
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{
                                    width: 30, height: 30, borderRadius: 8
                                }} source={{ uri: `https://www.scdn.co/i/_global/twitter_card-default.jpg` }} />
                                <Text style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    marginLeft: 8
                                }}>
                                    Spotify
                                </Text>
                            </View>
                            <View style={{ marginTop: 4 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 13
                                    }}>
                                        79.830 likes | 3h 15m
                                    </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                        <Lottie
                                            speed={1}
                                            autoPlay={true}
                                            loop={true}
                                            style={{ width: 25, height: 25, borderRadius: 16 }}
                                            // ref={animationLoadRef}
                                            source={require('../../Json/heart.json')}
                                        />
                                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', bottom: 5, marginLeft: 8 }}>
                                            ...
                                        </Text>
                                    </View>



                                </View>



                            </View>

                        </View>
                        {/* <View style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: '#1DD15D',
                            justifyContent:'center',
                            alignItems:'center',
                            paddingLeft:4,
                        }}>
                            <IconPlayBlack
                                width={8 * 3}
                                height={8 * 3} />
                        </View> */}
                    </View>
                </View>
            </View>
        </>
    );
});

const styles = StyleSheet.create({
    container: {
        height: BANNER_HEIGHT,
    }
})

export default Banner;