import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import EachImage from './EachImage';


const PopupSGPhotos = memo((props) => {

    const scrollRef = useRef();

    const [isExpand, setIsExpand] = useState(false)

    const translateXImage = useSharedValue(0);
    const scaleImage = useSharedValue(0.9);

    useEffect(() => {
        if (isExpand) {
            translateXImage.value = withTiming(100, {
                duration: 300
            })
            scaleImage.value = withTiming(1, {
                duration: 300
            })
        } else {

            scrollRef.current?.scrollTo({
                x: 0,
                animated: true,
            });

            translateXImage.value = withTiming(0, {
                duration: 300
            })
            scaleImage.value = withTiming(0.9, {
                duration: 300
            })
        }
    }, [isExpand])


    const animTranslateXImage = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateXImage.value },
                { scale: scaleImage.value }
            ],
        };
    })


    return (
        <View>
            <TouchableOpacity onPress={() => {
                setIsExpand(!isExpand)
            }}>
                <Text>
                    expand
                </Text>
            </TouchableOpacity>
            {/* <View style={{
                borderWidth: 1,
                width: 200,
                height: 160,
                justifyContent: 'center'
            }}>
                <View style={[{ position: 'absolute', zIndex: 0, right: 0 }, shadow]}>
                    <Image style={[styles.photo_main]} source={{ uri: props?.listPhotos[0]?.node.image.uri }} />
                </View>

                <Animated.View style={[{ position: 'absolute', zIndex: -1, right: 16 }, shadow, animTranslateXImage]}>
                    <Image style={[styles.photo_main]} source={{ uri: props?.listPhotos[1]?.node.image.uri }} />
                </Animated.View>

                <View style={[{ position: 'absolute', zIndex: -2, right: 32 }, shadow]}>
                    <Image style={[styles.photo_main, { height: 120 }]} source={{ uri: props?.listPhotos[2]?.node.image.uri }} />
                </View>
            </View> */}

            <View style={{ height: 160 }}>
                <ScrollView scrollEnabled={isExpand ? true : false} ref={scrollRef} contentContainerStyle={{ width: 120 * props?.listPhotos.length }} horizontal>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            props?.listPhotos?.map((item, index) => {

                                return (
                                    <>
                                        <EachImage scaleImage={scaleImage} translateXImage={translateXImage} index={index} data={item} />
                                    </>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    photo_main: {
        width: 100,
        height: 160,
        borderRadius: 16,
        borderWidth: 5,
        borderColor: 'white',
    },
    photo: {


    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 3
}

export default PopupSGPhotos;