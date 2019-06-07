
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,TextInput } from 'react-native';
import FetchLocation from './component/FetchLocation';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {
  state = {
    placeName:'s'
  }
  
  
  
  
  
  
  getUserLocationHandler=()=>{
    navigator.geolocation.getCurrentPosition(position => {
      var x = position.coords.latitude;
      alert(x)
      // alert(position.coords.longitude)
      
      

    }, err=>alert(err));
    
  }
  // placeNameChangedHandler = val =>{
  //     this.setState({
  //       placeName:val
  //     });

  // }
  render() {
    return (
      <View style={styles.container}>
        {/* <TextInput 
        style ={{width: 300,  borderWidth: 1}}
        value={this.state.placeName} 
        onChangeText={this.placeNameChangedHandler} /> */}
        <FetchLocation onGetLocation={this.getUserLocationHandler}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
