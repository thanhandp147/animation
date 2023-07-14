import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Platform,
    Keyboard
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, Extrapolation, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { SvgUri } from 'react-native-svg';
import IconPlus from '../../SGV/plus.svg'
import IconCamera from '../../SGV/camera.svg'
import IconCameraInActive from '../../SGV/camera_inActive.svg'
import IconGallery from '../../SGV/gallery.svg'
import IconGalleryInActive from '../../SGV/gallery_inActive.svg'
import IconMicro from '../../SGV/micro.svg'
import IconMicroInActive from '../../SGV/micro_inActive.svg'
import IconLike from '../../SGV/like.svg'
import IconRight from '../../SGV/right.svg'
import IconEmoji from '../../SGV/emoji.svg'

import { useToggle } from '../../Hooks/UseHook';
import { useKeyboard } from '@react-native-community/hooks';
import StickersOption from './Components/StickersOption';
import ListSticktersBottomSheet from './Components/ListSticktersBottomSheet';

const WIDTH_MENU = 165
// const HEIGHT_KEYBOARD = 291 - getBottomSpace()

const InputBottom = memo((props) => {

    const keyboard = useKeyboard()

    const RefTextInput = useRef(null);
    const widthMenu = useSharedValue(WIDTH_MENU);
    const blankBottomKeyboard = useSharedValue(0);

    // const [heightKeyboard, setHeightKeyboard] = useState(0);
    const heightKeyboard = useRef(0)

    const [openMenu, setOpenMenu] = useState(true)
    const [showHeightKeyboard, setShowHeightKeyboard] = useState({
        show: false,
        flag: ''
    })
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false)


    const [valueTextInput, setValueTextInput] = useState('')

    useEffect(() => {


        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                // console.log({ ...e });
                heightKeyboard.current = e.endCoordinates.height - getBottomSpace()

                blankBottomKeyboard.value = withTiming(heightKeyboard.current, {
                    duration: 300
                })

                // setHeightKeyboard(e.endCoordinates.height - getBottomSpace())
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            (e) => {
                // console.log({ ...e });
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    // console.log('keyboard isKeyboardShow: ', keyboard.keyboardShown)
    // console.log('keyboard keyboardHeight: ', keyboard.keyboardHeight)

    useEffect(() => {
        if (openMenu) {
            widthMenu.value = withTiming(WIDTH_MENU, {
                duration: 300,
            });
        } else {
            widthMenu.value = withTiming(8 * 3, {
                duration: 300,
            });
        }
    }, [openMenu])

    useEffect(() => {
        if (showHeightKeyboard?.show) {
            blankBottomKeyboard.value = withTiming(heightKeyboard.current, {
                duration: 300
            })
        } else {
            blankBottomKeyboard.value = withTiming(0, {
                duration: 300
            })
        }
    }, [showHeightKeyboard?.show])

    const animatedScaleMenu = useAnimatedStyle(() => {
        return {
            width: widthMenu.value
        }
    })
    const animatedScaleItemMenu = useAnimatedStyle(() => {

        const interpolateScale = interpolate(widthMenu.value, [WIDTH_MENU, 8 * 3], [1, 0], { extrapolateRight: Extrapolation.CLAMP });
        const interpolateWidth = interpolate(widthMenu.value, [WIDTH_MENU, 8 * 3], [8 * 3, 0], { extrapolateRight: Extrapolation.CLAMP })

        return {
            transform: [
                {
                    scale: interpolateScale,
                },
            ],
            opacity: interpolateScale,
            width: interpolateWidth
        }
    })
    const animtedHeightKeyboard = useAnimatedStyle(() => {
        return {
            height: blankBottomKeyboard.value
        }
    })

    const animatedScaleItemRight = useAnimatedStyle(() => {
        const interpolateScale = interpolate(widthMenu.value, [WIDTH_MENU, 8 * 3], [0, 1], { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP });
        const interpolateWidth = interpolate(widthMenu.value, [WIDTH_MENU, 8 * 3], [0, 8 * 3], { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP })

        return {
            transform: [
                {
                    scale: interpolateScale,
                },
            ],
            opacity: interpolateScale,
            width: interpolateWidth
        }
    })

    const _onPressLike = () => {

    }
    const _hideEmoji=()=>{
        setShowEmoji(false)
    }


    return (
        // <KeyboardAvoidingView
        //     keyboardVerticalOffset={Platform.OS == 'ios' && getBottomSpace() == 0 ? (0) : 0} behavior={Platform.OS == 'ios' ? 'padding' : null} style={{
        //         flexGrow: 1
        //     }}
        // >
        <>
            <View style={styles.main}>
                <Animated.View style={[{ flexDirection: 'row', justifyContent: 'space-between' }, animatedScaleMenu]}>
                    <Animated.View style={[styles.main__plus, animatedScaleItemMenu, { backgroundColor: showEmoji ? '#A9A9A9' : '#425CFF' }]}>
                        <TouchableOpacity onPress={() => {
                            alert('awdawd')
                        }}>
                            <IconPlus
                                width={8 * 2} height={8 * 2}
                            />
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View style={[animatedScaleItemMenu]}>
                        {
                            showEmoji ?
                                <IconCameraInActive
                                    width={8 * 3}
                                    height={8 * 3} />
                                :
                                <IconCamera
                                    width={8 * 3}
                                    height={8 * 3} />

                        }

                    </Animated.View>

                    <Animated.View style={[animatedScaleItemMenu]}>
                        {
                            showEmoji ?
                                <IconGalleryInActive
                                    width={8 * 3}
                                    height={8 * 3} />
                                :
                                <IconGallery
                                    width={8 * 3}
                                    height={8 * 3} />
                        }

                    </Animated.View>

                    <Animated.View style={[animatedScaleItemMenu]}>
                        {
                            showEmoji ?
                                <IconMicroInActive
                                    width={8 * 3}
                                    height={8 * 3} />
                                :
                                <IconMicro
                                    width={8 * 3}
                                    height={8 * 3} />
                        }
                    </Animated.View>

                    <Animated.View style={[animatedScaleItemRight, { position: 'absolute' }]}>
                        <TouchableOpacity onPress={() => setOpenMenu(true)}>
                            <IconRight
                                width={8 * 3}
                                height={8 * 3} />
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>


                <View style={styles.input}>
                    <TextInput
                        style={styles.input__child}
                        ref={RefTextInput}
                        value={valueTextInput}
                        onChangeText={(e) => {
                            setOpenMenu(false)
                            setValueTextInput(e)
                        }}
                        multiline
                        onFocus={() => {
                            setOpenMenu(false)
                            setShowHeightKeyboard({
                                show: true,
                                flag: ''
                            })
                            setShowEmoji(false)
                        }}
                        onBlur={() => {
                            setOpenMenu(true)
                            if (showHeightKeyboard?.flag == 'emoji') {
                                setShowHeightKeyboard({
                                    show: true,
                                    flag: ''
                                })
                            } else {
                                setShowHeightKeyboard({
                                    show: false,
                                    flag: ''
                                })
                            }
                            // setShowHeightKeyboard({
                            //     show: false,
                            //     flag: ''
                            // })
                        }}
                        placeholder='Aa' />

                    <TouchableOpacity
                        onPress={() => {
                            // RefTextInput.current.dissmiss?.()
                            // setShowHeightKeyboard(true)
                            setShowHeightKeyboard({
                                show: true,
                                flag: 'emoji'
                            })
                            Keyboard.dismiss()
                            if (showEmoji) {
                                setShowEmoji(false)
                                RefTextInput.current.focus?.()
                                setOpenMenu(true)
                            } else {
                                setShowEmoji(true)
                            }
                        }}
                        style={{
                            position: 'absolute',
                            right: 8,
                            bottom: 6
                        }}>
                        <IconEmoji
                            width={8 * 2.75}
                            height={8 * 2.75} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={_onPressLike}>
                    <IconLike
                        width={8 * 3}
                        height={8 * 3}
                    />
                </TouchableOpacity>
            </View>

            <StickersOption show={showEmoji} />

            {
                <Animated.View style={[{
                    backgroundColor: 'white'
                }, animtedHeightKeyboard]} >

                    {
                        showEmoji ?
                            <ListSticktersBottomSheet
                                hideEmoji={_hideEmoji}
                                shareValueBlankBottomKeyBoard={blankBottomKeyboard}
                                heightKeyboard={heightKeyboard.current + getBottomSpace()}
                                blankBottomKeyboard={blankBottomKeyboard.value + getBottomSpace()} />
                            : <></>
                    }


                </Animated.View>
            }
        </>
        // </KeyboardAvoidingView>
    );
});

const styles = StyleSheet.create({
    input__child: {
        margin: 0,
        padding: 0,
        fontSize: 16
    },
    input: {
        minHeight: 8 * 4.5,
        marginHorizontal: 16,
        borderRadius: 14,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#F5F5F5',
        flex: 1
    },
    main__plus: {
        backgroundColor: '#425CFF',
        width: 8 * 3,
        height: 8 * 3,
        borderRadius: 8 * 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16
    }
})

export default InputBottom;