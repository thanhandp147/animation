import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Animated, { measure, runOnUI, useAnimatedRef, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';

const SenderMsg = memo((props) => {

    const [targetY, setTargetY] = useState(null);


    const countTargetY = useRef(0);
    const ref = useRef();

    const animatedMsg = useAnimatedStyle(() => {
        // console.log({x: props?.scrollFlatlistY});
        return{}
    })

    return (
        <Animated.View
            style={[{
                marginVertical: 1,
                alignItems: 'flex-end',
                marginRight: 8
            },
            props?.separator && { marginBottom: 8 }
            ]}>
            <View
                style={[styles.message,
                props?.startLine && { borderBottomRightRadius: 4 },
                props?.endLine && { borderTopRightRadius: 4 },
                props?.centerLine && { borderBottomRightRadius: 4, borderTopRightRadius: 4 },
                ]}>
                <Text style={{ fontSize: 15, color: 'white' }}>
                    {props?.data?.content}
                </Text>
            </View>
        </Animated.View>
    );
});


const styles = StyleSheet.create({
    message: {
        maxWidth: 8 * 30,
        borderRadius: 16,
        backgroundColor: '#2A87FF',
        paddingHorizontal: 8,
        paddingVertical: 8,
    }
})


export default SenderMsg;