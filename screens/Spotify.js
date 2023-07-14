import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View, Text, StyleSheet, Dimensions, Image } from 'react-native';

import { Easing, Extrapolation, interpolate, JumpingTransition, runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';


const _width = Dimensions.get('window').width;
const _height = Dimensions.get('window').height;

const Spotify = memo((props) => {

    const yPositionControl = useSharedValue(0);
    const opacityImageCover = useSharedValue(0);

    useEffect(() => {
        opacityImageCover.value = withTiming(1, {
            duration: 1000,
        });
    }, [])

    const minimizeSpotify = () => {
        props?.minimizeSpotify()
    }

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            // console.log({ onStart: { event, ctx } });
            ctx.offsetY = yPositionControl.value;
        },
        onActive: (event, ctx) => {
            // console.log({ onActive: { event, ctx } });
            // if (event.translationY > 0) return
            yPositionControl.value = ctx.offsetY + event.translationY;
        },
        onEnd: (ctx) => {
            // console.log({...ctx});
            // console.log("end", ctx);
            // yPositionControl.value = withDecay(_height - 140, { velocity: velocityY })
            // yPositionControl.value = withDecay({
            //     velocity: velocityY,
            //     // clamp: [0,-100 ],
            // });

            if (ctx.translationY < -200) {
                yPositionControl.value = withTiming(-640, {
                    duration: 300,
                }, (isFinished) => {
                    if (isFinished) {
                        runOnJS(minimizeSpotify)();
                    }
                });
            } else {
                yPositionControl.value = withTiming(0, {
                    duration: 300,
                });
            }

        },
    });

    const animatedControlView = useAnimatedStyle(() => {

        const interpolateWidth = interpolate(yPositionControl.value, [0, -800], [1, 0], { extrapolateRight: Extrapolation.CLAMP });

        return {
            transform: [
                {
                    translateY: yPositionControl.value
                },
                {
                    scale: interpolateWidth
                },
            ],
        };
    });

    const animatedOpacityImage = useAnimatedStyle(() => {

        const interpolateOpacity = interpolate(yPositionControl.value, [0, -400], [1, 0], { extrapolateRight: Extrapolation.CLAMP });

        return {
            opacity: yPositionControl.value == 0 ? opacityImageCover.value : interpolateOpacity
        };
    });


    return (
        <>
            <View style={[styles.cover, shadow]}>

                <Animated.Image
                    style={[{
                        width: '100%',
                        height: _width - 48,
                        borderRadius: 16,
                    }, animatedOpacityImage]}
                    source={{
                        uri: `https://bizweb.dktcdn.net/100/411/628/products/vu-bia-f7948db8-d576-4455-9a72-0f80b35d83c3.jpg?v=1660964043207`
                    }} />

                <PanGestureHandler onGestureEvent={gestureHandler}>
                    <Animated.View style={[styles.cover__control, animatedControlView]}>
                        <Text style={styles.cover__control__title}>
                            Heartbreak Anniversary
                        </Text>
                        <Text style={styles.cover__control__description}>
                            2021 Epic Records. With Not So Fast LLC.
                        </Text>

                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            paddingHorizontal: 16,
                            alignItems: 'center'
                        }}>
                            <View style={styles.cover__control__timeLeft}>
                                <Text style={styles.cover__control__timeLeft__text}>
                                    0:00
                                </Text>
                            </View>

                            <View style={{ flex: 1, height: 4, borderRadius: 8, backgroundColor: 'grey', marginHorizontal: 4 }}>
                            </View>

                            <View style={styles.cover__control__timeRight}>
                                <Text style={styles.cover__control__timeLeft__text}>
                                    -3:48
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            paddingHorizontal: 16,
                            alignItems: 'center',
                            justifyContent:'center'
                        }}>
                            <Image
                                style={[{
                                    width: 30,
                                    height: 20,
                                },
                                {
                                    transform: [
                                        {
                                            rotate: '180deg'
                                        }
                                    ]
                                }
                                ]} source={require('../Image/next.png')} />
                            <Image style={{
                                width: 30,
                                height: 20,
                                marginHorizontal:32,
                                resizeMode:'contain'
                            }} source={require('../Image/pause.png')} />
                            <Image style={{
                                width: 30,
                                height: 20,
                            }} source={require('../Image/next.png')} />
                        </View>

                    </Animated.View>
                </PanGestureHandler>
            </View>
        </>
    );
});

const styles = StyleSheet.create({
    cover__control__timeLeft__text: {
        fontSize: 14,
        fontWeight: '500',
        color: 'grey'
    },
    cover__control__timeRight: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cover__control__timeLeft: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cover__control__description: {
        fontSize: 12,
        fontWeight: '500',
        color: "grey",
        alignSelf: 'center',
        marginTop: 4,
    },
    cover__control__title: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: 'bold',
        color: "black",
        alignSelf: 'center'
    },
    cover__control: {
        width: _width - 32,
        backgroundColor: 'white',
        alignSelf: 'center',
        height: 140,
        borderRadius: 32,
        marginTop: 32,
        backgroundColor: 'rgba(255,255,255,.7)'
    },
    cover: {
        width: _width - 48,
        // backgroundColor: 'white',
        alignSelf: 'center',
        // height: _width - 48,
        borderRadius: 16,
    },
    itemNoti__icon: {
        width: 32 + 8,
        height: 32 + 8,
        borderRadius: 8,
    },
    itemNoti: {
        width: _width - 32,
        height: 65,
        marginTop: 8,
        backgroundColor: 'white',
        borderRadius: 16,

    },
    itemNoti__title: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3
}


export default Spotify;