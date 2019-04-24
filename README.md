
# react-native-lookup-modal

## Getting started
`$ yarn add react-native-lookup-modal`

OR

`$ npm install react-native-lookup-modal --save`

## Usage
```javascript
import {LookupModal} from 'react-native-lookup-modal';

<LookupModal
    data={this.state.items}
    onSelect={item => {
        alert("Selected item:" + item.name);
    }}
    searchFunc={(text,data) => {
        return customSearchFunction(text);
    }}
    displayKey={"name"}
/>
```
