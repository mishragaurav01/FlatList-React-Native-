import { Text, View, StyleSheet, Platform, StatusBar } from "react-native";
import HomeHeader from "../component/HomeHeader";
import HomeContent from "../component/HomeContent";
import TaskList from "../component/TaskList";

export default function Index() {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={{ paddingLeft: 20, paddingTop: 20 }}>
            <Text style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 2 }}>Hello Gaurav 👋</Text>
            <Text style={{ fontSize: 14, fontWeight: '300', marginBottom: 10 }}>Let's get started keeping your task organised...</Text>
      </View>
      <HomeContent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
    // safe zone padding
    // justifyContent: "center",
    // alignItems: "center",
  },
});
