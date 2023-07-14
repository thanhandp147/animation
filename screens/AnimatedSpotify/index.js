import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

import { Easing, Extrapolation, interpolate, JumpingTransition, runOnJS, scrollTo, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import ImageColors from 'react-native-image-colors'
import Banner from './Banner';
import ListTracks from './ListTracks';
import Header from './Header';
import IconBackArrow from '../../SGV/backArrow.svg'
import Searching from './Searching';
import IconPlayBlack from '../../SGV/play_black.svg'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Axios from 'axios'
import MinimizePlay from './MinimizePlay';
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'
import { useSelector } from 'react-redux';
import IconResumeWhite from '../../SGV/resume_white.svg'
import BlurViewBottom from './BlurViewBottom';

const HEADER_HEIGHT = getStatusBarHeight() + 8 * 7;

const AnimatedSpotify = memo((props) => {

    const RefScrollView = useAnimatedRef(null);

    const currPlayTrack = useSelector(state => state?.spotifyReducer?.currPlayTrack)
    const [primaryColor, setPrimaryColor] = useState(null);

    const scrollY = useSharedValue(0);
    const [heightBanner, setHeightBanner] = useState(null);

    useEffect(() => {
        _getPrimaryColor()
        _getGuessTokenSpotify()
    }, [])

    useEffect(() => {
        if (currPlayTrack) {
            _getPrimaryColor(currPlayTrack?.track?.album?.images[0]?.url)
        }
    }, [currPlayTrack])

    const _getGuessTokenSpotify = async () => {
        let result = await Axios.post(`https://clienttoken.spotify.com/v1/clienttoken`, {
            client_data: {
                client_id: "d8a5ed958d274c2e8ee717e6a4b0971d",
                client_version: "1.2.0.128.g4509e38d",
                js_sdk_data: {
                    device_brand: "Apple",
                    device_model: 'desktop',
                    os: "macOS",
                    os_version: "10.15.7"
                }
            }
        })
        // console.log({ result });
    }



    const _getPrimaryColor = async (url) => {
        const result = await ImageColors.getColors(url, {
            fallback: '#228B22',
            cache: false,
            key: 'unique_key',
        })
        setPrimaryColor(result?.primary)
    }

    const PlayButtonAnim = useAnimatedStyle(() => {

        const interpolateTranslate = interpolate(scrollY.value, [0, heightBanner - HEADER_HEIGHT - (60 + 20) + 30], [0, -(heightBanner - HEADER_HEIGHT - (60 + 20) + 30)], { extrapolateRight: Extrapolation.CLAMP });


        return {
            transform: [
                {
                    translateY: interpolateTranslate
                }
            ]
        }
    })

    const _handlePlayTrack = () => {
        store.dispatch({
            type: ActionType.SET_STATUS_PLAYING_TRACK,
            payload: {
                flag: 'play'
            }
        })
    }

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event, ctx) => {
            scrollY.value = event.contentOffset.y;
        },
        onBeginDrag: (e) => {
        },
        onEndDrag: (e) => {
            if (e.contentOffset.y > 0 && e.contentOffset.y < 76 / 1.5) {
                scrollTo(RefScrollView, 0, 0, true) 
            }else if (e.contentOffset.y > 76/1.5 && e.contentOffset.y < 76){
                scrollTo(RefScrollView, 0, 76, true) 
            }
        },
    });

    const _renderStatusTrack = () => {
        switch (currPlayTrack?.status) {
            case 'ready':
                return (
                    <TouchableOpacity
                        onPress={() => {
                            store.dispatch({
                                type: ActionType.SET_STATUS_PLAYING_TRACK,
                                payload: {
                                    flag: 'play'
                                }
                            })
                        }}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 4,
                        }}>
                        <IconPlayBlack
                            width={8 * 3}
                            height={8 * 3} />
                    </TouchableOpacity>
                )
            case 'play':
                return (
                    <TouchableOpacity
                        onPress={() => {
                            store.dispatch({
                                type: ActionType.SET_STATUS_PLAYING_TRACK,
                                payload: {
                                    flag: 'pause'
                                }
                            })
                        }}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 4,
                        }}>
                        <IconResumeWhite
                            width={8 * 3}
                            height={8 * 3} />
                    </TouchableOpacity>
                )
            case 'pause':
                return (
                    <TouchableOpacity
                        onPress={() => {
                            store.dispatch({
                                type: ActionType.SET_STATUS_PLAYING_TRACK,
                                payload: {
                                    flag: 'resume'
                                }
                            })
                        }}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 4,
                        }}>
                        <IconPlayBlack
                            width={8 * 3}
                            height={8 * 3} />
                    </TouchableOpacity>
                )
            case 'resume':
                return (
                    <TouchableOpacity
                        onPress={() => {
                            store.dispatch({
                                type: ActionType.SET_STATUS_PLAYING_TRACK,
                                payload: {
                                    flag: 'pause'
                                }
                            })
                        }}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 4,
                        }}>
                        <IconResumeWhite
                            width={8 * 3}
                            height={8 * 3} />
                    </TouchableOpacity>
                )


            default:
                break;
        }
    }


    return (
        <View style={styles.container}>

            <TouchableOpacity style={{ position: 'absolute', left: 8 * 2, zIndex: 2, top: 50 }}>
                <IconBackArrow
                    width={8 * 2.5}
                    height={8 * 2.5} />
            </TouchableOpacity>

            <Header scrollY={scrollY} primaryColor={primaryColor} />

            <Animated.View style={[{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#1DD15D',
                position: 'absolute',
                top: heightBanner - (60 + 20),
                zIndex: 1,
                right: 8 * 3
            }, PlayButtonAnim]}>
                {
                    _renderStatusTrack()
                }
            </Animated.View>


            <Animated.ScrollView
                ref={RefScrollView}
                scrollEventThrottle={16}
                onScroll={scrollHandler}>
                <View
                    onLayout={(e) => {
                        setHeightBanner(e.nativeEvent.layout.height)
                    }}
                    style={{}}>
                    <Banner scrollY={scrollY}
                        primaryColor={primaryColor}
                    />


                </View>
                <ListTracks />
            </Animated.ScrollView>

            <MinimizePlay primaryColor={primaryColor} />
            <BlurViewBottom/>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
})

export default AnimatedSpotify;










