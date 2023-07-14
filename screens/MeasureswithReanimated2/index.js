import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { _heightScale, _moderateScale } from '../../Constants/Scale';
import Item from './ListItem';
import ListItem from './ListItem';
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';

const index = memo((props) => {

    const [list, setList] = useState([]);

    const expandedReducer = useSelector(state => state?.demoReducer?.expanded)

    const listHeight = useSharedValue(0);
    const scrollY = useSharedValue(0)

    const progress = useDerivedValue(() =>
        expandedReducer ? withSpring(1, { duration: 1000 }) : withTiming(0)
        // open ? 1 : 0
    );

    useEffect(() => {
        setList([
            {
                id: '1',
                list: [
                    {
                        id: '1',
                        title: 'Lorem Ipsum has been'
                    },
                    {
                        id: '2',
                        title: 'Lorem Ipsum has been'
                    },
                    {
                        id: '3',
                        title: 'Lorem Ipsum has been'
                    },
                    {
                        id: '4',
                        title: 'Lorem Ipsum has been'
                    },
                    {
                        id: '5',
                        title: 'Lorem Ipsum has been'
                    },
                    {
                        id: '6',
                        title: 'Lorem Ipsum has been'
                    },
                    {
                        id: '7',
                        title: 'Lorem Ipsum has bee Lasted'
                    }
                ]
            },
            // {
            //     id: '2',
            //     list: [
            //         {
            //             id: '1',
            //             title: 'Lorem Ipsum has been'
            //         },
            //         {
            //             id: '2',
            //             title: 'Lorem Ipsum has been'
            //         },
            //         {
            //             id: '3',
            //             title: 'Lorem Ipsum has been'
            //         }
            //     ]
            // },
        ])
    }, [])

    const animBlankView = useAnimatedStyle(() => {
        return {
            height: listHeight.value* progress.value + 0.1
        }
    })

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event, ctx) => {
            console.log({ ...event });
            scrollY.value = event.contentOffset.y;
        },
        onBeginDrag: (e) => {
        },
        // onEndDrag: (e) => {
        //     isScrolling.value = false;
        // },
    });

    return (
        <View style={styles.container}>
            <View style={{ height: getStatusBarHeight() + _heightScale(8 * 3) }} />
            <Text style={styles.title}>
                Markets
            </Text>
            <View style={{ position: 'absolute', width: '100%', top: getStatusBarHeight(), zIndex: 1 }}>
                {
                    list?.map((item, index) => {
                        return (
                            <ListItem scrollY={scrollY} listHeight={listHeight} index={index} data={item} />
                        )
                    })
                }
            </View>

            <Animated.ScrollView 
            scrollEventThrottle={16}
            onScroll={scrollHandler}>
                <Animated.View style={animBlankView} />


                {
                    [1, 2, 3, 4, 5, 6, 6, 78,].map((item, index) => {
                        return (
                            <View style={{ height: 200 }}>
                                <Text>
                                    alo {item}
                                </Text>
                            </View>
                        )
                    })
                }
            </Animated.ScrollView>

        </View>
    );
});

const styles = StyleSheet.create({
    title: {
        fontSize: _moderateScale(18),
        fontWeight: 'bold',
        margin: _moderateScale(8 * 2)
    },
    container: {
        flex: 1,
        backgroundColor: '#F3F2F7'
    }
})

export default index;