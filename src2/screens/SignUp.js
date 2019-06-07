import React, {Component}from 'react';
import { Text,View } from 'react-native';
import firebase from '@firebase/app';
require('firebase/auth');
require('@firebase/database');
require("firebase/firestore");
import Button from '../components/Button';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import TxtInput from '../components/TxtInput';
import Spinner from '../components/Spinner';



class LoginForm extends Component{
    static navigationOptions ={
        headerTitle:'Sign Up',
        headerStyle: {
            backgroundColor:'orange'
        }
    }

    state={ email:'',
            password:'',
            text:'',
            error:'',
            user: firebase.auth().currentUser,
            
            loading:false

    };

    
    userLog =()=>{
        var user = firebase.auth().currentUser;
        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;  
            alert(name)
        }else{
            alert("logged Out")
        }
    }
    spinner (){
        if(this.state.loading==true){
            return(<Spinner/>)
        }else{
            return(
            <Button onPress={this.signUp}>
                Sign Up
            </Button>)
        }
    }
    signingIn=()=>{
        this.setState({loading:true})
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(this.onLoginSuccess)
        .catch( function(error){
            this.setState({loading:false})
            alert('sign in'+error.message);   
        }.bind(this)
        );
    }
    signUp=()=>{
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)   
        .then(this.signingIn)
        .catch(function(error) {
            this.setState({loading:false})
            
            alert("sign up:"+error.message)
            
          }.bind(this)
          );
    }
    
    onLoginSuccess=()=>{
        this.setState({email:'',
                        password:'',
                        loading:false
    
        })
        this.props.navigation.navigate('Home');
    }
 
    render(){
        let username
        return(
            <Card>
                <CardSection>
                    <TxtInput 
                    
                    placeholder = '123@gmail.com'
                    label = 'Email :'
                    value={this.state.email}
                    onChangeText={(oCemail) =>this.setState({email: oCemail})}
                    
                    />
                </CardSection>
                <CardSection>
                <TxtInput 
                    sTe = {true} //secureTextEntry
                    placeholder = '123'
                    label = 'Pssword :'
                    value={this.state.password}
                    onChangeText={(oCpass) =>this.setState({password: oCpass})}
                    
                    />

                </CardSection>

                <Text style={{fontSize:20, alignSelf:'center',color:'red'}}></Text>

               
                <CardSection>
                    {this.spinner()}
                </CardSection>
                
                
                

            </Card>
        )
    }
}
export default LoginForm;