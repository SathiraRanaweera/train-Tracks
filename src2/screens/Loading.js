import React, {Component}from 'react';
import { Text,View,ActivityIndicator,StyleSheet,TouchableOpacity } from 'react-native';
import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");


class Loading extends Component{
    componentWillMount(){
        this.Loading()
    }

    constructor(props) {
        super(props);
        this.state={
            loading:true
        }    
    }
    static navigationOptions = {
        
        headerTitle:'Train Tracks',
        headerTintColor: '#5DA0BA',
        headerStyle: {
            backgroundColor:'black'
        },

    }

    renderMethod(){
        if(this.state.loading==false){
            
            return(<TouchableOpacity 
                    onPress={
                        ()=>this.props.navigation.navigate('Home')
                    }>
                    <Text style={{fontSize: 16, paddingLeft:15}}>Go to Home Page</Text></TouchableOpacity>)
        }else{
            return(
            <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" /> 
            </View>
            )
        }

    }


    Loading(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                this.setState({loading:false})
                this.props.navigation.navigate('Home');
            } else {
                this.props.navigation.navigate('Login');
            }
          }.bind(this)
          );
    }

    render(){
        
        return(
           this.renderMethod()
        )
    }



}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  })



export default Loading;