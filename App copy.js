/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';

import { Provider } from "react-redux";
import store from './Redux/Store';
import ForJest from './screens/ForJest';
import Counter from './screens/ForJest/Counter';
import ListItems from './screens/ForJest/ListItems'
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import DeepLinking from 'react-native-deep-linking';

NfcManager.start();

const TNF_MAP = {
  EMPTY: 0x0,
  WELL_KNOWN: 0x01,
  MIME_MEDIA: 0x02,
  ABSOLUTE_URI: 0x03,
  EXTERNAL_TYPE: 0x04,
  UNKNOWN: 0x05,
  UNCHANGED: 0x06,
  RESERVED: 0x07,
};

const RTD_MAP = {
  TEXT: 'T', // [0x54]
  URI: 'U', // [0x55]
  SMART_POSTER: 'Sp', // [0x53, 0x70]
  ALTERNATIVE_CARRIER: 'ac', //[0x61, 0x63]
  HANDOVER_CARRIER: 'Hc', // [0x48, 0x63]
  HANDOVER_REQUEST: 'Hr', // [0x48, 0x72]
  HANDOVER_SELECT: 'Hs', // [0x48, 0x73]
};


const handleParamsLink = async (url) => {
  var regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    match;

  while (match = regex.exec(url)) {
    params[match[1]] = match[2];
  }
  console.log({ params });
}

function tnfValueToName(value) {
  for (let name in TNF_MAP) {
    if (value === TNF_MAP[name]) {
      return name;
    }
  }
  return null;
}

function rtdValueToName(value) {
  value = value.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
  for (let name in RTD_MAP) {
    if (value === RTD_MAP[name]) {
      return name;
    }
  }
  return null;
}

const App = () => {

  const [changeState, setChangeState] = useState(false)

  useEffect(() => {

    Linking.addEventListener('url', _handleUrl)

    const getUrl = async () => {
      const initialURL = await Linking.getInitialURL();
      alert(initialURL)
    }
    getUrl()
  }, []);

  const _handleUrl = (url) => {
    if(url){
      alert(url.url)
    }
  }

  // const getUrl = async () => {
  //   const universalLink = await Linking.getInitialURL();
  //   //handle universal link
  //   alert(universalLink)
  // };


  const readTag = async () => {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getNdefMessage();
      console.log(tag)

      // const rtdName = rtdValueToName(tag.ndefMessage[0].type);
      const x = Ndef.uri.decodePayload(tag.ndefMessage[0].payload)

      handleParamsLink(x)

      console.log({ x });

    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  const writeNFC = async () => {
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([Ndef.uriRecord('https://649c2918b4576200c1ac7e80--gentle-taffy-09bc86.netlify.app/?userId=lethanhan')]);

      if (bytes) {
        await NfcManager.ndefHandler
          .writeNdefMessage(bytes);
        result = true;
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  }

  return (
    <>
      <Provider store={store}>
        {/* <StatusBar barStyle={'dark-content'} />
        <ListItems/> */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>NFC APP</Text>

          <TouchableOpacity onPress={readTag}>
            <Text>
              Scan...
            </Text>
          </TouchableOpacity>
          <View style={{ height: 200 }} />
          <TouchableOpacity onPress={() => { setChangeState(!changeState) }}>
            <Text>
              Change
            </Text>
          </TouchableOpacity>

        </View>
      </Provider>
    </>
  );
};


export default App;
