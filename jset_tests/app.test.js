import { API_geoNames, APIweatherbit, APIpixabay, updateUI } from '../src/client/js/application.js'

test('API_geoNames shoud be a function', () => {
        expect(typeof API_geoNames).toBe('function');
});

test('APIweatherbit shoud be a function', () => {
        expect(typeof APIweatherbit).toBe('function');
});

test('APIpixabay shoud be a function', () => {
        expect(typeof APIpixabay).toBe('function');
});

test('updateUI shoud be a function', () => {
        expect(typeof updateUI).toBe('function');
});

