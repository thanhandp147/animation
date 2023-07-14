import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { _moderateScale } from '../../../Constants/Scale';
import IconSearch from '../../../SGV/find_grey.svg'

const SearchingAndFilter = memo((props) => {
    return (
        <>
            <View style={{
                flexDirection: 'row',
                paddingHorizontal:_moderateScale(8*3),
                marginTop:_moderateScale(8*4)
            }}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={[styles.searchInput,shadow]}>
                        <IconSearch width={_moderateScale(8*2.5)} height={_moderateScale(8*2.5)}/>
                        <Text style={styles.searchInput__text}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{width:_moderateScale(8*2)}}/>

                <TouchableOpacity style={styles.btnFilter}>
                    <Image style={styles.iconFilter} source={require('../../../Image/slider.png')} />
                </TouchableOpacity>

            </View>
        </>
    );
});

const styles = StyleSheet.create({
    searchInput__text:{
        fontSize:_moderateScale(16),
        fontWeight:'500',
        color:'grey',
        marginLeft:_moderateScale(8)
    },
    searchInput: {
        alignItems:'center',
        paddingHorizontal:_moderateScale(8*2),
        width: '100%',
        height: _moderateScale(8 * 6),
        backgroundColor: 'white',
        borderRadius:_moderateScale(8*1.5),
        flexDirection:'row'
    },
    iconFilter: {
        width: _moderateScale(8 * 3),
        height: _moderateScale(8 * 3),
    },
    btnFilter: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        borderRadius: _moderateScale(8 * 1.5),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,

    elevation: 3
}


export default SearchingAndFilter;