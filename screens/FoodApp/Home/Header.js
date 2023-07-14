import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import IconOption from '../../../SGV/option.svg'
import { _moderateScale } from '../../../Constants/Scale';
import { Image } from 'react-native';

const Header = memo((props) => {
    return (
        <>
            <View style={{ marginTop: _moderateScale(8 * 8), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: _moderateScale(8 * 2) }}>

                <View style={[styles.btnOption, shadow]}>
                    <View style={styles.horizonLine} />
                    <View style={[styles.horizonLine, { marginTop: _moderateScale(8) }]} />
                </View>

                <View style={[styles.btnAvatar, shadow]}>
                    <Image
                        style={{ flex: 1, borderRadius: _moderateScale(8 * 2) }}
                        source={{
                            uri: `https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-1/336019373_1497712387423859_7654331944401702995_n.jpg?stp=dst-jpg_p240x240&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=I6LMCEpRrxsAX-x2Nxn&_nc_ht=scontent.fhan2-4.fna&oh=00_AfAC_XAmzR-i5qxZTstUQu75ZHueaGsJOHcBgvLqBZUOyQ&oe=64308DDF`
                        }} />
                </View>



            </View>

            <View style={{
                marginTop:_moderateScale(8*4),
                paddingHorizontal:_moderateScale(8*3)
            }}>
                <Text style={{
                    fontSize:_moderateScale(40),
                    fontWeight:'400',
                }}>
                    Fast and {'\n'}<Text style={{
                        fontWeight:'bold'
                    }}>Delicious</Text> Food
                </Text>
            </View>
        </>
    );
});

const styles = StyleSheet.create({
    btnAvatar: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        borderRadius: _moderateScale(8 * 2)
    },
    horizonLine: {
        width: _moderateScale(8 * 3),
        height: _moderateScale(2),
        backgroundColor: "black"
    },
    btnOption: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        borderRadius: _moderateScale(8 * 2)
    }
})

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3
}

export default Header;