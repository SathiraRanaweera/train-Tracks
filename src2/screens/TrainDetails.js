import React, {Component} from "react";
 import firebase from '@firebase/app';
 require('firebase/auth');
 require('@firebase/database');
 require("firebase/firestore");
import {FlatList,Text,TouchableWithoutFeedback,View, TouchableOpacity} from 'react-native';
import Card from '../components/Card';
import CardSection from '../components/CardSection';

class TrainDetails extends Component {
    
    componentDidMount(){
            
            let key = 0;
            const { navigation } = this.props;
            const startStation = navigation.getParam('startStation', 'Veyangoda');
            const endStation   = navigation.getParam('endStation', 'Ragama');
            const side         = navigation.getParam('side','up')
            console.log('navprop',startStation,endStation)
            //firebase connection
            var db = firebase.firestore();
            var user = firebase.auth().currentUser;
            if (user != null) {
                //checking wether a driver or passenger
                docRef = db.collection("drivers").doc(user.email);
                docRef.get().then(function(doc) {
                if (doc.exists) {
                    console.log("Document data");
                    this.setState({drEmail:user.email})
                } else {
                // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
                }.bind(this)
                ).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            }else{
                console.log("logged Out")
            }
            


           
            let trainRef = db.collection("Train");
            let query = trainRef.where(startStation+".stops", "==", "true")
                                .where(endStation+".stops", "==", "true")
                                .where("Details.Side","==",side)
            
            query.get().then(snapshot=>{           
              snapshot.docs.forEach(doc=>{
                //rendering details od a perticular train
                object = { key : key.toString(),
                      title : doc.id, 
                      description :'Departure from '+ startStation +' : '+ doc.get(startStation+'.Dep') +'\n'+
                                   'Arrival at '    + endStation   +' : '+ doc.get(endStation+'.Arr')   +'\n'+
                                   'Description'                                                        +'\n'+                                               
                                   'Available Classes'
                                   ,
                      pressed: false
                    }
                this.setState(prevState => ({
                        data: [...prevState.data,object]
                      }))    
                key++ 
              })
            })
    }
    constructor(props) {
        super(props);
        this.state={
            data:[],
            pressed: false,
            pressedButton:0,
            drEmail:null
            
        }    
    }

    static navigationOptions ={
        headerTitle:'Train Details',
        headerTintColor: '#5DA0BA',
        headerStyle: {
            backgroundColor:'black'
        }
    }
    //dropdown list..............................................................................................................
    onButtonPress = (ik) =>{
        if(this.state.data[ik].pressed==false){
            this.setState(Object.assign(this.state.data[ik],{pressed:true}));
        }else{
            this.setState(Object.assign(this.state.data[ik],{pressed:false}));
        }
    }
    onButtonPress2=(itemDes,itemKey)=> {
        if(this.state.data[itemKey].pressed==true){
                return(itemDes)
            }    
    }
    //dropdown list..............................................................................................................
    linkRender=(itemKey)=>{
        if(this.state.data[itemKey].pressed==true){
            if(this.state.drEmail)
                {
                    return(<TouchableOpacity 
                        onPress={
                                ()=>this.props.navigation.navigate('Location',{
                                trainName: this.state.data[itemKey].title,
                            })
                        }>
                    <Text style={{fontSize: 16, paddingLeft:15}}>Provide location</Text></TouchableOpacity>)
                }
            else
                {
                    return(<TouchableOpacity 
                        onPress={
                                ()=>this.props.navigation.navigate('Location',{
                                trainName: this.state.data[itemKey].title,
                            })
                        }>
                    <Text style={{fontSize: 16, paddingLeft:15}}>get location</Text></TouchableOpacity>)
                }
        }
    }

    render(){
        return(
            <Card>
            <FlatList
            data={this.state.data}
            extraData={this.state}
            renderItem={({item}) =>  
                <View>
                <CardSection>
                    <TouchableWithoutFeedback 
                    onPress={this.onButtonPress.bind(this,item.key)}>
                    <Text style={{color:'red',fontSize: 18, paddingLeft:10}}>{item.title}</Text>
                    </TouchableWithoutFeedback>
                </CardSection>
                <Text style={{fontSize: 16, paddingLeft:15}}>
                {
                    this.onButtonPress2(item.description,item.key)                  
                }     
                </Text> 
                {
                    this.linkRender(item.key)
                }     
                </View>   
            }
            />
            </Card>
        )
    }
}

export default TrainDetails;