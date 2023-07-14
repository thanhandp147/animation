import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useSelector } from 'react-redux';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';

const AnimatedHeart = memo((props) => {

    const heightMiniBox = useSharedValue(0);
    const scaleIconHeart = useSharedValue(0);
    const translateYIconHeart = useSharedValue(0);

    useEffect(() => {

        heightMiniBox.value = withTiming(25, {
            duration: 300,
        }, (isFinished) => {
            if (isFinished) {
            }
        });

        scaleIconHeart.value = withSpring(2, {
            duration: 300,
        })
        translateYIconHeart.value = withTiming(-10, {
            duration: 300
        }, (isFinished) => {
            if (isFinished) {
                translateYIconHeart.value = withDelay(200, withTiming(0, {
                    duration: 300
                }))
                scaleIconHeart.value = withDelay(200, withTiming(1, {
                    duration: 300
                }))
            }
        })

    }, [])

    const animatedHeightMiniBox = useAnimatedStyle(() => {
        return {
            height: heightMiniBox.value,
        };
    })
    const animatedScaleIconHeart = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: scaleIconHeart.value
                },
                {
                    translateY: translateYIconHeart.value
                }
            ],
        };
    })

    return (
        <Animated.View style={[{ ...props.style }, styles.miniBoxReaction, animatedHeightMiniBox]}>
            <View style={styles.miniBoxReaction__child}>
                <Animated.Image
                    style={[{ width: 15, height: 15, resizeMode: 'contain' }, animatedScaleIconHeart]}
                    source={{
                        uri: `https://static.xx.fbcdn.net/images/emoji.php/v9/tf9/1.5/32/2764.png`
                    }} />
            </View>
        </Animated.View>
    )

})

const ReceiveMsg = memo((props) => {

    const [showReactOption, setShowReactOption] = useState(false)
    const newMsgReactionRedux = useSelector(state => state?.messageReducer?.newMessageReaction)

    const [isHearted, setIsHearted] = useState(false)
    // const heightMiniBox = useSharedValue(0);

    useEffect(() => {
        if (newMsgReactionRedux?._idMsg) {

            if (newMsgReactionRedux?._idMsg == props?.data?._id && newMsgReactionRedux?.type == 'heart') {
                startAnimatedHeart()
            }
        }
    }, [newMsgReactionRedux?._idMsg])

    const startAnimatedHeart = () => {
        setIsHearted(true)
        //  heightMiniBox.value = withTiming(25, {
        //     duration: 500,
        // }, (isFinished) => {
        //     if (isFinished) {
        //     }
        // });
    }
    // const animatedHeightMiniBox = useAnimatedStyle(() => {
    //     return {
    //         height: heightMiniBox.value,
    //     };
    // })


    return (
        <View style={[{
            alignSelf: 'flex-start',
            marginVertical: 1,
        }, props?.separator && { marginBottom: 8 }]}>
            {
                console.log('awdß')

            }
            <View style={[{
                flexDirection: 'row',
            },

            ]}>
                <View style={{
                    width: 8 * 3.5,
                    marginHorizontal: 8
                }}>
                    {
                        props?.showMiniAvat ||isHearted ?
                            <View style={styles.miniAvatar}>
                                <Image style={styles.miniAvatar__image} source={{ uri: `${props?.data?.avatar}` }} />

                            </View>
                            :
                            <></>
                    }


                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    delayLongPress={100}
                    onLongPress={(e) => {
                        ReactNativeHapticFeedback.trigger("impactLight", {
                            enableVibrateFallback: true,
                            ignoreAndroidSystemSettings: false
                        });
                        if (e?.nativeEvent?.pageY < 200) {
                            props?.longPressMsg({
                                idMsg: props?.data?._id,
                                pageY: e?.nativeEvent?.pageY + 100,
                                show: true
                            })
                        } else {
                            props?.longPressMsg({
                                idMsg: props?.data?._id,
                                pageY: e?.nativeEvent?.pageY,
                                show: true
                            })
                        }

                    }}
                    style={[styles.message,
                    props?.startLine && { borderBottomLeftRadius: 4 },
                    props?.endLine && { borderTopLeftRadius: 4 },
                    props?.centerLine && { borderBottomLeftRadius: 4, borderTopLeftRadius: 4 },
                    ]}>
                    <Text style={{ fontSize: 15 }}>
                        {props?.data?.content}
                    </Text>
                </TouchableOpacity>

            </View>
            {
                isHearted ?
                    <AnimatedHeart style={{ alignSelf: 'flex-end' }} />
                    // <Animated.View style={[{ alignSelf: 'flex-end' }, styles.miniBoxReaction, animatedHeightMiniBox]}>

                    // </Animated.View>
                    :
                    <></>
            }


        </View>
    );
});


const styles = StyleSheet.create({
    miniBoxReaction__child: {
        backgroundColor: '#F1F1F1',
        width: '87%',
        height: '87%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16
    },
    miniBoxReaction: {
        width: 30,
        // padding:8,
        // height: 25,
        marginRight: 8,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        bottom: 8,
        // borderWidth: 2,
        borderColor: 'white'
    },
    miniAvatar__image: {
        width: 8 * 3.5,
        height: 8 * 3.5,
        borderRadius: 8 * 3.5 / 2,
    },
    miniAvatar: {
        width: 8 * 3.5,
        height: 8 * 3.5,
        borderRadius: 8 * 3.5 / 2,
        position: 'absolute',
        bottom: 0
    },
    message: {
        maxWidth: 8 * 30,
        borderRadius: 16,
        backgroundColor: '#F1F1F1',
        paddingHorizontal: 8,
        paddingVertical: 8,
    }
})


export default ReceiveMsg;