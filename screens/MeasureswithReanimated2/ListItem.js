import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { _heightScale, _moderateScale } from '../../Constants/Scale';
import ListChild from './ListChild';
import { measure, runOnUI, useAnimatedRef, useDerivedValue, useSharedValue } from 'react-native-reanimated';


const ListItem = memo((props) => {

    const [open, setOpen] = useState(false);
    const aRef = useAnimatedRef()

    const originHeight = useSharedValue(0);


    // const style = {
    //     height : open ? ITEM_HEIGHT * props?.data?.list
    // }

    const _abc = () => {
        console.log({ x: measure(aRef).height });
    }

    // useDerivedValue(() => {
    //     const measured = measure(aRef);
    //     if (measured !== null) {
    //       const { x, y, width, height, pageX, pageY } = measured;
    //       console.log({ x, y, width, height, pageX, pageY });
    //     } else {
    //       console.warn('measure: could not measure view');
    //     }
    //   });

    return (
        <View style={styles.main}>
           
            <View >
                {/* <View style={{height:100}}/> */}
                <ListChild scrollY={props.scrollY} listHeight={props?.listHeight} originHeight={originHeight} open={open} data={props?.data?.list} />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({

    main__tile: {
        padding: _moderateScale(8 * 2),
    },
    main: {
        marginHorizontal: _moderateScale(8 * 2),
        backgroundColor: 'white',
        marginBottom: _moderateScale(8 * 2)

    }
})

export default ListItem;