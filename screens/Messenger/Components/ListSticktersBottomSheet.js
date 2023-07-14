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
    Keyboard,
    ScrollView,
    FlatList
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, Extrapolation, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { SvgUri } from 'react-native-svg';
import IconFindGrey from '../../../SGV/find_grey.svg'
import { LIST_STICKERS } from './TempListStickers';
import { TabBar, TabView } from 'react-native-tab-view';

const MODAL_HEIGHT = 800
const _width = Dimensions.get('window').width;
const HEIGHT_SCROLLVIEW = 180


const clamp = (value, lowerBound, upperBound) => {
    'worklet';
    // return Math.min(Math.max(value, min), max);
    return Math.min(Math.max(lowerBound, value), upperBound)
};

const ListSticktersBottomSheet = memo((props) => {

    const [expandModal, setExpandModal] = useState(false)
    const [enableScrollView, setEnableScrollView] = useState(true)
    const RefTextInput = useRef(null);
    const FlatlistRef = useRef(null);

    const translateY = useSharedValue(0)
    const heightScrollView = useSharedValue(HEIGHT_SCROLLVIEW)

    const [routes, setRoutes] = useState([
        { key: '1', title: 'FaceBook' },
        { key: '2', title: `Khách hàng` },
        { key: '3', title: 'FaceBook' },
        { key: '4', title: `Khách hàng` },
        { key: '5', title: 'FaceBook' },
        { key: '6', title: `Khách hàng` },
        { key: '7', title: 'FaceBook' },
        { key: '9', title: `Khách hàng` },
        { key: '10', title: `Khách hàng` },
        { key: '11', title: `Khách hàng` },
        { key: '12', title: `Khách hàng` },
        { key: '13', title: `Khách hàng` },
    ]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        FlatlistRef?.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition:0.5
        })
    }, [index])

    // const shareValueBlankBottomKeyBoard = useDerivedValue(() => {
    //     const formatedValue = props.shareValueBlankBottomKeyBoard.value
    //     return formatedValue;
    // })

    const fnc = () => {
        props?.hideEmoji()

    }

    const _enbaleScroll = () => {
        setEnableScrollView(true)
    }

    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            // console.log({ onStart: "onStart", event, ctx });
            // runOnJS(fnc)(event)
            ctx.offsetY = translateY.value;
        },
        onActive: (event, ctx) => {
            // console.log({ onActive: "onActive", event, ctx });
            translateY.value = clamp(
                event.translationY + ctx.offsetY,
                -(MODAL_HEIGHT - props.heightKeyboard),
                200
            )
        },
        onEnd: (event, ctx) => {
            // console.log({ onEnd: "onEnd", event, ctx });
            if (event.translationY < 0) {
                translateY.value = withDecay({
                    velocity: event.velocityY,
                    clamp: [-(MODAL_HEIGHT - props.heightKeyboard), 0], // optionally define boundaries for the animation
                }, () => {
                    translateY.value = withTiming(-(MODAL_HEIGHT - props.heightKeyboard), {}, (isFinished) => {
                        runOnJS(_enbaleScroll)()
                    })
                });
            } else if (event.translationY > 0) {

                if (ctx?.offsetY == 0) {
                    props.shareValueBlankBottomKeyBoard.value = withTiming(0, {}, (isFinished) => {
                        if (isFinished) {
                            translateY.value = 0
                            runOnJS(fnc)()
                        }
                    })
                } else if (ctx?.offsetY < 0) {
                    translateY.value = withTiming(0)
                }



                // props.shareValueBlankBottomKeyBoard.value = withTiming(0, {}, (isFinished) => {
                //     if(isFinished){
                //         runOnJS(fnc)()
                //     }
                // })

                // translateY.value = withDecay({
                //     velocity: event.velocityY,
                //     clamp: [(MODAL_HEIGHT - props.heightKeyboard), 0], // optionally define boundaries for the animation
                // }, () => {
                //     translateY.value = withSpring(0)
                //     runOnJS(_enbaleScroll)()
                // });
            }

        },
    });

    const styleTopPosSheet = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateY.value },
            ],
        };
    })
    const animatedHeightScrollView = useAnimatedStyle(() => {

        const interpolateHeight = interpolate(
            translateY.value,
            [-(MODAL_HEIGHT - props.heightKeyboard), 0],
            [MODAL_HEIGHT - 120, HEIGHT_SCROLLVIEW],
            { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
        );

        return {
            height: interpolateHeight
        }
    })

    const renderScene = ({ route }) => {
        return (
            <ScrollView
                scrollEnabled={enableScrollView}
                scrollEventThrottle={16}
                style={{ flex: 1 }}
                onScroll={event => {
                    // console.log({ ...event });
                    if (event?.nativeEvent?.contentOffset?.y < -100) {
                        // setEnableScrollView(false)
                        translateY.value = withTiming(0)
                    }
                }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        LIST_STICKERS?.map((item, index) => {
                            return (
                                <View key={index} style={{ width: _width / 4, height: _width / 4, padding: 16 }}>
                                    <Image

                                        style={{ flex: 1 }}
                                        source={{
                                            uri: item
                                        }} />
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    };

    const _renderItem = ({ item, index :i}) => {
        return (
            <View style={[styles.menu , index == i && {backgroundColor:'red'}]}>
                <Text>
                    {item.key}
                </Text>
            </View>
        )
    }

    return (
        <View>
            <PanGestureHandler onGestureEvent={eventHandler}>
                <Animated.View style={[{ height: MODAL_HEIGHT, borderTopLeftRadius: 16, borderTopRightRadius: 16, backgroundColor: 'white' }, styleTopPosSheet, shadow]}>
                    <View style={styles.horizalStick} />

                    <View style={styles.input}>
                        <IconFindGrey style={{ position: 'absolute', left: 8 }} width={8 * 2} height={8 * 2} />
                        <TextInput
                            ref={RefTextInput}
                            onFocus={() => {
                                translateY.value = withTiming(-(MODAL_HEIGHT - props.heightKeyboard), {}, (isFinished) => {
                                })
                            }}
                            style={{ fontWeight: '500' }} placeholderTextColor={'#8E8D8F'} placeholder='Search stickers' />
                    </View>



                    <Animated.View style={[animatedHeightScrollView]}>

                        {
                            routes?.length > 0 ?
                                <TabView
                                    renderTabBar={() => { }}
                                    swipeEnabled={true}
                                    navigationState={{ index, routes }}
                                    renderScene={renderScene}
                                    onIndexChange={setIndex}
                                    lazy
                                />
                                : <></>
                        }

                    </Animated.View>


                </Animated.View>


            </PanGestureHandler>
            {/* <View style={{ position: 'absolute', top: 240 }}>
                <FlatList
                    ref={FlatlistRef}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={routes}
                    renderItem={_renderItem}
                    keyExtractor={item => item?.key}
                />
            </View> */}
        </View>
    );
});

const styles = StyleSheet.create({
    menu: {
        width: 8 * 5,
        height: 8 * 4,
        borderWidth: 1,
        marginHorizontal: 8
    },
    input: {
        width: '90%',
        height: 8 * 3.5,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        alignSelf: 'center',
        marginVertical: 6,
        justifyContent: 'center',
        paddingHorizontal: 8 * 4
        // alignItems:'center'
    },
    horizalStick: {
        width: 8 * 5,
        height: 4,
        backgroundColor: '#E1E1E1',
        alignSelf: 'center',
        marginTop: 6,
        borderRadius: 8
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

export default ListSticktersBottomSheet;