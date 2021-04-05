import React from 'react';
import {View, Text, StyleSheet, Pressable, TextInput, FlatList} from 'react-native';
import Modal from "react-native-modal";
import PropTypes from 'prop-types';


export default class LookupModal extends React.Component {

    static propTypes = {
        onSelect: PropTypes.func,
        onCancel: PropTypes.func,
        data: PropTypes.array.isRequired,
        displayKey: PropTypes.string.isRequired,
        searchFunc: PropTypes.func,
        placeholder: PropTypes.string,
        selectText: PropTypes.string,
        value: PropTypes.object,
        selectButtonStyle: PropTypes.object,
        selectButtonTextStyle: PropTypes.object,
        hideSelectButton: PropTypes.bool,
        contentStyle: PropTypes.object,
        itemStyle: PropTypes.object,
        itemTextStyle: PropTypes.object,
    };

    static defaultProps = {
        onSelect: () => {
        },
        onCancel: () => {
        },
        data: [],
        placeholder: "Search...",
        selectText: "Select...",
        hideSelectButton: false,
    };

    state = {
        isVisible: false,
        searchResults: []
    };

    toggleModal = (visible = !this.state.isVisible) => {
        this.setState({isVisible: !!visible})
    };

    resetResults = () => {
        if (this.state.searchResults.length !== this.props.data.length) {
            this.setState({searchResults: this.props.data});
        }
    }

    search = (text) => {
        if (typeof this.props.searchFunc === 'function') {
            let results = this.props.searchFunc(text, this.props.data);
            this.setState({searchResults: results});
        } else {
            let results = this.defaultSearchFunc(text, this.props.data);
            this.setState({searchResults: results});
        }
    }

    onSelect = (item) => {
        this.toggleModal(false);
        this.props.onSelect(item);
    }

    onCancel = () => {
        this.toggleModal(false);
        this.props.onCancel();
    }

    defaultSearchFunc = (text, data) => data.filter(item => item[this.props.displayKey].toLowerCase().indexOf(text.toLowerCase()) > -1);

    render() {
        let selectButton;
        if (!this.props.hideSelectButton && !this.props.children) {
            selectButton = (
                <Pressable
                    style={[styles.selectButton, this.props.selectButtonStyle]}
                    onPress={() => this.toggleModal(true)}
                >
                    <Text style={[styles.selectText, this.props.selectButtonTextStyle]}>
                        {this.props.value?.[this.props.displayKey] || this.props.selectText} ▼
                    </Text>
                </Pressable>
            );
        } else if (!this.props.hideSelectButton && this.props.children) {
            selectButton = (
                <Pressable onPress={() => this.toggleModal(true)}>
                    {this.props.children}
                </Pressable>
            );
        }

        return (
            <>
                {selectButton}
                <Modal
                    isVisible={this.state.isVisible}
                    backdropTransitionOutTiming={0}
                    onBackdropPress={() => this.onCancel()}
                    onModalHide={() => this.setState({search: ""})}
                    onBackButtonPress={() => this.onCancel()}
                    onModalShow={() => this.resetResults()}
                    animationIn={'zoomIn'}
                    animationOut={'zoomOut'}
                >
                    <View style={[styles.modalContent, this.props.contentStyle]}>
                        <View style={styles.header}>
                            <TextInput
                                style={styles.textInput}
                                placeholder={this.props.placeholder}
                                onChangeText={(text) => {
                                    this.setState({search: text});
                                    this.search(text);
                                }}
                                value={this.state.search}
                            />
                            <Pressable
                                style={styles.closeButton}
                                onPress={() => this.onCancel()}
                            >
                                <Text style={styles.closeButtonText}>×</Text>
                            </Pressable>
                        </View>

                        <FlatList
                            keyboardShouldPersistTaps={'always'}
                            style={styles.list}
                            data={this.state.searchResults}
                            renderItem={({item}) => (
                                <Pressable
                                    style={[styles.item, this.props.itemStyle]}
                                    onPress={() => this.onSelect(item)}>
                                    <Text style={[styles.itemText, this.props.itemTextStyle]}>
                                        {item?.[this.props.displayKey]}
                                    </Text>
                                </Pressable>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </Modal>
            </>
        )
    }
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: "white",
        padding: 10
    },
    closeButton: {
        width: 40,
        padding: 5,
        justifyContent: 'center',
    },
    closeButtonText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    header: {
        flexDirection: 'row'
    },
    textInput: {
        width: "100%",
        paddingLeft: 10,
        paddingBottom: 5,
        flex: 1,
        borderBottomWidth: 1,
        borderColor: "#c7c7c7"
    },
    selectText: {
        color: '#282828'
    },
    selectButton: {
        margin: 5,
        padding: 5,
    },
    list: {
        width: '100%',
        marginVertical: 10
    },
    item: {
        padding: 10
    },
    itemText: {
        fontSize: 18
    }
});
