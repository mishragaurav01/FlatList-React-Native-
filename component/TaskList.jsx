import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react'

const TaskList = () => {

  const [checked, setChecked] = useState(false);

  return (

    <View style={styles.container}>
      <View>
        <Text style={styles.TaskText}>Excercise</Text>
        <Text style={styles.DescriptionText}>Carry out a yoga session</Text>
        <Text style={styles.TimeText}>10:30 PM 12 Aug, 2025</Text>
      </View>

      <View style={{ justifyContent: 'space-between',}}>
        <Feather name="edit" style={styles.EditButton} />
        <View style={styles.CheckBox}>
          <Text style={{fontSize: 10, padding: 10 }}>Mark as completed</Text>
          <TouchableOpacity onPress={() => setChecked(!checked)}>
        {checked ? (
          <MaterialIcons name="check-box" size={28} color="green" />
        ) : (
          <MaterialIcons name="check-box-outline-blank" size={28} color="gray" />
        )}
      </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default TaskList

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  TaskText:{
    fontSize: 16, fontWeight:700, paddingBottom: 3
  },
  DescriptionText:{
    fontSize: 12, fontWeight:300, paddingBottom: 10, color: '#666666'
  },
  TimeText:{
    fontSize: 12, fontWeight:400, paddingBottom: 3
  },
  EditButton:{
    fontSize: 18, color: '#8585cdff', paddingBottom: 10, textAlign: 'right',
    paddingLeft: 10, paddingRight: 10
  },
  CheckBox:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'right',
    alignItems: 'center',
    paddingLeft: 10, paddingRight: 10
  },
})