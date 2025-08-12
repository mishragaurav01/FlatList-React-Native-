import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View>
         <Ionicons name="person-circle" size={50} color="#8585cdff" /> 
      </View>
      <View style={styles.headerRight}>
        <Ionicons name="search" size={25} color="#8585cdff" /> 
        <Ionicons name="notifications-outline" size={25} color="#8585cdff" />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#f5f5f5',
  },
  headerRight:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  }
});
