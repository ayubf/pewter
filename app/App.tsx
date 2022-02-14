import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';
import {useState, useEffect} from 'react';

export default function App() {

  let [name, setName] = useState("");
  let [serverResponse, setServerResponse] = useState();

  const API_URL = Platform.OS === 'web' ? "http://localhost:3001/" : "http://10.0.0.86/3001"
  

  useEffect(() => {
    const pingServer = async () => {
      await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        }
      })
      .then(res => res.json())
      .then(data => setServerResponse(data))
      .catch((error) => {
        console.log(error)
      })
    }

    pingServer()
  }, [setServerResponse])


  return (
    <View style={styles.container}>

    <Text> Server Response: {} </Text>
      
      <TextInput 
        style={styles.inputText}
        onChangeText={setName}
        value={name}
        placeholder="Type your name.."
      />

      <Text>  {name ? `Your name is ${name}` : "Type your name in the text input above"}  </Text>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputText: {
    color: "black",
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    margin: 12,

  }
});
