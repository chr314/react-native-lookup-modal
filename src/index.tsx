import React, { useEffect, useState } from 'react';
import {
  Modal,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props {
  onSelect: (item: any) => void;
  onCancel?: () => void;
  data: { [key: string]: any }[];
  displayKey: string;
  searchFunc?: (text: string, data: any[]) => any[];
  placeholder?: string;
  selectText?: string;
  value: any;
  selectButtonStyle?: any;
  selectButtonTextStyle?: any;
  contentStyle?: any;
  itemStyle?: any;
  itemTextStyle?: any;
  hideSelectButton?: boolean;
  children?: any;
}

export default function LookupModal(props: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');

  const [searchResults, setSearchResults] = useState(props.data);

  useEffect(() => {
    const onSearch = async () => {
      const searchFunc = async () => {
        return typeof props.searchFunc === 'function'
          ? await props.searchFunc(search, props.data)
          : props.data?.filter?.(
              (item) =>
                item?.[props.displayKey]
                  ?.toLowerCase?.()
                  ?.indexOf?.(search?.toLowerCase?.()) > -1
            );
      };

      const items = search ? await searchFunc() : props.data;

      setSearchResults(items);
    };

    onSearch();
  }, [props.data, search]);

  const onSelect = (item: any) => {
    props.onSelect(item);
    setModalVisible(false);
  };

  let selectButton;
  if (!props.hideSelectButton) {
    if (!props.children) {
      selectButton = (
        <Pressable
          style={[styles.selectButton, props.selectButtonStyle]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.selectText, props.selectButtonTextStyle]}>
            {props.value?.[props.displayKey] || props.selectText || 'Select...'}{' '}
            ▼
          </Text>
        </Pressable>
      );
    } else {
      selectButton = (
        <Pressable onPress={() => setModalVisible(true)}>
          {props.children}
        </Pressable>
      );
    }
  }

  return (
    <>
      {selectButton}
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onShow={() => setSearch('')}
      >
        <Pressable
          style={styles.modalContent}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={[styles.container, props.contentStyle]}>
            <View style={styles.header}>
              <TextInput
                style={styles.textInput}
                placeholder={props.placeholder || 'Search...'}
                onChangeText={(text) => setSearch(text)}
                value={search}
              />
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </Pressable>
            </View>

            <FlatList
              keyboardShouldPersistTaps={'always'}
              style={styles.list}
              data={searchResults}
              renderItem={({ item }) => (
                <Pressable
                  style={[styles.item, props.itemStyle]}
                  onPress={() => onSelect(item)}
                >
                  <Text style={[styles.itemText, props.itemTextStyle]}>
                    {item?.[props.displayKey]}
                  </Text>
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    height: '80%',
    width: '90%',
    maxWidth: 900,
    zIndex: 100,
    cursor: 'default',
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
    flexDirection: 'row',
    width: '100%',
  },
  textInput: {
    width: '100%',
    paddingHorizontal: 10,
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#c7c7c7',
  },
  selectText: {
    color: '#282828',
  },
  selectButton: {
    margin: 5,
    padding: 5,
  },
  list: {
    width: '100%',
    marginVertical: 10,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#c7c7c7',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
  },
});
