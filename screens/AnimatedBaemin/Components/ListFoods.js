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
import ItemFood from './ItemFood';
import AnimatedFoodMoveToCart from './AnimatedFoodMoveToCart';
import ItemMenu from './ItemMenu';
import { DATA_FOODS_SAMPLE } from '../../../Constants/DataSample';
import Banner from './Banner';
import StickyHeader from './StickyHeader';


const ListFoods = memo((props) => {
    // const RefFlatlist = useRef(null);
    // const scrollY = useSharedValue(0);

    const RefScrollView = useAnimatedRef(null);
    const scrollY = useSharedValue(0);

    const [listFoods, setListFoods] = useState([])


    const [showAnimatedMoveCart, setShowAnimatedMoveCart] = useState({
        show: false,
        pageY: null,
        pageX: null
    })

    const [listAnim, setListAnim] = useState([])
    const [tabs, setTabs] = useState([]);


    useEffect(() => {
        getFoods()
    }, [])

    const getFoods = async () => {
        console.log(DATA_FOODS_SAMPLE);
        setListFoods(DATA_FOODS_SAMPLE?.reply?.menu_infos)
    }


    const _handleChoiceFood = (data) => {

        let sample = {
            show: true,
            pageX: data?.e?.nativeEvent?.pageX,
            pageY: data?.e?.nativeEvent?.pageY,
            data: data?.data
        }

        let listAnimTemp = [...listAnim];
        listAnimTemp.push(sample)

        setListAnim(listAnimTemp)

        // setShowAnimatedMoveCart({
        //     show: true,
        //     pageX: data?.e?.nativeEvent?.pageX,
        //     pageY: data?.e?.nativeEvent?.pageY,
        //     data: data?.data
        // })
    }

    // const _renderItem = ({ item, index }) => {
    //     return <ItemMenu
    //         choiceFood={_handleChoiceFood}
    //         data={item} />
    // }

    console.log({ tabs });

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event, ctx) => {
            console.log({ ...event });
            scrollY.value = event.contentOffset.y;
        },
        onBeginDrag: (e) => {
            console.log({ ...e });
        },
        // onEndDrag: (e) => {
        //     isScrolling.value = false;
        // },
    });

    return (
        <>
            {/* <FlatList
                // ref={RefFlatlist}
                // onScroll={e => {
                //     // scrollY.value = e.nativeEvent.contentOffset.y;
                // }}
                data={listFoods}
                renderItem={_renderItem}
                keyExtractor={item => item.dish_type_id}
            /> */}

            <StickyHeader tabs={tabs} />

            <Animated.ScrollView
                ref={RefScrollView}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Banner scrollY={scrollY} />

                <View style={{ backgroundColor: 'white' }}>
                    {
                        listFoods?.map((itemFood, indexFood) => {
                            return (
                                <ItemMenu
                                    onMeasurement={(y) => {

                                        console.log({ y, indexFood });
                                        tabs[indexFood] = {
                                            ...itemFood,
                                            y
                                        };
                                        setTabs([...tabs]);
                                    }}
                                    key={indexFood}
                                    choiceFood={_handleChoiceFood}
                                    data={itemFood} />
                            )
                        })
                    }
                </View>
            </Animated.ScrollView>
            {
                listAnim?.length > 0 ?
                    <>
                        {
                            listAnim?.map((itemAnim, indexAnim) => {
                                return (
                                    <AnimatedFoodMoveToCart key={indexAnim} data={itemAnim} />
                                )
                            })
                        }
                    </>
                    :
                    <></>
            }
            {/* {
                showAnimatedMoveCart?.show ?
                    <AnimatedFoodMoveToCart data={showAnimatedMoveCart} />
                    : <></>
            } */}
        </>
    );
});



export default ListFoods;