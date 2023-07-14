import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

import { Easing, Extrapolation, interpolate, JumpingTransition, runOnJS, scrollTo, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import ImageColors from 'react-native-image-colors'
import IconBackArrow from '../../../SGV/backArrow.svg'
import IconPlayBlack from '../../../SGV/play_black.svg'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Axios from 'axios'
import store from '../../../Redux/Store';
import * as ActionType from '../../../Redux/Constants/ActionType'
import { useSelector } from 'react-redux';
import IconResumeWhite from '../../../SGV/resume_white.svg'
import IconPlus from '../../../SGV/plus.svg'

const ItemMenu = memo((props) => {

    const _onClickBtn = (e, data) => {
        props?.choiceFood({ e, data })
    }

    console.log('re-render');

    return (
        <>
            <View
                // onLayout={(e) => {
                //     console.log({ ...e });
                // }}
                onLayout={({
                    nativeEvent: {
                        layout: { y }
                    },
                }) => props?.onMeasurement(y)}
                style={{ marginTop: 8 * 3, marginHorizontal: 8 }}>

                <Text style={styles.nameSection}>
                    {props?.data?.dish_type_name}
                </Text>
                <View style={{ height: 8 * 2 }} />
                {
                    props?.data?.dishes?.map((itemFood, indexFood) => {
                        return (
                            <View key={indexFood} style={styles.food}>

                                <View style={styles.food__avatar} >
                                    <Image style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 8
                                    }} source={{ uri: `${itemFood?.photos[3]?.value}` }} />
                                </View>

                                <View style={{ flex: 1, marginLeft: 8 }}>
                                    <Text style={styles.food_name}>
                                        {itemFood?.name}
                                    </Text>
                                    <Text style={styles.food_description}>
                                        {itemFood?.description}
                                    </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.food_price}>
                                            {itemFood?.price?.text}
                                        </Text>
                                        <View style={{ flex: 1 }} />
                                        <TouchableOpacity
                                            hitSlop={{
                                                top: 12, left: 12, right: 12, bottom: 12
                                            }}
                                            onPress={(e) => {
                                                _onClickBtn(e, itemFood)
                                            }}
                                            style={styles.food__btnAdd}>
                                            <IconPlus width={8 * 1.5} height={8 * 1.5} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flex: 1 }} />

                                    <View style={{ alignItems: 'flex-end' }}>

                                    </View>
                                </View>
                            </View>
                        )
                    })
                }

                {/* <View style={styles.food}>

                <View style={styles.food__avatar} />

                <View style={{ flex: 1 }}>
                    <Text>
                        {props?.data?.dish_type_name}
                    </Text>

                    <View style={{ flex: 1 }} />

                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            hitSlop={{
                                top:12, left:12, right:12, bottom:12
                            }}
                            onPress={(e) => {
                                _onClickBtn(e, props?.data)
                            }}
                            style={styles.food__btnAdd}>

                        </TouchableOpacity>
                    </View>
                </View>
            </View> */}
            </View>
        </>
    );
});

const styles = StyleSheet.create({
    food_price: {
        color: '#EE4D2E',
        fontSize: 15,
        fontWeight: '500',
        marginTop: 8
    },
    food_description: {
        fontSize: 13,
        color: 'grey',
        marginTop: 4
    },
    food_name: {
        fontSize: 15,
        fontWeight: '500'
    },
    nameSection: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    food__btnAdd: {
        width: 8 * 2.5,
        height: 8 * 2.5,
        borderRadius: 4,
        backgroundColor: '#3AC5C9',
        justifyContent: 'center',
        alignItems: 'center',
        right: 8
    },
    food__avatar: {
        width: 8 * 14,
        height: 8 * 14,
    },
    food: {
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        paddingVertical: 8,
        borderColor: 'rgba(150, 149, 149,.3)'
    }
})

export default ItemMenu;