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
import Animated, { Easing, Extrapolation, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import { getBottomSpace } from 'react-native-iphone-x-helper';


const widthDevice = Dimensions.get('window').width
const heightDevice = Dimensions.get('window').height


const SwipeTinder = memo((props) => {

    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)


    const [listImage, setListImage] = useState([
        `https://images.pexels.com/photos/240561/pexels-photo-240561.jpeg?auto=compress&cs=tinysrgb&w=800`,
        `https://images.pexels.com/photos/1087735/pexels-photo-1087735.jpeg?auto=compress&cs=tinysrgb&w=800`,
        `https://images.pexels.com/photos/762527/pexels-photo-762527.jpeg?auto=compress&cs=tinysrgb&w=800`,
        `https://images.unsplash.com/photo-1657299156261-4ce1d0a2cf5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60`,
        `https://images.unsplash.com/photo-1664903722537-c7984d87bebc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60`,
        `https://images.unsplash.com/photo-1664900717079-d38726ec3d37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60`
    ])

    const [currIndex, setCurrIndex] = useState(0)

    const countIndex = () => {
        setCurrIndex(old => old + 1)
    }

    useEffect(() => {
       
        // setTimeout(() => {
        //     translateX.value = 0
        //     translateY.value = 0 
        // }, 500);

        return () => {
            translateX.value = 0
            translateY.value = 0
        }

    }, [currIndex])

    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            ctx.startX = translateX.value;
            ctx.startY = translateY.value;
        },
        onActive: (event, ctx) => {
            translateX.value = ctx.startX + event.translationX;
            translateY.value = ctx.startY + event.translationY;
        },
        onEnd: (evt) => {



            if (evt.translationX < 100 && evt.translationX > -100) {
                translateX.value = withSpring(0, {
                    mass: 0.5,
                    stiffness: 250,
                    restDisplacementThreshold: 0.1,
                });
                translateY.value = withSpring(0, {
                    mass: 0.5,
                    stiffness: 250,
                    restDisplacementThreshold: 0.1,
                });
                return
            }
            translateX.value = withTiming(widthDevice * 1.5, {
                duration: 300,
            }, (isFinished) => {
                if (isFinished) {

                    runOnJS(countIndex)();
                }
            });


            // translateX.value = withDecay({
            //     velocity: evt.velocityX,
            //     clamp: [-widthDevice, widthDevice], // optionally define boundaries for the animation
            // });

        },
    });

    const animtedFrontCard = useAnimatedStyle(() => {

        const rotateCard = interpolate(
            translateX.value,
            [-200, 0, 200],
            [-10, 0, -10],
            // { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
        );


        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                {
                    rotate: `${rotateCard}deg`, // deg required for android
                },
            ],
        };
    })
    const animtedBackCard = useAnimatedStyle(() => {

        const scaleInterpolateX = interpolate(
            translateX.value,
            [-100, 0, 100],
            [1, 0.95, 1],
            { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
        );
        const scaleInterpolateY = interpolate(
            translateY.value,
            [-100, 0, 100],
            [1, 0.95, 1],
            { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
        );


        return {
            transform: [
                {
                    scale: scaleInterpolateX > scaleInterpolateY ? scaleInterpolateX : scaleInterpolateY
                },
            ],
        };
    })

    return (
        <View style={styles.container}>
            <Text style={{
                position: 'absolute',
                top: 50
            }}>
                {currIndex}
            </Text>

            {
                listImage?.map((item, index) => {
                    if (index < currIndex) return null;

                    if (index == currIndex) {
                        return (
                            <PanGestureHandler key={index} onGestureEvent={eventHandler}>
                                <Animated.View
                                    style={[
                                        styles.card,
                                        // { zIndex: 1 },
                                        animtedFrontCard
                                    ]}>
                                    <Image
                                        style={styles.card__image}
                                        source={{
                                            uri: `${item}`
                                        }} />
                                </Animated.View>
                            </PanGestureHandler>
                        )
                    } else {
                        return (
                            <Animated.View
                                key={index}
                                style={[
                                    styles.card,
                                    animtedBackCard,
                                    // {
                                    //     top:index*50
                                    // }
                                ]}>
                                <Image
                                    style={[
                                        styles.card__image,
                                    ]}
                                    source={{
                                        uri: `${item}`
                                    }} />
                            </Animated.View>
                        )
                    }
                }).reverse()
            }


            {/* FRONT */}
            {/* <PanGestureHandler onGestureEvent={eventHandler}>
                <Animated.View
                    style={[
                        styles.card,
                        { zIndex: 1 },
                        animtedFrontCard
                    ]}>
                    <Image
                        style={styles.card__image}
                        source={{
                            uri: `${listImage[currIndex]}`
                        }} />
                </Animated.View>
            </PanGestureHandler>

            <Animated.View
                style={[
                    styles.card,
                    animtedBackCard
                ]}>
                <Image
                    style={[
                        styles.card__image,
                    ]}
                    source={{
                        uri: `${listImage[currIndex + 1]}`
                    }} />
            </Animated.View> */}

            {/* BACK */}

        </View>
    );
});

const styles = StyleSheet.create({
    card__image: {
        width: widthDevice - 32,
        height: 600,
        borderRadius: 16
    },
    card: {
        width: widthDevice - 32,
        height: 600,
        position: 'absolute',
        // zIndex: 1,
        borderRadius: 16
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SwipeTinder;