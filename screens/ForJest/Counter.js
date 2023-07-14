import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const Counter = memo((props) => {

    const [count, setCount] = useState(0)

    const _handleIncrement = () => {
        setCount(count + 1);
    }
    const _handleDecrement = () => {
        setCount(count - 1);
    }

    return (
        <View style={{
            flex:1, 
            justifyContent:'center',
            alignItems:'center'
        }}>
            <Text flag={"resultCount"} >{count}</Text>
            <TouchableOpacity flag={"increment"} onPress={_handleIncrement}>
                <Text>
                    Increment
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={_handleDecrement}>
                <Text>
                    Decrement
                </Text>
            </TouchableOpacity>
        </View>
    );
});



export default Counter;