import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native'
import { useState } from 'react';
import { _moderateScale } from '../../../Constants/Scale';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Extrapolation, interpolate, useAnimatedGestureHandler, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ItemFood from './ItemFood';

const HEIGHT_DEVICE = Dimensions.get('window').height;

const Test = memo((props) => {

    const [list, setList] = useState([])

    const [heightHeader, setHeightHeader] = useState(0)

    const scrollFlatlistX = useSharedValue(0);

    const abcHeight = useRef(0)

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



    const anim = useAnimatedStyle(() => {

        // const interpolateHeight = interpolate(
        //     props.mainScrollY.value,
        //     [0, 500],
        //     [ 500, 500 - HEIGHT_DEVICE],
        //     { extrapolateRight: Extrapolation.CLAMP, extrapolateLeft: Extrapolation.CLAMP });

        return {
            height: 500 - props.mainScrollY.value
        };
    });


    return (
        <>
            <View>
                <Animated.View style={[{backgroundColor:'grey'}, anim]}>
                    <Text>First</Text>
                    <Text>awdawd</Text>
                    <Text>awdawd</Text>
                    <Text>awdawd</Text>
                    <Text>awdawd</Text>
                    <Text>awdawd</Text>
                    <Text>awdawd</Text>
                    <Text>awdawd</Text>
                    <Text>awdawd</Text>
                    <Text>awdawd</Text>
                    <Text>awdawd</Text>
                    <Text>awdawd</Text>
                    <Text>awdawd</Text>

                </Animated.View>
            </View>
        </>
    );
});



export default Test;