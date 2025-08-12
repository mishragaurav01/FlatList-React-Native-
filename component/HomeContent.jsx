import { StyleSheet, Text, View, FlatList } from 'react-native'
import TaskList from "../component/TaskList";
import React from 'react'

const HomeContent = () => {

    const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // Sample data to render multiple TaskList components

    const renderItem = ({ item }) => <TaskList />; // Render TaskList for each item

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()} // Use item index as key
        contentContainerStyle={{ paddingBottom: 20 }} // Add padding to the bottom
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        ListEmptyComponent={<Text>No tasks available</Text>} // Show when no data is present
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // Separator between items
      />
    </View>
  )
}

export default HomeContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    
})