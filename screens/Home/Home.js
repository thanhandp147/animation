import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import moment from 'moment';
import PopupSGPhotos from './Components/PopupSGPhotos';

const Home = memo((props) => {

    const [listPhotos, setListPhotos] = useState([])

    useEffect(() => {
        _getPhotos()

    }, [])

    const _getPhotos = () => {
        CameraRoll.getPhotos({
            first: 50,
            assetType: 'Photos',
        })
            .then(r => {
                console.log({ ...r });

                let today = moment(new Date()).date()

                let listPhotoOfTheDay = [];

                r.edges.map((item, index) => {
                    if (moment(new Date(item.node.timestamp * 1000)).date() == today) {
                        listPhotoOfTheDay.push(item)
                    }
                })

                var newDate = moment(new Date(r.edges[0].node.timestamp * 1000)).date()

                // let x = r.edges[0].node.timestamp;
                // let timestemp = new Date( x );
                // var getDate = timestemp.getDate();

                console.log({ newDate });

                setListPhotos(listPhotoOfTheDay)
            })
            .catch((err) => {
                //Error Loading Images
            });
    }


    return (
        <View style={styles.container}>
            <Text>
                Home Screen
            </Text>

            <View style={{
                position:'absolute',
                bottom:80,
                left:32
            }}>
                <PopupSGPhotos listPhotos={listPhotos}/>
            </View>
            {/* {
                listPhotos?.length > 0 ?
                    <>
                        <ScrollView>
                            {
                                listPhotos?.map((item, index) => {
                                    return (
                                        <>
                                            <Image key={index} style={{
                                                width: 200, height: 200
                                            }} source={{ uri: `${item.node.image.uri}` }} />
                                            <Text>
                                                {moment(new Date(item.node.timestamp * 1000)).date()}
                                            </Text>
                                        </>
                                    )
                                })
                            }
                        </ScrollView>
                    </>
                    :
                    <></>
            } */}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#FFC5D1"
    }
})

export default Home;