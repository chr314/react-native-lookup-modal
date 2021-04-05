
# React Native Lookup Modal

React Native Lookup Modal

![example gif](https://media.giphy.com/media/320CTS5gPGEEgPnfpB/giphy.gif)

## Install
`yarn add react-native-lookup-modal`

OR

`npm install react-native-lookup-modal --save`

## Usage
```javascript
import LookupModal from 'react-native-lookup-modal';

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

const [user, setUser] = useState();

<LookupModal
    data={users}
    value={user}
    onSelect={item => setUser(item)}
    displayKey={"name"}
/>
```


## Props

Prop | Description | Type | Required/Default
------ | ------ | ------ | ------
`data` | Array of Objects | `array` | Default: `[]`
`value` | Selected item | `object` | Optional
`onSelect` | Fired when an result is selected | `function` | `(item) => {}`
`onCancel` | Fired when modal is closed without selecting any result | `function` | `() => {}`
`displayKey` | Which property is shown in results | `string` | Default: `title`
`selectText` | Text of select button | `string` | Default: `Select...`
`placeholder` | Placeholder of TextInput | `string` | Default: `Search...`
`searchFunc` | Custom search function | `function` | Default: `defaultSearchFunc(text, data)`
`selectButtonStyle` | Custom select button style | `object` | Optional
`selectButtonTextStyle` | Custom select button text style | `object` | Optional
`hideSelectButton` | Hide select button | `bool` | Default: `false`
`children` | Custom select button | `element` | Optional
`contentStyle` | Custom modal content style | `object` | Optional
`itemStyle` | Custom item style | `object` | Optional
`itemTextStyle` | Custom item text style | `object` | Optional

## Methods

Method | Description 
------ | ------ 
`toggleModal(visible)` | the parameter is optional, show = `true`, hide = `false`
`resetResults()` | clear the search results
`search(text)` | search
