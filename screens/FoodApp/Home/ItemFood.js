import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { useState } from 'react';
import { _moderateScale } from '../../../Constants/Scale';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Extrapolation, interpolate, useAnimatedGestureHandler, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';


const ItemFood = memo((props) => {

    const inputRange = [
        (props?.indexItem - 1) * (_moderateScale(8 * 25) + 8 * 2),
        props?.indexItem * (_moderateScale(8 * 25) + 8 * 2),
        (props?.indexItem + 1) * (_moderateScale(8 * 25) + 8 * 2)
    ]

    const animCard = useAnimatedStyle(() => {



        // console.log({inputRange});

        const translateY = interpolate(props.scrollFlatlistX.value,
            inputRange,
            [0, -35, 0],
            { extrapolateRight: Extrapolation.CLAMP, extrapolateLeft: Extrapolation.CLAMP, })

        const opacity = interpolate(props.scrollFlatlistX.value,
            inputRange,
            [0.8, 1, 0.8],
            {})

        return {
            transform: [
                {
                    translateY: translateY
                }
            ],
            opacity: opacity
        };

    })
    console.log({ x: 'xxx' });

    return (

        <View style={{ paddingHorizontal: 8 * 1 }}>
            <Animated.View style={[{
                // marginRight: _moderateScale(8 * 4),
                width: _moderateScale(8 * 25),
                height: _moderateScale(8 * 35),
                borderRadius: _moderateScale(8 * 2),
                backgroundColor: 'rgba(255,255,255,.2)'
            }, animCard]}>
                <TouchableOpacity style={{ flex: 1 }}>
                    <Image
                        style={{
                            width: _moderateScale(8 * 15),
                            height: _moderateScale(8 * 15),
                            alignSelf: 'center',
                            marginTop: _moderateScale(8 * 2)
                        }}
                        source={{
                            uri: `https://i.ibb.co/bW5ggx9/5906078f0cbeef0acff9a645.png`
                        }} />
                    <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: _moderateScale(16)
                        }}>
                            Hamburger
                        </Text>
                        <Text style={{
                            color: 'white',
                            fontWeight: '500',
                            fontSize: _moderateScale(14),
                            marginTop: _moderateScale(8),
                            opacity: .7
                        }}>
                            A Hamburger, or simply burger is a food
                        </Text>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <View style={{ marginBottom: _moderateScale(8 * 2), flexDirection: 'row', marginTop: _moderateScale(8 * 2), paddingHorizontal: _moderateScale(8 * 2) }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: _moderateScale(16)
                                }}>
                                    $14,50
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <TouchableOpacity style={{
                                    width: _moderateScale(8 * 6),
                                    height: _moderateScale(8 * 6),
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: _moderateScale(8 * 3)
                                }}>
                                    <Image
                                        style={{
                                            width: _moderateScale(8 * 4),
                                            height: _moderateScale(8 * 4),
                                            resizeMode: 'contain',
                                            bottom: 1
                                        }}
                                        source={{ uri: `https://img.icons8.com/external-color-outline-adri-ansyah/256/external-marketing-marketing-color-outline-adri-ansyah-131.png` }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
});



export default ItemFood;