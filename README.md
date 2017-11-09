# DataStorage

`react-native-data-storage` is a data storage tool for React Native written on top of AsyncStorage.

With `react-native-data-storage` you can set, get, remove and check for data.
You can save integers, booleans, strings, primitive objects and arrays (anything that can be represented as in the JSON format).
The methods always return a promise.

## Installation

npm install react-native-data-storage --save

## Reference

`set(key, value)`: sets a new value to the storage.
`get(key)`: gets a value in the storage. Promise is rejected if key is not found. An array of keys can be passed and an object with the values will be returned.
`has(key)`: checks whether a value has been set to the storage. Promise resolves with `true` of `false`.
`remove(key)`: removes a value from the storage.
`getAll()`: gets all the values in the storage as an object.

## Usage

```
import DataStorage from 'react-native-data-storage';

Storage.set('name','John Doe')
.then((data)=>{
    return Storage.has('name');
})
.then((data)=>{
    if(data) return Storage.get('name');
    else return '';
})
.then((name)=>{
    console.log(name); //outputs 'John Doe';
    return Storage.remove('name');
})
.then((name)=>{
    console.log('Completed!');
});
```
