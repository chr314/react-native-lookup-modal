
# React Native Lookup Modal

## Getting started
`$ yarn add react-native-lookup-modal`

OR

`$ npm install react-native-lookup-modal --save`

## Usage
```javascript
import {LookupModal} from 'react-native-lookup-modal';

let users = [
    {
        id: 1,
        name: 'Brit Renfield',
        tel: '542-866-4301',
        email: 'brenfield0@gmail.com',
        country: 'Russia'
    },
    {
        id: 2,
        name: 'Alfonse Tesche',
        tel: '436-643-1234',
        email: 'atesche1@hotmail.com',
        country: 'Indonesia'
    },
    {
        id: 3,
        name: 'Chandler Follett',
        tel: '682-740-8794',
        email: 'cfollett2@boston.com',
        country: 'Greece'
    }
];

<LookupModal
    data={users}
    onSelect={item => {
        alert("Selected user: " + item.name);
    }}
    searchFunc={(text, data) => {
        return customSearchFunction(text);
    }}
    displayKey={"name"}
/>
```
