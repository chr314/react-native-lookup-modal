import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LookupModal} from "react-native-lookup-modal";


export default class App extends React.Component {
    state = {
        userName: ""
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
            }
        ];
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>User: {this.state.userName}</Text>

                <LookupModal
                    data={users}
                    onSelect={item => {
                        this.setState({userName: item.name});
                    }}
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
