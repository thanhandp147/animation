import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, ScrollView, View } from 'react-native';
import Header from './Header';
import SearchingAndFilter from './SearchingAndFilter';
import ListFoods from './ListFoods';
import { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Test from './Test';


const Home = memo((props) => {

    const mainScrollY = useSharedValue(0);
    const [heightHeader, setHeightHeader] = useState(null)

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event, ctx) => {
            mainScrollY.value = event.contentOffset.y;
        },
        onBeginDrag: (e) => {
        },
        // onEndDrag: (e) => {
        //     isScrolling.value = false;
        // },
    });

    const animHeightHeader = useAnimatedStyle(() => {
        const interpolateHeight = interpolate(
            mainScrollY.value,
            [0, 400],
            [heightHeader, 0],
            { extrapolateRight: Extrapolation.CLAMP, extrapolateLeft: Extrapolation.CLAMP, }
        )
        return {
            height: interpolateHeight
        }
    })

    const measureContainerView = useCallback(
        ({
            nativeEvent: {
                layout: { width, height },
            },
        }) => {
            alert(height)
            setHeightHeader(height)
        }, []);

    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={require('../../../Image/bgFoodApp.png')}>


            <LinearGradient
                style={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    position: 'absolute',
                    zIndex: 100
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['rgba(255,255,255,0.2)', "rgba(0,0,0,0.2)", "rgba(0,0,0,0.3)"]}
            >

                {/* <View style={{
                flex:1,
                backgroundColor:'rgba(0,0,0,.2)'
            }}> */}
                <View 
                style={{position:'absolute'}}
                onLayout={(e) => {
                    // console.log({ x: e.nativeEvent });
                    // setHeightHeader(e.nativeEvent.layout.height)
                }}>
                    <Test  mainScrollY={mainScrollY}/>

                        {/* <Animated.View
                            // onLayout={measureContainerView}
                            style={[{ position: 'absolute', borderWidth: 0.5 }]}> */}

                            {/* <Header />
                            <SearchingAndFilter /> */}
                        {/* </Animated.View> */}
                </View>

                <Animated.ScrollView
                    scrollEventThrottle={16}
                    onScroll={scrollHandler}
                >
                    <View style={{ height: 500 }} />
                    <ListFoods />

                    <View style={{ height: 800 }} />

                </Animated.ScrollView>
                {/* </View> */}
            </LinearGradient>




        </ImageBackground>
    );
});



export default Home;