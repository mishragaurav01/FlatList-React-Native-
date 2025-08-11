import React, { useRef } from 'react';
import { View, Text, FlatList, Button } from 'react-native';

const data = Array.from({ length: 50 }, (_, i) => ({ id: String(i), title: `Item ${i}` }));

export default function App() {
  const listRef = useRef(null);

  const jumpToItem20 = () => {
    listRef.current.scrollToEnd();
  };

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <Button title="Jump to Item 20" onPress={jumpToItem20} />
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({
          length: 50, // fixed height
          offset: 50 * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={{ height: 50, justifyContent: 'center', paddingLeft: 20 }}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}
