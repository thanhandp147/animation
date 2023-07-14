import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const ItemDemo = memo((props) => {
    return (
        <View 
        onLayout={e => {
            console.log({ ...e , xxx: props?.x});
            // countTargetY.current = e?.nativeEvent?.target
            // setTargetY(e?.nativeEvent?.target)
        }}
        style={{height:100,borderWidth:1,width:200}}>
            
        </View>
    );
});



export default ItemDemo;