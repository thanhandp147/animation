import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Lottie from 'lottie-react-native';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';

const SplashScreen = memo((props) => {


    const readTag = async () => {
        try {
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getNdefMessage();
            console.log(tag)

            // const rtdName = rtdValueToName(tag.ndefMessage[0].type);
            const x = Ndef.uri.decodePayload(tag.ndefMessage[0].payload)
            // props?.navigation.navigate("HomeScreen")
            props?.setIsSignedIn(true)

        } catch (ex) {
            console.warn('Oops!', ex);
        } finally {
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#FFA5B6',

        }}>
            <Lottie
                speed={1}
                autoPlay={true}
                loop={false}
                // style={{
                //     width:200,
                //     height:200
                // }}
                resizeMode="cover"
                // ref={animationLoadRef}
                source={require('../../Json/splash.json')}
            />

            <View style={[{
                position: 'absolute',
                bottom: 200,
                alignSelf: 'center'
            },]}>
                <TouchableOpacity
                    onPress={() => {
                        readTag()
                    }}
                    style={[{
                        width: 200,
                        height: 50,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8
                    }, shadow]}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "500"
                    }}>
                        GET STARTED !
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
});


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    elevation: 3
}

export default SplashScreen;