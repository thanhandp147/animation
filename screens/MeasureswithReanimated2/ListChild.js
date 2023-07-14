import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { _heightScale, _moderateScale } from '../../Constants/Scale';
import Animated, { measure, runOnUI, useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import * as ActionType from '../../Redux/Constants/ActionType'
import { useSelector } from 'react-redux';
import store from '../../Redux/Store';

const ITEM_HEIGHT = _moderateScale(8 * 8)

const ListChild = memo((props) => {

    const expandedReducer = useSelector(state => state?.demoReducer?.expanded)

    const aRef = useAnimatedRef()
    // const listHeight = useSharedValue(0);
    const [open, setOpen] = useState(false);

    const progress = useDerivedValue(() =>
        expandedReducer ? withSpring(1, { duration: 1000 }) : withTiming(0)
        // open ? 1 : 0
    );


    // const style = {
    //     height: props?.open ? ITEM_HEIGHT * props?.data?.length : 0
    // }

    // useDerivedValue(() => {
    //     const measured = measure(aRef);
    //     if (measured !== null) {
    //       const { x, y, width, height, pageX, pageY } = measured;
    //       console.log({ x, y, width, height, pageX, pageY });
    //       flagValue.value = height;
    //     } else {
    //       console.warn('measure: could not measure view');
    //     }
    //   });

    useEffect(() => {



        // if (props?.open) {
        //     if (listHeight.value === 0) {
        //         // runOnUI(() => {
        //         //     "worklet";
        //         //     listHeight.value = measure(aRef).height;
        //         // })();
        //         listHeight.value = measure(aRef).height;

        //     }
        //     // listHeight.value = withTiming(flagValue.value, { duration: 400 })
        // } else {
        //     // listHeight.value = withTiming(1, { duration: 200 })
        // }
    }, [props?.open])

    const animExpand = useAnimatedStyle(() => ({

        // listHeight.value = props.open ? withTiming(ITEM_HEIGHT * props.data.length, { duration: 500 }) : withTiming(0, { duration: 500 })
        height: props.listHeight.value * progress.value + 0.1
    }))
    const animExpand2 = useAnimatedStyle(() => { 
        if (props.scrollY.value > props.listHeight.value) {
            return { 
                height: 0
            }
        } else {
            return { height: props.listHeight.value - props.scrollY.value }
        }
    })



    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    if (props.listHeight.value === 0) {
                        runOnUI(() => {
                            "worklet";
                            props.listHeight.value = measure(aRef).height;
                        })();
                    }
                    // setOpen(!open)
                    store.dispatch({
                        type: ActionType.EXPANDED,
                        payload: {
                            flag: !expandedReducer
                        }
                    })

                }}
                style={styles.main__tile}>
                <Text>
                    Total Points
                </Text>
            </TouchableOpacity>
            <Animated.View style={[, { overflow: 'hidden' },  animExpand,]}>
                <View ref={aRef}>
                    {
                        props?.data?.map((item, index) => {
                            return (
                                <View key={index} style={styles.main__titleChild}>
                                    <Text>
                                        {item?.title}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>

            </Animated.View>
        </View>
    );
});

const styles = StyleSheet.create({
    main__titleChild: {
        padding: _moderateScale(8 * 2),
        height: ITEM_HEIGHT,
        borderWidth: 0.5
    },
    main__tile: {
        padding: _moderateScale(8 * 2),
    },
    main: {
        marginHorizontal: _moderateScale(8 * 2),
        backgroundColor: 'white',
        marginBottom: _moderateScale(8 * 2)

    }
})

export default ListChild;