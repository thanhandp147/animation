import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';

const FormInput = memo(({ onSubmit }) => {

    const [inputText, setInputText] = useState('');

    const handleSubmit = () => {
        onSubmit(inputText);
        setInputText('');
    };

    return (
        <View>
            <TextInput
                value={inputText}
                onChangeText={(text) => setInputText(text)}
                placeholder='type here...' />

            {/* <Button onPress={handleSubmit} title="Submit" /> */}

            <TouchableOpacity
            onPress={handleSubmit}
            title="Submit">
                <Text>
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
    );
});



export default FormInput;