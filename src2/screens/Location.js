import React, { Component } from "react";
import { StyleSheet, Text, View ,Dimensions, Button} from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import RNLocation from 'react-native-location';

import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");


export default class Location extends Component {
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
        
          
        const database = firebase.firestore()
        // var reference = database.collection('trains').doc('fdwIkN8LK0rg33ncpsJ9')
        var stationsref = database.collection('stations')
        
    }
    
    componentDidMount() {
        const { navigation } = this.props;
        const trainName = navigation.getParam('trainName');
        
        const database = firebase.firestore()
        var reference = database.collection('Train').doc('Express_Mahanuwara')
        // metana fdwIkN8LK0rg33ncpsJ9 wenuwata document id eka pass wenna hadannaa 
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
                    // alert(position.coords.latitude)
                    reference.update({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude, 
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