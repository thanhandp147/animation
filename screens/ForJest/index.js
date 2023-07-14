import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View,Text,StyleSheet } from 'react-native';

const index = memo((props) => {
    return (
       <View style ={styles.container}>
        <Text style={styles.title}>
            For Jest
        </Text>
       </View>
    );
});

const styles= StyleSheet.create({
    title:{
        fontSize:20
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default index;