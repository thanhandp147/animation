import React from 'react';
import { Text } from 'react-native';
import renderer, { act }  from 'react-test-renderer';
import Counter from '../screens/ForJest/Counter';

test('test Counter', () => {

    let component

    act(() => {
        component = renderer.create(<Counter />);
      });

    const root = component.root;

    const text = root.findByProps({flag:'resultCount'});
    expect(text.props.children).toBe(0);

    const incrementButton = root.findByProps({ flag: 'increment' });

    act(() => {
        incrementButton.props.onPress();
      });

    expect(text.props.children).toBe(1);

})