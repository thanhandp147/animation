import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import Home from './Home';

const FoodApp = memo((props) => {
    return (
        <View style={styles.container}>
            <Home/>

        </View>
    );
});

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    }
})

export default FoodApp;