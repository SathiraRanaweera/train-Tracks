import React, {Component}from 'react';

//import firebase from 'firebase';
import firebase from '@firebase/app';
import Header from './components/Header';
import MainPage from './screens/MainPage'
import { BackHandler } from 'react-native';




//create component
class App extends Component{

    componentDidMount() {
        //BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    }
    
    
    
    onBackButtonPressed() {
        return true;
    }
   componentWillMount(){
    //BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
            firebase.initializeApp({
                apiKey: "AIzaSyDin3Ah4eMirhFDz0eizFjGRx03C1v2IMo",
                authDomain: "shareplaces-5a4c6.firebaseapp.com",
                databaseURL: "https://shareplaces-5a4c6.firebaseio.com",
                projectId: "shareplaces-5a4c6",
                storageBucket: "shareplaces-5a4c6.appspot.com",
                messagingSenderId: "316261499606"
              });
        }
   render(){
       return(
        
        <MainPage/>
            
       );
    
   }
}


export default App;



