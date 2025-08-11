import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MemoizedListComponent = ({props}) => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  )
}

const MemoizedList = React.memo(MemoizedListComponent);

export default MemoizedList

const styles = StyleSheet.create({})