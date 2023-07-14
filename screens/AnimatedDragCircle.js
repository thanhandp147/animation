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

const widthDevice = Dimensions.get('window').width
const heightDevice = Dimensions.get('window').height

const AnimatedDragCircle = memo((props) => {

    const ballX = useSharedValue(0);
    const ballY = useSharedValue(0);

    const scaleBoxChat = useSharedValue(0)

    const [isShowBoxChat, setIsShowBoxChat] = useState(false)

    const lastedPositionBallX = useRef(0);
    const lastedPositionBallY = useRef(0);
    const lastedTranBallX = useRef(0);
    const lastedTranBallY = useRef(0);

    const iniAbsoluteX = useRef(0);
    const iniAbsoluteY = useRef(0);


    useEffect(() => {
        if (isShowBoxChat) {
            scaleBoxChat.value = withTiming(1, {
                duration: 500,
                // easing: Easing.ease()
            })
        } else {
            scaleBoxChat.value = withTiming(0, {
                duration: 500,
                // easing: Easing.ease()
            })

            // ballX.value = withSpring(ballX.value - lastedPositionBallX.current);
            // ballY.value = withSpring(ballY.value - lastedPositionBallY.current);

        }
    }, [isShowBoxChat])

    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            console.log({ onStart: { event, ctx } });
            ctx.startX = ballX.value;
            ctx.startY = ballY.value;
        },
        onActive: (event, ctx) => {
            // console.log({ onActive: { event, ctx } });
            ballX.value = ctx.startX + event.translationX;
            ballY.value = ctx.startY + event.translationY;
        },
        onEnd: (event, ctx) => {
            console.log({ event, ctx });

            lastedPositionBallX.current = event?.absoluteX
            lastedPositionBallY.current = event?.absoluteY

            // if (event?.absoluteX < widthDevice / 2) {
            //     ballX.value = withSpring(-widthDevice + 70 + 16 * 2);
            // } else {
            //     ballX.value = withSpring(0);
            // }

            // ballY.value = withSpring(ctx.startY + event.translationY);
        },
    });

    console.log({ ballX: ballX.value, ballY: ballY.value, lastedPositionBallX, lastedPositionBallY });

    const animatedBall = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: ballX.value,
                },
                {
                    translateY: ballY.value
                }
            ],
        };
    });

    const animatedScaleBoxChat = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: scaleBoxChat.value
                }
            ],
        };
    })

    return (
        <View style={styles.container}>

            <View style={{
                width: 1,
                height: '100%',
                backgroundColor: 'grey',
                position: 'absolute',
                left: widthDevice / 2
            }} />

            <PanGestureHandler onGestureEvent={eventHandler}>
                <Animated.View
                    onLayout={(e) => {
                        console.log({ ...e });
                        iniAbsoluteX.current  = e.nativeEvent.layout.x;
                        iniAbsoluteY.current  = e.nativeEvent.layout.y;
                    }}
                    style={[styles.ball, animatedBall]} >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            ballX.value = withSpring(0);
                            ballY.value = withSpring(-500);
                            // ballY.value = withSpring(-heightDevice + 100 + 70 + 50);

                            // lastedPositionBallX.current = lastedPositionBallX.current + widthDevice - lastedPositionBallX.current;
                            // lastedPositionBallY.current = lastedPositionBallY.current + heightDevice - lastedPositionBallY.current;;
                            // tempLastedPositionBallX = lastedPositionBallX.current + widthDevice - lastedPositionBallX.current;
                            // tempLastedPositionBallY = lastedPositionBallY.current + heightDevice - lastedPositionBallY.current;;

                            // console.log({tempLastedPositionBallX,tempLastedPositionBallY});

                            // lastedTranBallX.current =tempLastedPositionBallX - lastedPositionBallX.current
                            // lastedTranBallY.current = tempLastedPositionBallY - lastedPositionBallY.current

                            if (isShowBoxChat) {
                                   

                                ballX.value = withSpring(lastedPositionBallX.current - iniAbsoluteX.current);
                                ballY.value = withSpring(lastedPositionBallY.current - iniAbsoluteY.current);
                                // ballY.value = withSpring(-400);
                            }

                            setIsShowBoxChat(old => !old)


                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}>
                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 40
                            }}
                            source={{
                                uri: `https://scontent.fhan3-5.fna.fbcdn.net/v/t39.30808-6/279839960_2605856086212933_7523087793335412625_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=PfO4CISECpcAX8LEbcn&_nc_ht=scontent.fhan3-5.fna&oh=00_AT-ifSo1BE1Hnv5ogISy07TLvCY0vqyR8gXppAqdVgAEhw&oe=629C1571`
                            }} />

                    </TouchableOpacity>
                </Animated.View>
            </PanGestureHandler>

            {/* <Animated.View style={[styles.boxChat, animatedScaleBoxChat]} >

            </Animated.View> */}

        </View>
    );
});

const styles = StyleSheet.create({
    boxChat: {
        width: widthDevice,
        height: heightDevice - 165,
        borderWidth: 1,
        backgroundColor: 'grey',
        position: 'absolute',
        bottom: getBottomSpace(),
        borderRadius: 8
    },
    ball: {
        width: 70,
        height: 70,
        // backgroundColor: 'red',
        position: 'absolute',
        bottom: 100,
        right: 16,
        borderRadius: 35
    },
    container: {
        flex: 1,
        backgroundColor: Colors.light
    }
})

export default AnimatedDragCircle;