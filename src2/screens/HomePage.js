import React, {Component} from "react";
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';


import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");

import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';
import SignButton from '../components/SignButton'





class HomePage extends Component{

  componentDidMount(){
    
    this.props.navigation.setParams({ signOutButton: this.signOutButton() });
    // firebase connection
    var db = firebase.firestore();
    var docRef = db.collection("Train").doc("stations");

    docRef.get().then(function(doc) {
    if (doc.exists) {
        this.setState({stationNames: doc.get('Names')})
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }.bind(this)
    ).catch(function(error) {
    console.log("Error getting document:", error);
    });
    }


    
    
    constructor(props) {
    
        super(props);
        this.state = {
            query: '',
            query2: '',
            array : ['kamal','sunil','namal'],
            stationNames:[]
          };
    }


    static navigationOptions ({ navigation }) {
      return { 
      
        headerTitle:'Home',
        headerStyle: {
            backgroundColor:'black'
        },
        headerTintColor: '#5DA0BA',
        headerRight: (
            navigation.getParam('signOutButton')
        ),
        headerLeft: null
      }
    }

    signOutButton (){
  
          return(<SignButton onPress={this.signOut}>
                  Log Out
                </SignButton>)
     
    }

    //checking for the side train goes 
    checkSideOfTheTrain(){
      index1= this.state.stationNames.indexOf(this.state.query)
      index2= this.state.stationNames.indexOf(this.state.query2)
      if((index1-index2)<0){
        return 'up';
      }else{
        return 'down';
      }


    }
    
    navigate=()=>{
      this.checkSideOfTheTrain();  
      if(this.state.query != '' && this.state.query2 != ''){
      this.props.navigation.navigate('TrainD',{
        startStation: this.state.query,
        endStation  : this.state.query2,
        side        : this.checkSideOfTheTrain()
      })
    }else{
      alert('incomplete')
    }
    }

    signOut =()=>{
      firebase.auth().signOut().then(function() {
          alert('Sign-out successful')
          this.props.navigation.navigate('Login');
        }.bind(this)
        ).catch(function(error) {
          alert(error)
        }.bind(this)
        );


    }
    
    findStation(query) {
        //method called everytime when we change the value of the input
        if (query === '') {
          //if the query is null then return blank
          return [];
        }
        
        //making a case insensitive regular expression to get similar value from the film json
        const regex = new RegExp(`${query.trim()}`, 'i');
        //return the filtered film array according the query from the input
        return this.state.stationNames.filter(film => film.search(regex) >= 0);

      }
    render(){
        const { query } = this.state;
        const { query2 } = this.state;
        const films = this.findStation(query);
        const films2 = this.findStation(query2);
        //comparing capital simple letters
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        
        return(

            <Card>
            <CardSection>
            <Autocomplete style={{color:'#000',fontSize:18}}
              autoCapitalize="none"
              autoCorrect={false}
              //data to show in suggestion data is a atribute of autocomplete, if user inputs complete suggesion nothing will appear
              data={films.length === 1 && comp(query, films[0]) ? [] : films}
              //default value if you want to set something in input
              defaultValue={query}
              /*onchange of the text changing the state of the query which will trigger
              the findFilm method to show the suggestions*/
              onChangeText={text => this.setState({ query: text })}
              placeholder="Start Station"
              renderItem={(data) => (
                //you can change the view you want to show in suggestion from here
                <TouchableOpacity 
                onPress={() => this.setState({ query: data })}>
                  <Text>
                    {data} 
                  </Text>
                </TouchableOpacity>
              )}
            />
            </CardSection>
            <CardSection>
            {films.length > 0 ? (
                <Text>{this.state.query}</Text>
              ) : (
                <Text>Enter Start Station</Text>
              )}
            </CardSection>
            
            
            
            <CardSection>
            <Autocomplete style={{color:'#000',fontSize:18}}
              autoCapitalize="none"
              autoCorrect={false}
              //data to show in suggestion
              data={films2.length === 1 && comp(query2, films2[0]) ? [] : films2}
              defaultValue={query2}
              onChangeText={text => this.setState({ query2: text })}
              placeholder="End Station"
              renderItem={(data) => (
                <TouchableOpacity 
                onPress={() => this.setState({ query2: data })}
                
                >
                  <Text>
                    {data} 
                  </Text>
                </TouchableOpacity>
              )}
            />
            </CardSection>
            <CardSection>
            {films2.length > 0 ? (
                <Text>{this.state.query2}</Text>
              ) : (
                <Text>Enter end Station</Text>
              )}
            </CardSection>
            <CardSection>
            <Button onPress={ this.navigate
            }>
                        Look Up
                    </Button>
            </CardSection>
            
            </Card>
          
        )
    }
}



export default HomePage;