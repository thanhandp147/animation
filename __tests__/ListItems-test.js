import React from 'react';
import renderer, { act } from 'react-test-renderer';
import ItemList from '../screens/ForJest/ListItems';

describe('Calculator', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(1 + 2).toBe(3);
    });

    test('subtracts 5 - 2 to equal 3', () => {
        expect(5 - 2).toBe(3);
    });
    test('multiplies 2 * 3 to equal 6', () => {
        expect(2 * 3).toBe(6);
      });
      
      test('multiplies 5 * 0 to equal 0', () => {
        expect(5 * 0).toBe(0);
      });
});