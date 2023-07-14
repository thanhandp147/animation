import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InputForm from '../screens/ForJest/FormInput';

describe('InputForm', () => {
    test('calls onSubmit function with input text when submitted', () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText, getByLabelText} = render(<InputForm onSubmit={onSubmit} />);
  
      const input = getByPlaceholderText('type here...');
      const submitButton = getByText('Submit');
  
      fireEvent.changeText(input, 'Test input text');
      fireEvent.press(submitButton);
  
      expect(onSubmit).toHaveBeenCalledWith('Test input text');
      expect(input.props.value).toBe('');
    });
  });