
# React Native Lookup Modal

## Install
`yarn add react-native-lookup-modal`

OR

`npm install react-native-lookup-modal --save`

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


## Props

Prop | Description | Type | Required/Default
------ | ------ | ------ | ------
`data` | Array of Objects | `array` | Default: `[]`
`onSelect` | Fired when an result is selected | `function` | Optional
`displayKey` | Which property is shown in results | `string` | Default: `title`
`selectText` | Text of select button | `string` | Default: `Select...`
`placeholder` | Placeholder of TextInput | `string` | Default: `Search...`
`searchFunc` | Custom search function | `function` | Default: `defaultSearchFunc()`
`selectButtonStyle` | Custom select button style | `object` | Optional
`selectButtonTextStyle` | Custom select button text style | `object` | Optional
`contentStyle` | Custom modal content style | `object` | Optional
`itemStyle` | Custom item style | `object` | Optional
`itemTextStyle` | Custom item text style | `object` | Optional
