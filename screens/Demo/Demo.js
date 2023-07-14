import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native'
import { useState } from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Extrapolation, interpolate, useAnimatedGestureHandler, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const Demo = memo((props) => {

    const [list, setList] = useState([])

    const scrollFlatlistX = useSharedValue(0);

    const RefScrollView = useAnimatedRef(null);

    useEffect(() => {
        setList([
            { id: '1', name: "Pizaa" },
            { id: '2', name: "Burger" },
            { id: '3', name: "Sushi" },
            { id: '4', name: "Kebab" },
            { id: '5', name: "Soup" },
            { id: '6', name: "Others" },
            { id: '7', name: "Kebab" },
            { id: '8', name: "Soup" },
            { id: '9', name: "Others" }
        ])
    }, [])




    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event, ctx) => {
            scrollFlatlistX.value = event.contentOffset.x;
        },
        onBeginDrag: (e) => {
        },
        onEndDrag: (e) => {

        },
    });

    const anim = useAnimatedStyle(() => {

        // const interpolateWidth = interpolate(scrollFlatlistX.value, [0, 800], [0, 200], { extrapolateRight: Extrapolation.CLAMP });

        return {
            transform: [
                {
                    translateY: scrollFlatlistX.value
                },
            ],
        };
    });

    return (
        <View>
            <View>
                {/* <Animated.ScrollView
                    onScroll={scrollHandler}
                    horizontal
                >
                    {
                        list?.map((item, index) => {
                            return (
                                <View style={{ width: 200, height: 200, backgroundColor: 'red' }} index={index} />

                            )
                        })
                    }
                </Animated.ScrollView> */}

                <Animated.ScrollView
                    // ref={RefScrollView}
                    scrollEventThrottle={16}
                    horizontal
                    onScroll={scrollHandler}>
                   {
                        list?.map((item, index) => {
                            return (
                                <View style={{ width: 200, height: 200, backgroundColor: 'red' }} index={index} />

                            )
                        })
                    }
                </Animated.ScrollView>

            </View>
            <Animated.View style={[{
                width: 200,
                height: 200,
                backgroundColor: 'red',
            }, anim]} />
        </View>
    );
});



export default Demo;