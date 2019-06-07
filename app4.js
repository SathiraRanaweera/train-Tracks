import React, { Component } from "react";
import { StyleSheet, Text, View ,Dimensions, Button} from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import RNLocation from 'react-native-location';

import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");
  
export default class App4 extends Component {
    constructor(){
        super();
        this.state = {
            ready: false,
            message:'Plese update Location',
            lat: null,
            lon: null,
            loc :{
                latitude: 7.093546,
                longitude: 79.993703,
                latitudeDelta: 0.0122,
                longitudeDelta:
                    Dimensions.get("window").width /
                    Dimensions.get("window").height *
                    0.0122
                },        
        }
    }
    
    componentDidMount(){
        
      RNLocation.configure({
        distanceFilter: 100, // Meters
        desiredAccuracy: {
          ios: "best",
          android: "balancedPowerAccuracy"
        },
        // Android only
        androidProvider: "auto",
        interval: 5000, // Milliseconds
        fastestInterval: 10000, // Milliseconds
        maxWaitTime: 5000, // Milliseconds
        })
    
        RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
              detail: "fine"
            }
          }).then(granted => {
            if (granted) {
              this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
                
               var lat = locations[0].latitude;
               var lon = locations[0].longitude;
               this.setState({  lat: lat, lon: lon , message:'Location Updated'});
                })
              }
              else{
                  alert('permission naa lu')
              }
            })
            firebase.initializeApp({
                apiKey: "AIzaSyDin3Ah4eMirhFDz0eizFjGRx03C1v2IMo",
                authDomain: "shareplaces-5a4c6.firebaseapp.com",
                databaseURL: "https://shareplaces-5a4c6.firebaseio.com",
                projectId: "shareplaces-5a4c6",
                storageBucket: "shareplaces-5a4c6.appspot.com",
                messagingSenderId: "316261499606"
              });
              
              const database = firebase.firestore()
              
              var reference = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
            
              writefun = (lat1, lon1)=> {   
                this.setState({ message:'Update Location'});
                alert('came hear without pressing')
                reference.set({
                  lat: lat1,
                  lng: lon1, 
                }
                ).then(()=>{
                  this.setState({ message:'Location Updated'});
                    }).catch(function(error) {
                  alert('Error writing new message to Firebase Database');
                  this.setState({  message:'Location Not Updated'});
                });
              }     
              
              
              var trainsref = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
              var query = trainsref.get().then(function(doc) {
                
                if (doc.exists) {
                  alert('Firebase Success'+doc.data().lat);
                  
                }
                else{
                  alert('document dosent exists')
                }
              })
              .catch(err => {
                alert('Error getting documents');
              });
          }
       
    render() {
        return (
            <View style={styles.container}>
                
                <MapView
                    initialRegion={this.state.loc}
                    region={this.state.loc}
                    style={styles.map}
                    
                    
                >
                <Marker coordinate={{
                  latitude: 7.093546,
                  longitude: 79.993703,}}
                   >
                </Marker>
                </MapView>
                <View>
                <Button
                  title="Update Location"
                  onPress={() => writefun(this.state.lat, this.state.lon)}
                />
                <Text>{this.state.message}</Text>
                </View>
              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    container: {
    //   ...StyleSheet.absoluteFillObject,
        height: '100%',
      width: '100%',
    //   justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      width:'100%',
      height:'50%'
    },
       
    big: {
        fontSize: 48
    }
});