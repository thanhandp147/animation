import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View, Text, StyleSheet, Dimensions, Image, Animated, TouchableOpacity } from 'react-native';

import { Easing, Extrapolation, interpolate, JumpingTransition, runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { } from 'react-native-gesture-handler';
// import Animated from 'react-native-reanimated';


const _width = Dimensions.get('window').width;
const _height = Dimensions.get('window').height;

const ListNoti = memo((props) => {

    const scrollY = useRef(new Animated.Value(0)).current;

    const positionFlatlist = useRef(new Animated.Value(800)).current
    const opacityFlatlist = useRef(new Animated.Value(0)).current

    useEffect(() => {
        setTimeout(() => {
            Animated.timing(positionFlatlist, {
                toValue: 0,
                duration: 300,
                easing: Easing.out(Easing.exp)

            }).start(() => {
            });
            Animated.timing(opacityFlatlist, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.exp)

            }).start(() => {
            });
        }, 100);

    }, [])

    const [data, setData] = useState([
        {
            id: 'bd7acbea-c1b1-46c2-aed5-1',
            title: 'Spotify',
            link: `https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/1200px-Spotify_App_Logo.svg.png`
        },
        {
            id: '1-c605-48d3-a4f8-2',
            title: 'Youtube',
            link: `https://iconarchive.com/download/i54079/danleech/simple/youtube.ico`
        },
        {
            id: '2-3da1-471f-bd96-3',
            title: 'Facebook',
            link: `https://cdn-icons-png.flaticon.com/512/124/124010.png`
        },
        {
            id: '3-c605-48d3-a4f8-4',
            title: 'Instagram',
            link: `https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1025px-Instagram-Icon.png`
        },
        {
            id: '4-3da1-471f-bd96-5',
            title: 'Shopee',
            link: `https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-shopee-inkythuatso-2-01-24-14-52-10.jpg`
        },
        {
            id: '5-c605-48d3-awd-6',
            title: 'ReactNative',
            link: `https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png`
        },
        {
            id: '6-c605-awd-a4f8-6',
            title: 'ReactNative',
            link: `https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png`
        },
        {
            id: '7-awd-48d3-a4f8-6',
            title: 'ReactNative',
            link: `https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png`
        },
        {
            id: '8-c605-48d3-a4f8-6',
            title: 'ReactNative',
            link: `https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png`
        },
        {
            id: '9-c605-234-a4f8-6',
            title: 'ReactNative',
            link: `https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png`
        },
        {
            id: '10-c605-awd-a4f8-6',
            title: 'ReactNative',
            link: `https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png`
        },
        {
            id: '11-c605-faef-a4f8-6',
            title: 'ReactNative',
            link: `https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png`
        },
        {
            id: '12-c605-48d3-a4f8-6',
            title: 'ReactNative',
            link: `https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png`
        },
        {
            id: '13-awd-48d3-a4f8-6',
            title: 'ReactNative',
            link: `https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png`
        },
        {
            id: '14-wer-48d3-a4f8-6',
            title: 'ReactNative',
            link: `https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png`
        },
        {
            id: '15-qwe-48d3-a4f8-6',
            title: 'ReactNative',
            link: `https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png`
        },
        {
            id: '16-hdr-48d3-a4f8-6',
            title: 'ReactNative',
            link: `https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png`
        },


    ])

    const _renderItem = ({ item, index }) => {

        const inputRange = [
            -1,
            0,
            (65 + 8) * index,
            (65 + 8) * (index + 2),
        ]
        const opacityInputRange = [
            -1,
            0,
            (65 + 8) * index,
            (65 + 8) * (index + .5),
        ]

        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
            extrapolate: "clamp",
        })
        const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
            extrapolate: "clamp",
        })

        return (
            <Animated.View
                style={[styles.itemNoti,
                {
                    opacity
                },
                {
                    transform: [
                        {
                            scale: scale
                        }
                    ],
                }, shadow]}>
                <TouchableOpacity
                    onPress={() => {
                        Animated.timing(positionFlatlist, {
                            toValue: 800,
                            duration: 500,
                            easing: Easing.cubic
                        }).start(() => {
                            props?.hide()
                            props?.click()

                        });
                    }}
                    style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingHorizontal: 16 }}>
                        <Image style={styles.itemNoti__icon} source={{ uri: item?.link }} />
                        <View style={{ marginLeft: 8 }}>
                            <Text style={styles.itemNoti__title}>{item?.title}</Text>
                            <Text>
                                Notifications
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </Animated.View>
        )

    }



    return (
        <Animated.View style={[
            { top: positionFlatlist, position: 'absolute', alignSelf: 'center', height: '100%' },
            {
                opacity: opacityFlatlist
            }
        ]}>
            <Animated.FlatList
                // ref={}
                pagingEnabled
                decelerationRate={0} snapToInterval={65 + 8}
                snapToAlignment={"center"}
                onScrollEndDrag={(e) => {
                    if (e.nativeEvent?.contentOffset?.y < -100) {
                        Animated.timing(positionFlatlist, {
                            toValue: 800,
                            duration: 500,
                            easing: Easing.cubic
                        }).start(() => {
                            props?.hide()
                        });
                        // 
                    }
                }}
                ListFooterComponent={<View style={{ height: 200 }} />}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true },
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center', marginTop: 100 }}
                data={data}
                renderItem={_renderItem}
                keyExtractor={item => item.id}
            />
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    itemNoti__icon: {
        width: 32 + 8,
        height: 32 + 8,
        borderRadius: 8,
    },
    itemNoti: {
        width: _width - 16,
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


export default ListNoti;