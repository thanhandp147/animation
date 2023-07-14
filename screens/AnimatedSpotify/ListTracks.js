import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

import { Easing, Extrapolation, interpolate, JumpingTransition, runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Axios from 'axios'
import store from '../../Redux/Store';
import * as ActionType from '../../Redux/Constants/ActionType'

const token = "BQDmyppr9XuK_lzDD3N29ToqffUCS7a-PWALwGEnLVW8k3fKlQMcLKObf7zlrZ7GnQ15sUqlU75RW8374mGWNUuF-BbrNoh7BKkESK5SM917y3DRpgoe7GF89kr-dmg2OKHHbc0fiWh_v-oIX2edTMVS9I0y5lOtYcCcdi_Y-sOlq_8FtpAiHj_heLrxlW_JqLoBVzHJjgOzjg214WJqBdo26MadGIatQVGYVmfw2hH9wohQvaJEwuPxJxZM-XgxK1dHez2z9ttfTxjz6oOyQH5O8cMfmdaTtUgpDt38nFIPrjBJ8XpncROi7KyvZKopc-TU9GXXUcCQ5UpOSxrYz3Lskg"


const ListTracks = memo((props) => {

    const [listTracks, setListTracks] = useState([])

    useEffect(() => {
        _getTracks()
    }, [])

    const _getTracks = async () => {
        let resultGetTracks = await Axios.get(`https://api.spotify.com/v1/playlists/37i9dQZF1DWT2oR9BciC32?fields=collaborative%2Cdescription%2Cfollowers%28total%29%2Cimages%2Cname%2Cowner%28display_name%2Cid%2Cimages%2Curi%29%2Cpublic%2Ctracks%2Curi&additional_types=track%2Cepisode&offset=0&limit=25&market=VN`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        console.log(resultGetTracks);
        setListTracks(resultGetTracks?.data?.tracks?.items)
        store.dispatch({
            type: ActionType.SET_NEW_PLAY_TRACK,
            payload: {
                data: resultGetTracks?.data?.tracks?.items[0]
            }
        })
    }

    const _handlePlayTrack = data => {
        store.dispatch({
            type: ActionType.SET_NEW_PLAY_TRACK,
            payload: {
                data: { ...data, status: "ready" }
            }
        })
    }

    return (
        <View style={{ paddingHorizontal: 8 * 2 }}>
            {
                listTracks?.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => _handlePlayTrack(item)}
                            activeOpacity={.8}
                            key={item?.track?.id} style={styles.itemTrack}>
                            <Image
                                style={styles.itemTrack__imagePreview}
                                source={{
                                    uri: `${item?.track?.album?.images[0]?.url}`
                                }} />
                            <View style={styles.itemTrack__nameSong}>
                                <Text style={styles.itemTrack__nameSong__name}>
                                    {item?.track?.name}
                                </Text>
                                <Text style={styles.itemTrack__nameSong__artist}>
                                    {item?.track?.artists[0]?.name}
                                </Text>
                            </View>
                            <View style={styles.dots}>
                                <View style={styles.dots__dot} />
                                <View style={styles.dots__dot} />
                                <View style={styles.dots__dot} />
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
            <View style={{ height: 100 }} />
        </View>
    );
});

const styles = StyleSheet.create({
    dots: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dots__dot: {
        width: 2,
        height: 2,
        borderRadius: 1,
        backgroundColor: 'white',
        marginLeft: 4,
        opacity: 0.8
    },
    itemTrack__nameSong__artist: {
        fontSize: 13,
        color: '#fff',
        marginTop: 4,
        fontWeight: '200'
    },
    itemTrack__nameSong__name: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500'
    },
    itemTrack__nameSong: {
        marginLeft: 8,
        flex: 1
    },
    itemTrack: {
        flexDirection: 'row',
        marginTop: 8 * 2,
        alignItems: 'center'
    },

    itemTrack__imagePreview: {
        width: 8 * 6,
        height: 8 * 6,
        borderRadius: 4
    },
    container: {
        borderWidth: 1
    }
})

export default ListTracks;