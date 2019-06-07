import React, { Component } from "react";
import { StyleSheet, Text, View ,Dimensions, Button, Alert} from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import RNLocation from 'react-native-location';

import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");


export default class App5 extends Component {
    constructor(){
        super();
        this.state = {
            lat:"",
            lon:"",
            message:"",
            stations:"",   
            lats:[],
            lons:[],
            loc :{
                latitude: 7.093546,
                longitude: 79.993703,
                latitudeDelta: 0.0122,
                longitudeDelta:
                    Dimensions.get("window").width /
                    Dimensions.get("window").height *
                    0.0122
                },
            code:[],
            region: {
                latitude: 7.093546,
                longitude: 7.093546,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0422,
            }
        }
        
    }

    componentWillMount(){
        var stations = []
        var lats =[]
        var lons = []
        var code =''
        // RNLocation.configure({
        //     distanceFilter: 100, // Meters
        //     desiredAccuracy: {
        //         ios: "best",
        //         android: "balancedPowerAccuracy"
        //         },
        //     // Android only
        //     androidProvider: "auto",
        //     interval: 5000, // Milliseconds
        //     fastestInterval: 10000, // Milliseconds
        //     maxWaitTime: 5000, // Milliseconds
        //     })
        // RNLocation.requestPermission({
        //     ios: "whenInUse",
        //     android: {
        //         detail: "fine"
        //         }
        //     }).then(granted => {
        //         if (granted) {
        //             this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
                    
        //             var lat = locations[0].latitude;
        //             var lon = locations[0].longitude;
        //             this.setState({ 
        //                 lat: lat, 
        //                 lon: lon , 
        //                 message:'Location Updated',
        //                 loc:{
        //                     latitude:lat,
        //                     longitude:lon}
        //             });
        //             })
        //           }
        //           else{
        //               alert('You need to give Location Permission. Closs App and Try again')
        //           }
        //     })

        firebase.initializeApp({
            apiKey: "AIzaSyDin3Ah4eMirhFDz0eizFjGRx03C1v2IMo",
            authDomain: "shareplaces-5a4c6.firebaseapp.com",
            databaseURL: "https://shareplaces-5a4c6.firebaseio.com",
            projectId: "shareplaces-5a4c6",
            storageBucket: "shareplaces-5a4c6.appspot.com",
            messagingSenderId: "316261499606"
          });
          
        const database = firebase.firestore()
        // var reference = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
        var stationsref = database.collection('stations')
        

    }
    
    
    componentDidMount() {
        const database = firebase.firestore()
        var reference = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
        setInterval( getLocation = ()=>{
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState({
                        region: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0422,
                        }
                    })
                    alert(position.coords.latitude)
                    reference.set({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude, 
                    }).then(()=>{
                        alert('firebase updated')
                        }).catch(function(error) {
                            alert('Error writing new message to Firebase Database');
                            })
                },
                (error) => console.log(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
        },5000 )    
        // write Location to firebase
    }
    
    render(){
        return(
            <View style={styles.container}> 
                <MapView
                    region={this.state.region}
                    style={styles.map}
                >
                <Marker coordinate={{
                    latitude:this.state.region.latitude,
                    longitude: this.state.region.longitude}}
                     >
                </Marker>
                </MapView>
                <Button title ="press "onPress={this.ShowAlertWithDelay}></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    map: {
        width:'100%',
        height:'50%'
    },
})