import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import LookupModal from 'react-native-lookup-modal';
import { useState } from 'react';

export default function App() {
  const users = [
    {
      id: 1,
      name: 'Brit Renfield',
      tel: '542-866-4301',
      email: 'brenfield0@gmail.com',
      country: 'Russia',
    },
    {
      id: 2,
      name: 'Alfonse Tesche',
      tel: '436-643-1234',
      email: 'atesche1@hotmail.com',
      country: 'Indonesia',
    },
    {
      id: 3,
      name: 'Chandler Follett',
      tel: '682-740-8794',
      email: 'cfollett2@boston.com',
      country: 'Greece',
    },
  ];

  const [user, setUser] = useState();

  return (
    <View style={styles.container}>
      <LookupModal
        data={users}
        value={user}
        onSelect={(item) => setUser(item)}
        displayKey={'name'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee8e8',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
