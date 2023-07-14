import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { useState } from 'react';
import { _moderateScale } from '../../../Constants/Scale';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedGestureHandler, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ItemFood from './ItemFood';


const ListFoods = memo((props) => {

    const [listCategories, setListCategories] = useState([])
    const [listFoods, setListFoods] = useState([])

    const scrollFlatlistX = useSharedValue(0);


    useEffect(() => {
        setListCategories([
            { id: '1', name: "Pizaa" },
            { id: '2', name: "Burger" },
            { id: '3', name: "Sushi" },
            { id: '4', name: "Kebab" },
            { id: '5', name: "Soup" },
            { id: '6', name: "Others" }
        ])
        setListFoods([
            { id: '1', name: "Pizaa",img:'https://static.kfcvietnam.com.vn/images/items/lg/BJ.jpg?v=gVMMM4' },
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

    const _renderCategory = ({ item, index }) => {
        return (
            <TouchableOpacity style={{
                marginRight: _moderateScale(8 * 4)
            }}>
                <Text style={{
                    fontSize: _moderateScale(16),
                    fontWeight: '500',
                    color: 'white'
                }}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }


    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event, ctx) => {
            // console.log({ ...event });
            scrollFlatlistX.value = event.contentOffset.x;
        },
        onBeginDrag: (e) => {
            // console.log({ ...e });
        },
        // onEndDrag: (e) => {
        //     isScrolling.value = false;
        // },
    });

    const _renderFood = ({ item, index }) => {

        return (
            <ItemFood data={item} indexItem={index} scrollFlatlistX={scrollFlatlistX} />
        )
    }


    return (
        <>
            <View style={{ height: _moderateScale(8 * 4) }} />
            <View >
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingLeft: _moderateScale(8 * 3) }}
                    horizontal
                    renderItem={_renderCategory}
                    data={listCategories} />
            </View>
            <View style={{ height: _moderateScale(8 * 4) }} />
            <View style={{ height: _moderateScale(8 * 35) + 35 }}>
                <Animated.FlatList
                    scrollEventThrottle={16}
                    onScroll={scrollHandler}
                    style={{ height: _moderateScale(8 * 35) + 35 }}
                    contentContainerStyle={{ alignItems: 'flex-end', paddingHorizontal:_moderateScale(8*2)}}
                    bounces={true}
                    // snapToInterval={_moderateScale(8 * 25)}
                    showsHorizontalScrollIndicator={false}
                    // style={{ paddingLeft: _moderateScale(8 * 3) }}
                    horizontal
                    renderItem={_renderFood}
                    decelerationRate={0}
                    data={listFoods} />
            </View>



        </>
    );
});



export default ListFoods;