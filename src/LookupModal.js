import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList} from 'react-native';
import Modal from "react-native-modal";
import PropTypes from 'prop-types';
import Utils from "Utils";


export default class LookupModal extends React.Component {

    static propTypes = {
        onSelect: PropTypes.func,
        data: PropTypes.array,
        apiRoute: PropTypes.string,
        displayKey: PropTypes.string,
        searchFunc: PropTypes.func,
        placeholder: PropTypes.string,
    };

    static defaultProps = {
        onSelect: () => {
        },
        data: [],
        apiRoute: "",
        displayKey: "title",
        searchFunc: null,
        placeholder: "Search..."
    };

    state = {
        isVisible: false,
        searchResults: []
    };

    constructor(props) {
        super(props);
        if (!Utils.isFunction(this.props.searchFunc)) {
            this.props.searchFunc = this.defaultSearchFunc;
        }
        if (Utils.isEmpty(this.state.searchResults)) {
            this.state.searchResults = this.props.data;
        }
    }

    toggleModal(visible) {
        if (visible == null) {
            this.setState({isVisible: !this.state.isVisible})
        } else {
            this.setState({isVisible: !!visible})
        }
    };

    search(text) {
        if (Utils.isFunction(this.props.searchFunc)) {
            let results = this.props.searchFunc(text, this.state.data);
            this.setState({searchResults: results});
        }
    }

    onSelect(item) {
        this.toggleModal(false);
        this.props.onSelect(item);
    }

    defaultSearchFunc = (text, data) => data.filter(item => item[this.props.displayKey].includes(text));

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.selectButton} onPress={() => this.toggleModal(true)}>
                    <Text style={styles.selectText}>Select...</Text>
                </TouchableOpacity>
                <Modal
                    isVisible={this.state.isVisible}
                    onBackdropPress={() => this.setState({isVisible: false})}
                    onModalHide={() => {
                        this.setState({search: ""});
                    }}
                    onBackButtonPress={() => {
                        this.toggleModal(false);
                    }}
                >
                    <View style={styles.modalContent}>
                        <View>
                            <TextInput
                                style={styles.textInput}
                                placeholder={this.props.placeholder}
                                onChangeText={(text) => {
                                    this.setState({search: text});
                                    this.search(text);
                                }}
                                value={this.state.search}
                                multiline={true}
                            />

                            <FlatList
                                style={{width: '100%'}}
                                data={this.state.searchResults}
                                maxToRenderPerBatch={5}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        style={styles.item}
                                        onPress={() => this.onSelect(item)}>
                                        <Text>{item[this.props.displayKey]}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: "white",
        padding: 10
    },
    textInput: {
        width: "100%",
        padding: 0,
        paddingBottom: 5
    },
    selectText: {
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    selectButton: {
        margin: 5,
        padding: 5,
        backgroundColor: '#d6d6d6'
    },
    item: {
        padding: 10
    },
});
