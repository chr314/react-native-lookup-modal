import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LookupModal from "react-native-lookup-modal";


export default class App extends React.Component {
    state = {
        user: null
    };

    render() {
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
            },
        ];
        return (
            <View style={styles.container}>
                <Text style={styles.title}>React Native Lookup Modal Example</Text>

                <LookupModal
                    data={users}
                    value={this.state.user}
                    onSelect={item => this.setState({user: item})}
                    displayKey={"name"}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: "#bcbcbc",
        width: '80%',
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
